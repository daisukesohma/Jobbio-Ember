import BaseComponent from '../base-component';
import { computed } from '@ember/object';

export default BaseComponent.extend({
  title: computed('channel.name', function(){
    return this.get('channel.name');
  }),
  // topic and activity channels are effectively the same for ui purporses so
  // we'll treat all activity channels as topic channels
  isTopicChannel: computed('channel.type', function(){
    return this.get('channel.type') == "topic" || this.get('channel.type') == "activity";
  }),
});
