/**
 * Created by Matuszewski on 17/03/16.
 */

var CronJob = require('cron').CronJob;

module.exports = function(task){
  new CronJob('00 09 11 * * 1-5', task, true,  'America/New_York');
}