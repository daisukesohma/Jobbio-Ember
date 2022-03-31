import BaseComponent from '../base-component';
import { computed } from '@ember/object';

export default BaseComponent.extend({
  channel: null,
  initial: computed(function(){
    return this.get('company.name').charAt(0);
  })
});
