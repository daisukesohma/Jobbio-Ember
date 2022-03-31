import BaseRoute from '../../base-route';

export default BaseRoute.extend({
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
          content: 'https://jobbio.com/search' + `/${model.searchTerm ? model.searchTerm+'jobs' : ''}-in${model.location ? '-'+model.location : ''}`
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
  renderTemplate: function() {
    this.render('search/results/canonical', { into: 'application' });
  },
  model(params) {
    let canonicalSlug = params.canonical_slug;
    let terms = canonicalSlug.split('-')
    let location = terms[terms.length - 1]
    let splitLocation = (location && location !== 'in') ? location.split(',') : '';
    return {
      searchTerm: terms[0] === 'jobs' ? '' : terms[0],
      location: location !== 'in' ? location : 'all',
      jobType: 'all',
      contract: 'all',
      date_posted: 'all',
      jobLevel: params.level,
      company: params.company,
      selectedLocation: (location && location !== 'in') ? {searchUrl: true, city: splitLocation[0], country: splitLocation[1]} : '',
      trk: params.trk ? (params.trk * 1) + 1 : 0,
    };
  },
});
