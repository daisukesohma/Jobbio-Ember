import BaseRoute from '../base-route';
import { scheduleOnce } from '@ember/runloop';

export default BaseRoute.extend({
  queryParams: {
    search: {refreshModel:true},
    company: {refreshModel:true},
    location: {refreshModel:true},
    trk: {refreshModel:true},
  },
  search: '',
  titleToken: 'Search Jobs And Career Opportunities - Find Your Dream Job Today!',
  headTags: function() {
    return [
      {
        type: 'meta',
        attrs: {
          name:'description',
          content: 'Search companies on Jobbio and meet 6000+ companies that are looking for great talent like you. On our job search platform you\'ll be able to follow companies, learn about their cultures and activities. Create your interactive CV and start applying today!'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:title',
          content: 'Search Companies And Career Opportunities - Find Your Dream Job Today!'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:description',
          content: 'Search companies on Jobbio and meet 6000+ companies that are looking for great talent like you. On our job search platform you\'ll be able to follow companies, learn about their cultures and activities. Create your interactive CV and start applying today!'
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
          content: 'https://jobbio.com/search'
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
          content: 'Search Companies And Career Opportunities - Find Your Dream Job Today!'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'twitter:description',
          content: 'Search companies on Jobbio and meet 6000+ companies that are looking for great talent like you. On our job search platform you\'ll be able to follow companies, learn about their cultures and activities. Create your interactive CV and start applying today!'
        }
      }
    ];
  },
  model(params) {
    let splitLocation = (params.location && params.location != 'all') ? params.location.split(',') : '';
    return {
      searchTerm: params.search,
      company: params.company,
      location: params.location ? params.location : 'all',
      selectedLocation: (params.location && params.location != 'all') ? {searchUrl: true, city: splitLocation[0], country: splitLocation[1]} : '',
      trk: params.trk ? (params.trk * 1) + 1 : 0,
    };
  }
});
