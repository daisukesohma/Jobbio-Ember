import BaseComponent from '../base-component';
import { inject } from '@ember/service';
import { computed, observer } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { task, timeout } from 'ember-concurrency';
import config from '../../config/environment';

export default BaseComponent.extend({
  location: '',
  router: inject(),
  googlePlaceAutocompleteService: inject('google-place-autocomplete'),
  frontPageBanner: computed(function() {
    // Binding style attributes may introduce cross-site scripting vulnerabilities warning but is escaped
    return new htmlSafe(`${this.get('cloudfront')}images/site/homepage-banner-airbnb.jpg`);
  }),
  onLocationChanged: observer('selected', function() {
    let city, country;
    if(this.get('selected')) {
      city = this.get('selected.structured_formatting.main_text');
      country = this.get('selected.terms')[this.get('selected.terms').length - 1].value;
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
