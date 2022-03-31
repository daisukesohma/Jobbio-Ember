import BaseComponent from '../base-component';
import {task, timeout} from "ember-concurrency";
import config from '../../config/environment';
import { computed, observer } from '@ember/object';
import { inject } from '@ember/service';

export default BaseComponent.extend({
  router: inject(),
  googlePlaceAutocompleteService: inject('google-place-autocomplete'),
  jobs: computed('currentRouteName', function() {
    if(this.get('router.currentRouteName') === 'search.results.index' || this.get('router.currentRouteName') === 'search.results.canonical'){
      return true;
    } else {
      return false;
    }
  }),
  onLocationChanged: observer('selected', function() {
    let city, country;
    if(this.get('selected')){
      if(this.get('selected')['searchUrl']){
        city = this.get('selected.city');
        country = this.get('selected.country')
      }else{
        city = this.get('selected.structured_formatting.main_text');
        country = this.get('selected.terms')[this.get('selected.terms').length - 1].value;
      }
      this.set('location', `${city},${country}`)
    }else{
      this.set('predictions', [])
      this.set('location', 'all')
    }
  }),
  actions: {
    async searchLocations(term){
      let properties = {input: term, types: ['(cities)']}
      let predictions = this.get('googlePlaceAutocompleteService').getPlacePredictions(properties)
      this.set('predictions', predictions)
    }
  },
});
