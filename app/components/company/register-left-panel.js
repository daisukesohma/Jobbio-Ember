import BaseComponent from '../base-component';

export default BaseComponent.extend({
  init() {
    this._super(...arguments);
    if(this.get("model.package")) {
      window.$('.nav-container')[0].remove();
    }
  }
});
