/**
 * Created by Matuszewski on 09/03/16.
 */

var room_status = {
  rooms: [
    {
      room_id: '5919_60231',
      label: 'Flight Control Room',
      users: [
          'Marcin', 'Jan', 'Tomasz'
      ]
    },
    {
      room_id: '45287_53858',
      label: 'Sala Konferencyjna',
      users: [

      ]
    },
    {
      room_id: '10344_31183',
      label: 'Carnegie Hall',
      users: [

      ]
    }
  ]
}

var room_mapping = {
  '5919_60231': 0,
  '45287_53858': 1,
  '10344_31183': 2
}

module.exports = function(io, beacon_config){
  io.on('connection', function (socket) {
    console.log('Socket connected');
    console.log(socket);

    socket.emit('config', beacon_config);
    socket.emit('room_status', room_status);

    socket.on('disconnect', handleDisconnect);
    socket.on('enterRoom', handleEnterRoom);
    socket.on('leaveRoom', handleLeaveRoom);
  });

  function handleDisconnect(socket){
    console.log('Client disconnected')
    console.log(socket);
  }

  function handleEnterRoom(socket){
    console.log('Client entered room')
    console.log(socket);
  }

  function handleLeaveRoom(socket){
    console.log('Client left room')
    console.log(socket);
  }

  return {
      rooms: function(){
        return room_status;
      }
  }

}