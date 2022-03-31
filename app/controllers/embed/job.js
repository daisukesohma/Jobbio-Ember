import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: {
    'ccuid': {refreshModel: true},
    'source': {refreshModel: true},
    'app_source': {refreshModel: true},
    'job_id': {refreshModel: true}
  }
});
