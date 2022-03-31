import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: {
    'id': {refreshModel: true},
    'token': {refreshModel: true},
    'jid': {refreshModel: true}
  }
});
