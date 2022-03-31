import DS from 'ember-data';

export default DS.Model.extend({
    status: DS.attr('string'),
    ccuid: DS.attr('string'),
    app_source: DS.attr('string'),
    answers: DS.attr(),
    job_id: DS.attr('number'),
    device: DS.attr('string'),
});
