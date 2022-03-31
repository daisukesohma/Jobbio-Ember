import BaseComponent from '../base-component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { Promise } from 'rsvp';
import config from '../../config/environment';
import DS from 'ember-data';

export default BaseComponent.extend({
  router: inject(),
  store: inject(),
  currentUser: inject('current-user'),
  cardEl: null,
  stripeEl: null,
  single: '',
  unlimited: 'payment-package-type',
  type: 'unlimited',
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
  errors: null,
  amount: computed( function() {
    let self = this;
    let price = 0;
    let request = new Promise(function(resolve){
      self.get('store').queryRecord('package', 'onboarding-subscription').then(function(subscription) {
        price = (subscription.get('price') - (subscription.get('price') * self.get('discount')/100)).toFixed(2);
        resolve(price)
      });
    });
    return DS.PromiseObject.create({ promise: request})
  }),
  singlePrice:  computed('discount', function() {
    let self = this;
    let price = 0;
    let request = new Promise(function(resolve){
      self.get('store').queryRecord('package', 'single-job-post-1').then(function(single) {
        price = (single.get('price') - (single.get('price') * self.get('discount')/100)).toFixed(2);
        resolve(price)
      });
    });
    return DS.PromiseObject.create({ promise: request})
  }),
  unlimitedPrice: computed('discount', function() {
    let self = this;
    let price = 0;
    let request = new Promise(function(resolve){
      self.get('store').queryRecord('package', 'onboarding-subscription').then(function(subscription) {
        price = (subscription.get('price') - (subscription.get('price') * self.get('discount')/100)).toFixed(2);
        resolve(price)
      });
    });
    return DS.PromiseObject.create({ promise: request})
  }),
  packagePrice: computed('discount', function() {
    return (this.get('package.price') - (this.get('package.price') * this.get('discount')/100)).toFixed(2)
  }),
  paying: false,
  discount: 0,
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
    this.set('model.oid', this.get('oid'));
    this.set('discount', 0);
    this.set('errors', {});
    this.set('model.email', this.get('currentUser.session.data.authenticated.company_member.user.email'));
    if(this.get('package')){
      let type = this.get('package.type')
      if(type === 'subscription'){
        this.set('type', 'unlimited');
      }else{
        this.set('type', 'single');
      }
    }
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
    var style = {
      base: {
        fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
        fontSize: '16px',
        fontWeight: 400,
        "::placeholder": {
          color: '#c0c0c0'
        }
      }
    };
    if (!this.get('cardEl')) {
      var key = config.APP.STRIPE;
      var stripe = window.Stripe(key);
      var elements = stripe.elements();
      var cardElement = elements.create('card', {
        hidePostalCode: true,
        style: style
      });
      this.set('cardEl', cardElement);
      this.set('stripeEl', stripe);
      cardElement.mount('#card-element');
    }
    //////////////// Progress Horizontal (bars)
    window.$('.progress-horizontal').each(function () {
      if (window.$(this).find('.progress-horizontal__progress').length == 0) {
        var bar = window.$(this).find('.progress-horizontal__bar'),
            barObject = {},
            progress = window.$('<div class="progress-horizontal__progress"></div>');
        bar.prepend(progress);
        barObject.element = bar;
        barObject.progress = progress;
        barObject.value = parseInt(bar.attr('data-value'), 10) + "%";
        barObject.offsetTop = bar.offset().top;
        barObject.animate = false;
        if (window.$(this).hasClass('progress-horizontal--animate')) {
          barObject.animate = true;
        } else {
          progress.css('width', barObject.value);
        }
      }
    });
  },
  actions: {
    submitForm() {
      // persist data to back-end here
      this.set('paying', true);
      if(this.get('package')){
        this.set('model.amount', this.get('packagePrice'));
      }else{
        this.set('model.amount', this.get('amount.content'));
      }
      if (!this.get('model.email')) this.set('model.email', undefined);
      this.get('model').validate().then(({validations}) => {
        var errors = {};
        validations.get('errors').forEach(error => {
          errors[error.attribute] = error.message;
        });
        errors['coupon'] = this.get('errors.coupon');
        this.set('errors', errors);
        if (validations.get('isValid')) {
          var self = this;
          var stripe = this.get('stripeEl')
          var cardElement = this.get('cardEl');
          if(this.get('type') == 'single') {
            stripe.createPaymentMethod('card', cardElement, {
              billing_details: {name: this.get('card_name')}
            }).then(function(result) {
              if (result.error) {
                // Inform the customer that there was an error.
                self.set('errors.number', result.error.message);
                self.set('paying', false);
              } else {
                // Otherwise send paymentMethod.id to your server (see Step 2)
                self.set('model.card_token', undefined);
                self.set('model.payment_method_id', result.paymentMethod.id);
                self.get('model').save().then(() => {
                  self.send('goToCompanyDashboard');
                  self.set('paying', false);
                }).catch((xhr) => {
                  self.set('paying', false);
                  self.send('handleServerError', xhr.errors);
                });
              }
            });
          }else if(this.get('type') == 'unlimited') {
            stripe.createToken(cardElement).then(function(result) {
              if (result.error) {
                // Inform the customer that there was an error.
                self.set('errors.number', result.error.message);
                self.set('paying', false);
              } else {
                // Send the token to your server.
                self.set('model.payment_method_id', undefined);
                self.set('model.card_token', result.token.id);
                self.get('model').save().then(() => {
                  self.send('goToCompanyDashboard');
                  self.set('paying', false);
                }).catch((xhr) => {
                  self.set('paying', false);
                  self.send('handleServerError', xhr.errors);
                });
              }
            });
          }
        }else{
          this.set('paying', false);
        }
      })
    },
    setPackage(type) {
      if(type == 'single') {
        this.set('type', 'single');
        this.set('single', 'payment-package-type');
        this.set('unlimited', '');
        this.set('amount', this.get('singlePrice.content'));
      }else{
        this.set('type', 'unlimited');
        this.set('unlimited', 'payment-package-type');
        this.set('single', '');
        this.set('amount', this.get('unlimitedPrice.content'));
      }
    },
    validateCoupon() {
      if (this.get('model.coupon.length') >= 4) {
        var data = {
          code: this.get('model.coupon')
        }
        var self = this;
        window.$.ajax({
          url: `${config.APP.API_HOST}/coupons/active`,
          type: "POST",
          data: JSON.stringify(data),
          contentType: 'application/json;charset=utf-8',
          dataType: 'json'
        }).then((response)=> {
          self.set('discount', response.discount);
          self.set('errors.coupon', '');
        }, (xhr) => {
          self.set('discount', 0);
          if (xhr.responseJSON.detail == 'Not found.') {
            self.set('errors.coupon', 'Invalid coupon');
          }
        });
      }
    },
    goToCompanyDashboard() {
      if(this.get('currentUser.current.company.draft_jobs')){
        window.location.assign(config.APP.HTTP_PROTOCOL + "company." + config.APP.DOMAIN + "/jobs?tab=draft_jobs");
      }else{
        window.location.assign(config.APP.HTTP_PROTOCOL + "company." + config.APP.DOMAIN + "/post-job");
      }
    },
    handleServerError(errors) {
      var response = {};
      errors.forEach((error) => {
        response[error.source.pointer.replace('/data/attributes/', '')] = error.detail;
      });
      if (response.message) {
        this.set('errors.number', response.message);
        this.set('paying', false);
      } else if (response.requires_action) {
        var self = this;
        var stripe = this.get('stripeEl');
        if(this.get('type') === 'single'){
          stripe.handleCardAction(response.payment_intent_client_secret).then(function(result) {
            if (result.error) {
              self.set('errors.number', result.error.message);
              self.set('paying', false);
            } else {
              self.set('model.payment_intent_id', result.paymentIntent.id);
              self.get('model').save().then(() => {
                self.send('goToCompanyDashboard');
                self.set('paying', false);
              }).catch((xhr) => {
                self.send('handleServerError', xhr.errors);
                self.set('paying', false);
              });
            }
          })
        }else{
          stripe.handleCardPayment(response.payment_intent_client_secret).then(function(result) {
            if (result.error) {
              self.set('errors.number', result.error.message);
              self.set('paying', false);
            } else {
              self.set('model.payment_intent_id', result.paymentIntent.id);
              self.get('model').save().then(() => {
                self.send('goToCompanyDashboard');
                self.set('paying', false);
              }).catch((xhr) => {
                self.send('handleServerError', xhr.errors);
                self.set('paying', false);
              });
            }
          })
        }

      }
    }
  }
});
