import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
	name:	validator('presence', {
            presence: true,
            message: 'This is a required field!'
        }),
	email:	validator('format', {
			allowBlank: true,
			type: 'email',
			message: 'Enter a valid email address'
		})
});

export default DS.Model.extend(Validations, {
	// onboarding step 3
	name: DS.attr('string'),
	email: DS.attr('string'),
	package: DS.attr(),
	amount: DS.attr(),
	coupon: DS.attr(),
	payment_method_id: DS.attr(),
	payment_intent_id: DS.attr(),
	oid: DS.attr(),
	card_token: DS.attr(),
});
