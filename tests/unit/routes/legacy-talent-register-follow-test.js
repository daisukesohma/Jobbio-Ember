import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | legacy-talent-register-follow', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:legacy-talent-register-follow');
    assert.ok(route);
  });
});
