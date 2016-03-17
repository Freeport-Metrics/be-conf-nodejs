/**
 * Created by Matuszewski on 17/03/16.
 */
var rrs = {};

function leave_room(req, res) {
  var data = req.body;
  rrs.handleLeaveRoom(data);
  res.writeHead(200);
  res.end();
}
module.exports = function (app, room_rest_service) {
  rrs = room_rest_service;
  app.post('/leave_room', leave_room);
};
