import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject('session'),
  isTalent: computed(function(){
    return this.get("session.data.authenticated.talent") !== undefined;
  }),
  isCompany: computed(function(){
    return this.get("session.data.authenticated.company_member") !== undefined;
  }),
  isAdmin: computed(function(){
    return this.get("session.data.authenticated.jobbio_admin") !== undefined;
  }),
  embeded: computed('currentRouteName', function() {
    if(this.get('currentRouteName') === 'embed.channel' ||
      this.get('currentRouteName') === 'embed.job' ||
      this.get('currentRouteName') === 'company.onboarding.index' ||
      this.get('currentRouteName') === 'company.onboarding.job' ||
      this.get('currentRouteName') === 'company.onboarding.payment'){
      return true;
    } else {
      return false;
    }
  }),
  apply: computed('currentRouteName', function() {
    if(this.get('currentRouteName') === 'job.apply'){
      return true;
    } else {
      return false;
    }
  }),
  opacity: computed('currentRouteName', function() {
    if(this.get('currentRouteName') === 'index' || this.get('currentRouteName') === 'channel' || this.get('currentRouteName') === 'product.offering' || this.get('currentRouteName') === 'get-a-demo'){
      return true;
    } else {
      return false;
    }
  }),
  channel: computed('currentRouteName', function() {
    if(this.get('currentRouteName') === 'channel'){
      return true;
    } else {
      return false;
    }
  }),
  isTalentRegister: computed('currentRouteName', function() {
    if(this.get('currentRouteName') === 'talent.register'){
      var urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('job')) {
        return true;
      }
    }
    return false;
  }),
  redirect: computed('currentRouteName', function() {
    if(this.get('currentRouteName') === 'higherdublin' || this.get('currentRouteName') === 'workhappy100'){
      return true;
    } else {
      return false;
    }
  }),
  isProductOffering: computed('currentRouteName', function() {
    if(this.get('currentRouteName') === 'product.offering'){
      return true;
    } else {
      return false;
    }
  }),
  isPricing: computed('currentRouteName', function() {
    if(this.get('currentRouteName') === 'pricing'){
      return true;
    } else {
      return false;
    }
  }),
  isSearch: computed('currentRouteName', function() {
    if(this.get('currentRouteName') === 'search.results.index' || this.get('currentRouteName') === 'search.results.canonical' || this.get('currentRouteName') === 'search.companies'){
      return true;
    } else {
      return false;
    }
  }),
  customCss: computed('currentRouteName', function() {
    var customCss = '';
    if(this.get('currentRouteName') === 'talent.register'){
      customCss = 'talent-register-head';
    }
    return customCss;
  }),
  // Close dropdowns on the top nav when route get changed
  onRouteChanged: observer('currentRouteName', function() {
    window.$('#menu1 .dropdown--active').removeClass('dropdown--active');

    let interComRoutes = ['get-a-demo', 'product.offering', 'company.onboarding.index',
      'company.onboarding.job', 'company.onboarding.payment'];
    if (interComRoutes.includes(this.get('currentRouteName'))) {
      window.$('#intercom-container').show();
      window.$('#launcher').hide();
      window.$('#webWidget').hide();
    } else {
      window.$('#intercom-container').hide();
      window.$('#launcher').show();
      window.$('#webWidget').show();
    }
  }),
  demo: computed('currentRouteName', function() {
    if(this.get('currentRouteName') === 'get-a-demo'){
      return true;
    } else {
      return false;
    }
  }),
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
