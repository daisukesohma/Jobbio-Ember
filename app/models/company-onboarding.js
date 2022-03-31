import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
    email: validator('format', {
        type: 'email',
        message: 'Enter a valid email address'
    }),
    password: {
        validators: [
            validator('length', {
                min: 6,
                message: 'Password is too short (minimum is 6 characters)'
            }),
            validator('format', {
                regex: /^(?=.*[0-9])(?=.*[a-zA-Z])([\S]+)$/,
                message: 'Password must include at least one letter and a number'
            })
        ]
    },
    phone: validator('number', {
        allowString: true,
        integer: true,
        gt: 5,
        message: 'Enter only numbers'
    })
});

export default DS.Model.extend(Validations, {
  // onboarding step 1
  company_name: DS.attr(),
  first_name: DS.attr(),
  last_name: DS.attr(),
  password: DS.attr(),
  phone: DS.attr(),
  email: DS.attr(),
  longitude: DS.attr(),
  latitude: DS.attr(),
  address: DS.attr(),
  country: DS.attr(),
  country_short: DS.attr(),
  city: DS.attr(),
  state: DS.attr(),
  country_code: DS.attr(),
  source: DS.attr(),
  package: DS.attr(),
});
