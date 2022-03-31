import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr("string"),
    text: DS.attr("string"),
    branding: DS.attr("string"),
    type: DS.attr("string"),
    content: DS.attr(),
    image: DS.attr("string"),
    created_at: DS.attr("date"),
    updated_at: DS.attr("date"),
});
