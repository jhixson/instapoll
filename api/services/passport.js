/**
 * passport.js
 *
 * @description :: Service that defines the passport strategies and how they authenticate users
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var passport = require( "passport" )
  , LocalStrategy = require('passport-local').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , TwitterStrategy = require('passport-twitter').Strategy;
            
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

passport.use(new LocalStrategy(
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

passport.use(new FacebookStrategy({
    clientID: '682143215175928',
    clientSecret: 'af03de41ccc5ba563f37d63b3a5227af',
    callbackURL: process.env.NODE_ENV == "production" ? "http://instapoll.herokuapp.com/session/facebook/callback" : "http://localhost:1337/session/facebook/callback"
  },
  function(accessToken, refreshToken, profile, next) {

    User.findOrCreate(profile, function(err, user) {
      if (err) return next(err);

      // We sucessfully authed via Facebook, continue with the user instance
      next(null, user);
    });
  }
));

passport.use(new TwitterStrategy({
    consumerKey: 'uOstxO28GFwg3JJN5scLYA',
    consumerSecret: 'JpdHLvVZTLBx8Bk0WnUXLKMhRN6QP8AsvMVxftgSU',
    callbackURL: process.env.NODE_ENV == "production" ? "http://instapoll.herokuapp.com/session/twitter/callback" : "http://wutang.local:1337/session/twitter/callback"
  },
  function(accessToken, refreshToken, profile, next) {
    User.findOrCreate(profile, function(err, user) {
      if (err) return next(err);

      // We sucessfully authed via Twitter, continue with the user instance
      next(null, user);
    });
  }
));
