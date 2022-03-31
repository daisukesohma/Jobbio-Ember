import BaseRoute from '../base-route';
import config from '../../config/environment';
import { inject } from '@ember/service';

export default BaseRoute.extend({
  currentUser: inject(),
  renderTemplate: function() {
      this.render('job/apply', { into: 'application' });
  },
  model: function(params) {
    if(!this.get('currentUser.current')) {
      window.location.assign(config.APP.HTTP_PROTOCOL + config.APP.DOMAIN);
    }
    params = this.paramsFor('job');
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
  },
});
