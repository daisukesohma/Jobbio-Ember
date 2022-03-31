import BaseComponent from '../base-component';
import { inject } from '@ember/service';

export default BaseComponent.extend({
  store: inject(),
  init(){
    this._super(...arguments);
    var self = this;
    this.get('store').queryRecord('package', 'single-job-post-1').then(function(single) {
      self.set('singleJob', single);
    });
    this.get('store').queryRecord('package', 'onboarding-subscription').then(function(subscription) {
      self.set('subscription', subscription);
    });
  },
  actions: {
    seeAllFeatures() {
      window.$('html, body').animate({
        scrollTop: window.$("#product-features").offset().top
      }, 800);
    }
  }
});
