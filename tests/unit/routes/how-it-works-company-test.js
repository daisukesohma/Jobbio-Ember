import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | how-it-works-company', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:how-it-works-company');
    assert.ok(route);
  });
});
