/**
 * UserController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  dashboard: function(req, res) {
    Poll.find().populate('items').exec(function(err, polls) {
      //polls = _.reject(polls, function(poll) { return poll.items.length == 0 });
      polls = _.chain(polls)
      .reject(function(poll) { return poll.items.length == 0 || poll.private })
      .sortBy('createdAt')
      .reverse()
      .take(5)
      .value();
      res.view('home/dashboard', { polls: polls, user: req.user });
    });
  },

  new: function(req, res) {
    res.view({ title: 'Sign up' });
  },

  polls: function(req, res) {
    User.findOne(req.user.id).populate('polls').done(function(err, user) {
      res.view({ user: user, title: 'My polls' });
    });
  }
	
};
