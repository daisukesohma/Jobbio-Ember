import BaseComponent from '../base-component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default BaseComponent.extend({
  location: null,
  gMap: inject(),
  address: computed(function(){
    return this.get('location.address');
  }),
  latitude: computed(function(){
    return this.get('location.latitude');
  }),
  longitude: computed(function(){
    return this.get('location.longitude');
  }),
});
