import Route from './base-route';
import config from '../config/environment';

export default Route.extend({
  titleToken: 'Recruit top Talent - Start hiring The Best Talent Now',
  headTags: function() {
    return [
      {
        type: 'meta',
        attrs: {
          name:'description',
          content: 'Jobbio is the most efficient and collaborative way to hire better talent. Jobbio\'s platform is designed to save you time and effort, allowing multiple team members to be part of the hiring process. Build your talent pool and recruit the best candidates anytime. Check out the full features now.'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:title',
          content: 'Recruit top Talent - Start hiring The Best Talent Now | Jobbio'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:description',
          content: 'Jobbio is the most efficient and collaborative way to hire better talent. Jobbio\'s platform is designed to save you time and effort, allowing multiple team members to be part of the hiring process. Build your talent pool and recruit the best candidates anytime. Check out the full features now.'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:url',
          content: 'https://jobbio.com/hire'
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
          content: 'https://jobbio.com/hire'
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
          content: 'Recruit top Talent - Start hiring The Best Talent Now | Jobbio'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'twitter:description',
          content: 'Jobbio is the most efficient and collaborative way to hire better talent. Jobbio\'s platform is designed to save you time and effort, allowing multiple team members to be part of the hiring process. Build your talent pool and recruit the best candidates anytime. Check out the full features now.'
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
