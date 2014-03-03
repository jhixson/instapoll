/**
 * PollController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PollController)
   */
  _config: {},

  new: function(req, res) {
    res.view();
  },

  create: function(req, res) {
    var poll_obj = {
      title: req.param('title'),
      description: req.param('description')
    };
    Poll.create(poll_obj).done(function(err, poll) {
      if (err) return res.send(err, 500);
      Poll.publishCreate({ id: poll.id, title: poll.title });
      res.redirect('/poll');
    });
  },

  subscribe: function(req, res) {
    Poll.find(function(err, polls) {
      if (err) return next(err);
 
      // subscribe this socket to the Poll model classroom
      Poll.subscribe(req.socket);
 
      // subscribe this socket to the poll instance rooms
      Poll.subscribe(req.socket, polls);

      // This will avoid a warning from the socket for trying to render
      // html over the socket.
      res.send(200);
    });
  }
  
};
