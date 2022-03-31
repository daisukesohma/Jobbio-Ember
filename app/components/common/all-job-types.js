import BaseComponent from '../base-component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default BaseComponent.extend({
  store: inject(),
  columns: computed('allJobTypes', function() {
    return Math.floor(12 / this.get('allJobTypes').length);
  }),
  allJobTypes: computed('jobTypes', function() {
    var jobTypes = [];
    var column = [];
    if (this.get('jobTypes')) {
      this.get('jobTypes').forEach((jobType, index) => {
        if (index % 16 === 0 && index != 0) {
          jobTypes.push(column);
          column = [];
        }
        column.push(jobType);
      });
      jobTypes.push(column);
    }
    return jobTypes;
  }),
  init() {
    this._super(...arguments);
    this.get('store').query('job-type', {}).then(response => {
      this.set('jobTypes', response);
    });
  },
  actions: {
    searchJobType: function(jobType) {
      window.location.href = `/search?search=${jobType}`;
    }
  }
});
