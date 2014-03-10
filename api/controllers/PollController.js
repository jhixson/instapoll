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
      res.view('item/add', { poll_id: poll.id });
    });
  },

  list: function(req, res) {
    Poll.find().exec(function(err, polls) {
      res.view({ polls: polls });
    });
  },

  cast: function(req, res) {
    Poll.findOne(req.param('id')).populate('items').done(function(err, poll) {
      //console.log(poll);
      res.view({ poll: poll });
    });
  },

  results: function(req, res) {
    Poll.findOne(req.param('id')).populate('items').done(function(err, poll) {
      //console.log(poll);
      _.each(poll.items, function(item) {
        item.votes = [];
        Vote.find().where({item: item.id}).exec(function(err, votes) {
          item.votes = votes;
        });
      })
      poll.items = _.sortBy(poll.items, function(item) { return item.votes.length }).reverse();
      var total_votes = _.reduce(poll.items, function(sum, item){ return sum + item.votes.length });
      res.view({ poll: poll, total_votes: total_votes });
    });
  },
  
};