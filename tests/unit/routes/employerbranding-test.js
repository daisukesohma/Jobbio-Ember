import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | employerbranding', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:employerbranding');
    assert.ok(route);
  });
});
