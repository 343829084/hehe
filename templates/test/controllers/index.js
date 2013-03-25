var request = require('supertest');

var app = require('../../app');

describe("controllers/index.js", function () {
  before(function (done) {
    app.listen(0, done);
  });

  after(function () {
    app.close();
  });
  describe('index', function () {
    it('should 200', function (done) {
      request(app)
      .get('/')
      .expect(200)
      .expect(/Project name/, done);
    });
  });
});
