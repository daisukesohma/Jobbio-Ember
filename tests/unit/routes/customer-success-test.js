import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | customer-success', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:customer-success');
    assert.ok(route);
  });
});
