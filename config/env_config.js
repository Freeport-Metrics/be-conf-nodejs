/**
 * Created by Matuszewski on 10/03/16.
 */

module.exports = function(server){
  if(process.env.NODE_ENV == 'staging'){
    server.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
      console.log(`Application worker ${process.pid} started... port ${env.NODE_PORT}`);
    });;
  }
}