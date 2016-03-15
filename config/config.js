/**
 * Created by Matuszewski on 09/03/16.
 */

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').config();

module.exports = function( app, dir){
  // view engine setup
  app.set('views', path.join(dir, 'views'));
  app.set('view engine', 'jade');

  // uncomment after placing your favicon in /public
  app.use(favicon(path.join(dir, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

}