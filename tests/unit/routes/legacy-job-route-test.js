import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | legacy-job-route', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:legacy-job-route');
    assert.ok(route);
  });
});
