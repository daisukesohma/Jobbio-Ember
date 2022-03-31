import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
    email: {
        validators: [
            validator('presence', {
                presence: true,
                message: 'Email is required!'
            }),
            validator('format', {
                type: 'email',
                message: 'Enter a valid email address'
            })
        ]
    },
    new_password: {
        validators: [
            validator('presence', {
                presence: true,
                message: 'Password is required!'
            }),
            validator('length', {
                min: 6,
                message: 'Password is too short (minimum is 6 characters)'
            }),
            validator('format', {
                regex: /^(?=.*[0-9])(?=.*[a-zA-Z])([\S]+)$/,
                message: 'Password must include at least one letter and a number'
            })
        ]
    }
});

export default DS.Model.extend(Validations, {
    email: DS.attr('string'),
    new_password: DS.attr('string'),
    token: DS.attr('string')
});
