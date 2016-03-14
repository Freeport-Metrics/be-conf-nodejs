/**
 * Created by Matuszewski on 14/03/16.
 */

var options = {
  uri: 'https://hooks.slack.com/services/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',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: {}
}

var request_template = {
  "username": "FM_CONFERENCE",
  "text": "",
  "icon_emoji": ":fm_logo:"
}

module.exports = function(request_service){

  function sendRoomLeftStatus(room, user){
    var request = getRequestTemplate();
    request.text = prepareMessage(room, user, "left")
    sendRequest(request);
  }

  function sendRoomEnteredStatus(room, user){
    var request = getRequestTemplate();
    request.text = prepareMessage(room, user, "entered")
    sendRequest(request);
  }

  function prepareMessage(room, user, event){
    var text = "User *" + user.name + "* has "+event+" the *" +room.label+ "* \n"
    if(room.users.length > 0){
      text += "Room is *OCCUPIED* by:"
      room.users.forEach(function(user, index){
        text += " *"+user.name+"*"
      })
      text += "\n"
    }else{
      text += "Room is *FREE*"
    }
    return text;
  }

  function sendRequest(request){
    var options = getOptionsTemplate();
    options.body = JSON.stringify(request)
    request_service(options, function(error, response,body){
      if (error) {
        return console.error('upload failed:', error);
      }
      console.log('Upload successful!  Server responded with:', body);
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