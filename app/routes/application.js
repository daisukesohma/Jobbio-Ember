import BaseRoute from './base-route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { getOwner } from '@ember/application';
import config from '../config/environment';
import { inject } from '@ember/service';

export default BaseRoute.extend(ApplicationRouteMixin, {
  currentUser: inject(),
  cookies: inject(),
  cookieOptions: null,
  title: function(tokens) {
    return tokens.join(' - ') + ' | Jobbio';
  },
  headTags: function() {
    return [
      {
        type: 'meta',
        attrs: {
          property: 'og:image',
          content: config.APP.CLOUD_FRONT_HOST + 'images2/site/content-pages/jobbio_meta_work_happy.png'
        }
      },
      {
        type: 'meta',
        attrs: {
          name: 'robots',
          content: config.APP.ROBOT
        }
      }
    ];
  },
  beforeModel() {
    this._super(...arguments);
    let cookieService = this.get('cookies');
    var location = cookieService.read('location');
    if (!location) {
      cookieService.write('location', 'ALL', this.get('cookieOptions'));
    }
    return this._loadCurrentUser();
  },
  afterModel() {
    this.set('cookieOptions', {'path': '/'});
  },
  triggerAuthentication: function() {
    let authenticationRoute = this.get('authenticationRoute');
    window.location.assign(authenticationRoute);
  },
  sessionAuthenticated: function() {
    var sess = this.get('session').session.content.authenticated;

    const attemptedTransition = this.get('session.attemptedTransition');
    const cookies = getOwner(this).lookup('service:cookies');
    const redirectTarget = cookies.read('ember_simple_auth-redirectTarget');

    var queryParams = this.controllerFor('user/login').get('queryParams');
    var didRegister = this.controllerFor('talent/register').get('didRegister');

    if (attemptedTransition) {
      attemptedTransition.retry();
      this.set('session.attemptedTransition', null);
    } else if (redirectTarget) {
      this.transitionTo(redirectTarget);
      cookies.clear('ember_simple_auth-redirectTarget');
    } else if ("talent" in sess) {
      if (Object.keys(queryParams).length > 0 && !didRegister) {
        var redirectUrl = '';
        if (queryParams.job) {
          redirectUrl = config.APP.HTTP_PROTOCOL + config.APP.DOMAIN + "/companies/" + queryParams.job.get('company.slug') + "/jobs/" + queryParams.job.get('slug');
          if (queryParams.job.get('questions').length > 0) {
            redirectUrl += "/apply";
          }
          var redirectUrlParams = '';
          var params = ['app_source', 'bidcode', 'ccuid', 'mediaid', 'source'];
          params.forEach(param => {
            if (queryParams[`${param}`]) {
              redirectUrlParams += `&${param}=${queryParams[param]}`;
            }
          });
          if (redirectUrlParams.length > 0) {
            redirectUrl += '?';
            redirectUrlParams = redirectUrlParams.substring(1);
            redirectUrl += redirectUrlParams;
          }
        } else if (queryParams.channel.length > 0) {
          redirectUrl = config.APP.HTTP_PROTOCOL + config.APP.DOMAIN + "/" + queryParams.channel;
        }
        window.location.assign(redirectUrl);
      } else if (Object.keys(queryParams).length == 0 || didRegister){
        window.location.assign(config.APP.HTTP_PROTOCOL + "talent." + config.APP.DOMAIN);
      }
    } else if ("company_member" in sess) {
      if (sess.company_member.company.status == "pending") {
        this.transitionTo('company.onboarding.job', {queryParams: {oid: sess.company_member.company.id}});
      }else {
        if (this.get('router.currentRouteName') == 'company.onboarding.index') {
          window.location.assign(config.APP.HTTP_PROTOCOL + "company." + config.APP.DOMAIN + "/post-job");
        } else {
          window.location.assign(config.APP.HTTP_PROTOCOL + "company." + config.APP.DOMAIN);
        }
      }
    } else if ("jobbio_admin" in sess) {
      window.location.assign(config.APP.HTTP_PROTOCOL + "console." + config.APP.DOMAIN);
    } else {
      this.transitionTo(this.get('routeAfterAuthentication'));
    }
  },
  _loadCurrentUser() {
    return this.get('currentUser').load();
  }
});
