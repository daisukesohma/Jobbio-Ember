import DS from 'ember-data';

export default DS.Model.extend({
  channel_slug: DS.attr('string'),
});
