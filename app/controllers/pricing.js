import Controller from '@ember/controller';
import config from '../config/environment';

export default Controller.extend({
  imageLocation: config.APP.CLOUD_FRONT_HOST,
});
