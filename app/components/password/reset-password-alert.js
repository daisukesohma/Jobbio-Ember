import BaseComponent from '../base-component';
import config from '../../config/environment';

export default BaseComponent.extend({
  actions: {
    logIn: function() {
      window.$('#resetAlert').modal('hide');
      window.location.href = config.APP.WEB_HOST+'/user/login';
    }
  }
});
