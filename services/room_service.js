/**
 * Created by Matuszewski on 09/03/16.
 */

var room_status = require('../storage/room_status')();
var room_mapping = require('../dictionaries/room_mapping')();

module.exports = function(io, beacon_config, slack_service){
  io.on('connection', function (socket) {
    io.sockets.emit('user_connected', socket.id);
    io.sockets.emit('config', beacon_config);
    io.sockets.emit('room_status', room_status);
    socket.once('disconnect', handleDisconnect);
    socket.on('enterRoom', handleEnterRoom);
    socket.on('leaveRoom', handleLeaveRoom);
  });

  function handleDisconnect(){
    var client_id = this.client.id;
    removeUserFromRoom(client_id);
    io.sockets.emit('user_disconnected', client_id);
    io.sockets.emit('room_status', room_status);
  }

  function handleEnterRoom(data){
    var data = JSON.parse(data);
    var current_room_index = getRoomIndex(data.room_id)
    if(!isUserInRoom(current_room_index, data.user_id)){
      var client_id = this.client.id
      var user = {id: client_id, name: data.user_id};
      room_status.rooms[current_room_index].users.push(user);
      slack_service.sendEnteredStatus(
          room_status.rooms[current_room_index],
          user
      );
    }
    io.sockets.emit('room_status', room_status);
  }

  function handleLeaveRoom(data){
    var data = JSON.parse(data);
    var current_room_index = getRoomIndex(data.room_id)
    var user_index = findUserInRoom(current_room_index, data.user_id);
    if( user_index >= 0){
      var user = room_status.rooms[current_room_index].users[user_index];
      room_status.rooms[current_room_index].users.splice(user_index, 1);
      slack_service.sendLeftStatus(
          room_status.rooms[current_room_index],
          user
      );
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
    var user_in_room_index = undefined;
    room_status.rooms[current_room_index].users.forEach(function(element, index){
      if(element.name == user_id){
        user_in_room_index = index;
      }
    })
   return user_in_room_index;
  }

  function removeUserFromRoom(client_id){
    room_status.rooms.forEach(function(room, room_index){
      room.users.forEach(function(user,user_index){
        if(user.id == client_id){
          room_status.rooms[room_index].users.splice(user_index, 1);
          slack_service.sendLeftStatus(room_status.rooms[room_index], user);
        }
      })
    })
  }

  return {
      rooms: function(){
        return room_status;
      }
  }

}