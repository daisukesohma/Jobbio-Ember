import DS from 'ember-data';

// this model holds the variable form data returned by the api
export default DS.Model.extend({
  job_types: DS.attr(),
  job_levels: DS.attr(),
  contracts: DS.attr(),
  salary_types: DS.attr(),
  currencies: DS.attr(),
});