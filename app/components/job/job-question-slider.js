import BaseComponent from '../base-component';
import { computed } from '@ember/object';

export default BaseComponent.extend({
  question: null,
  slider: computed(function() {
    return this.get('question.options.firstObject');
  }),
  id: computed(function() {
    return this.get('question.id');
  }),
  value: computed('question_answers', function() {
    if (this.get('question_answers')) {
      var answered = '';
      this.get('question_answers').forEach(answer => {
        if (answer.question.id == this.get('question.id')) {
          answered = answer.value;
        }
      });
      return answered;
    }
  })
});
