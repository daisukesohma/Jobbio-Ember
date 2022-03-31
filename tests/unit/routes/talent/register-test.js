import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | talent/register', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:talent/register');
    assert.ok(route);
  });
});
