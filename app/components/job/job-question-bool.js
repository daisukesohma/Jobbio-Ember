import BaseComponent from '../base-component';
import { computed } from '@ember/object';

export default BaseComponent.extend({
  question: null,
  checked: computed('question_answers', function() {
    if (this.get('question_answers')) {
      var answered = '';
      this.get('question_answers').forEach(answer => {
        if (answer.question.id == this.get('question.id')) {
          answered = answer.bool;
        }
      });
      return answered;
    } else {
      return true;
    }
  }),
  actions: {
    checkChanged: function() {
      this.set('checked', !this.get('checked'));
    },
  }
});
