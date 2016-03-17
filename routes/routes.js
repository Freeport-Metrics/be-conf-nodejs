/**
 * Created by Matuszewski on 09/03/16.
 */

'use strict';
var fs = require('fs');
var path = require('path');

module.exports = function (app, room_rest_service){
  fs.readdirSync('./routes').forEach(function(file){
    if ( file == path.basename(__filename)){
      return;
    }
    require('./' + file)(app,room_rest_service)
  })
}