import BaseComponent from '../base-component';
import { computed, observer } from '@ember/object';
import { htmlSafe } from '@ember/string';
import config from '../../config/environment';
import InViewportMixin from '../../mixins/in-viewport'
import ImageLoad from '../../mixins/image-load'

export default BaseComponent.extend(InViewportMixin, ImageLoad, {
  tagName: 'div',
  classNames: null,
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
  imageBackground: null,
  linkColor: computed('company', function() {
    return this.get('company.colour') ? this.get('company.colour') : '#444444'
  }),
  elementInViewport: observer('enteredViewport', function() {
    if(this.get('enteredViewport') && !this.get('lazyImage')){
      this.set('lazyImage', this.get('image'))
      this.set('imageBackground', `background-image: url('${this.get('image')}');`)
    }
  }).on('didInsertElement'),
  init() {
    this._super(...arguments);
    if (this.get('home')){
      this.set('classNames', ['img'])
    }else{
      this.set('classNames', null)
    }
  },
  didRender() {
    this._super(...arguments);
    if (!(this.get('company.image_card') || this.get('company.image_banner'))) {
      window.$(`#companyCardsSlugCTA_${this.get('company.id')}`).attr('data-overlay', '3');
    }
  },
});
