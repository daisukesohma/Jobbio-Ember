import BaseComponent from '../base-component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default BaseComponent.extend({
  style: computed( function () {
    return new htmlSafe(`
      background-color: ${this.get('object.background_color')};
      padding: ${this.get('object.padding_top')}px ${this.get('object.padding_right')}px ${this.get('object.padding_bottom')}px ${this.get('object.padding_left')}px;
      margin: ${this.get('object.margin_top')}px ${this.get('object.margin_right')}px ${this.get('object.margin_bottom')}px ${this.get('object.margin_left')}px;
    `)
  }),
  didRender(){
    this._super(...arguments);
    window.$('.tabs li.active').each(function () {
      window.mr.tabs.activateTab(this);
    });
    window.$('.tabs > li').on('click', function () {
      var clickedTab = window.$(this),
        hash;
      window.mr.tabs.activateTab(clickedTab);

      // Update the URL bar if the currently clicked tab has an ID
      if (clickedTab.is('[id]')) {
        // Create the hash from the tab's ID
        hash = '#' + clickedTab.attr('id');
        // Check we are in a newish browser with the history API
        if (history.pushState) {
          history.pushState(null, null, hash);
        } else {
          location.hash = hash;
        }
      }
    });
  }
});
