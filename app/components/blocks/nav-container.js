import HeadComponent from '../head-component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { htmlSafe } from '@ember/string';

export default HeadComponent.extend({
  windowscroll: inject(),
  store: inject(),
  cookies: inject(),
  cookieOptions: null,
  channelLogoDark: computed(function(){
    // Produces
    // Binding style attributes may introduce cross-site scripting vulnerabilities warning
    // but is escaped
    return new htmlSafe(this.get('channel.company.image_nav_logo'));
  }),
  channelLogoLight: computed(function(){
    // Produces
    // Binding style attributes may introduce cross-site scripting vulnerabilities warning
    // but is escaped
    return new htmlSafe(this.get('channel.company.image_nav_logo'));
  }),
  visited: computed('cookies', function() {
    return this.get('cookies').read('visited');
  }),
  init() {
    this._super(...arguments);
    this.set('cookieOptions', {'path' : '/'});
    this.get('windowscroll').on('scroll', () => {
      if (this.get('windowscroll.scrollTop') > 366) {
        window.$('.channel-nav #menu1').addClass('pos-fixed');
      } else {
        window.$('.channel-nav #menu1').removeClass('pos-fixed');
      }
    });
    this.get('store').query('nav-list', this.get('channel.slug')).then(response => {
      this.set('navLinks', response)
    });
  },
  didInsertElement() {
    this._super(...arguments);
    this.get('windowscroll').on('scroll', () => {
      if (this.get('windowscroll.scrollTop') > 1) {
        window.$('#scrolltop_').slideDown('slow');
      } else {
        window.$('#scrolltop_').slideUp('slow');
      }
    });
    window.$("#scrolltop_").click(function(){
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  },
  actions: {
    hideCookiePolicyPopup: function(){
      window.$('.cookie-policy-popup').hide();
      let cookieService = this.get('cookies');
      cookieService.write('visited', true, this.get('cookieOptions'));
    }
  }
});
