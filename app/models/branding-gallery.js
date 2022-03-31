import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr("string"),
    type: DS.attr("string"),
    branding: DS.attr("string"),
    image: DS.attr("string"),
    content: DS.attr(),
    created_at: DS.attr("date"),
    updated_at: DS.attr("date"),
});
