/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to set a default page title
 * @docs        :: 
 *
 */
module.exports = function(req, res, next) {
  res.locals.page_title = 'instapoll';
  next();
};
