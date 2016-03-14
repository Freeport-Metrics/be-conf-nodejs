/**
 * Created by Matuszewski on 10/03/16.
 */
var rooms = require('../storage/room_status')();

function room_status(req, res) {
  if(req.query.token){
    res.send(formatResponseForSlack());
  }else{
    res.redirect('/')
  }
}

function formatResponseForSlack(){
  var slack_response = ""
  rooms.rooms.forEach(function(room,index){
    var occupied = room.users.length > 0;
    var occupied_icon = occupied ? ":red_circle:" :":white_circle:";
    var occupied_status = occupied ? "*OCCUPIED*" : "*FREE*";
    slack_response += occupied_icon + " " +  "*"+room.label+"*" + " is currently " + occupied_status
    if(occupied){
      slack_response += " by "
      room.users.forEach(function(user, index){
        slack_response += " " + "*"+user.name+"*"
      });
    }
    slack_response += " \n"
  })
  return slack_response;
}

module.exports = function (app) {
  app.get('/room_status', room_status);
};
