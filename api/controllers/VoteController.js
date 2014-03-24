/**
 * VoteController
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

var _ = require('lodash');

module.exports = {

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to VoteController)
   */
  _config: {},

  create: function(req, res) {
    var vote_obj = {
      item: req.param('item_id'),
      ip: getClientAddress(req)
    };

    var polls_voted = _.isUndefined(req.cookies.instapoll_p) ? [] : req.cookies.instapoll_p.split(',');

    Vote.create(vote_obj).done(function(err, vote) {
      if (err) return res.send(err, 500);
      Vote.publishCreate({ id: vote.id, item: vote.item });
      Item.findOne(vote.item).done(function(err, item) {
        var a_month = 1000 * 60 * 60 * 24 * 30;
        polls_voted.push(item.poll);
        res.cookie('instapoll_p', _.uniq(polls_voted).join(','), { maxAge: a_month });
        res.redirect('/poll/results/'+item.poll);
      });
      //return res.json(vote);
    });
  },

  subscribe: function(req, res) {
    Vote.watch(req.socket);
    res.send(200);
  }
  
};

var getClientAddress = function (req) {
    return (req.headers['x-forwarded-for'] || '').split(',')[0] 
        || req.connection.remoteAddress;
};
