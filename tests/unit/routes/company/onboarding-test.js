import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | company/onboarding', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:company/onboarding');
    assert.ok(route);
  });
});
