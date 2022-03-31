import BaseRoute from '../base-route';
import { scheduleOnce } from '@ember/runloop';

export default BaseRoute.extend({
  queryParams: {
    search: {refreshModel:true},
    type: {refreshModel:true},
    location: {refreshModel:true},
    contract: {refreshModel:true},
    date_posted: {refreshModel:true},
    level: {refreshModel:true},
    company: {refreshModel:true},
    application_submitted: {refreshModel:true},
    trk: {refreshModel:true},
  },
  search: '',
  titleToken: 'Search Jobs And Career Opportunities - Find Your Dream Job Today!',
  headTags: function() {
    var model = this.modelFor(this.routeName);
    let rules = [
      {
        type: 'meta',
        attrs: {
          name:'description',
          content: 'Search jobs on Jobbio and meet 6000+ companies that are looking for great talent like you. On our job search platform you\'ll be able to follow companies, learn about their cultures and activities. Create your interactive CV and start applying today!'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:title',
          content: 'Search Jobs And Career Opportunities - Find Your Dream Job Today!'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:description',
          content: 'Search jobs on Jobbio and meet 6000+ companies that are looking for great talent like you. On our job search platform you\'ll be able to follow companies, learn about their cultures and activities. Create your interactive CV and start applying today!'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:url',
          content: 'https://jobbio.com/search'
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
          content: 'https://jobbio.com/search' + `/${model.searchTerm ? model.searchTerm+'-jobs' : 'jobs'}-in${model.location ? '-'+model.location : ''}`
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
          content: 'Search Jobs And Career Opportunities - Find Your Dream Job Today!'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'twitter:description',
          content: 'Search jobs on Jobbio and meet 6000+ companies that are looking for great talent like you. On our job search platform you\'ll be able to follow companies, learn about their cultures and activities. Create your interactive CV and start applying today!'
        }
      }
    ];
    return rules;
  },
  model(params) {
    let splitLocation = (params.location && params.location != 'all') ? params.location.split(',') : '';
    return {
      searchTerm: params.search,
      location: params.location ? params.location : 'all',
      jobType: (!params.type || params.type == 'undefined') ? 'all' : params.type,
      contract: params.contract ? params.contract : 'all',
      date_posted: params.date_posted ? params.date_posted : 'all',
      jobLevel: params.level,
      company: params.company,
      application_submitted: params.application_submitted,
      selectedLocation: (params.location && params.location != 'all') ? {searchUrl: true, city: splitLocation[0], country: splitLocation[1]} : '',
      trk: params.trk ? (params.trk * 1) + 1 : 0,
    };
  },
  actions: {
    didTransition() {
      scheduleOnce('afterRender', this, function() {
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('application_submitted')) {
          this.transitionTo({ queryParams: { type: urlParams.get('type') }});
        }
      });
    }
  }
});
