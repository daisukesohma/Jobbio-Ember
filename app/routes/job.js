import BaseRoute from './base-route';

export default BaseRoute.extend({
  headTags: function() {
    var model = this.modelFor(this.routeName);
    if (model) {
      return [{
          type: 'meta',
          attrs: {
            name: 'description',
            content: model.job.get('title') + ' wanted at ' + model.job.get('company.name') + ' in ' + model.job.get('location.address') + '. Don’t miss this opportunity and show your interest in the position now!'
          }
        },
        {
          type: 'meta',
          attrs: {
            property: 'og:title',
            content: model.job.get('title') + ' At ' + model.job.get('company.name') + ' In ' + model.job.get('location.address')
          }
        },
        {
          type: 'meta',
          attrs: {
            property: 'og:description',
            content: model.job.get('title') + ' wanted at ' + model.job.get('company.name') + ' in ' + model.job.get('location.address') + '. Don’t miss this opportunity and show your interest in the position now!'
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
            content: 'https://jobbio.com/companies/' + model.job.get('company.slug') + '/jobs/' + model.job.get('slug')
          }
        },
        {
          type: 'link',
          tagId: 'canonical-link',
          attrs: {
            rel: 'canonical',
            content: 'https://jobbio.com/companies/' + model.job.get('company.slug') + '/jobs/' + model.job.get('slug')
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
            content: model.job.get('title') + ' At ' + model.job.get('company.name') + ' In ' + model.job.get('location.address')
          }
        },
        {
          type: 'meta',
          attrs: {
            property: 'twitter:description',
            content: model.job.get('title') + ' wanted at ' + model.job.get('company.name') + ' in ' + model.job.get('location.address') + '. Don’t miss this opportunity and show your interest in the position now!'
          }
        }
      ];
    }
  },
  // we are catching the error so the 404 page can be loaded
  model: function(params) {
    if(params.job_id != undefined){
      return this.store.findRecord('job', params.job_id).then(function(job) {
        var source, app_source;
        if(params.source){
          source = params.source;
        }else{
          source = 'job';
        }
        if(params.app_source){
          app_source = params.app_source;
        }else{
          app_source = 'job';
        }
        return {job: job, tracking: {ccuid: params.ccuid, source: source, app_source: app_source}};
      });
    }else{
      return this.get('store').queryRecord('job-slug', params).then(function(response) {
        var source, app_source;
        if(params.source){
          source = params.source;
        }else{
          source = 'job';
        }
        if(params.app_source){
          app_source = params.app_source;
        }else{
          app_source = 'job';
        }
        return {job: response, tracking: {ccuid: params.ccuid, source: source, app_source: app_source}}
      });
    }
  },
  titleToken: function(model) {
    if (model) {
      return model.job.get('title') + " At " + model.job.get('company.name') + " In " + model.job.get('location.address')
    }
  },
  actions: {
    didTransition() {
      window.$('.nav-container').show();
    }
  }
});
