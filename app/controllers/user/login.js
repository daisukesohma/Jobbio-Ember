import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { inject } from '@ember/service';
import config from '../../config/environment';

export default Controller.extend({
  session: inject('session'),
  logging: false,
  cloudfront: config.APP.CLOUD_FRONT_HOST,
  visible: 'password',
  backgroundImage: computed(function(){
    // Produces
    // Binding style attributes may introduce cross-site scripting vulnerabilities warning
    // but is escaped
    return new htmlSafe(this.get('cloudfront')+"images/site/login_background.jpg");
  }),
  actions: {
    authenticate() {
        this.set('logging', true);
        this.set('response', null);
        var credentials = this.getProperties('identification', 'password'),
        authenticator = 'authenticator:token';
        this.get('session').authenticate(authenticator, credentials)
        .catch((reason) => {
          this.set('logging', false);
          this.set('response', reason);
        })
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
  },
});
