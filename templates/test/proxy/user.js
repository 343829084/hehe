var User = require('../../proxy').User;
var should = require('should');

describe("proxy/user.js", function () {
  describe('getUsers', function () {
    it('should ok', function (done) {
      User.getUsers(function (err, users) {
        should.not.exist(err);
        users.length.should.be.above(0);
        done();
      });
    });
  });
});
