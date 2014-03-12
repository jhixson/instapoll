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

    Vote.create(vote_obj).done(function(err, vote) {
      if (err) return res.send(err, 500);
      Vote.publishCreate({ id: vote.id, item: vote.item });
      Item.findOne(vote.item).done(function(err, item) {
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
