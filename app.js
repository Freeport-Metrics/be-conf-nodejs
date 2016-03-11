var app = require('express')();
var server = require('http').createServer(app);

/** CONFIGURATION **/
// Adding env configurtion
require('./config/env_config')(server)
// Adding routes to Bootstraper
require('./routes/routes')(app)
// Adding Static resources for minifaction
var static_resources = require('./config/static_resources')(__dirname);

app.locals.static_resources =  static_resources;

// Adding app dependencies
require('./config/dependencies')(app, __dirname, static_resources);
// Adding Config to Bootstraper
require('./config/config')(app, __dirname)
// Adding Error Handlers to Bootstraper
require('./config/error_handlers')(app);
// Adding socket.io to bootstrapper
var io = require('./config/socket.io')(server);



// Adding beacons configuration to bootstraper
var beacon_config = require('./config/beacon_config')();

/** SERVICES **/

var room_service = require('./services/room_service')(io, beacon_config);

module.exports = app;
