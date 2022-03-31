import BaseComponent from '../base-component';
import { computed } from '@ember/object';

export default BaseComponent.extend({
  noJobsStyle: computed(function() {
    if (this.get('company.live_jobs') == 0) {
      return 'line-height: 35px;';
    }
  }),
});
