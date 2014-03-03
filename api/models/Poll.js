/**
 * Poll
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
    title: {
      type: 'string',
      required: true
    },
    description: 'string',
    private: {
      type: 'boolean',
      defaultsTo: false
    } 
  }

};
