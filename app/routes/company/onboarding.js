import BaseRoute from '../base-route';
import { inject } from '@ember/service';
import config from '../../config/environment';

export default BaseRoute.extend({
  titleToken: 'Jobs And Careers',
  currentUser: inject(),
  queryParams: {
    source: {refreshModel:true},
    package: {refreshModel:true},
  },
  headTags: function() {
    return [
      {
        type: 'meta',
        attrs: {
          name:'description',
          content: 'Welcome to the future of hiring. Connect with hundreds of talent that look for jobs on our platform. Register today to start hiring better talent. Jobbio: Brand, Amplify, Hire Talent.'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:title',
          content: 'Register to Jobbio Start Recruiting Better Talent Today | Jobbio'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:description',
          content: 'Welcome to the future of hiring. Connect with hundreds of talent that look for jobs on our platform. Register today to start hiring better talent. Jobbio: Brand, Amplify, Hire Talent.'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:url',
          content: 'https://jobbio.com/company/onboarding'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:type',
          content: 'website'
        }
      },
      {
        type: 'link',
        tagId: 'canonical-link',
        attrs: {
          rel: 'canonical',
          content: 'https://jobbio.com/company/onboarding'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'twitter:card',
          content: 'summary_large_image'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'twitter:site',
          content: '@Jobbio'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'twitter:title',
          content: 'Register to Jobbio Start Recruiting Better Talent Today | Jobbio'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'twitter:description',
          content: 'Welcome to the future of hiring. Connect with hundreds of talent that look for jobs on our platform. Register today to start hiring better talent. Jobbio: Brand, Amplify, Hire Talent.'
        }
      }
    ];
  },
  beforeModel() {
    this._super(...arguments);
    var sess = this.get('currentUser');
    if(sess.get('session.isAuthenticated') && sess.get('session.data.authenticated.company_member.company.status') != "pending"){
      this.transitionTo('index')
    } else if (sess.get('session.isAuthenticated') && sess.get('session.data.authenticated.company_member.company.status') == "pending") {
      if (this.get('currentUser.current.company.draft_jobs') > 0) {
        this.transitionTo('company.onboarding.payment', {queryParams: {oid: sess.get('session.data.authenticated.company_member.company.id')}});
      } else {
        this.transitionTo('company.onboarding.job', {queryParams: {oid: sess.get('session.data.authenticated.company_member.company.id')}});
      }
    }
  },
  model(params) {
    var model = this.store.createRecord('company-onboarding');
    if(params.package){
      return this.store.queryRecord('package', params.package).then(function(pack) {
        return {package:pack, model:model, source:params.source};
      });
    }else{
      return {model:model, source:params.source};
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
    });
  },
  actions: {
    willTransition(transition) {
      // Refresh model when go back to the start onboarding page
      if (transition.targetName == 'company.onboarding.index') {
        this.refresh();
      }
    }
  }
});
