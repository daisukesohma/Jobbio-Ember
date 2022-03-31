import BaseRoute from './base-route';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default BaseRoute.extend({
  titleToken: 'Channels',
  cookies: inject(),
  location: computed(function(){
    return this.get('cookies').read('location')
  }),
  model: function(params) {
    var channelsState;
    var featured = false, partner = false;
    if(params.featured == "true"){
      channelsState = "Trending";
      featured = true;
    }else if(params.partner == "true"){
      channelsState = "Partner";
      partner = true;
    }
    return {state: channelsState, featured: featured, partner: partner, location: this.get('location')};
  },
});
