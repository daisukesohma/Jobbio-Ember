import Mixin from '@ember/object/mixin';
import { scheduleOnce } from '@ember/runloop';
import { on } from '@ember/object/evented';
import { run } from '@ember/runloop';

export default Mixin.create({
  scrollTimeout:   100,
  enteredViewport: null,

  _setViewport: function() {
    var rect = this.$()[0].getBoundingClientRect();

    this.set('enteredViewport',
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  _setInitialViewport: on('didInsertElement', function() {
    scheduleOnce('afterRender', this, function() {
      this._setViewport();
    });
  }),

  _scrollHandler: function() {
    run.debounce(this, function() {
      this._setViewport();
    }, this.get('scrollTimeout'));
  },

  _bindScroll: on('didInsertElement', function() {
    var component = this;

    window.$(document).on('touchmove.scrollable', function() {
      component._scrollHandler();
    });

    window.$(window).on('scroll.scrollable', function() {
      component._scrollHandler();
    });
  }),

  _unbindScroll: on('willDestroyElement', function() {
    window.$(window).off('.scrollable');
    window.$(document).off('.scrollable');
  }),
});
