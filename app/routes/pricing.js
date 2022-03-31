import Route from './base-route';
import { computed } from '@ember/object';
import config from '../config/environment';
import { inject } from '@ember/service';

export default Route.extend({
  cookies: inject(),
  currentUser: inject(),
  titleToken: 'Pricing Plans - Request A Demo Today And Start Hiring Better Talent!',
  headTags: function() {
    return [
      {
        type: 'meta',
        attrs: {
          name:'description',
          content: 'Check out our pricing plans and choose the one that suits you best. We offer a one-off payment plan and an annual subscription plan with full access to our services. Jobbio: Brand, Amplify, Hire.'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:title',
          content: 'Pricing Plans - Request A Demo Today And Start Hiring Better Talent! | Jobbio'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:description',
          content: 'Check out our pricing plans and choose the one that suits you best. We offer a one-off payment plan and an annual subscription plan with full access to our services. Jobbio: Brand, Amplify, Hire.'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:url',
          content: 'https://jobbio.com/pricing'
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
          content: 'https://jobbio.com/pricing'
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
          content: 'Pricing Plans - Request A Demo Today And Start Hiring Better Talent! | Jobbio'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'twitter:description',
          content: 'Check out our pricing plans and choose the one that suits you best. We offer a one-off payment plan and an annual subscription plan with full access to our services. Jobbio: Brand, Amplify, Hire.'
        }
      }
    ];
  },
  location: computed(function(){
    return this.get('cookies').read('location')
  }),
  model() {
    return {image: config.APP.CLOUD_FRONT_HOST+"images2/site/content-pages", location: this.get('location')};
  },
  afterModel() {
    var APP_ID = config.APP.INTERCOM;
    window.$("head").append(`
      <script>
        (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${APP_ID}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
      </script>
    `);
    window.Intercom('update');
    var logged_in = {
      app_id: APP_ID,
      action_color: "#ff4f4f",
      custom_launcher_selector: "#frontHeadProductLiveChat",
      email: this.get('currentUser.current.user.email'),
      user_id: this.get('currentUser.current.user.id'),
      name: `${this.get('currentUser.current.user.first_name')} ${this.get('currentUser.current.user.last_name')}`,
      utm_source: this.get('currentUser.current.company.source'),
      company: {company_id: this.get('currentUser.current.company.id'),
        name: this.get('currentUser.current.company.name'),
        created_at: this.get('currentUser.current.company.created_at')},
    };
    var logged_out = {
      app_id: APP_ID,
      action_color: "#ff4f4f",
      custom_launcher_selector: ["#launchChat"],
    };
    var sess = this.get('currentUser');
    if(!sess.get('session.isAuthenticated')){
      window.Intercom('boot', logged_out);
    }else{
      window.Intercom('boot', logged_in);
    }
  }
});
