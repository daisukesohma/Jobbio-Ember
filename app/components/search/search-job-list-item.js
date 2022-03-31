import BaseComponent from '../base-component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default BaseComponent.extend({
  store: inject(),
  selectedJobBorder: computed('selectedJob', function() {
    return this.get('selectedJob.id') == this.get('job.id') ?
      new htmlSafe('border-color: #ff4f4f;') :
      new htmlSafe('border-color: #ececec;');
  }),
  actions: {
    selectJob: function(job) {
      if (job.get('redirect') && job.get('id') != this.get('selectedJob.id')) window.open(job.get('redirect'), '_blank');
      var self = this;
      var params = {
        job_slug: job.get('slug'),
        company_slug: job.get('company.slug')
      };
      this.get('store').queryRecord('job-slug', params).then(function(response) {
        self.set('selectedJob', response);
      });
    }
  }
});
