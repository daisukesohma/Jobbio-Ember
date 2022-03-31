import BaseComponent from '../base-component';
import { inject } from '@ember/service';
import config from '../../config/environment';

export default BaseComponent.extend({
  router: inject(),
  didRender() {
    this._super(...arguments);
    var self = this;
    window.$('#applicationComplete').on('click', function() {
      self.send('redirect');
    });
    window.$('#applicationComplete .go-search-page').on('click', function(e) {
      e.stopPropagation();
      self.send('search');
    });
    window.$('#applicationComplete .redirect-job-page').on('click', function(e) {
      e.stopPropagation();
      self.send('redirect');
    });
    window.$('#applicationComplete .modal-content').on('click', function(e) {
      e.stopPropagation();
    });
  },
  actions: {
    search: function(query) {
      window.$('#applicationComplete').modal('hide');
      window.$('body').removeClass('modal-open');
      this.get('router').transitionTo('search.results', {
        queryParams: {
          'search': query,
          'type': this.get('job.type').name
        }
      });
    },
    redirect: function() {
      window.$('#applicationComplete').modal('hide');
      if (window.location.href.includes('/apply')) {
        window.location.replace(`https://${config.APP.DOMAIN}/companies/${this.get('job.company.slug')}/jobs/${this.get('job.slug')}`);
      }
    }
  }
});
