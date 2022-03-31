import BaseComponent from '../base-component';
import { computed } from '@ember/object';

export default BaseComponent.extend({
  checked: computed('question_answers', function(){
    if(this.get('question_answers')){
      var answered = false;
      this.get('question_answers').forEach(answer => {
        if(answer.question.id == this.get("question.id")){
          answer.options.forEach(option => {
            if(option.id == this.get('option.id')){
              answered = true;
            }
          });
        }
      });
      return answered;
    }
  }),
});
