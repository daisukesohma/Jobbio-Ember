import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | partnerships/partnerships-home', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:partnerships/partnerships-home');
    assert.ok(route);
  });
});
