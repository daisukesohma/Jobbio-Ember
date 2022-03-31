import DS from 'ember-data';

export default DS.Model.extend({
  // onboarding step 2
  job_type_id: DS.attr(),
  title: DS.attr(),
  address: DS.attr(),
  country: DS.attr(),
  country_short: DS.attr(),
  city: DS.attr(),
  state: DS.attr(),
  post_code: DS.attr(),
  oid: DS.attr(),
});
