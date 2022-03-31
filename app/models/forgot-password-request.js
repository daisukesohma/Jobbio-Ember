import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
    email: [
        validator('presence', {
            presence: true,
            message: 'Email is required!'
        }),
        validator('format', {
            type: 'email',
            message: 'Enter a valid email address'
        })
    ]
});

export default DS.Model.extend(Validations, {
    email: DS.attr('string')
});
