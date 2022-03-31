import BaseComponent from '../base-component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default BaseComponent.extend({
  company: null,
  hasLogo: computed('company', function() {
    return this.get('company.image_logo');
  }),
  initials: computed('company', function() {
    // gets the initials of the company name
    // uses only the first 3 found
    var name = this.get('company.name');
    var initials = name.split(' ').map((n) => n[0]).join('');
    initials = initials.substring(0, 2);
    return initials;
  }),
  brandColor: computed('company', function() {
    var colors = Array('57423F', 'BFA6A2', '0098FF', '00AF69', '9B72FF');
    var color = new htmlSafe(`background-color: #${colors[Math.floor(Math.random() * colors.length)]};`);
    if (this.get('company').brandColor) {
      color = `background-color: ${this.get('company').brandColor};`;
    }
    return color;
  }),
});
