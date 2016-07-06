module.exports = {
  'name': 'io.picolabs.chevron',
  'meta': { 'description': '\nHello Chevrons!\n    ' },
  'global': function (ctx) {
    ctx.scope.set('a', 1);
    ctx.scope.set('b', 2);
    ctx.scope.set('c', ctx.krl.String('<h1>some<b>html</b></h1>'));
    ctx.scope.set('d', ctx.krl.String('\n      hi ' + ctx.krl.beesting(ctx.scope.get('a')) + ' + ' + ctx.krl.beesting(ctx.scope.get('b')) + ' = ' + ctx.krl.beesting(1 + 2) + '\n      ' + ctx.krl.beesting(ctx.scope.get('c')) + '\n    '));
    ctx.scope.set('e', ctx.krl.String('static'));
    ctx.scope.set('f', ctx.krl.String(''));
  },
  'rules': {}
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzZXQgaW8ucGljb2xhYnMuY2hldnJvbiB7XG4gIG1ldGEge1xuICAgIGRlc2NyaXB0aW9uIDw8XG5IZWxsbyBDaGV2cm9ucyFcbiAgICA+PlxuICB9XG4gIGdsb2JhbCB7XG4gICAgYSA9IDFcbiAgICBiID0gMlxuICAgIGMgPSBcIjxoMT5zb21lPGI+aHRtbDwvYj48L2gxPlwiXG4gICAgZCA9IDw8XG4gICAgICBoaSAje2F9ICsgI3tifSA9ICN7MSArIDJ9XG4gICAgICAje2N9XG4gICAgPj5cbiAgICBlID0gPDxzdGF0aWM+PlxuICAgIGYgPSA8PD4+XG4gIH1cbn0iLCJpby5waWNvbGFicy5jaGV2cm9uIiwiZGVzY3JpcHRpb24iLCJkZXNjcmlwdGlvbiA8PFxuSGVsbG8gQ2hldnJvbnMhXG4gICAgPj4iLCJcbkhlbGxvIENoZXZyb25zIVxuICAgICIsImEgPSAxIiwiYSIsIjEiLCJiID0gMiIsImIiLCIyIiwiYyA9IFwiPGgxPnNvbWU8Yj5odG1sPC9iPjwvaDE+XCIiLCJjIiwiXCI8aDE+c29tZTxiPmh0bWw8L2I+PC9oMT5cIiIsImQgPSA8PFxuICAgICAgaGkgI3thfSArICN7Yn0gPSAjezEgKyAyfVxuICAgICAgI3tjfVxuICAgID4+IiwiZCIsIj0gPDxcbiAgICAgIGhpICN7YX0gKyAje2J9ID0gI3sxICsgMn1cbiAgICAgICN7Y31cbiAgICA+PiIsIlxuICAgICAgaGkgIiwiICsgIiwiID0gIiwiMSArIDIiLCJcbiAgICAgICIsIlxuICAgICIsImUgPSA8PHN0YXRpYz4+IiwiZSIsIj0gPDxzdGF0aWM+PiIsInN0YXRpYyIsImYgPSA8PD4+IiwiZiIsIj0gPDw+PiJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiY3R4Iiwic2NvcGUiLCJzZXQiLCJrcmwiLCJTdHJpbmciLCJiZWVzdGluZyIsImdldCJdLCJtYXBwaW5ncyI6IkFBQUFBLE1BQUEsQ0FBQUMsT0FBQTtBQUFBLEUsUUNBUSxxQkRBUjtBQUFBLEUsUUFBQSxFRUVJLGFDQUEsRUNBYyx5QkpGbEI7QUFBQSxFLFVBQUEsVUFBQUMsR0FBQTtBQUFBLElLT0lBLEdBQUEsQ0FBQUMsS0FBQSxDQUFBQyxHQUFBLENDQUEsR0RBQSxFRUFJLENGQUosRUxQSjtBQUFBLElRUUlGLEdBQUEsQ0FBQUMsS0FBQSxDQUFBQyxHQUFBLENDQUEsR0RBQSxFRUFJLENGQUosRVJSSjtBQUFBLElXU0lGLEdBQUEsQ0FBQUMsS0FBQSxDQUFBQyxHQUFBLENDQUEsR0RBQSxFRUFJRixHQUFBLENBQUFHLEdBQUEsQ0FBQUMsTUFBQSw0QkZBSixFWFRKO0FBQUEsSWNVSUosR0FBQSxDQUFBQyxLQUFBLENBQUFDLEdBQUEsQ0NBQSxHREFBLEVFQUVGLEdBQUEsQ0FBQUcsR0FBQSxDQUFBQyxNQUFBLENDQUksYURBSixHQUFBSixHQUFBLENBQUFHLEdBQUEsQ0FBQUUsUVZDSyxDQUFBTCxHQUFBLENBQUFDLEtBQUEsQ0FBQUssR0FBQSxNVURMLEdFQ08sS0ZEUCxHQUFBTixHQUFBLENBQUFHLEdBQUEsQ0FBQUUsUVBDWSxDQUFBTCxHQUFBLENBQUFDLEtBQUEsQ0FBQUssR0FBQSxNT0RaLEdHQ2MsS0hEZCxHQUFBTixHQUFBLENBQUFHLEdBQUEsQ0FBQUUsUUlDbUIsQ2JBQSxDYUFBLEdWQUksQ1VBSixDSkRuQixHS0N5QixVTER6QixHQUFBTCxHQUFBLENBQUFHLEdBQUEsQ0FBQUUsUUpFRSxDQUFBTCxHQUFBLENBQUFDLEtBQUEsQ0FBQUssR0FBQSxNSUZGLEdNRUksUU5GSixDRkFGLEVkVko7QUFBQSxJdUJjSU4sR0FBQSxDQUFBQyxLQUFBLENBQUFDLEdBQUEsQ0NBQSxHREFBLEVFQUVGLEdBQUEsQ0FBQUcsR0FBQSxDQUFBQyxNQUFBLENDQUksUURBSixDRkFGLEV2QmRKO0FBQUEsSTJCZUlKLEdBQUEsQ0FBQUMsS0FBQSxDQUFBQyxHQUFBLENDQUEsR0RBQSxFRUFFRixHQUFBLENBQUFHLEdBQUEsQ0FBQUMsTUFBQSxDLEVBQUEsQ0ZBRixFM0JmSjtBQUFBO0FBQUEsRSxTQUFBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6W251bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsXX0=
