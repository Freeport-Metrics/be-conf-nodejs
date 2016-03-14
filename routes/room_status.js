/**
 * Created by Matuszewski on 10/03/16.
 */
var room_status = require('../services/room_service')

function room_status(req, res) {
  res.send(JSON.stringify(room_status,null,2));
}

module.exports = function (app) {
  app.get('/room_status', room_status);
};
