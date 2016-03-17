/**
 * Created by Matuszewski on 09/03/16.
 */

var room_status = require('../storage/room_status')();

module.exports = function(io){
  io.on('connection', function (socket) {
    io.sockets.emit('user_connected', socket.id);
    io.sockets.emit('room_status', room_status);
  });

  return {
      rooms: function(){
        return room_status;
      }
  }

}