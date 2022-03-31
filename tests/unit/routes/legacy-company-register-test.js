import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | legacy-company-register', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:legacy-company-register');
    assert.ok(route);
  });
});
