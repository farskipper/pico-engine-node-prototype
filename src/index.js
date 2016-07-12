var _ = require("lodash");
var λ = require("contra");
var DB = require("./DB");
var krl = {
  stdlib: require("krl-stdlib"),
  Closure: require("./KRLClosure")
};
var Future = require("fibers/future");
var compiler = require("krl-compiler");
var evalRule = require("./evalRule");
var SymbolTable = require("symbol-table");
var applyInFiber = require("./applyInFiber");
var selectRulesToEval = require("./selectRulesToEval");
var installRulesetFile = require("./installRulesetFile");

var getArg = function(args, name, index){
  return _.has(args, name)
    ? args[name]
    : args[index];
};
var mkCTX = function(ctx){
  ctx.getArg = getArg;
  ctx.krl = krl;
  return ctx;
};

var rulesets = {};
var salience_graph = {};

var doInstallRuleset = function(rs){
  rs.rid = rs.name;
  rs.scope = SymbolTable();
  if(_.isFunction(rs.global)){
    rs.global(mkCTX({
      scope: rs.scope
    }));
  }
  _.each(rs.rules, function(rule, rule_name){
    rule.rid = rs.rid;
    rule.rule_name = rule_name;

    _.each(rule.select && rule.select.graph, function(g, domain){
      _.each(g, function(exprs, type){
        _.set(salience_graph, [domain, type, rule.rid, rule.rule_name], true);
      });
    });
  });
  rulesets[rs.rid] = rs;
};

var directInstallRuleset = function(rs, callback){
  callback = callback || function(err){
    //TODO better error handling when rulesets fail to load
    if(err) throw err;
  };
  applyInFiber(doInstallRuleset, null, [rs], callback);
};

module.exports = function(conf){
  var rulesets_dir = conf.rulesets_dir;
  var db = Future.wrap(DB(conf.db));

  var mkPersistent = function(pico_id, rid){
    return {
      getEnt: function(key){
        return db.getEntVarFuture(pico_id, key).wait();
      },
      putEnt: function(key, value){
        db.putEntVarFuture(pico_id, key, value).wait();
      },
      getApp: function(key, value){
        return db.getAppVarFuture(rid, key).wait();
      },
      putApp: function(key, value){
        db.putAppVarFuture(rid, key, value).wait();
      }
    };
  };

  var installRuleset = function(rid, callback){
    db.getEnableRuleset(rid, function(err, data){
      if(err) return callback(err);
      if(rulesets_dir){
        installRulesetFile(rulesets_dir, data.hash, data.src, function(err, rs){
          if(err) return callback(err);
          directInstallRuleset(rs, callback);
        });
      }else{
        var rs;
        try{
          var js_src = compiler(data.src).code;
          rs = eval(js_src);
        }catch(err){
          rs = undefined;
          throw err;//TODO handle this somehow?
        }
        directInstallRuleset(rs, callback);
      }
    });
  };

  //TODO standard startup-phase
  db.getAllEnableRulesets(function(err, rids){
    if(err){
      throw err;//TODO handle this somehow?
    }
    _.each(rids, function(rid){
      installRuleset(rid, function(err){
        if(err){
          throw err;//TODO handle this somehow?
        }
      });
    });
  });

  return {
    directInstallRuleset: directInstallRuleset,
    db: db,
    isInstalled: function(rid){
      return _.has(rulesets, rid);
    },
    installRuleset: installRuleset,
    signalEvent: function(event, callback){
      event.timestamp = new Date();
      event.getAttrMatches = function(pairs){
        var matches = [];
        var i, attr, m, pair;
        for(i = 0; i < pairs.length; i++){
          pair = pairs[i];
          attr = event.attrs[pair[0]];
          m = pair[1].exec(attr || "");
          if(!m){
            return undefined;
          }
          matches.push(m[1]);
        }
        return matches;
      };
      db.getPicoByECI(event.eci, function(err, pico){
        if(err) return callback(err);

        var ctx_orig = mkCTX({
          pico: pico,
          db: db,
          event: event
        });

        selectRulesToEval(ctx_orig, salience_graph, rulesets, function(err, to_eval){
          if(err) return callback(err);

          λ.map(to_eval, function(rule, callback){

            var ctx = _.assign({}, ctx_orig, {
              rid: rule.rid,
              rule: rule,
              persistent: mkPersistent(pico.id, rule.rid),
              scope: rule.scope
            });

            evalRule(rule, ctx, callback);
          }, function(err, responses){
            if(err) return callback(err);

            var res_by_type = _.groupBy(_.flattenDeep(responses), "type");

            //TODO other types
            callback(undefined, {
              directives:  _.map(res_by_type.directive, function(d){
                return _.omit(d, "type");
              })
            });
          });
        });
      });
    },
    runQuery: function(query, callback){
      db.getPicoByECI(query.eci, function(err, pico){
        if(err) return callback(err);
        if(!pico){
          return callback(new Error("Bad eci"));
        }
        if(!_.has(pico.ruleset, query.rid)){
          return callback(new Error("Pico does not have that rid"));
        }
        if(!_.has(rulesets, query.rid)){
          return callback(new Error("Not found: rid"));
        }
        var rs = rulesets[query.rid];
        var shares = _.get(rs, ["meta", "shares"]);
        if(!_.isArray(shares) || !_.includes(shares, query.name)){
          return callback(new Error("Not shared"));
        }
        if(!rs.scope.has(query.name)){
          //TODO throw -or- nil????
          return callback(new Error("Shared, but not defined: " + query.name));
        }

        ////////////////////////////////////////////////////////////////////////
        var ctx = mkCTX({
          db: db,
          rid: rs.rid,
          pico: pico,
          persistent: mkPersistent(pico.id, rs.rid),
          scope: rs.scope
        });
        var val = ctx.scope.get(query.name);
        if(_.isFunction(val)){
          applyInFiber(val, null, [ctx, query.args], function(err, resp){
            if(err) return callback(err);
            callback(undefined, resp);
          });
        }else{
          callback(undefined, val);
        }
      });
    }
  };
};
