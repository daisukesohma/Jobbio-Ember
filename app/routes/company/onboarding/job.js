import BaseRoute from '../../base-route';
import { inject } from '@ember/service';
import config from '../../../config/environment';

export default BaseRoute.extend( {
  currentUser: inject(),
  renderTemplate: function() {
      this.render('company/onboarding/job', { into: 'application' });
  },
  beforeModel(transition) {
    this._super(...arguments);
    var sess = this.get('currentUser');
    if(!sess.get('session.isAuthenticated')){
      this.transitionTo('index')
    }else{
      if (transition.targetName == 'company.onboarding.job') {
        this.transitionTo('company.onboarding.job', {queryParams: {oid: sess.get('session.data.authenticated.company_member.company.id'), package:transition.queryParams.package}});
      }
      if(sess.get('session.data.authenticated.company_member.company.status') != "pending"){
        this.transitionTo('index')
      }else if (sess.get('session.data.authenticated.company_member.company.status') == "pending") {
        if (this.get('currentUser.current.company.draft_jobs') > 0) {
          this.transitionTo('company.onboarding.payment', {queryParams: {oid: sess.get('session.data.authenticated.company_member.company.id')}});
        }
      }
    }
  },
  model(params) {
    var model = this.store.createRecord('company-onboarding-job');

    if(this.get('currentUser.session.isAuthenticated')){
      return this.get('store').queryRecord('subscription', {}).then(response => {
        return this.store.queryRecord('package', response.get('package.slug')).then(function(pack) {
          return {package:pack, model:model, oid:params.oid};
        });
      });
    }else{
      return {model:model, oid:params.oid};
    }
  },
  afterModel: function() {
    var APP_ID = config.APP.INTERCOM;
    window.$("head").append(`
      <script>
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:1013486,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      </script>

      <script>
        (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${APP_ID}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
      </script>
    `);
    window.Intercom('update');
    window.Intercom('boot', {
       app_id: APP_ID,
       action_color: "#ff4f4f",
       custom_launcher_selector: "#productFooterSpeak",
       email: this.get('currentUser.current.user.email'),
       user_id: this.get('currentUser.current.user.id'),
       name: `${this.get('currentUser.current.user.first_name')} ${this.get('currentUser.current.user.last_name')}`,
       utm_source: this.get('currentUser.current.company.source'),
       company: {company_id: this.get('currentUser.current.company.id'),
                name: this.get('currentUser.current.company.name'),
                created_at: this.get('currentUser.current.company.created_at')},
    });
  },
});
