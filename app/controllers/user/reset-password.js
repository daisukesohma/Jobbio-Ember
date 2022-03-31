import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import config from '../../config/environment';
import { later } from '@ember/runloop';

export default Controller.extend({
  queryParams: ['token'],
  token: null,
  setting: false,
  passwordReset: false,
  visible: 'password',
  errors: null,
  cloudfront: config.APP.CLOUD_FRONT_HOST,
  backgroundImage: computed(function(){
    // Produces
    // Binding style attributes may introduce cross-site scripting vulnerabilities warning
    // but is escaped
    return new htmlSafe(this.get('cloudfront')+"images/site/login_background.jpg");
  }),
  actions: {
    resetPassword() {
      var email = this.get('email');
      var new_password = this.get("new_password");
      var token = this.get("token");

      var data = {email: email, new_password: new_password, token: token}
      var record = this.get('store').createRecord('reset-password-request', data);
      record.validate().then(({validations}) => {
        var errors = {};
        validations.get('errors').forEach(error => {
          errors[error.attribute] = error.message;
        });
        this.set('errors', errors);
        if (validations.get('isValid')) {
          this.set('setting', true);
          this.set('errors', {});
          record.save().then(() => {
            this.set('passwordReset', true);
            this.set('email', '');
            this.set('new_password', '');
            this.set('token', '');
            var self = this;
            later(function() {
              self.set('setting', false);
            }, 500);
            window.$('#resetAlert').modal('show');
          }).catch((xhr) => {
            this.set('setting', false);
            this.set('error', xhr.message);
            window.$('#declineAlert').modal('show');
          });
        }
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
