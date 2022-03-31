import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | get-a-demo', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:get-a-demo');
    assert.ok(route);
  });
});
