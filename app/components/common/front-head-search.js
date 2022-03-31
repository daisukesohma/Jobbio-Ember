import HeadComponent from '../head-component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default HeadComponent.extend({
  router: inject(),
  windowscroll: inject(),
  cookies: inject(),
  session: inject('session'),
  isTalent: computed(function(){
    return this.get("session.data.authenticated.talent") !== undefined;
  }),
  isAuthenticated: computed(function(){
    return Object.keys(this.get("session.data.authenticated")).length !== 0;
  }),
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
  jobs: computed('currentRouteName', function() {
    return this.get('router.currentRouteName') === 'search.results.index' || this.get('router.currentRouteName') === 'search.results.canonical';
  }),
  dashboardUrl: computed(function () {
    if(this.get("session.data.authenticated.talent") !== undefined){
      return this.get('talentDashboardBio')
    }else if(this.get("session.data.authenticated.company_member") !== undefined){
      return this.get('companyDashboard')
    }else if(this.get("session.data.authenticated.jobbio_admin") !== undefined){
      return this.get('consoleDashboard')
    }
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
    hideCookiePolicyPopup: function(){
      window.$('.cookie-policy-popup').hide();
      let cookieService = this.get('cookies');
      cookieService.write('visited', true, this.get('cookieOptions'));
    }
  }
});
