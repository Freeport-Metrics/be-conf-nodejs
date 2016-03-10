/**
 * Created by Matuszewski on 10/03/16.
 */
var env = process.env
var winston = require('winston')

module.exports = function(){
  winston.add(winston.transports.File, { filename: './logs/'+ (env.NODE_ENV == 'production' ? env.NODE_ENV : 'log') +'.log' });
  winston.remove(winston.transports.Console);

  winston.info('Winston logger initialized!');

  return winston
}