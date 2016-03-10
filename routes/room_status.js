/**
 * Created by Matuszewski on 10/03/16.
 */
function room_status(req, res) {
  res.send('');
}

module.exports = function (app) {
  app.get('/room_status', room_status);
};
