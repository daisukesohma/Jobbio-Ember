import DS from 'ember-data';

export default DS.Model.extend({
  role: DS.attr("string"),
  first_name: DS.attr("string"),
  last_name: DS.attr("string"),
  email: DS.attr("string"),
  country_code: DS.attr("string"),
  phone: DS.attr("string"),
  password: DS.attr("string"),
  is_active: DS.attr("number"),
  status: DS.attr("string"),
  avatar: DS.attr("string"),
  source: DS.attr("string"),
  last_seen: DS.attr("date"),
  updated_at: DS.attr("date"),
  created_at: DS.attr("date")
});
