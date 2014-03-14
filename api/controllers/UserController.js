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
      .reject(function(poll) { return poll.items.length == 0 })
      .sortBy('createdAt')
      .reverse()
      .take(5)
      .value();
      res.view('home/dashboard', { polls: polls });
    });
  },

  new: function(req, res) {
    res.view();
  }
	
};
