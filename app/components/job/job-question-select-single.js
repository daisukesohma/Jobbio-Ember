import BaseComponent from '../base-component';
import { computed } from '@ember/object';

export default BaseComponent.extend({
  selected: computed('question_answers', function(){
    if(this.get('question_answers')){
      var answered = false;
      this.get('question_answers').forEach(answer => {
        if(answer.question.id == this.get('question.id')){
          if(answer.option.id == this.get('option.id')){
            answered = true;
          }
        }
      });
      return answered;
    }
  }),
});
