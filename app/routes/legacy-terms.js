import Route from './base-route';

export default Route.extend({
  model: function() {
    this.transitionTo('terms');
  }
});
