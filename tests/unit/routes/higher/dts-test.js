import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | higher/dts', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:higher/dts');
    assert.ok(route);
  });
});
