import BaseRoute from '../base-route';

export default BaseRoute.extend({
  model: function(params) {
    return this.get('store').queryRecord('job-slug', params).then(function(response) {
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
      return {job: response, tracking: {ccuid: params.ccuid, source: source, app_source: app_source}}
    });
  }
});
