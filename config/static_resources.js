var fs = require('fs');

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

  var resources = {
    js: [

    ],
    css: [

    ]
  };

  return{
    js: filterExisting(resources.js),
    css: filterExisting(resources.css)
  }

};