import BaseComponent from '../base-component';
import { computed } from '@ember/object';

export default BaseComponent.extend({
  isText: computed(function() {
    return this.get('question.type') == 'text';
  }),
  isBool: computed(function() {
    return this.get('question.type') == 'bool_yn' || this.get('question.type') == 'bool_tf';
  }),
  isRange: computed(function() {
    return this.get('question.type') == 'range';
  }),
  isSlider: computed(function() {
    return this.get('question.type') == 'slider';
  }),
  isSelect: computed(function() {
    return this.get('question.type') == 'single_select' || this.get('question.type') == 'multi_select';
  }),
});
