/**
 * Created by Matuszewski on 17/03/16.
 */

var CronJob = require('cron').CronJob;

module.exports = function(task){
  new CronJob('00 00 15 * * 1-5', task, true,  'Europe/Warsaw');
}