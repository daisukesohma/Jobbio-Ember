import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: {
    'featured': {refreshModel: true},
    'popular': {refreshModel: true},
    'partner': {refreshModel: true},
    'location': {refreshModel: true},
  }
});
