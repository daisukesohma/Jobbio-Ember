import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | legacy-talent-register-apply', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:legacy-talent-register-apply');
    assert.ok(route);
  });
});
