var fs = require('fs');
var path = require('path');

module.exports = function (dir) {

  // only resources that exist to be able to define alternative paths for dependencies for different node versions
  function filterExisting(resources) {
    var result = [];
    resources.forEach(function (resource) {
      if (fs.existsSync(dir + '/' + resource)) {
        result.push(resource);
      } else {
        console.log('Skipping static resource:', resource);
      }
    })
    return result;
  }

  var resources = {};

  var js = [
    "node_modules/angular/angular.min.js",
    "node_modules/socket.io-client/socket.io.js",
    "public/javascripts/app.js",
    "public/javascripts/app/controllers/controller_wrapper.js",
    "public/javascripts/app/controllers/debug_controller.js",
    "public/javascripts/app/controllers/room_controller.js"
  ]

  var css = [
    "node_modules/font-awesome/css/font-awesome.css",
    "public/stylesheets/style.css",
    "public/stylesheets/bootstrap.css"
  ]

  resources = {
    js: js,
    css: css
  };

  return{
    js: filterExisting(resources.js),
    css: filterExisting(resources.css)
  }

};