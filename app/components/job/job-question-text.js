import BaseComponent from '../base-component';
import { computed } from '@ember/object';

export default BaseComponent.extend({
  question: null,
  id: computed(function() {
    return this.get('question.id');
  }),
  answer: computed('question_answers', function() {
    if (this.get('question_answers')) {
      var answered = '';
      this.get('question_answers').forEach(answer => {
        if (answer.question.id == this.get('question.id')) {
          answered = answer.text;
        }
      });
      return answered;
    } else {
      return '';
    }
  })
});
