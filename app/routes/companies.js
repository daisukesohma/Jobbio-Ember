import BaseRoute from './base-route';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default BaseRoute.extend({
  titleToken: 'Companies',
  cookies: inject(),
  location: computed(function(){
    return this.get('cookies').read('location')
  }),
  model: function(params) {
    var companiesState;
    var featured = false, popular = false;
    if(params.featured == "true"){
      companiesState = "Latest";
      featured = true;
    }else if(params.popular == "true"){
      companiesState = "Popular";
      popular = true;
    }
    return {state: companiesState, popular: popular, featured: featured, location: this.get('location')};
  },
});
