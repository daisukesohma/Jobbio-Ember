import DS from 'ember-data';

export default DS.Model.extend({
  slug: DS.attr("string"),
  name: DS.attr("string"),
  active: DS.attr("number"),
  caption: DS.attr("string"),
  description: DS.attr("string"),
  company: DS.attr(),
  companies: DS.attr(),
  type: DS.attr("string"),
  views: DS.attr("number"),
  impressions: DS.attr("number"),
  banner: DS.attr("string"),
  logo: DS.attr("string"),
  card: DS.attr("string"),
  updated_at: DS.attr("date"),
  created_at: DS.attr("date"),
  popular: DS.attr(),
  featured: DS.attr(),
  is_following: DS.attr(),
  live_jobs: DS.attr(),
  is_member: DS.attr()
});
