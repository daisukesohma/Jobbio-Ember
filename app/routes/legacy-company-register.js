import Route from './base-route';

export default Route.extend({
  model: function(params) {
    this.transitionTo('company.register', { queryParams: { package: params.package, source: params.source }});
  }
});
