import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  _hydrateUnsuppliedQueryParams(state, queryParams) {
    let sticky = queryParams._keep_sticky;
    delete queryParams._keep_sticky;
    return sticky ? this._super(state, queryParams) : queryParams;
  }
});

Router.map(function() {
  this.route('company', function() {
    this.route('register');
    this.route('onboarding', function() {
      this.route('job');
      this.route('payment');
    });
  });
  this.route('channel', {path: '/:slug'});
  this.route('channel-feed', {path: 'channels/feed/:slug'});
  this.route('job', { path: '/companies/:company_slug/jobs/:job_slug' }, function() {
    this.route('apply', { path: '/apply'});
  });

  this.route('search', function() {
    this.route('results', { path: ''}, function() {
      this.route('canonical', { path: '/:canonical_slug'});
    });
    this.route('companies');
  });

  this.route('talent', function() {
    this.route('register');
    this.route('questionnaire');
  });

  this.route('user', function() {
    this.route('login');
    this.route('forgot-password');
    this.route('reset-password');
  });

  this.route('base-route');
  this.route('amplify');
  this.route('brand');
  this.route('customer-success');
  this.route('ebooks');
  this.route('employer-branding', { path: '/employer-branding'}, function() {
    this.route('employer-branding-competition');
  });
  this.route('hire');
  this.route('how-it-works-company');
  this.route('how-it-works-talent');
  this.route('post');
  this.route('pricing');
  this.route('privacy-policy');
  this.route('download-our-app');
  this.route('legacy-job-route', {path: '/:country/job/:id/:location/:topic/:job'});
  this.route('legacy-talent-register-follow', {path: '/register/talent/and-follow/:slug'});
  this.route('legacy-talent-register-apply', {path: '/register/talent/and-apply/:id/:source'});
  this.route('legacy-company-register', {path: '/sign-up/:package/:source'});
  this.route('build-your-employer-brand');
  this.route('cookie-policy');
  this.route('employer-brand');
  this.route('get-a-demo');
  this.route('terms');
  this.route('use-policy');
  this.route('company-terms');

  this.route('embed', function() {
    this.route('channel', {path: '/:slug'});
    this.route('job', { path: '/companies/:company_slug/jobs/:job_slug'});
  });
  this.route('legacy-company-terms', {path: '/page/company-terms'});
  this.route('legacy-terms', {path: '/page/terms'});
  this.route('promotions', {path: '/startupfest'});
  this.route('companies');
  this.route('channels');

  this.route('partnerships', function() {
    this.route('community');
    this.route('conference');
    this.route('media');
    this.route('partnerships-home');
    this.route('publisher');
    this.route('talent');
    // this.route('directory');
  });

  this.route('recruiter', function() {
    this.route('register');
  });

  this.route('applications', function() {
    this.route('action');
  });
  this.route('higherdublin');
  this.route('workhappy100');
  this.route('get-a-demo-recruiter');

  this.route('higher', function() {
    this.route('dts');
  });
  this.route('employerbranding');

  this.route('product', function() {
    this.route('offering');
  });
});

export default Router;
