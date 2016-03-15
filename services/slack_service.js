/**
 * Created by Matuszewski on 14/03/16.
 */

var request_template = require("../dictionaries/slack_request_body_template")();
var options = require("../dictionaries/slack_request_options_template")();

module.exports = function(request_service){

  function sendRoomLeftStatus(room, user){
    sendRoomStatus(room, user, "left");
  }

  function sendRoomEnteredStatus(room, user){
    sendRoomStatus(room, user, "entered");
  }

  function prepareMessage(room, user, event){
    var text = "User *" + user.name + "* has "+event+" the *" +room.label+ "* \n"
    if(room.users.length > 0){
      text += "Room is *OCCUPIED* by: " + room.users.toString() + "\n";
    }else{
      text += "Room is *FREE*"
    }
    return text;
  }

  function sendRoomStatus(room,user,event){
    var request = getRequestTemplate();
    request.text = prepareMessage(room, user, event)
    sendRequest(request);
  }

  function sendRequest(request){
    var options = getOptionsTemplate();
    options.uri  = process.env.SLACK_REQUEST_HOOK
    options.body = JSON.stringify(request)
    request_service(options, function(error, response,body){
      if (error) {
        return console.error('Error sending request to SLACK:', error);
      }
    })
  }

  function getRequestTemplate(){
    return JSON.parse(JSON.stringify(request_template));
  }

  function getOptionsTemplate(){
    return JSON.parse(JSON.stringify(options));
  }

  return {
    sendLeftStatus : sendRoomLeftStatus,
    sendEnteredStatus : sendRoomEnteredStatus
  }
}