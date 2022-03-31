import BaseComponent from '../base-component';
import { computed } from '@ember/object';
import config from '../../config/environment';
import { inject } from '@ember/service';

export default BaseComponent.extend({
  didAgree: false,
  visible: 'password',
  router: inject(),
  errors: null,
  source: null,
  logo: `${config.APP.CLOUD_FRONT_HOST}images/site/logo_dark.png`,
  submitButtonText: computed('package.price', function() {
    if (this.get('package.price') > 0) {
      return `Pay ${this.get('currencySymbol')}${this.get('package.price')}`
    }
    return 'Get Started'
  }),
  backgroundImageUrl: computed('package.package_page_details', function() {
    if (this.get('package.package_page_details')) {
      return this.get('package.package_page_details.0.background_image')
    }
    return `${config.APP.CLOUD_FRONT_HOST}images/site/homepage-banner-airbnb.jpg`
  }),
  backgroundOverlay: computed('package.package_page_details', function() {
    if (!this.get('backgroundImageUrl')) {
      return 0;
    }
    if (this.get('package.package_page_details')) {
      return this.get('package.package_page_details.0.background_overlay')
    }
    return 8
  }),
  linkDisabled: computed('model.{company_name,first_name,last_name,email,password,phone}', 'didAgree', function() {
    if (this.get('model.company_name') && this.get('model.first_name') && this.get('model.last_name') && this.get('model.email') && this.get('model.password') && this.get('model.phone') && this.get('didAgree')) {
      return false;
    } else {
      return true;
    }
  }),
  currencySymbol: computed('package.currency', function() {
    var currencySymbol = '';
    switch (this.get('package.currency')) {
      case 'EUR':
        currencySymbol = '€';
        break;
      case 'GBP':
        currencySymbol = '£';
        break;
      case 'USD':
        currencySymbol = '$';
        break;
      case 'CAD':
        currencySymbol = '$';
        break;
      default:
        break;
    }
    return currencySymbol;
  }),
  init() {
    this._super(...arguments);
    this.set('errors', {});
    ////////////////// Application Count
    (function ($, s) {
      'use strict';
      // Application Count Widget
      // Convert to 1,000 notation
      var get_count_fmt = function (count) {
        return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      };
      var $application_count;
      var start;
      var per_day;
      var current_number;
      var today_date;
      var today_start;
      // Check for transitions
      var transitions = false;
      transitions = 'transition' in s || 'webkitTransition' in s || 'MozTransition' in s || 'msTransition' in s || 'OTransition' in s;
      var update_number_init = function () {
        $application_count = window.$('.application_count');
        start = parseInt($application_count.data('start') || 49191049);
        per_day = parseInt($application_count.data('per-day') || 125280);
        current_number = start;
        today_date = new Date();
        today_start = (new Date(today_date.getFullYear(), today_date.getMonth(), today_date.getDate())).getTime();

        $application_count.html('');
        setInterval(update_number, 1500);
      };
      // Update the current displayed number
      var update_number = function () {
        var current_timestamp = (new Date()).getTime();
        // Figure out average applications since the last check
        var next_number = start + Math.floor(per_day * ((current_timestamp - today_start) / (60 * 60 * 24 * 1000)));
        var current_fmt_number = get_count_fmt(current_number);
        var next_fmt_number = get_count_fmt(next_number);
        var current_numbers = current_fmt_number.split('');
        var next_numbers = next_fmt_number.split('');
        var current;
        var idx;
        for (var i = 0; i < next_numbers.length; i++) {
          // Using a closure here since Timeouts are needed for css transitions :\
          (function () {
            idx = next_numbers.length - i - 1;
            current = current_numbers[idx];
            var next = next_numbers[idx];
            var $number = $application_count.find('.number' + i);
            // Make the span
            if (!$number.length) {
              $number = window.$('<span/>')
              .addClass('number animate number' + i + (next === ',' ? ' comma' : ''))
              .bind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                var $this = window.$(this);
                var html = $this.html();
                $this
                .removeClass('animate');
                setTimeout(function () {
                  $this
                  .html(html.substring(html.length - 1))
                  .removeClass('change');
                }, 10);
              });
              $application_count.prepend($number);
              current = '&nbsp;';
            }
            // Change the number
            if (current != next) {
              $number
              .html(current + ' ' + next)
              .removeClass('animate change') // Will theoretically avoid a bug with transitionend not firing
              .addClass('animate');

              setTimeout(function () {
                if (transitions) {
                  $number.addClass('change');
                } else {
                  $number.html(next);
                }
              }, 10);
            }
          })();
        }
        current_number = next_number;
      };
      // Run number counter
      setTimeout( function() {
        update_number_init();
      }, 1000);
    })(window.$, document.documentElement.style);
  },
  didRender() {
    // Allow only numbers for phone field
    window.$('#onboardingPhone').on('keypress keyup blur', function(event) {
      if (event.which < 48 || event.which > 57) {
        event.preventDefault();
      }
    });
  },
  actions: {
    didAgree() {
      this.set('didAgree', !this.get('didAgree'));
    },
    passwordVisibility: function(visibility) {
      if(visibility == 'password'){
        this.set('visible', "text");
      }else if(visibility == 'text'){
        this.set('visible', "password");
      }
    },
    focus(state) {
      this.set('focused', state);
    },
    startOnboarding() {
      if(this.get('source')){
        this.set('model.source', this.get('source'));
      }
      this.set('model.package', this.get('package.slug'));
      this.get('model').validate().then(({validations}) => {
        var errors = {};
        validations.get('errors').forEach(error => {
          errors[error.attribute] = error.message;
        });
        this.set('errors', errors);
        if (validations.get('isValid')) {
          this.get('model').save().then(() => {
            var credentials = {identification: this.get('model.email'), password: this.get('model.password')}
            this.get('session').authenticate('authenticator:token', credentials);
          }).catch((xhr) => {
            var errors = {};
            xhr.errors.forEach((error) => {
              errors[error.source.pointer.replace('/data/attributes/', '')] = error.detail;
            });
            this.set('errors', errors);
          });
        }
      })
    },
    didUpdatePlace: function(place) {
      var country, country_short, city, state;
      this.set('place_id', place.place.id);
      this.set('model.address', place.place.formatted_address);
      if(!place.lng){
        this.set('model.longitude', null);
      }else{
        this.set('model.longitude', place.lng.toFixed(8));
      }
      if(!place.lat){
        this.set('model.longitude', null);
      }else{
        this.set('model.latitude', place.lat.toFixed(8));
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

      this.set('model.country', country);
      this.set('model.country_short', country_short);
      this.set('model.city', city);
      this.set('model.state', state);
      this.set('model.country_code', "+353")
    },
    invalidUserSelection: function() {

    },
  }
});
