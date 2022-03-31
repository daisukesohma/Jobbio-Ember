import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | download-our-app', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:download-our-app');
    assert.ok(route);
  });
});
