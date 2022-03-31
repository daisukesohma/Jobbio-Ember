import BaseRegisterController from '../base-register-controller';
import { computed, observer } from '@ember/object';
import { schedule } from '@ember/runloop';
import { htmlSafe } from '@ember/string';
import { inject } from '@ember/service';
import config from '../../config/environment';
import { later } from '@ember/runloop';

export default BaseRegisterController.extend({
  router: inject(),
  windowscroll: inject(),
  queryParams: ['job', 'source', 'channel', 'company', 'ccuid', 'mediaid', 'bidcode', 'app_source'],
  job: null,
  source: null,
  channel: null,
  company: null,
  answers: null,
  cvFile: null,
  registering: false,
  visible: 'password',
  type: "talent",
  errors: null,
  myStickyOptions: null,
  didRegister: false,
  didAgree: false,
  popupCount: 0,
  salary: computed('model.job.salary_disclosed', function () {
    var salary = "Not disclosed";
    if (this.get('model.job.salary_disclosed')) {
      var salaryFrom = this.get('model.job.salary_from');
      var salaryTo = this.get('model.job.salary_to');

      if (salaryFrom > 0 && salaryTo > 0) {
        salary = salaryFrom + ' - ' + salaryTo;
      } else if (salaryTo > 0) {
        salary = salaryTo;
      } else if (salaryFrom > 0) {
        salary = salaryFrom;
      }
    }
    return salary;
  }),
  questions: computed('model.job.questions', function () {
    var questions = this.get('model.job.questions');
    questions.forEach(function (question) {
      if (question.type == 'range') {
        var options = question.options[0];
        if (!options.value) {
          options.value = [0, 0];
        }
      }
    });
    later(function () {
      questions.forEach(question => {
        window.$(`#${question.id}`).rules("add", {
          required: true
        });
      })
    }, 1000);
    return questions;
  }),
  actionsWithJob: observer('job', function () {
    // Presence of job means that user lands on new registration page with job.
    schedule('afterRender', this, function () {
      this.send('stickySidebar');
      this.send('animateNavbar');
      this.send('showPopup');
      this.send('validateForm', this);
    });
  }),
  logoDark: computed(function () {
    // Produces
    // Binding style attributes may introduce cross-site scripting vulnerabilities warning
    // but is escaped
    return new htmlSafe(this.get('cloudfront') + "images/site/logo_dark.png");
  }),
  init() {
    this._super(...arguments);
    this.set('errors', {});
    this.set('myStickyOptions', {
      wrapperClassName: '',
      topSpacing: 50,
      bottomSpacing: 80
    });
  },
  actions: {
    stickySidebar() {
      setTimeout(function () {
        window.$('.sticky-sidebars .sticky-sidebar-rightcol').stickySidebar({
          topSpacing: 120,
          bottomSpacing: 80
        });
      }, 1000);
    },
    animateNavbar() {
      this.get('windowscroll').on('scroll', () => {
        if (this.get('windowscroll.scrollTop') > 104) {
          window.$('.talent-registration-v2-bar #menu1').addClass('pos-fixed');
        } else {
          window.$('.talent-registration-v2-bar #menu1').removeClass('pos-fixed');
        }
      });
    },
    showPopup() {
      var self = this;
      window.$(document).bind("mouseleave", function (e) {
        if (self.get('router.currentRouteName') == 'talent.register') {
          if (e.pageY - window.$(window).scrollTop() <= 1) {
            if (self.get('popupCount') <= 1) {
              if (!window.$('#applicationPop').is(':visible')) {
                self.set('popupCount', self.get('popupCount') + 1);
              }
              window.$('#applicationPop').modal('show');
            }
          }
        }
      });
    },
    didAgree() {
      this.set('didAgree', !this.get('didAgree'));
    },
    register() {
      if (this.get('job')) {
        this.send('answersValidate');
      }
      if (this.get('didAgree')) {
        this.set('registering', true);
        window.$('.validation-error-message.agree').hide();
        this._super();
        var data = this.get('data');
        if (this.get('model.source')) {
          data.source = this.get('model.source');
        }
        if (this.get('model.app_source')) {
          data.app_source = this.get('model.app_source');
        } else {
          if (this.get('model.source')) {
            data.app_source = this.get('model.source');
          }
        }
        data.channel = this.get('channel');
        data.job = this.get('job');
        data.company = this.get('company');
        data.status = "pending";
        data.ccuid = this.get('model.ccuid');

        var execute = true;
        if (this.get('job')) {
          data.answers = this.get('answers');
          if (this.get('userAgent.device.isDesktop')) {
            data.device = 'desktop';
          } else if (this.get('userAgent.device.isMobile')) {
            data.device = 'mobile';
          } else {
            data.device = 'unsure';
          }
          if (this.get('answers') == null) {
            execute = false;
          }
        }
        if (execute) {
          if (this.get('cvFile')) {
            data.answers = JSON.stringify(data.answers);
            var options = {
              contentType: 'application/json',
              dataType: 'json',
              method: 'POST',
              fileKey: 'cv',
              data: data
            };
            this.get('cvFile').upload(config.APP.API_HOST + '/talent', options).then((response) => {
              this.send('registerSuccessed', response.body);
            }).catch((xhr) => {
              var errors = xhr.body;
              this.send('registerFailed', errors);
            });
          } else {
            window.$.ajax({
              url: config.APP.API_HOST + '/talent',
              type: 'POST',
              data: JSON.stringify(data),
              contentType: 'application/json;charset=utf-8',
              dataType: 'json'
            }).then((response) => {
              this.send('registerSuccessed', response);
            }, (xhr) => {
              var errors = JSON.parse(xhr.responseText);
              this.send('registerFailed', errors);
            });
          }
        }
      } else {
        window.$('.validation-error-message.agree').show();
      }
    },
    answersValidate() {
      var validations = [];

      // Checkboxes validation
      if (window.$('.checkbox-question').length > 0) {
        window.$('.checkbox-question').each(function () {
          var checkboxQuestionsValidated = false;
          window.$(this).find(':checkbox').each(function () {
            if (window.$(this).prop('checked') && !checkboxQuestionsValidated) {
              checkboxQuestionsValidated = true
            }
          });
          validations.push(checkboxQuestionsValidated);
        });
      }

      //Textarea validations
      if (window.$('.question textarea').length > 0) {
        window.$('.question textarea').each(function () {
          var textareaValidated = false;
          textareaValidated = window.$(this).val() != '';
          validations.push(textareaValidated);
        });
      }

      // Range validations
      if (window.$('.range-question').length > 0) {
        window.$('.range-question').each(function () {
          var rangeValidated = false;
          var from = window.$(this).find('input[id*="from"]').val();
          var to = window.$(this).find('input[id*="to"]').val();
          if (from != to) {
            rangeValidated = true;
          }
          validations.push(rangeValidated);
        });
      }

      // SelectBoxes validations
      if (window.$('.select-question').length > 0) {
        window.$('.select-question').each(function () {
          var selectValidated = false;
          selectValidated = window.$(this).find('select[name*="single"]').val() != '';
          validations.push(selectValidated);
        });
      }

      if ((validations.indexOf(false) == -1 && validations.length > 0) || validations.length == 0) {
        window.$('.validation-error-message.questions').hide();
        this.send('getAnswers');
      } else {
        window.$('.validation-error-message.questions').show();
        this.set('answers', null);
      }
    },
    getAnswers() {
      var form = window.$("form#registrationForm");
      var formData = form.serializeArray();
      var answers = {};
      var key, value, full_value, object;
      window.$.map(formData, function (n) {
        if (n['name'].indexOf('value') >= 0) {
          key = parseInt(n['name'].substr(0, n['name'].indexOf('[')));
          var second_key = n['name'].match(/'([^']+)'/)[1];
          value = parseInt(n['value']);
          full_value = "{" + '"' + n['name'].match(/'([^']+)'/)[1] + '"' + ":" + n['value'] + "}";
          var object2 = JSON.parse(full_value);
          if (answers.hasOwnProperty(key)) {
            answers[key][second_key] = value;
          } else {
            answers[key] = object2;
          }
        } else if (n['name'].indexOf('multi') >= 0) {
          key = parseInt(n['name'].substr(0, n['name'].indexOf('[')));
          value = parseInt(n['value']);
          full_value = "{" + '"options_selected"' + ":[" + n['value'] + "]}";
          object = JSON.parse(full_value);
          if (answers.hasOwnProperty(key)) {
            answers[key]['options_selected'].push(value);
          } else {
            answers[key] = object;
          }
        } else if (n['name'].indexOf('single') >= 0) {
          key = parseInt(n['name'].substr(0, n['name'].indexOf('[')));
          value = parseInt(n['value']);
          full_value = "{" + '"option_selected"' + ":" + value + "}";
          object = JSON.parse(full_value);
          if (answers.hasOwnProperty(key)) {
            answers[key]['option_selected'].push(value);
          } else {
            answers[key] = object;
          }
        } else if (n['name'].indexOf('bool') >= 0) {
          key = parseInt(n['name'].substr(0, n['name'].indexOf('[')));
          value = '';
          if (n['value'] == "on") {
            value = true;
          } else if (n['value'] == "off") {
            value = false;
          }
          full_value = "{" + '"bool"' + ":" + value + "}";
          object = JSON.parse(full_value);
          answers[key] = object;
        } else if (n['name'].indexOf('text') >= 0) {
          key = parseInt(n['name']);
          var user_input = n['value'];

          user_input = user_input.replace(/[\u0000-\u9999<>\&]/gim, function (i) {
            return '&#' + i.charCodeAt(0) + ';';
          });
          full_value = "{" + '"text"' + ":" + '"' + user_input + '"' + "}";

          full_value = full_value.replace(/[\u0000-\u0019]+/g, "");
          object = JSON.parse(full_value);
          answers[key] = object;
        }
      });

      this.set('answers', answers);
    },
    passwordVisibility(visibility) {
      if (visibility == 'password') {
        this.set('visible', "text");
      } else if (visibility == 'text') {
        this.set('visible', "password");
      }
    },
    focus(state) {
      this.set('focused', state);
    },
    fileAdded(file) {
      var fileTypes = ['text/plain', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (fileTypes.includes(file.get('type'))) {
        this.set('cvFile', file);
      } else {
        var errors = {};
        errors.cv = 'Incorrect document type, please upload a pdf or docx file.';
        this.set('errors', errors);
        var self = this;
        later(function () {
          self.set('errors.cv', '');
        }, 2500);
      }
    },
    registerSuccessed(response) {
      this.set('signupComplete', true);
      this.clearProperties();
      var self = this;
      later(function () {
        self.set('registering', false);
      }, 500);
      this.set('didRegister', true);
      window.dataLayer.push({
        event: 'jtm.ApplicationSubmitted',
        userID: response.talent.user.id,
        companyID: self.get('model.job.company.id'),
        jobID: self.get('job'),
        source: self.get('model.source')
      });
      this.send('login');
    },
    registerFailed(errors) {
      this.set('registering', false);
      if (!errors.address && (errors.country || errors.country_short || errors.longitude || errors.latitude)) {
        errors.address = 'Please enter a valid location.';
      }
      if (errors.cv) {
        errors.cv = 'Incorrect document type, please upload a pdf or docx file.';
      }
      this.set('errors', errors);
      var self = this;
      later(function () {
        self.set('errors.cv', '');
      }, 2500);
      window.$('html').animate({
        scrollTop: 0
      }, 800);
    },
    validateForm: function (self) {
      window.$.validator.addMethod("password", function (value) {
        if (!/[a-zA-Z]/.test(value)) {
          return false;
        } else if (!/[0-9]/.test(value)) {
          return false;
        }
        return true;
      }, function (error, element) {
        var value = window.$(element).val();
        if (!/[a-zA-Z]/.test(value)) {
          return 'Password must contain a character.';
        } else if (!/[0-9]/.test(value)) {
          return 'Password must contain a number.';
        }
      });
      window.$.validator.addMethod("customEmail", function (value, element) {
        return this.optional(element) || (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value);
      });
      window.$.validator.addMethod("valueNotEquals", function (value, element, arg) {
        return arg !== value;
      });
      window.$.validator.addMethod("mustContainLetters", function (value) {
        return /\w*[a-zA-Z]\w*/.test(value);
      });

      window.$(".registrationForm").validate({
        errorElement: 'label',
        errorClass: "validation-error",
        errorPlacement: function (error, element) {
          if (element.attr("name") == "terms") {
            error.insertAfter(".input-checkbox-wrapper");
          } else {
            error.insertAfter(element);
          }
        },
        rules: {
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
        onfocusout: function (element) {
          self.set(`errors.${element.name}`, '');
          window.$(element).valid();
        },
        invalidHandler: function (form, validator) {
          if (!validator.numberOfInvalids())
            return;

          let scrollTop = window.$(validator.errorList[0].element).offset().top - window.$('.nav-container').height() - 50;
          window.$('html, body').animate({
            scrollTop: scrollTop
          }, 800);
        }
      });
    }
  }
});
