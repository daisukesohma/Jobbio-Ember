import Route from './base-route';

export default Route.extend({
  model: function(params) {
    this.transitionTo('talent.register', { queryParams: { job: params.id, source: params.source }});
  }
});
