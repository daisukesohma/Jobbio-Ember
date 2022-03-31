import BaseComponent from '../base-component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default BaseComponent.extend({
  markers: null,
  imageLink: computed( function () {
    return new htmlSafe(this.get('cloudfront')+'images2/topic/');
  }),
  style: computed( function () {
    return new htmlSafe(`
      background-color: ${this.get('object.background_color')};
      padding: ${this.get('object.padding_top')}px ${this.get('object.padding_right')}px ${this.get('object.padding_bottom')}px ${this.get('object.padding_left')}px;
      margin: ${this.get('object.margin_top')}px ${this.get('object.margin_right')}px ${this.get('object.margin_bottom')}px ${this.get('object.margin_left')}px;
    `)
  }),
  full_address: computed(function () {
    return `${this.get('object.location.address')}, ${this.get('object.location.city')}, ${this.get('object.location.state')}, ${this.get('object.location.country')}`
  }),
  init() {
    this._super(...arguments);
    this.set('markers', [
      {
        id: 'unique-marker-id',  // Recommended
        lat: this.get('object.location.latitude'), // Required
        lng: this.get('object.location.longitude'), // Required
        infoWindow: {
          content: `<b style="color:#444444">${this.get('object.location.address')}</b><br>
                     <span style="color:#444444">${this.get('object.location.city')}, ${this.get('object.location.post_code')}</span><br>
                     <span style="color:#444444">${this.get('object.location.latitude')}, ${this.get('object.location.longitude')}</span>`,
          visible: true
        },
        // We can add custom events
        // click(event, marker) {},
        // rightclick(event, marker) {},
        // dblclick(event, marker) {},
        // mouseover(event, marker) {},
        // mouseout(event, marker) {},
        // mouseup(event, marker) {},
        // mousedown(event, marker) {},
        // drag(e, marker) {},
        // dragstart(e, marker) {},
        // dragend(e, marker) {}
      }
    ]);
  }
});
