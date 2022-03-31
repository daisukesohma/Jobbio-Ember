import DS from 'ember-data';

export default DS.Model.extend({
  slug: DS.attr(),
  company: DS.attr('number'),
  vpo: DS.attr(),
  coupon: DS.attr(),
  package: DS.attr(),
  credits: DS.attr('number'),
  jobbions: DS.attr('number'),
  package_pop_up: DS.attr(),
  transaction_no: DS.attr('number'),
  expires_at: DS.attr('date'),
  paid_at: DS.attr('date'),
  cancelled_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  created_at: DS.attr('date')
});
