import BaseRoute from '../base-route';

export default BaseRoute.extend({
  model: function(params){
    return this.store.findRecord('channel', params.slug);
  }
});
