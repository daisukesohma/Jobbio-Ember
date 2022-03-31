import DS from 'ember-data';

export default DS.Model.extend({
  'nav_link_list': DS.attr(),
  title: DS.attr(),
  icon: DS.attr(),
  link_id: DS.attr(),
  link: DS.attr(),
});
