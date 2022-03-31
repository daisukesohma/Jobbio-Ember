import BaseRoute from './base-route';
import { scheduleOnce } from '@ember/runloop';

export default BaseRoute.extend({
  queryParams: {
    utm: {refreshModel:true},
    source: {refreshModel:true},
    'redirect-url': {refreshModel:true},
  },
  headTags: function() {
    var model = this.modelFor(this.routeName);
    if (model) {
      return [{
          type: 'meta',
          attrs: {
            name: 'description',
            content: `Find out what it's like to work at ${model.get('name')}, their latest jobs and what they have to offer. Find your dream job now.`
          }
        },
        {
          type: 'meta',
          attrs: {
            property: 'og:title',
            content: `${model.get('name')}'s Jobs & Careers`
          }
        },
        {
          type: 'meta',
          attrs: {
            property: 'og:description',
            content: `Find out what it's like to work at ${model.get('name')}, their latest jobs and what they have to offer. Find your dream job now.`
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
          type: 'meta',
          attrs: {
            property: 'og:url',
            content: `https://jobbio.com/${model.get('slug')}`
          }
        },
        {
          type: 'link',
          tagId: 'canonical-link',
          attrs: {
            rel: 'canonical',
            content: `https://jobbio.com/${model.get('slug')}`
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
            content: `${model.get('name')}'s Jobs & Careers`
          }
        },
        {
          type: 'meta',
          attrs: {
            property: 'twitter:description',
            content: `Find out what it's like to work at ${model.get('name')}, their latest jobs and what they have to offer. Find your dream job now.`
          }
        }
      ];
    }
  },
  model: function(params) {
    var self = this;
    if(params['redirect-url']){
      let data = {channel_slug: params.slug, source: params.source};
      this.store.createRecord('companyredirect', data).save();
      let redirectUrl = params['redirect-url'].startsWith('http') ? params['redirect-url'] : `https://${params['redirect-url']}`
      window.location.href = redirectUrl
    }
    return this.store.findRecord('channel', params.slug).catch(() => {
      self.transitionTo('index', {
        queryParams: {
          error: "channelNotFound"
        }
      });
    });
  },
  titleToken: function(model) {
    if (model) {
      return model.get('name') + " Jobs & Careers "
    }
  },
  actions: {
    didTransition() {
      scheduleOnce('afterRender', this, function() {
        window.$('.nav-container').css('min-height', 0);
      });
    }
  }
});
