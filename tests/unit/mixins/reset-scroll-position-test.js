import EmberObject from '@ember/object';
import ResetScrollPositionMixin from 'jobbio-frontend/mixins/reset-scroll-position';
import { module, test } from 'qunit';

module('Unit | Mixin | reset-scroll-position', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let ResetScrollPositionObject = EmberObject.extend(ResetScrollPositionMixin);
    let subject = ResetScrollPositionObject.create();
    assert.ok(subject);
  });
});
