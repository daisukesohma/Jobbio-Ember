import BaseRegisterController from '../base-register-controller';
import config from '../../config/environment';
import { later } from '@ember/runloop';

export default BaseRegisterController.extend({
  queryParams: ['source', 'channel', 'package'],
  source: null,
  channel: null,
  package: null,
  registering: false,
  visible: 'password',
  type: "company",
  errors: null,
  init() {
    this._super(...arguments);
    this.set('errors', {});
  },
  actions: {
    register: function(){
      this.set('registering', true);
      this._super();

      var company_name = this.get('name');
      var source = this.get('source');
      var channel = this.get('channel');
      var set_package = this.get('package');

      this.set('data.company_name', company_name);
      if(this.get('source')){
        this.set('data.source', source);
      }
      this.set('data.channel', channel);
      this.set('data.package', set_package);
      this.set('data.role', 'recruiter_admin');

      window.$.ajax({
          url: config.APP.API_HOST+'/companies',
          type: 'POST',
          data: JSON.stringify(this.get('data')),
          contentType: 'application/json;charset=utf-8',
          dataType: 'json'
      }).then(()=> {
          this.set('signupComplete', true);
          this.set("name", "");
          this.clearProperties();
          var self = this;
          later(function() {
            self.set('registering', false);
          }, 500);
          this.send('login');
      }, (xhr) => {
          this.set('registering', false);
          var errors = JSON.parse(xhr.responseText);
          if(!errors.address && (errors.country || errors.country_short || errors.longitude || errors.latitude)) {
              errors.address = 'Please enter a valid location.';
          }
          this.set('errors', errors);
      });
    },
    passwordVisibility: function(visibility) {
      if(visibility == 'password'){
        this.set('visible', "text");
      }else if(visibility == 'text'){
        this.set('visible', "password");
      }
    },
    focus(state) {
      this.set('focused', state);
    }
  }
});
