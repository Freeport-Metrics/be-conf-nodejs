/**
 * Created by Matuszewski on 10/03/16.
 */
function health(req, res) {
  res.writeHead(200);
  res.end();
}

module.exports = function (app) {
  app.get('/health', health);
};


