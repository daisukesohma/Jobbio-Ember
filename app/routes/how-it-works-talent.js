import Route from './base-route';
import config from '../config/environment';

export default Route.extend({
  titleToken: 'How To Find a Job You Love? Try Jobbio - It\'s Free',
  headTags: function() {
    return [
      {
        type: 'meta',
        attrs: {
          name:'description',
          content: 'Find a job you love with Jobbio and connect with great companies quickly, directly and privately. 6,000+ companies post job opportunities on Jobbio, so don\'t miss the opportunity to find your dream job today. Create your profile and find the job that works for you!'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:title',
          content: 'How To Find a Job You Love? Try Jobbio - It\'s Free | Jobbio'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:description',
          content: 'Find a job you love with Jobbio and connect with great companies quickly, directly and privately. 6,000+ companies post job opportunities on Jobbio, so don\'t miss the opportunity to find your dream job today. Create your profile and find the job that works for you!'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:url',
          content: 'https://jobbio.com/how-it-works-talent'
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
          content: 'https://jobbio.com/how-it-works-talent'
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
          content: 'How To Find a Job You Love? Try Jobbio - It\'s Free | Jobbio'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'twitter:description',
          content: 'Find a job you love with Jobbio and connect with great companies quickly, directly and privately. 6,000+ companies post job opportunities on Jobbio, so don\'t miss the opportunity to find your dream job today. Create your profile and find the job that works for you!'
        }
      }
    ];
  },
  model() {
    return config.APP.CLOUD_FRONT_HOST+"images2/site/content-pages";
  }
});
