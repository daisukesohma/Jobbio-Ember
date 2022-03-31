import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { htmlSafe } from '@ember/string';
import { schedule } from '@ember/runloop';
import config from '../config/environment';

export default Controller.extend({
    session: inject('session'),
    type: "company",
    country: "",
    country_short: "",
    country_code: "",
    latitude: "",
    longitude: "",
    agree: "",
    data: null,
    cloudfront: config.APP.CLOUD_FRONT_HOST,
    backgroundImage: computed(function(){
      // Produces
      // Binding style attributes may introduce cross-site scripting vulnerabilities warning
      // but is escaped
      return new htmlSafe(this.get('cloudfront')+"images/site/"+this.get('type')+"_registration_background.jpg");
    }),
    init: function () {
        this._super();
    },
    actions: {
        register: function(){
            var first_name = this.get('first_name');
            var last_name = this.get('last_name');
            var email = this.get('email');
            var phone = this.get('phone');
            var password = this.get('password');

            var address = this.get('address');
            var country = this.get('country');
            var country_short = this.get('country_short');
            var latitude = this.get('latitude');
            var longitude = this.get('longitude');

            var size = this.get('size');
            var hiring = this.get('hiring');

            this.set('data', {
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone: phone,
                password: password,
                country_code: "+353",
                country_short: country_short,
                country: country,
                address: address,
                longitude: longitude,
                latitude: latitude,
                size: size,
                hiring: hiring,
            });
        },
        didUpdatePlace: function(place) {
            var country, country_short, city, state;
            this.set('place_id', place.place.id);
            this.set('address', place.place.formatted_address);
            if(!place.lng){
              this.set('longitude', null);
            }else{
              this.set('longitude', place.lng.toFixed(8));
            }
            if(!place.lat){
              this.set('longitude', null);
            }else{
              this.set('latitude', place.lat.toFixed(8));
            }

            place.place.address_components.forEach(function(address_component){
                var type = address_component.types[0];
                if(type == "country"){
                  country = address_component.long_name;
                  country_short = address_component.short_name;
                }
                if(type == "locality" || type == "postal_town") {
                    city = address_component.long_name;
                }
                else if(type == "administrative_area_level_1") {
                    state = address_component.long_name;
                }
            });

            this.set('country', country);
            this.set('country_short', country_short);
            this.set('city', city);
            this.set('state', state);
        },
        invalidUserSelection: function() {

        },
        agree: function() {
            if(this.get('agree')){
                this.set('agree', false);
            }else{
                this.set('agree', true);
            }
        },
        login: function(){
          var email = this.get('data.email');
          var password = this.get('data.password');
          var credentials = {identification: email, password: password}
          this.get('session').authenticate('authenticator:token', credentials);
        },
    },
    clearProperties: function (){
      this.setProperties({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          password: "",
          country_code: "",
          country: "",
          address: "",
          longitude: "",
          latitude: "",
      });
    },
    validateForm: function() {
        schedule("afterRender",this,function() {
            window.$.validator.addMethod("password", function(value) {
                if (!/[a-zA-Z]/.test(value)) {
                    return false;
                } else if (!/[0-9]/.test(value)) {
                    return false;
                }
               return true;
            }, function(error, element) {
                var value = window.$(element).val();
                if (!/[a-zA-Z]/.test(value)) {
                    return 'Password must contain a character.';
                } else if (!/[0-9]/.test(value)) {
                    return 'Password must contain a number.';
                }
            });
            window.$.validator.addMethod("customEmail", function(value, element) {
                return this.optional( element ) || (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test( value );
            });
            window.$.validator.addMethod("valueNotEquals", function(value, element, arg){
                return arg !== value;
            });
            window.$.validator.addMethod("mustContainLetters", function(value){
                return /\w*[a-zA-Z]\w*/.test(value);
            });

            var self = this;

            window.$(".registrationForm").validate({
                errorElement: 'label',
                errorClass: "validation-error",
                errorPlacement: function(error, element) {
                    if (element.attr("name") == "terms") {
                        error.insertAfter(".input-checkbox-wrapper");
                    }
                    else {
                        error.insertAfter(element);
                    }
                },
                rules:{
                    name: {
                        required: true,
                        mustContainLetters: true,
                        maxlength: 30,
                    },
                    first_name: {
                        required: true,
                        maxlength: 30,
                    },
                    last_name: {
                        required: true,
                        maxlength: 30,
                    },
                    email: {
                        required: true,
                        customEmail: true,
                        maxlength: 200,
                    },
                    password: {
                        required: true,
                        minlength: 6,
                        maxlength: 20,
                        password: true,
                    },
                    phone: {
                        required: true,
                        maxlength: 15,
                        number: true,
                    },
                    address: {
                        required: true,
                    },
                    terms: {
                        required: true,
                    },
                    size: {
                        required: true,
                    },
                    hiring: {
                        required: true,
                    },
                },
                messages: {
                    name: {
                        required: "We need this information to create your account.",
                        mustContainLetters: "Company Name should contain at least 1 letter.",
                        maxlength: "Company Name should contain at most 30 characters.",
                    },
                    first_name: {
                        required: "First name required.",
                        maxlength: "First Name should contain at most 30 characters.",
                    },
                    last_name: {
                        required: "Last name required.",
                        maxlength: "Last Name should contain at most 30 characters.",
                    },
                    email: {
                        required: "Email address required.",
                        customEmail: "Make sure the format is correct: yourname@domain.com",
                        email: "Make sure the format is correct: yourname@domain.com"
                    },
                    password: {
                        required: "Password required.",
                        minlength: "Password should contain at least 6 characters.",
                        maxlength: "Password should contain at most 20 characters.",
                    },
                    phone: {
                        required: "We need this information to create your account.",
                        maxlength: "Contact Number should contain at most 15 characters.",
                        number: "Please only enter numbers."
                    },
                    address: {
                        required: "Location required.",
                    },
                    terms: {
                        required: "You must agree to the terms and conditions before registering!",
                    },
                    size: {
                        required: "We need this information to create your account.",
                    },
                    hiring: {
                        required: "We need this information to create your account.",
                    },
                },
                onfocusout: function(element) {
                    self.set(`errors.${element.name}`, '');
                    window.$(element).valid();
                },
                invalidHandler: function() {
                    window.$('html').animate({
                        scrollTop: 0
                    }, 800);
                }
            });
        });
    }
});
