import BaseComponent from '../base-component';
import { computed } from '@ember/object';

export default BaseComponent.extend({
  isJob: computed(function(){
    return this.get('item') != null;
  })
});
