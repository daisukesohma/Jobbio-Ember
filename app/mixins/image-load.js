import Mixin from '@ember/object/mixin';
import { computed, getWithDefault } from '@ember/object';
import { run } from '@ember/runloop';
import { on } from '@ember/object/evented';

export default Mixin.create({
  loaded:      false,
  errorThrown: false,

  classNameBindings: ['loaded', 'errorThrown'],

  defaultErrorText: computed('errorText', function() {
    return getWithDefault(this, 'errorText', 'Image failed to load');
  }),

  _resolveImage: on('didInsertElement', function() {
    var component = this;
    var image     = component.$('img');
    var isCached  = image[0].complete;

    if (!isCached) {
      image.on('load', function() {
        component._imageLoaded();
      });

      image.on('error', function(error) {
        component._imageError(error);
      });
    } else {
      this._imageLoaded();
    }
  }),

  _imageLoaded: function() {
    var component = this;

    run(function() {
      component.set('loaded', true);
    });
  },

  _imageError: function() {
    var component = this;

    run(function() {
      component.set('errorThrown', true);
    });
  },

  willDestroy: function() {
    this.$('img').off('load');
    this.$('img').off('error');
  }
});
