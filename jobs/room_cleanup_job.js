/**
 * Created by Matuszewski on 17/03/16.
 */

var CronJob = require('cron').CronJob;

module.exports = function(task){

  var job = new CronJob({
    cronTime: '00 35 14 * * 1-5',
    onTick: task,
    //onTick: function() {
    //  /*
    //   * Runs every weekday (Monday through Friday)
    //   * at 11:30:00 AM. It does not run on Saturday
    //   * or Sunday.
    //   */
    //},
    start: false,
    timeZone: 'Poland/Warsaw'
  });

  job.start();
}