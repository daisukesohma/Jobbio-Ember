import Route from './base-route';
import config from '../config/environment';

export default Route.extend({
  model(params) {
    return {image: config.APP.CLOUD_FRONT_HOST+"images2/site/content-pages", source: params.source};
  }
});
