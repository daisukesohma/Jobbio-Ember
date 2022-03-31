import DS from 'ember-data';

export default DS.Model.extend({
    type: DS.attr("string"),
    branding: DS.attr("string"),
    text: DS.attr("string"),
    title: DS.attr("string"),
    detail: DS.attr("string"),
    content: DS.attr(),
    created_at: DS.attr("date"),
    updated_at: DS.attr("date"),
});
