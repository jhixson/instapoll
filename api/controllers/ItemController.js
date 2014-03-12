/**
 * ItemController
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
   * (specific to ItemController)
   */
  _config: {},

  create: function(req, res) {
    var items = req.param('name');
    var poll_id = req.param('poll_id');
    var item_arr = [];
    _.map(items, function(item) {
      item_arr.push({poll: poll_id, name: item});
    });
    Item.create(item_arr).done(function(err, items) {
      if (err) return res.send(err, 500);
      console.log("Items created:", items);
    });
    console.log(item_arr);
    res.json(items);
  }
  
};
