import Route from './base-route';
import config from '../config/environment';

export default Route.extend({
  model() {
    return config.APP.CLOUD_FRONT_HOST+"images2/site/content-pages";
  }
});
