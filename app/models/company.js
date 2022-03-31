import DS from 'ember-data';

export default DS.Model.extend({
  location: DS.attr(),
  vpo_id: DS.attr('number'),
  name: DS.attr('string'),
  slug: DS.attr('string'),
  description: DS.attr('string'),
  caption: DS.attr('string'),
  status: DS.attr('string'),
  featured: DS.attr('number'),
  views: DS.attr('number'),
  impressions: DS.attr('number'),
  talent_pool: DS.attr('number'),
  new_applications: DS.attr('number'),
  new_messages: DS.attr('number'),
  live_jobs: DS.attr('number'),
  image_banner: DS.attr('string'),
  image_logo: DS.attr('string'),
  image_card: DS.attr('string'),
  jobbions: DS.attr('number'),
  last_seen: DS.attr('date'),
  updated_at: DS.attr('date'),
  created_at: DS.attr('date'),
  branding_channel: DS.attr(),
  cards: DS.attr(),
  colour: DS.attr(),
});
