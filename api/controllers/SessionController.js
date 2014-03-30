/**
 * SessionController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

 var passport = require('passport');

module.exports = {

  new: function(req, res) {
    res.view('user/login', { title: 'Log in' });
  },

  create: function(req, res, next) {
    passport.authenticate('local', function (err, user) {
      // Log the user in
      req.logIn(user, function (err) {
        if (err) {
          req.session.flash = {
            err: 'Username/password is invalid. Please try again.'
          };
          return res.redirect('/login');
        }
        res.redirect('/');
      });

    })(req, res, next);
  },

  facebook: function (req, res, next) {
    passport.authenticate('facebook', { failureRedirect: '/login', scope: ['email'] }, function (err, user) {
      req.logIn(user, function (err) {
        if (err) {
          // set a flash message here...
          return res.redirect('/login');
        }
        res.redirect('/');
      });
    })(req, res, next);
  },

  twitter: function (req, res, next) {
    passport.authenticate('twitter', { failureRedirect: '/login', scope: ['email'] }, function (err, user) {
      req.logIn(user, function (err) {
        if (err) {
          // set a flash message here...
          return res.redirect('/login');
        }
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
