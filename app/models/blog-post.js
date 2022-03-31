import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr("string"),
  text: DS.attr("string"),
  link: DS.attr("string"),
  posted_at: DS.attr("string"),
  image: DS.attr("string"),
});
