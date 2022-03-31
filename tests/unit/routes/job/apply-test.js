import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | job/apply', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:job/apply');
    assert.ok(route);
  });
});
