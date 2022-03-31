import BaseComponent from '../base-component';
import config from '../../config/environment';

export default BaseComponent.extend({
  didRender() {
    this._super(...arguments);
    var self = this;
    window.$('#jobCompleteBioPending').on('click', function() {
      self.send('redirect');
    });
    window.$('#jobCompleteBioPending .go-edit-page').on('click', function(e) {
      e.stopPropagation();
      self.send('edit');
    });
    window.$('#jobCompleteBioPending .redirect-job-page').on('click', function(e) {
      e.stopPropagation();
      self.send('redirect');
    });
    window.$('#jobCompleteBioPending .modal-content').on('click', function(e) {
      e.stopPropagation();
    });
  },
  actions: {
    edit: function() {
      window.$('#jobCompleteBioPending').modal('hide');
      window.location.replace(`${config.APP.TALENT_DASHBOARD}/edit`);
    },
    redirect: function() {
      window.$('#jobCompleteBioPending').modal('hide');
      if (window.location.href.includes('/apply')) {
        window.location.replace(`https://${config.APP.DOMAIN}/companies/${this.get('job.company.slug')}/jobs/${this.get('job.slug')}`);
      }
    }
  }
});
