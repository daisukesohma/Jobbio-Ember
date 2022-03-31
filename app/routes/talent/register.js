import BaseRoute from '../base-route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import config from '../../config/environment';

export default BaseRoute.extend(UnauthenticatedRouteMixin, {
  job: null,
  titleToken: 'Sign Up To Jobbio - Your Job Search Starts Here',
  headTags: function () {
    let model = this.modelFor(this.routeName);
    if (model.job) {
      return [
        {
          type: 'meta',
          attrs: {
            name: 'description',
            content: model.job.get('title') + ' wanted at ' + model.job.get('company.name') + ' in ' + model.job.get('location.address') + '. Don’t miss this opportunity and show your interest in the position now!'
          }
        },
        {
          type: 'meta',
          attrs: {
            property: 'og:title',
            content: model.job.get('title') + ' At ' + model.job.get('company.name') + ' In ' + model.job.get('location.address')
          }
        },
        {
          type: 'meta',
          attrs: {
            property: 'og:description',
            content: model.job.get('title') + ' wanted at ' + model.job.get('company.name') + ' in ' + model.job.get('location.address') + '. Don’t miss this opportunity and show your interest in the position now!'
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
          type: 'meta',
          attrs: {
            property: 'og:url',
            content: `https://jobbio.com/talent/register?app_souce=${model.app_source}&job=${model.job.get('id')}&source=${model.source}`
          }
        },
        {
          type: 'link',
          tagId: 'canonical-link',
          attrs: {
            rel: 'canonical',
            content: `https://jobbio.com/talent/register?app_souce=${model.app_source}&job=${model.job.get('id')}&source=${model.source}`
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
            content: model.job.get('title') + ' At ' + model.job.get('company.name') + ' In ' + model.job.get('location.address')
          }
        },
        {
          type: 'meta',
          attrs: {
            property: 'twitter:description',
            content: model.job.get('title') + ' wanted at ' + model.job.get('company.name') + ' in ' + model.job.get('location.address') + '. Don’t miss this opportunity and show your interest in the position now!'
          }
        }
      ]
    }else{
      return [
        {
          type: 'meta',
          attrs: {
            name:'description',
            content: 'Register to Jobbio and connect with 6000+ companies hiring now. Build your interactive profile and apply for your dream job. Sign up now and connect with top companies looking for great talent like you.'
          }
        },
        {
          type: 'meta',
          attrs: {
            property: 'og:title',
            content: 'Sign Up To Jobbio - Your Job Search Starts Here | Jobbio'
          }
        },
        {
          type: 'meta',
          attrs: {
            property: 'og:description',
            content: 'Register to Jobbio and connect with 6000+ companies hiring now. Build your interactive profile and apply for your dream job. Sign up now and connect with top companies looking for great talent like you.'
          }
        },
        {
          type: 'meta',
          attrs: {
            property: 'og:url',
            content: 'https://jobbio.com/talent/register'
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
            content: 'https://jobbio.com/talent/register'
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
            content: 'Sign Up To Jobbio - Your Job Search Starts Here | Jobbio'
          }
        },
        {
          type: 'meta',
          attrs: {
            property: 'twitter:description',
            content: 'Register to Jobbio and connect with 6000+ companies hiring now. Build your interactive profile and apply for your dream job. Sign up now and connect with top companies looking for great talent like you.'
          }
        }
      ]
    }
  },
  renderTemplate: function() {
      this.render('talent/register', { into: 'application' });
  },
  beforeModel: function(transition) {
    this._super(...arguments);
    var sess = this.get('session').session.content.authenticated;
    if ("talent" in sess || "company_member" in sess || "jobbio_admin" in sess) {
      this.transitionTo('job', 'comp', 'job', { queryParams: { job_id: transition.queryParams.job, ccuid: transition.queryParams.ccuid, source: transition.queryParams.source, app_source: transition.queryParams.app_source }});
    }
  },
  model: function(params) {
    var loginController = this.controllerFor('user/login');
    loginController.set('queryParams', params);
    if(params.job){
      this.set('job', params.job);
      return this.store.findRecord('job', params.job).then(function(job) {
        var tw = config.APP.CLOUD_FRONT_HOST+'images/site/tw.png';
        var cw = config.APP.CLOUD_FRONT_HOST+'images/site/cw.png';
        var da = config.APP.CLOUD_FRONT_HOST+'images/site/da.png';
        var source, app_source;
        if(params.source){
          source = params.source;
        }else{
          source = 'job';
        }
        if(params.app_source){
          app_source = params.app_source;
        }else if(params.source){
          app_source = params.source;
        }else{
          app_source = 'job';
        }
        loginController.set('queryParams.job', job);
        return {job: job, source: source, app_source: app_source, ccuid: params.ccuid, tw: tw, cw: cw, da: da};
      });
    }else{
      var source;
      if(params.source){
        source = params.source;
      }else{
        source = 'organic';
      }
      loginController.set('queryParams.job', null);
      return {job:null, source: source, tw:null};
    }
  },
  setupController(controller) {
    this._super(...arguments);
    setTimeout(function() {
      controller.validateForm();
    }, 1000);

    // Reset all properties of controller
    controller.setProperties({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      country_code: '',
      country_short: '',
      country: '',
      address: '',
      longitude: '',
      latitude: '',
      cvFile: null,
      errors: {},
      didAgree: false
    });
  },
  actions: {
    willTransition() {
      // Hide application pop up when transit to another page
      window.$('#applicationPop').modal('hide');
      window.$('body').removeClass('modal-open');
    }
  }
});
