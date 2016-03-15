/**
 * Created by Matuszewski on 09/03/16.
 */


module.exports = function(server){
  return require('socket.io')(server, {'pingTimeout': 10000});
}