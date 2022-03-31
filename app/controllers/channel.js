import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject('session'),
  router: inject(),
  isTalent: computed(function(){
    return this.get("session.data.authenticated.talent") != undefined;
  }),
  isCompany: computed(function(){
    return this.get("session.data.authenticated.company_member") != undefined;
  }),
  isAdmin: computed(function(){
    return this.get("session.data.authenticated.jobbio_admin") != undefined;
  }),
  embeded: computed('router.currentRouteName', function() {
    if(this.get('router.currentRouteName') == 'embed.channel' ||
      this.get('router.currentRouteName') == 'embed.job' ||
      this.get('router.currentRouteName') == 'company.onboarding.index' ||
      this.get('router.currentRouteName') == 'company.onboarding.job' ||
      this.get('router.currentRouteName') == 'company.onboarding.payment'){
      return true;
    } else {
      return false;
    }
  }),
  apply: computed('router.currentRouteName', function() {
    if(this.get('crouter.urrentRouteName') == 'job.apply'){
      return true;
    } else {
      return false;
    }
  }),
  opacity: computed('router.currentRouteName', function() {
    if(this.get('router.currentRouteName') == 'index' || this.get('router.currentRouteName') == 'channel' || this.get('router.currentRouteName') == 'product.offering' || this.get('router.currentRouteName') == 'get-a-demo'){
      return true;
    } else {
      return false;
    }
  }),
  isTalentRegister: computed('router.currentRouteName', function() {
    if(this.get('router.currentRouteName') == 'talent.register'){
      var urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('job')) {
        return true;
      }
    }
    return false;
  }),
  redirect: computed('router.currentRouteName', function() {
    if(this.get('router.currentRouteName') == 'higherdublin' || this.get('router.currentRouteName') == 'workhappy100'){
      return true;
    } else {
      return false;
    }
  }),
  isProductOffering: computed('router.currentRouteName', function() {
    if(this.get('router.currentRouteName') == 'product.offering'){
      return true;
    } else {
      return false;
    }
  }),
  customCss: computed('router.currentRouteName', function() {
    var customCss = '';
    if(this.get('router.currentRouteName') == 'talent.register'){
      customCss = 'talent-register-head';
    }
    return customCss;
  }),
  // Close dropdowns on the top nav when route get changed
  onRouteChanged: observer('router.currentRouteName', function() {
    window.$('#menu1 .dropdown--active').removeClass('dropdown--active');
  }),
  demo: computed('router.currentRouteName', function() {
    if(this.get('router.currentRouteName') == 'get-a-demo'){
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
