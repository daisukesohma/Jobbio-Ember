import BaseComponent from '../base-component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import config from '../../config/environment';

export default BaseComponent.extend({
  link: config.APP.WEB_HOST,
  linkColor: computed('company', function() {
    return this.get('company.colour') ? this.get('company.colour') : '#444444'
  }),
  image: computed('post', function(){
    // Produces
    // Binding style attributes may introduce cross-site scripting vulnerabilities warning
    // but is escaped
    var imageUrl = this.get('post').get('image');
    if(imageUrl === null){
      var max = 12; // inclusive
      var min = 1; // inclusive
      var number = Math.floor(Math.random() * (max - min + 1)) + min;
      imageUrl = `company-placeholders/default-image${number}.jpg`;
      return new htmlSafe(this.get('cloudfront')+"images/site/"+imageUrl);
    }
    return new htmlSafe(imageUrl);
  }),
  init() {
    this._super(...arguments);
  }
});
