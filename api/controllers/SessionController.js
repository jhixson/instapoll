/**
 * SessionController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	
  new: function(req, res) {
    req.session.authenticated = true;
    console.log(req.session);
    res.view('user/login');
  }

};
