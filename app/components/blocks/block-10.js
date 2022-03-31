import BaseComponent from '../base-component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default BaseComponent.extend({
  imageLink: computed( function () {
    return new htmlSafe(this.get('cloudfront')+'images2/topic/');
  }),
  style: computed( function () {
    return new htmlSafe(`
      padding: ${this.get('object.padding_top')}px ${this.get('object.padding_right')}px ${this.get('object.padding_bottom')}px ${this.get('object.padding_left')}px;
      margin: ${this.get('object.margin_top')}px ${this.get('object.margin_right')}px ${this.get('object.margin_bottom')}px ${this.get('object.margin_left')}px;
    `)
  }),
  init() {
    this._super(...arguments);
    let layoutType = true;
    let gallery = [];
    this.get('object.block_content_entry').forEach(function(image, index) {
      image['layoutType'] = layoutType;
      gallery.pushObject(image);
      if ((index+1)%2) {
        layoutType = !layoutType;
      }
    });
    this.set('gallery', gallery);
  },
  didRender(){
    this._super(...arguments);
    window.$('.masonry').each(function () {
      var masonry = window.$(this).find('.masonry__container'),
        masonryParent = window.$(this),
        defaultFilter = '*',
        themeDefaults, ao = {};

      themeDefaults = {
        itemSelector: '.masonry__item',
        filter: '*',
        masonry: {
          columnWidth: '.masonry__item'
        }
      };

      // Check for a default filter attribute
      if (masonryParent.is('[data-default-filter]')) {
        defaultFilter = masonryParent.attr('data-default-filter').toLowerCase();
        defaultFilter = '.filter-' + defaultFilter;
        masonryParent.find('li[data-masonry-filter]').removeClass('active');
        masonryParent.find('li[data-masonry-filter="' + masonryParent.attr("data-default-filter").toLowerCase() + '"]').addClass('active');
      }

      // Use data attributes to override the default settings and provide a per-masonry customisation where necessary.
      ao.filter = defaultFilter !== '*' ? defaultFilter : undefined;

      masonry.on('layoutComplete', function () {
        masonry.addClass('masonry--active');
        if (typeof mr_parallax !== typeof undefined) {
          setTimeout(function () {
            window.mr_parallax.profileParallaxElements();
          }, 100);
        }
      });


      masonry.isotope(window.$.extend({}, themeDefaults, window.mr.masonry.options, ao));

    });
  }
});
