/**
 * Created by Matuszewski on 09/03/16.
 */

var room_status = {
  rooms: [
    {
      room_id: '5919_60231',
      label: 'Flight Control Room',
      users: []
    },
    {
      room_id: '45287_53858',
      label: 'Sala Konferencyjna',
      users: []
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
  var active_socket = {};
  io.on('connection', function (socket) {
    active_socket = socket;
    console.log('Socket connected');
    //console.log(socket);
    socket.emit('config', beacon_config);
    socket.emit('room_status', room_status);
    socket.on('disconnect', handleDisconnect);
    socket.on('enterRoom', handleEnterRoom);
    socket.on('leaveRoom', handleLeaveRoom);
  });

  function handleDisconnect(data){
    console.log('Client disconnected')
    console.log(data);
    active_socket.emit('room_status', room_status);
  }

  function handleEnterRoom(data){
    console.log('Client entered room')
    console.log(data);
    var data = JSON.parse(data);
    var current_room_index = getRoomIndex(data.room_id)
    if(!isUserInRoom(current_room_index, data.user_id)){
      room_status.rooms[current_room_index].users.push(data.user_id);
    }
    active_socket.emit('room_status', room_status);
  }

  function handleLeaveRoom(data){
    console.log('Client left room')
    console.log(data);
    var data = JSON.parse(data);
    var current_room_index = getRoomIndex(data.room_id)
    var user_index = room_status.rooms[current_room_index].users.indexOf(data.user_id);
    if( user_index >= 0){
      room_status.rooms[current_room_index].users.splice(user_index, 1);
    }
    active_socket.emit('room_status', room_status);
  }

  function getRoomIndex(room_id){
    return room_mapping[room_id]
  }

  function isUserInRoom(current_room_index, user_id){
    return room_status.rooms[current_room_index].users.indexOf(user_id) >= 0;
  }

  return {
      rooms: function(){
        return room_status;
      }
  }

}