import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | user/reset-password', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:user/reset-password');
    assert.ok(route);
  });
});
