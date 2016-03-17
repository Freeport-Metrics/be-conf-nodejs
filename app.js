var app = require('express')();
var http = require('http');
var server = http.createServer(app);
var request = require('request');

/** CONFIGURATION **/
// Adding env configuration
require('./config/env_config')(server)

// Adding Static resources for minifaction
var static_resources = require('./config/static_resources')(__dirname);

app.locals.static_resources =  static_resources;

// Adding app dependencies
require('./config/dependencies')(app, __dirname, static_resources);
// Adding Config to Bootstraper
require('./config/config')(app, __dirname)

// Adding socket.io to bootstrapper
var io = require('./config/socket.io')(server);

/** SERVICES **/
var slack_service = require('./services/slack_service')(request);
var room_service = require('./services/room_service')(io);
var room_rest_service = require('./services/room_rest_service')(io, slack_service)

// Adding routes to Bootstraper
require('./routes/routes')(app,room_rest_service)
// Adding Error Handlers to Bootstraper
require('./config/error_handlers')(app);

//** CRON JOBS **/

require('./jobs/room_cleanup_job')(room_service.removeUsersFromRoom);

module.exports = app;
