import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | talent/questionnaire', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:talent/questionnaire');
    assert.ok(controller);
  });
});
