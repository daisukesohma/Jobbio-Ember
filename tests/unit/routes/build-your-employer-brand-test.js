import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | build-your-employer-brand', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:build-your-employer-brand');
    assert.ok(route);
  });
});
