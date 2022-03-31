import BaseComponent from '../base-component';
import { computed } from '@ember/object';

export default BaseComponent.extend({
  channel: null,
  initial: computed(function(){
    var initial = this.get('channel.name').charAt(0);
    if(this.get('channel.type') == 'topic'){
      initial = "/"+initial;
    }
    return initial;
  })
});
