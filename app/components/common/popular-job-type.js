import BaseComponent from '../base-component';
import { computed, observer } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { underscore } from '@ember/string';
import InViewportMixin from '../../mixins/in-viewport'
import ImageLoad from '../../mixins/image-load'

export default BaseComponent.extend(InViewportMixin, ImageLoad, {
  tagName: 'div',
  classNames: ['col-md-4 col-6'],
  image: computed(function() {
    // Binding style attributes may introduce cross-site scripting vulnerabilities warning but is escaped
    return new htmlSafe(`${this.get('cloudfront')}images/site/${underscore(this.get('name'))}.jpeg`);
  }),
  elementInViewport: observer('enteredViewport', function() {
    if(this.get('enteredViewport') && !this.get('lazyImage')){
      this.set('lazyImage', this.get('image'));
      this.set('imageBackground', `background-image: url('${this.get('image')}'); opacity: 1;`)
    }
  }).on('didInsertElement'),
  actions: {
    searchJobType: function(jobType) {
      window.location.href = `/search?search=${jobType}`;
    }
  }
});
