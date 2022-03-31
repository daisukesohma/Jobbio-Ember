import Route from '../base-route';
import { scheduleOnce } from '@ember/runloop';
import config from '../../config/environment';

export default Route.extend({
  model() {
    return config.APP.CLOUD_FRONT_HOST + "images2/site/content-pages";
  },
  actions: {
    didTransition() {
      scheduleOnce('afterRender', this, function() {
        // Validate email field
        window.$('#email').on('keypress keyup blur', function() {
          if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(window.$('#email').val())) {
            window.$('#email-validation-error').show();
          } else {
            window.$('#email-validation-error').hide();
          }
        });
        // Validate phone field
        window.$('#phone').on('keypress keyup blur', function(event) {
          if (event.which < 48 || event.which > 57) {
            event.preventDefault();
          }
          if (!/^\d*$/.test(window.$('#phone').val())) {
            window.$('#phone-validation-error').show();
          } else {
            window.$('#phone-validation-error').hide();
          }
        });
        window.$('form#w0').submit(function(event){
          if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(window.$('#email').val()) || !/^\d*$/.test(window.$('#phone').val())) {
            event.preventDefault();
          }
        });
      });
    }
  }
});
