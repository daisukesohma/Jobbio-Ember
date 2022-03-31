import Route from './base-route';

export default Route.extend({
  model: function(params) {
    return this.get('store').findRecord('job', params.id).then(function(job) {
      var source, app_source;
      if(params.source){
        source = params.source;
      }else{
        source = 'job';
      }
      if(params.app_source){
        app_source = params.app_source;
      }else{
        app_source = 'job';
      }
      return {job: job, tracking: {ccuid: params.ccuid, source: source, app_source: app_source}};
    });
  }
});
