/**
 * Vote
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  autosubscribe: ['destroy', 'update'],
  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
    user_id: 'integer',
    ip: 'string',
    item: {
      model: 'item'
    }
  }

};
