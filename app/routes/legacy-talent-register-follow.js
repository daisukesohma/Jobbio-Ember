import Route from './base-route';

export default Route.extend({
  queryParams:{source: {refreshModel:true}},
  source: '',
  model: function(params) {
    this.transitionTo('talent.register', { queryParams: { channel: params.slug, source: params.source }});
  }
});
