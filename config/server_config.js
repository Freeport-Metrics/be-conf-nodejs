/**
 * Created by Matuszewski on 10/03/16.
 */
const http         = require('http'),
    fs           = require('fs'),
    path         = require('path'),
    contentTypes = require('../utils/content-types'),
    sysInfo      = require('../utils/sys-info'),
    env          = process.env;

module.exports = function () {
  var server = server = http.createServer(function (req, res) {
    var url = req.url;
    if (url == '/') {
      url += 'index.html';
    }

    // IMPORTANT: Your application HAS to respond to GET /health with status 200
    //            for OpenShift health monitoring

    if (url == '/health') {
      res.writeHead(200);
      res.end();
    } else if (url.indexOf('/info/') == 0) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-cache, no-store');
      res.end(JSON.stringify(sysInfo[url.slice(6)]()));
    } else {
      fs.readFile('./static' + url, function (err, data) {
        if (err) {
          res.writeHead(404);
          res.end();
        } else {
          var ext = path.extname(url).slice(1);
          res.setHeader('Content-Type', contentTypes[ext]);
          if (ext === 'html') {
            res.setHeader('Cache-Control', 'no-cache, no-store');
          }
          res.end(data);
        }
      });
    }
  });



  return server
}

