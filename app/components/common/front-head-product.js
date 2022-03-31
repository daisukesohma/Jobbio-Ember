import HeadComponent from '../head-component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default HeadComponent.extend({
  windowscroll: inject(),
  cookies: inject(),
  cookieOptions: null,
  active: false,
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
        window.$('.front-head #menu1').addClass('pos-fixed');
      } else {
        window.$('.front-head #menu1').removeClass('pos-fixed');
      }
    });
  },
  actions: {
    invalidateSession: function(){
      return this.get('session').invalidate();
    },
    hideCookiePolicyPopup: function(){
      window.$('.cookie-policy-popup').hide();
      let cookieService = this.get('cookies');
      cookieService.write('visited', true, this.get('cookieOptions'));
    },
    launchChat: function() {
      var iframe = document.getElementsByClassName('zEWidget-launcher')[0].contentDocument;
      iframe.getElementsByClassName('src-component-launcher-WidgetLauncher-wrapper')[0].click();
    }
  }
});