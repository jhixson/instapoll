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
    res.view({ title: 'Create a poll' });
  },

  create: function(req, res) {
    var poll_obj = {
      title: req.param('title'),
      description: req.param('description')
    };
    if(req.user)
      poll_obj.user = req.user.id
    Poll.create(poll_obj).done(function(err, poll) {
      if (err) return res.send(err, 500);
      //Poll.publishCreate({ id: poll.id, title: poll.title });
      res.view('item/add', { poll_id: poll.id, title: 'Add items' });
    });
  },

  list: function(req, res) {
    Poll.find().exec(function(err, polls) {
      res.view({ polls: polls, title: 'Polls' });
    });
  },

  cast: function(req, res) {
    var poll_id = req.param('id');
    if(req.cookies.instapoll_p && _.contains(req.cookies.instapoll_p.split(','), poll_id))
      return res.redirect('/poll/results/'+poll_id);

    Poll.findOne(req.param('id')).populate('items').done(function(err, poll) {
      //console.log(poll);
      res.view({ poll: poll, title: 'Vote for "'+poll.title+'"' });
    });
  },

  results: function(req, res) {
    //console.log(req.cookies.instapoll_p);
    Poll.findOne(req.param('id')).done(function(err, poll) {
      Item.find().where({poll: poll.id}).populate('votes').done(function(err, items) {
        items = _.sortBy(items, function(item) { return item.votes.length }).reverse();
        var total_votes = _.reduce(items, function(sum, item){ return sum + item.votes.length });
        res.view({ poll: poll, items: items, total_votes: total_votes, title: 'Results for "'+poll.title+'"' });
      });
    });
  },
  
  subscribe: function(req, res) {
    Poll.watch(req.socket);
    res.send(200);
  }
};
