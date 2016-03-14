/**
 * Created by Matuszewski on 09/03/16.
 */

var room_status = require('../storage/room_status')();
var room_mapping = require('../dictionaries/room_mapping')();

module.exports = function(io, beacon_config){

  io.on('connection', function (socket) {
    console.log('Socket connected');
    //console.log(socket);

    io.sockets.emit('user_connected', socket.id);
    io.sockets.emit('config', beacon_config);
    io.sockets.emit('room_status', room_status);
    socket.on('disconnect', handleDisconnect);
    socket.on('enterRoom', handleEnterRoom);
    socket.on('leaveRoom', handleLeaveRoom);
  });

  function handleDisconnect(data){
    console.log('Client disconnected')
    console.log(data);
    removeUserFromRoom(this.client.id);
    io.sockets.emit('room_status', room_status);
  }

  function handleEnterRoom(data){
    console.log('Client entered room')
    console.log(data);
    var data = JSON.parse(data);
    var current_room_index = getRoomIndex(data.room_id)
    if(!isUserInRoom(current_room_index, data.user_id)){
      var client_id = this.client.id
      room_status.rooms[current_room_index].users.push({id: client_id, name: data.user_id});
    }
    io.sockets.emit('room_status', room_status);
  }

  function handleLeaveRoom(data){
    console.log('Client left room')
    console.log(data);
    var data = JSON.parse(data);
    var current_room_index = getRoomIndex(data.room_id)
    var user_index = findUserInRoom(current_room_index, data.user_id);
    if( user_index >= 0){
      room_status.rooms[current_room_index].users.splice(user_index, 1);
    }
    io.sockets.emit('room_status', room_status);
  }

  function getRoomIndex(room_id){
    return room_mapping[room_id]
  }

  function isUserInRoom(current_room_index, user_id){
    var result = false;
    if(room_status.rooms[current_room_index].users.length == 0){
      return result;
    }
    room_status.rooms[current_room_index].users.forEach(function(element){
        if(element.name == user_id){
          result = true;
          return;
        }
    })
    return result;
  }

  function findUserInRoom(current_room_index, user_id){
    var i = -1;
    room_status.rooms[current_room_index].users.forEach(function(element, index){
      if(element.name == user_id){
        i = index;
      }
    })
   return i;
  }

  function removeUserFromRoom(client_id){
    var u_index = -1;
    var r_index = -1;
    room_status.rooms.forEach(function(room, room_index){
      room.users.forEach(function(user,user_index){
        if(user.id == client_id){
          u_index = user_index;
          r_index = room_index;
        }
      })
    })
    if(u_index > -1 && r_index > -1){
      room_status.rooms[r_index].users.splice(u_index, 1);
    }
  }

  return {
      rooms: function(){
        return room_status;
      }
  }

}