import BaseComponent from '../base-component';
import { computed } from '@ember/object';

export default BaseComponent.extend({
  multi: null,
  isSingle: computed(function() {
    return this.get('question.type') == 'single_select';
  }),
  init() {
    this._super(...arguments);
    this.set('multi', []);
  },
});
