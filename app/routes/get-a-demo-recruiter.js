import Route from './base-route';
import config from '../config/environment';

export default Route.extend({
  titleToken: 'Get A Demo - Start Hiring Better Talent Today',
  headTags: function() {
    return [
      {
        type: 'meta',
        attrs: {
          name:'description',
          content: 'Get a demo and start hiring better talent now. Fill out this form to be contacted by our team today!'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:title',
          content: 'Get A Demo - Start Hiring Better Talent Today | Jobbio'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:description',
          content: 'Get a demo and start hiring better talent now. Fill out this form to be contacted by our team today!'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:url',
          content: 'https://jobbio.com/get-a-demo'
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
          content: 'https://jobbio.com/get-a-demo'
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
          content: 'Get A Demo - Start Hiring Better Talent Today | Jobbio'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'twitter:description',
          content: 'Get a demo and start hiring better talent now. Fill out this form to be contacted by our team today!'
        }
      }
    ];
  },
  model() {
    return config.APP.CLOUD_FRONT_HOST+"images2/site/content-pages";
  },
  afterModel() {
    window.$("head").append('\
      <script>/*<![CDATA[*/window.zE||(function(e,t,s){var n=window.zE=window.zEmbed=function(){n._.push(arguments)}, a=n.s=e.createElement(t),r=e.getElementsByTagName(t)[0];n.set=function(e){ n.set._.push(e)},n._=[],n.set._=[],a.async=true,a.setAttribute("charset","utf-8"), a.src="https://static.zdassets.com/ekr/asset_composer.js?key="+s, n.t=+new Date,a.type="text/javascript",r.parentNode.insertBefore(a,r)})(document,"script","66d2fc94-2035-4178-8ab5-a4ceb93633a2");/*]]>*/</script>\
    ');
  }
});
