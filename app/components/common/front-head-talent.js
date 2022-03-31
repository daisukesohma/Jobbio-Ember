import HeadComponent from '../head-component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default HeadComponent.extend({
  router: inject(),
  windowscroll: inject(),
  cookies: inject(),
  active: false,
  cookieOptions: null,
  visited: computed('cookies', function() {
    return this.get('cookies').read('visited');
  }),
  visible: computed('opacity', function() {
    if(this.get('opacity')){
      return 'bar--transparent bar--absolute';
    }
    return '';
  }),
  init() {
    this._super(...arguments);
    this.set('cookieOptions', {'path' : '/'});
    this.get('windowscroll').on('scroll', () => {
      if (this.get('windowscroll.scrollTop') > 366) {
        window.$('.front-head-talent #menu1').addClass('pos-fixed');
      } else {
        window.$('.front-head-talent #menu1').removeClass('pos-fixed');
      }
    });
  },
  actions: {
    invalidateSession: function(){
      return this.get('session').invalidate();
    },
    search: function(){
      var terms = this.getProperties('keywords');
      this.get('router').transitionTo('search', {queryParams: {search: terms.keywords}});
    },
    hideCookiePolicyPopup: function(){
      window.$('.cookie-policy-popup').hide();
      let cookieService = this.get('cookies');
      cookieService.write('visited', true, this.get('cookieOptions'));
    }
  }
});
