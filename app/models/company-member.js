import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo("user"),
  company: DS.belongsTo("company"),
  role: DS.attr("string"),
  updated_at: DS.attr("date"),
  created_at: DS.attr("date")
});
