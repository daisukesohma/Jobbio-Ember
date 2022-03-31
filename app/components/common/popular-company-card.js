import BaseComponent from '../base-component';
import { computed } from '@ember/object';
import config from '../../config/environment';

export default BaseComponent.extend({
  link: config.APP.WEB_HOST,
  linkColor: computed('company', function() {
    return this.get('company.colour') ? this.get('company.colour') : '#444444'
  }),
  init() {
    this._super(...arguments);
  }
});