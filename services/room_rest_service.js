/**
 * Created by Matuszewski on 17/03/16.
 */

var room_status = require('../storage/room_status')();
var room_mapping = require('../dictionaries/room_mapping')();

module.exports = function(io, slack_service){

  function handleEnterRoom(data){
    var current_room_index = getRoomIndex(data.room_id)
    if(!isUserInRoom(current_room_index, data.id)){
      var user = {id: data.id, name: data.user_id};
      room_status.rooms[current_room_index].users.push(user);
      slack_service.sendEnteredStatus(
          room_status.rooms[current_room_index],
          user
      );
    }
    io.sockets.emit('room_status', room_status);
  }

  function handleLeaveRoom(data){
    var current_room_index = getRoomIndex(data.room_id)
    var user_index = findUserInRoom(current_room_index, data.id);
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
      if(element.id == user_id){
        result = true;
        return;
      }
    })
    return result;
  }

  function findUserInRoom(current_room_index, user_id){
    var user_in_room_index = undefined;
    room_status.rooms[current_room_index].users.forEach(function(element, index){
      if(element.id == user_id){
        user_in_room_index = index;
      }
    })
    return user_in_room_index;
  }

  function removeUsersFromRoom(){
    room_status.rooms.forEach(function(room, room_index){
      room.users.forEach(function(user,user_index){
        room_status.rooms[room_index].users.splice(user_index, 1);
        slack_service.sendLeftStatus(room_status.rooms[room_index], user);
      })
    })
  }

  return {
    handleEnterRoom : handleEnterRoom,
    handleLeaveRoom : handleLeaveRoom,
    removeUsersFromRoom: removeUsersFromRoom
  }

}