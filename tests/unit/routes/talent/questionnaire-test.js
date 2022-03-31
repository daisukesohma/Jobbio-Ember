import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | talent/questionnaire', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:talent/questionnaire');
    assert.ok(route);
  });
});
