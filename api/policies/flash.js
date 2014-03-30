/**
 * flash
 *
 * @module      :: Policy
 * @description :: Policy for passing flash messages from the session into the view's locals object
 *                 Taken from github.com/irlnathan/activityoverlord
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = function(req, res, next) {

  res.locals.flash = {};

  if(!req.session.flash) return next();

  res.locals.flash = _.clone(req.session.flash);

  // clear flash
  req.session.flash = {};

  next();
};
