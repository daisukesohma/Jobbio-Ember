import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | embed/job', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:embed/job');
    assert.ok(route);
  });
});
