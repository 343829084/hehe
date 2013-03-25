var User = require('../proxy').User;

exports.index = function (req, res, next) {
  User.getUsers(function (err, users) {
    if (err) {
      return next(err);
    }

    res.render('index', {
      viewname: "index",
      user: users[0].User
    });
  });
};
