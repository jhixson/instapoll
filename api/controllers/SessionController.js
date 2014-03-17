/**
 * SessionController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

 var passport = require('passport');

module.exports = {

  new: function(req, res) {
    res.view('user/login');
  },

  create: function(req, res, next) {
    passport.authenticate('local', { failureRedirect: '/login' }, function (err, user) {
      if (err) return res.send(err, 500);

      // Authentication failed
      if (!user) return res.redirect('/login');

      // Log the user in
      req.logIn(user, function (err) {
        if (err) return res.send(err, 500);
        res.redirect('/');
      });

    })(req, res, next);
  },

  facebook: function (req, res, next) {
    passport.authenticate('facebook', { failureRedirect: '/login', scope: ['email'] }, function (err, user) {
      req.logIn(user, function (err) {
        if (err) return res.send(err, 500);
        res.redirect('/');
      });
    })(req, res, next);
  },

  /**
   * Destroy a session (log out user)
   */

  destroy: function(req, res, next) {
    if (!req.user) return res.send();

    req.user.save(function (err) {
      if (err) return res.send(err, 500);

      // Log out the user
      req.logout();

      res.redirect('/');
    });
  },


};
