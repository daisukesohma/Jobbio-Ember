import DS from 'ember-data';

export default DS.Model.extend({
  types: DS.attr(),
  countries: DS.attr(),
});
