import DS from 'ember-data';

export default DS.Model.extend({
  city: DS.attr("string"),
  state: DS.attr("string"),
  country: DS.attr("string"),
  address_line_1: DS.attr("string"),
  address_line_2: DS.attr("string"),
  address_line_3: DS.attr("string"),
  postal_code: DS.attr("string")
});
