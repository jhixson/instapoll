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

    encrypted_password: {
      type: 'string'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      //delete obj.encrypted_password;
      delete obj._csrf;
      return obj;
    }

	},

  beforeCreate: function(values, next) {
    bcrypt.hash(values.password, 10, function(err, encrypted_password) {
      values.encrypted_password = encrypted_password;
      next();
    });
  }

};
