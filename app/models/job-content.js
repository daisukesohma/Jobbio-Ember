import DS from 'ember-data';

export default DS.Model.extend({
    branding: DS.attr('string'),
    detail: DS.attr('string'),
    image: DS.attr('string'),
    impressions: DS.attr('string'),
    in_bank: DS.attr('string'),
    text: DS.attr('string'),
    title: DS.attr('string'),
    type: DS.attr('string'),
    video: DS.attr('string'),
    views: DS.attr('number'),
    content_id: DS.attr('number')
});
