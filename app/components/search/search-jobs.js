import ActivePaginationComponent from '../active-pagination-component';
import { inject } from '@ember/service';
import { computed, observer } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default ActivePaginationComponent.extend({
  store: inject(),
  modelType: 'job',
  params: computed('cursor', 'type', 'location', 'contract', 'level', 'searchTerm', function(){
    var params = this._super();
    if(this.get('location')){
      params['location'] = this.get('location');
    }
    if (this.get('level')) params['level'] = this.get('level');
    if (this.get('contract')) params['contract'] = this.get('contract');
    if (this.get('date_posted') && this.get('date_posted') !== 'all') params['date_posted'] = this.get('date_posted');
    if(this.get('type') != 'all' && this.get('type') != ''){
      params['type'] = this.get('type');
    }
    if(this.get('searchTerm') && this.get('searchTerm') !== ' '){
      params['es'] = true;
    }else{
      params['es'] = false;
    }
    return params;
  }),
  searchTermChanged: observer('type', 'contract', 'level', 'date_posted', function() {
    if(this.get('resetAllowed')){
      this.get('resetSearch').perform();
    }
  }),
  newSearch: observer('trk', function() {
    if(this.get('resetAllowed')){
      this.get('resetSearch').perform();
    }
  }),
  init() {
    this._super(...arguments);
  },
  actions: {
    loaded() {
      var self = this;
      if(!this.get('hasPrevious')){
        if (this.get('objects.firstObject')) {
          var params = {
            job_slug: this.get('objects.firstObject.slug'),
            company_slug: this.get('objects.firstObject.company.slug')
          };
          this.get('store').queryRecord('job-slug', params).then(function(response) {
            self.set('selectedJob', response);
          });
          this.set('jobs', this.get('objects'));
        } else {
          this.setProperties({
            jobs: [],
            selectedJob: null
          });
        }
      }
    }
  },
});
