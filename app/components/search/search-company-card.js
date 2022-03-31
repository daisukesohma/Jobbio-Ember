import BaseComponent from '../base-component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import config from '../../config/environment';

export default BaseComponent.extend({
  link: config.APP.WEB_HOST,
  image: computed('company', function(){
    // Produces
    // Binding style attributes may introduce cross-site scripting vulnerabilities warning
    // but is escaped
    var imageUrl = this.get('company').get('image_card');
    if(imageUrl === null){
      var max = 12; // inclusive
      var min = 1; // inclusive
      var number = Math.floor(Math.random() * (max - min + 1)) + min;
      imageUrl = `company-placeholders/default-image${number}.jpg`;
      return new htmlSafe(this.get('cloudfront')+"images/site/"+imageUrl);
    }
    return new htmlSafe(imageUrl);
  }),
  imageBackground: computed('company', function() {
    return new htmlSafe(`background-image: url('${this.get('image')}');`);
  }),
  linkColor: computed('company', function() {
    return this.get('company.colour') ? this.get('company.colour') : '#444444'
  }),
  didRender() {
    this._super(...arguments);
    if (!(this.get('company.image_card') || this.get('company.image_banner'))) {
      window.$(`#companyCardsSlugCTA_${this.get('company.id')}`).attr('data-overlay', '3');
    }
  }
});