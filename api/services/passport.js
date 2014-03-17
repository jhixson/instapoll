/**
 * passport.js
 *
 * @description :: Service that defines the passport strategies and how they authenticate users
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var passport = require( "passport" )
  , LocalStrategy = require('passport-local').Strategy;
            
/**
 * Passport setup
 */

/** Passport session setup. */

passport.serializeUser( function (user, next) {
  next(null, user.id);
});

passport.deserializeUser( function (userId, next) {
  User.findOne(userId).done(function (err, user) {
    next(err, user);
  });
});

/** Passport authentication strategies */

/**
 * Passport Local Strategy
 */

passport.use( new LocalStrategy(
  function (username, password, next) {
    User.findOne().where({username: username}).exec(function (err, user) {
      if(err) return next(err);
      
      // No user was found
      if(!user)
        return next(null, false, { message: 'Unknown user' });

      // Validate user password
      user.validatePassword(password, function (err, isValid) {
        if(err) return next(err);

        // If the password was not valid
        if(!isValid)
          return next(null, false, { message: 'Invalid password' });
        
        // We are successfully authenticated, return the user instance
        next(null, user);
      });
    });
  }
));
