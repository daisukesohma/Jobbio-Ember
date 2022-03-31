'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'jobbio-frontend',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self' 'unsafe-eval' *.googleapis.com maps.gstatic.com",
    'font-src': "'self' fonts.gstatic.com",
    'connect-src': "'self' maps.gstatic.com",
    'img-src': "'self' *.googleapis.com maps.gstatic.com csi.gstatic.com data:",
    'style-src': "'self' 'unsafe-inline' fonts.googleapis.com maps.gstatic.com assets-cdn.github.com"
  };

  ENV.googleMap = {
    apiKey: 'AIzaSyAoghLmcAZNs7paXnqqlYmAvRxpkcQ-ajA',
    libraries: ['places']
  }

  ENV['place-autocomplete'] = {
    exclude: true,
    key: 'AIzaSyAz-8d6fbMGqM_wOnZQ89qexQ3PM_psCcE',
    client: 'gme-myclientid',
  };

  if (environment === 'development') {
    ENV.APP.DOMAIN = 'jobbiodev.com';
    ENV.APP.CLOUD_FRONT_HOST = 'https://d27hyvh7xqsx55.cloudfront.net/';
    ENV.APP.STRIPE = 'pk_test_Xv5MhMl2V0n6MOGJI27yTivH';
    ENV.APP.INTERCOM = 'y9tjebzw';
    ENV.APP.ROBOT = 'noindex';
    ENV.APP.GOOGLE_AUTO_COMPLETE_KEY_LOCATION = 'AIzaSyAz-8d6fbMGqM_wOnZQ89qexQ3PM_psCcE';
  }

  if (environment === 'staging') {
    ENV.APP.DOMAIN = 'jobbiostaging.com';
    ENV.APP.CLOUD_FRONT_HOST = 'https://d1ol0nbkiy8g99.cloudfront.net/';
    ENV.APP.STRIPE = 'pk_test_Xv5MhMl2V0n6MOGJI27yTivH';
    ENV.APP.INTERCOM = 'y9tjebzw';
    ENV.APP.ROBOT = 'noindex';
    ENV.APP.GOOGLE_AUTO_COMPLETE_KEY_LOCATION = 'AIzaSyAz-8d6fbMGqM_wOnZQ89qexQ3PM_psCcE';
  }

  if (environment === 'production') {
    ENV.APP.DOMAIN = 'jobbio.com';
    ENV.APP.CLOUD_FRONT_HOST = 'https://dy793rr2xtptx.cloudfront.net/';
    ENV.APP.STRIPE = 'pk_live_WvXKpseGp7c8arvoc64AY7Zc';
    ENV.APP.INTERCOM = 'qbgk8vuh';
    ENV.APP.ROBOT = 'index';
    ENV.APP.GOOGLE_AUTO_COMPLETE_KEY_LOCATION = 'AIzaSyAz-8d6fbMGqM_wOnZQ89qexQ3PM_psCcE';
  }
  ENV.APP.HTTP_PROTOCOL = 'https://';

  ENV.APP.WEB_HOST = ENV.APP.HTTP_PROTOCOL+ENV.APP.DOMAIN;
  ENV.APP.API_HOST = ENV.APP.HTTP_PROTOCOL+'api.'+ENV.APP.DOMAIN;

  ENV.APP.API_NAMESPACE = '';
  ENV.APP.TOKEN_ENDPOINT = ENV.APP.API_HOST+'/user/login';
  ENV.APP.TOKEN_REFRESH_ENDPOINT = ENV.APP.TOKEN_ENDPOINT+'/refresh';

  ENV.APP.TALENT_DASHBOARD = ENV.APP.HTTP_PROTOCOL+'talent.'+ENV.APP.DOMAIN;
  ENV.APP.COMPANY_DASHBOARD = ENV.APP.HTTP_PROTOCOL+'company.'+ENV.APP.DOMAIN;
  ENV.APP.CONSOLE_DASHBOARD = ENV.APP.HTTP_PROTOCOL+'console.'+ENV.APP.DOMAIN;

  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: ENV.APP.TOKEN_ENDPOINT,
    serverTokenRefreshEndpoint: ENV.APP.TOKEN_REFRESH_ENDPOINT,
    identificationField: 'email',
    passwordField: 'password',
    tokenPropertyName: 'token',
    authorizationPrefix: 'Bearer ',
    authorizationHeaderName: 'Authorization',
    headers: {},
    refreshAccessTokens: true,
    refreshLeeway: 300 // Refresh the token 5 minutes (300s) before it expires.
  };

  ENV['ember-simple-auth'] = {
    authorizer: 'authorizer:token',
    authenticationRoute: '/user/login',
    routeAfterAuthentication: '/',
    routeIfAlreadyAuthenticated: '/'
  };

  ENV['ember-cli-lightbox'] = {
    lightboxOptions: {
      alwaysShowNavOnTouchDevices: false,
      albumLabel: "Image %1 of %2",
      disableScrolling: false,
      fadeDuration: 500,
      fitImagesInViewport: true,
      maxWidth: 1000,
      maxHeight: 1000,
      positionFromTop: 100,
      resizeDuration: 500,
      showImageNumberLabel: false,
      wrapAround: true
    }
  };

  ENV['ember-toastr'] = {
    injectAs: 'toast',
    toastrOptions: {
      closeButton: false,
      debug: false,
      newestOnTop: true,
      progressBar: false,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
      onclick: null,
      showDuration: '300',
      hideDuration: '1000',
      timeOut: '5000',
      extendedTimeOut: '1000',
      showEasing: 'swing',
      hideEasing: 'swing',
      showMethod: 'slideDown',
      hideMethod: 'slideUp'
    }
  };

  return ENV;
};
