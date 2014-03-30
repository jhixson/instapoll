/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');

module.exports = {

	attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },

    email: {
      type: 'string',
      email: true
    },

    encrypted_password: {
      type: 'string'
    },

    uid: 'integer',

    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },

    polls: {
      collection: 'poll',
      via: 'user'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.encrypted_password;
      delete obj._csrf;
      delete obj.isAdmin;
      return obj;
    },

    validatePassword: function(candidatePassword, next) {
      bcrypt.compare(candidatePassword, this.encrypted_password, function (err, valid) {
        if(err) return next(err);
        next(null, valid);
      });
    }

	},

  beforeCreate: function(values, next) {
    bcrypt.hash(values.password, 10, function(err, encrypted_password) {
      values.encrypted_password = encrypted_password;
      next();
    });
  },

  findOrCreate: function(profile, next) {
    User.findOne().where({uid: parseInt(profile.id)}).done(function(err, user) {
      if(err) return next(err);

      if(user) {
        return next(null, user);
      }
      else {
        var user_obj = {
          uid: parseInt(profile.id),
          username: profile.username || profile.displayName
        };
        if(profile.emails && profile.emails[0] && profile.emails[0].value) 
          user_obj.email = profile.emails[0].value;

        User.create(user_obj).done(function (err, user) {
          return next(err, user);
        });
      }
    });
  }

};
