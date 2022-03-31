import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import config from '../../config/environment';
import { later } from '@ember/runloop';
import { inject } from '@ember/service';

export default Controller.extend({
  store: inject(),
  setting: false,
  errors: null,
  cloudfront: config.APP.CLOUD_FRONT_HOST,
  backgroundImage: computed(function(){
    // Produces
    // Binding style attributes may introduce cross-site scripting vulnerabilities warning
    // but is escaped
    return new htmlSafe(this.get('cloudfront')+"images/site/login_background.jpg");
  }),
  actions: {
    forgotPassword() {
      var self = this;
      var record = this.get('store').createRecord('forgot-password-request', {email:this.get('email')});
      record.validate().then(({validations}) => {
        var errors = {};
        validations.get('errors').forEach(error => {
          errors[error.attribute] = error.message;
        });
        self.set('errors', errors);
        if (validations.get('isValid')) {
          self.set('setting', true);
          record.save().then(() => {
            self.set('email', '');
            later(function() {
              self.set('setting', false);
            }, 500);
            window.$('#forgotAlert').modal('show');
          }).catch((xhr) => {
            self.set('setting', false);
            self.set('error', xhr.message);
          });
        }
      });
    }
  }
});
