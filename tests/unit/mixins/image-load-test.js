import EmberObject from '@ember/object';
import ImageLoadMixin from 'jobbio-frontend/mixins/image-load';
import { module, test } from 'qunit';

module('Unit | Mixin | image-load', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let ImageLoadObject = EmberObject.extend(ImageLoadMixin);
    let subject = ImageLoadObject.create();
    assert.ok(subject);
  });
});
