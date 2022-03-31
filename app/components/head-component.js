import BaseComponent from './base-component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { inject } from '@ember/service';

export default BaseComponent.extend({
  cookies: inject(),
  cookieOptions: null,
  flag: computed(function(){
    if(this.get('cookies').read('location') == 'US'){
      return "/assets/us.svg";
    }else if(this.get('cookies').read('location') == 'CA'){
      return "/assets/ca.svg";
    }else if(this.get('cookies').read('location') == 'UK'){
      return "/assets/uk.svg";
    }else if(this.get('cookies').read('location') == 'IE'){
      return "/assets/ie.svg";
    }else{
      return "/assets/world.svg";
    }
  }),
  logoDark: computed(function(){
    // Produces
    // Binding style attributes may introduce cross-site scripting vulnerabilities warning
    // but is escaped
    return new htmlSafe(this.get('cloudfront')+"images/site/logo_dark.png");
  }),
  logoLight: computed(function(){
    // Produces
    // Binding style attributes may introduce cross-site scripting vulnerabilities warning
    // but is escaped
    return new htmlSafe(this.get('cloudfront')+"images/site/logo_light.png");
  }),
  talentPopupBackground: computed(function(){
    // Produces
    // Binding style attributes may introduce cross-site scripting vulnerabilities warning
    // but is escaped
    return new htmlSafe(this.get('cloudfront')+"images/site/talent_head_popup_background.jpg");
  }),
  init() {
    this._super(...arguments);
    this.set('cookieOptions', {'path' : '/'});
  },
  actions: {
    setCountry: function(country) {
      let cookieService = this.get('cookies');
      cookieService.write('location', country, this.get('cookieOptions'));
      window.location.reload(true);
    }
  }
});
