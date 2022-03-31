import BaseRoute from '../base-route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import config from '../../config/environment';

export default BaseRoute.extend(UnauthenticatedRouteMixin, {
  titleToken: 'Jobs And Careers',
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
          content: 'https://jobbio.com/company/register'
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
          content: 'https://jobbio.com/company/register'
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
  model: function(params) {
    var image = config.APP.CLOUD_FRONT_HOST+"images2/site/content-pages";
    if(params.package){
      return this.store.queryRecord('package', params.package).then(function(pack) {
        return {package:pack, image:image};
      });
    }else{
      return {image:image};
    }
  },
  afterModel() {
    window.$('html,body').animate({ scrollTop: window.$('.nav-container').height() }, 'slow');
  },
  setupController(controller) {
    this._super(...arguments)
    setTimeout(function() {
      controller.validateForm();
    }, 1000);
  },
  actions: {
    didTransition() {
      window.$('html,body').animate({ scrollTop: window.$('.nav-container').height() }, 'slow');
    }
  }
});
