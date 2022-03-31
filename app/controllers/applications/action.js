import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: [
    {id: 'id'},
    {token: 'token'},
    {status: 'status'},
    {job_id: 'job_id'},
  ],
});
