import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | employer-branding/christmas-competition', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:employer-branding/christmas-competition');
    assert.ok(route);
  });
});
