/**
 * Created by Matuszewski on 10/03/16.
 */
var rooms = require('../storage/room_status')();

function room_status(req, res) {
  res.send(JSON.stringify(rooms,null,2));
}

module.exports = function (app) {
  app.get('/room_status', room_status);
};
