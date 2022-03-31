import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  hero_title: DS.attr(),
  subtitle: DS.attr(),
  onboarding_message: DS.attr(),
  cta: DS.attr(),
  image: DS.attr(),
  package_details: DS.attr(),
  slug: DS.attr(),
  package_page_details: DS.attr(),
  secondary_title: DS.attr(),
  secondary_subtitle: DS.attr(),
  secondary_text: DS.attr(),
  logos: DS.attr(),
  footer: DS.attr(),
  counter: DS.attr(),
  price: DS.attr(),
  currency: DS.attr(),
  form_title: DS.attr(),
  description: DS.attr(),
  customizable: DS.attr(),
  type: DS.attr()
});
