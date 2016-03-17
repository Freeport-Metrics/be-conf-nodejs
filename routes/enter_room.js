/**
 * Created by Matuszewski on 17/03/16.
 */
var rrs = {};

function enter_room(req, res) {
  var data = req.body;
  rrs.handleEnterRoom(data);
  res.writeHead(200);
  res.end();
}
module.exports = function (app, room_rest_service) {
  rrs = room_rest_service;
  app.post('/enter_room', enter_room);
};
