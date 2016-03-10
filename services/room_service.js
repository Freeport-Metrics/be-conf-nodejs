/**
 * Created by Matuszewski on 09/03/16.
 */

var room_status = {
  rooms: [
    {
      room_id: 1312312312312,
      label: 'Konferencyjna 1',
      users: [
          'Marcin', 'Jan', 'Tomasz'
      ]
    },
    {
      room_id: 1312312312313,
      label: 'Konferencyjna 2',
      users: [

      ]
    },
    {
      room_id: 1312312312314,
      label: 'Konferencyjna 3',
      users: [

      ]
    }
  ]
}

var room_mapping = {
  1312312312312: 0,
  1312312312313: 1,
  1312312312314: 2
}

module.exports = function(io, beacon_config){
  io.on('connection', function (socket) {
    console.log('Socket connected');
    console.log(socket)

    socket.emit('config', beacon_config);
    socket.emit('room_status', room_status)

    socket.on('disconnect', handleDisconnect)
    socket.on('enterRoom', handleEnterRoom)
    socket.on('leaveRoom', handleLeaveRoom)
  });

  function handleDisconnect(socket){

  }

  function handleEnterRoom(socket){

  }

  function handleLeaveRoom(socket){

  }

  return {
      rooms: function(){
        return room_status;
      }
  }

}