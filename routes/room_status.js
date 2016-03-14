/**
 * Created by Matuszewski on 10/03/16.
 */
var rooms = require('../storage/room_status')();

function room_status(req, res) {
  res.send(formatResponse());
}

function formatResponse(){
  var response = "";
  rooms.rooms.forEach(function(room,index){
    response += "========" + "</br>"
    response +=  "<strong>" + room.label + "</strong>" + "</br>"
    response +=  "Users inside: <strong>" + room.users.length + "</strong>" + "</br>"
    if (room.users.length > 0){
      response +=  "Users : "
      room.users.forEach(function(user, index){
        response += " " + "<strong>" + user.name + "</strong>"
      });
      response += "</br>"
      response += "Status: <strong>OCCUPIED</strong> </br>"
    }else{
      response += "Status: <strong>FREE</strong> </br>"
    }
    response += "========" + "</br>"
  })
  return response
}

module.exports = function (app) {
  app.get('/room_status', room_status);
};
