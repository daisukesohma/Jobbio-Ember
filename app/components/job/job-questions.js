import BaseComponent from '../base-component';
import config from '../../config/environment';
import { observer } from '@ember/object';
import { inject } from '@ember/service';
import { later } from '@ember/runloop';

export default BaseComponent.extend({
  currentUser: inject('current-user'),
  store: inject(),
  applying: false,
  session: inject(),
  descriptionOpened: false,
  onJobChanged: observer('job', function() {
    this.set('descriptionOpened', false);
    window.$('#jobQuestions .job-description').fadeOut();
  }),
  onJobQuestionsModalOpened: observer('jobQuestionsModalOpened', function() {
    window.$('#jobQuestions').animate({
      scrollTop: 0
    }, 400);
    window.$('#jobQuestions .validation-error-message').hide();
  }),
  init() {
    this._super(...arguments);
  },
  actions: {
    submit: function() {
      var validations = [];
      // Checkboxes validation
      if (window.$('.checkbox-question').length > 0) {
        window.$('.checkbox-question').each(function() {
          var checkboxQuestionsValidated = false;
          window.$(this).find(':checkbox').each(function() {
            if (window.$(this).prop('checked') && !checkboxQuestionsValidated) {
              checkboxQuestionsValidated = true
            }
          });
          validations.push(checkboxQuestionsValidated);
        });
      }
      //Textarea validations
      if (window.$('.text-question textarea').length > 0) {
        window.$('.text-question textarea').each(function() {
          var textareaValidated = false;
          textareaValidated = window.$(this).val() != '';
          validations.push(textareaValidated);
        });
      }
      // Range validations
      if (window.$('.range-question').length > 0) {
        window.$('.range-question').each(function() {
          var rangeValidated = false;
          var from = window.$(this).find('input[id*="from"]').val();
          var to = window.$(this).find('input[id*="to"]').val();
          if (from != to) {
            rangeValidated = true;
          }
          validations.push(rangeValidated);
        });
      }
      if ((!validations.includes(false) && validations.length > 0) || validations.length == 0) {
        window.$('#jobQuestions .validation-error-message').hide();
        this.send('apply');
      } else {
        window.$('#jobQuestions .validation-error-message').show();
      }
    },
    apply: function() {
      if (this.get('job.redirect')) {
        window.open(this.get('job.redirect'), '_blank');
      } else {
        this.set('applying', true);
        var type = '';
        var form = window.$('form#applicationForm');
        var formData = form.serializeArray();
        var answers = {
          answers: {}
        };
        window.$.map(formData, function(n) {
          var key = null;
          var second_key = null;
          var value = null;
          var full_value = null;
          var object = null;
          if (n['name'].indexOf('value') >= 0) {
            key = parseInt(n['name'].substr(0, n['name'].indexOf('[')));
            second_key = n['name'].match(/'([^']+)'/)[1];
            value = parseInt(n['value']);
            full_value = `{"${second_key}":${n['value']}}`;
            var object2 = JSON.parse(full_value);
            if (answers['answers'].hasOwnProperty(key)) {
              answers['answers'][key][second_key] = value;
            } else {
              answers['answers'][key] = object2;
            }
          } else if (n['name'].indexOf('multi') >= 0) {
            key = parseInt(n['name'].substr(0, n['name'].indexOf('[')));
            value = parseInt(n['value']);
            full_value = `{"options_selected":["${n['value']}"]}`;
            object = JSON.parse(full_value);
            if (answers['answers'].hasOwnProperty(key)) {
              answers['answers'][key]['options_selected'].push(value);
            } else {
              answers['answers'][key] = object;
            }
          } else if (n['name'].indexOf('single') >= 0) {
            key = parseInt(n['name'].substr(0, n['name'].indexOf('[')));
            value = parseInt(n['value']);
            full_value = `{"option_selected":${value}}`;
            object = JSON.parse(full_value);
            if (answers['answers'].hasOwnProperty(key)) {
              answers['answers'][key]['option_selected'].push(value);
            } else {
              answers['answers'][key] = object;
            }
          } else if (n['name'].indexOf('bool') >= 0) {
            key = parseInt(n['name'].substr(0, n['name'].indexOf('[')));
            value = '';
            if (n['value'] == "on") {
              value = true;
            } else if (n['value'] == "off") {
              value = false;
            }
            full_value = `{"bool":${value}}`;
            object = JSON.parse(full_value);
            answers['answers'][key] = object;
          } else {
            key = parseInt(n['name']);
            var user_input = n['value'];
            user_input = user_input.replace(/[\u0000-\u9999<>\&]/gim, function(i) {
              return '&#' + i.charCodeAt(0) + ';';
            });
            full_value = `{"text":"${user_input}"}`;
            full_value = full_value.replace(/[\u0000-\u0019]+/g,"");
            object = JSON.parse(full_value);
            answers['answers'][key] = object;
          }
        });

        if(this.get('job.application_status') == 'draft') {
          type = "PATCH";
        }else {
          type = "POST";
        }

        if(this.get('currentUser.current.completion') >= 60) {
          answers['status'] = "submitted";
        }else {
          answers['status'] = "pending";
        }

        answers['ccuid'] = this.get('tracking.ccuid');
        answers['mediaid'] = this.get('tracking.mediaid');
        answers['bidcode'] = this.get('tracking.bidcode');
        if (this.get('tracking.app_source')) {
          answers['app_source'] = this.get('tracking.app_source');
        } else {
          if (this.get('source')) {
            answers['app_source'] = this.get('source');
          }
        }

        if(this.get('userAgent.device.isDesktop')) {
          answers['device'] = 'desktop';
        }else if(this.get('userAgent.device.isMobile')) {
          answers['device'] = 'mobile';
        }else {
          answers['device'] = 'unsure';
        }

        var url = `${config.APP.API_HOST}/jobs/${this.get('job.id')}/applications`;
        var self = this;

        this.get('session').authorize('authorizer:token', (headerName, headerValue) => {
          window.$.ajax({
              url: url,
              headers: {
                Authorization: headerValue,
              },
              type: type,
              data: JSON.stringify(answers),
              contentType: 'application/json;charset=utf-8',
              dataType: 'json'
            }).then(function() {
              self.set('job.has_applied', true);
              self.set('job.application_status', 'submitted');
              later(function() {
                self.set('applying', false);
              }, 500);
              window.dataLayer.push({
                event: 'jtm.ApplicationSubmitted',
                userID: self.get('currentUser.current.id'),
                companyID: self.get('job.company.id'),
                jobID: self.get('job.id'),
                appSource: self.get('tracking.app_source'),
                source: self.get('tracking.source')
              });
              window.$('#jobQuestions').modal('hide');
              self.send('clearModal');
              if (self.get('currentUser.current.completion') >= 60) {
                if (self.get('page') == 'search') {
                  self.toast.success('Application submitted successfully.');
                } else {
                  window.$('#applicationComplete').modal('show');
                }
              } else {
                self.set('job.application_status', 'pending');
                window.$('#jobCompleteBioPending').modal('show');
              }
            }, function(xhr) {
              self.set('applying', false);
              self.set('error', xhr.responseText);
              if (xhr.responseText == undefined) {
                later(function() {
                  self.set('applying', false);
                }, 500);
                window.$('#jobQuestions').modal('hide');
                self.send('clearModal');
                if (self.get('currentUser.current.completion') >= 60) {
                  if (self.get('page') == 'search') {
                    self.toast.success('Application submitted successfully.');
                  } else {
                    window.$('#applicationComplete').modal('show');
                  }
                } else {
                  self.set('job.application_status', 'pending');
                  window.$('#jobCompleteBioPending').modal('show');
                }
              }
            });
        });
      }
    },
    toggleDescription: function() {
      this.set('descriptionOpened', !this.get('descriptionOpened'));
      window.$('#jobQuestions .job-description').fadeToggle();
    },
    clearModal: function() {
      window.$('#jobQuestions').find('textarea').val('');
    }
  },
});
