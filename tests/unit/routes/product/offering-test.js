import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | product/offering', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:product/offering');
    assert.ok(route);
  });
});
