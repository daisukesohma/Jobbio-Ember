import Route from './base-route';
import config from '../config/environment';

export default Route.extend({
  titleToken: 'Multiple Job Board Advertising - We Advertise Your Jobs On 50+ Job Boards',
  headTags: function() {
    return [
      {
        type: 'meta',
        attrs: {
          name:'description',
          content: 'Once you post your job on Jobbio, our jobs marketing specialists advertise your job post on multiple job boards like LinkedIn, Glassdoor, Indeed and more. We also partner with some of the most visited blogs and news websites. We put your job in all the right places, so you don\'t have to. Discover More.'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:title',
          content: 'Multiple Job Board Advertising - We Advertise Your Jobs On 50+ Job Boards'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:description',
          content: 'Once you post your job on Jobbio, our jobs marketing specialists advertise your job post on multiple job boards like LinkedIn, Glassdoor, Indeed and more. We also partner with some of the most visited blogs and news websites. We put your job in all the right places, so you don\'t have to. Discover More.'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:url',
          content: 'https://jobbio.com/amplify'
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
          content: 'https://jobbio.com/amplify'
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
          content: 'Multiple Job Board Advertising - We Advertise Your Jobs On 50+ Job Boards'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'twitter:description',
          content: 'Once you post your job on Jobbio, our jobs marketing specialists advertise your job post on multiple job boards like LinkedIn, Glassdoor, Indeed and more. We also partner with some of the most visited blogs and news websites. We put your job in all the right places, so you don\'t have to. Discover More.'
        }
      }
    ];
  },
  model() {
    return config.APP.CLOUD_FRONT_HOST+"images2/site/content-pages";
  }
});
