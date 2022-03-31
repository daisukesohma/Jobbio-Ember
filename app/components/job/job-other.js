import PaginationComponent from '../pagination-component';
import { computed } from '@ember/object';
import config from '../../config/environment';

// this component shows 'Other Jobs' for a specified
// company - see the DRFAdapter for how it's url
// endpoint is derived
export default PaginationComponent.extend({
  myStickyOptionsLocation: null,
  myStickyOptions: null,
  modelType: 'job-other',
  link: config.APP.WEB_HOST,
  search: config.APP.WEB_HOST+'/search',
  company_id: computed('cursor', function(){
    return this.get('company.id');
  }),
  current_job_id: -1,
  page_size: 6,
  linkToChannel: false, // if set to true will override view more and instead go to channel
  params: computed('cursor', function(){
    var params = this._super();
    params['job_id'] = this.get('job.id');
    params['company_id'] = this.get('job.company.id');
    return params;
  }),
  // jobs is just an accessor for objects that removes
  // the 'potential' current job from the objects list
  jobs: computed('cursor', 'current_job_id', function(){
    var jobs = [];
    var objects = this.get('objects');
    for(var i = 0; i < objects.length; i++){
      var job = objects.objectAt(i);
      if(job.get('id') != this.get('current_job_id')){
        jobs.push(job);
      }
    }
    return jobs;
  }),
  init() {
    this._super(...arguments);
    this.set('myStickyOptionsLocation', {
      wrapperClassName: '',
      topSpacing: 80,
      bottomSpacing: 1400
    });
    this.set('myStickyOptions', {
      wrapperClassName: '',
      topSpacing: 80,
      bottomSpacing: 590
    });
  },
  actions: {
    jobSelected: function() {
      window.$('html,body').animate({scrollTop: 0}, 800);
    }
  }
});
