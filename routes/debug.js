/**
 * Created by Matuszewski on 11/03/16.
 */
function debug(req, res) {
  res.render('debug');
}

module.exports = function (app) {
  app.get('/debug', debug);
};