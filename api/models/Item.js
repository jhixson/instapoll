/**
 * Item
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
    poll_id: {
      type: 'integer',
      required: true
    },
    name: {
      type: 'string',
      required: true
    }
  }

};
