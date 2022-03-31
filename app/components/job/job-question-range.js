import BaseComponent from '../base-component';
import { computed } from '@ember/object';

export default BaseComponent.extend({
  range: computed(function() {
    return this.get('question.options.firstObject');
  }),
  value_from: computed('value', function() {
    return this.get('value.firstObject');
  }),
  value_to: computed('value', function() {
    return this.get('value.lastObject');
  }),
  value: computed('question_answers', function() {
    if (this.get('question_answers')) {
      var answered = [];
      this.get('question_answers').forEach(answer => {
        if (answer.question.id == this.get('question.id')) {
          answered = [answer.value_from, answer.value_to];
        }
      });
      return answered;
    } else {
      return [0, 0];
    }
  })
});
