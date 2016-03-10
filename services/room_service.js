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
  var socket_io = {};
  io.on('connection', function (socket) {
    socket_io = socket;
    console.log('Socket connected');
    console.log(socket);
    socket.emit('config', beacon_config);
    socket.emit('room_status', room_status);
    socket.on('disconnect', handleDisconnect);
    socket.on('enterRoom', handleEnterRoom);
    socket.on('leaveRoom', handleLeaveRoom);
  });

  function handleDisconnect(data){
    console.log('Client disconnected')
    console.log(data);
    socket_io.emit('room_status', room_status);
  }

  function handleEnterRoom(data){
    console.log('Client entered room')
    console.log(data);
    var data = JSON.parse(data);
    var current_room_index = room_mapping[data.room_id]
    console.log(room_mapping)
    console.log(room_status)
    console.log(current_room_index)
    if(room_status.rooms[current_room_index].users.indexOf(data.user_id) < 0){
      room_status.rooms[current_room_index].users.push(data.user_id);
    }
    socket_io.emit('room_status', room_status);
  }

  function handleLeaveRoom(data){
    console.log('Client left room')
    console.log(data);
    var data = JSON.parse(data);
    var current_room_index = room_mapping[data.room_id]
    var user_index = room_status.rooms[current_room_index].users.indexOf(data.user_id);
    if( user_index >= 0){
      room_status.rooms[current_room_index].users.splice(user_index, 1);
    }
    socket_io.emit('room_status', room_status);
  }

  return {
      rooms: function(){
        return room_status;
      }
  }

}