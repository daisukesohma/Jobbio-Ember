import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | hire', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:hire');
    assert.ok(route);
  });
});
