import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { schedule } from '@ember/runloop';
import config from '../../config/environment';
import { later } from '@ember/runloop';

export default Controller.extend({
  windowscroll: inject(),
  session: inject('session'),
  currentUser: inject(),
  queryParams: [
    {source: 'apply-source'},
    {ccuid: 'apply-ccuid'},
    {mediaid: 'apply-mediaid'},
    {bidcode: 'apply-bidcode'},
    {app_source: 'apply-app_source'}
  ],
  job: null,
  source: null,
  channel: null,
  company: null,
  answers: null,
  applying: false,
  visible: 'password',
  type: "talent",
  errors: null,
  talentDashboard: config.APP.TALENT_DASHBOARD,
  myStickyOptions: null,
  salary: computed('model.job.salary_disclosed', function(){
    var salary = "Not disclosed";
    if (this.get('model.job.salary_disclosed')) {
      var salaryFrom = this.get('model.job.salary_from');
      var salaryTo = this.get('model.job.salary_to');

      if(salaryFrom > 0 && salaryTo > 0){
        salary = salaryFrom + ' - ' + salaryTo;
      }
      else if(salaryTo > 0){
        salary = salaryTo;
      }
      else if(salaryFrom > 0){
        salary = salaryFrom;
      }
    }
    return salary;
  }),
  canSubmit: computed('currentUser.current.completion', function() {
    if(this.get('currentUser.current.completion') >= 60) {
      return true;
    }else {
      return false;
    }
  }),
  questions: computed('model.job.questions', function(){
    var questions = this.get('model.job.questions');
    questions.forEach(function(question){
      if (question.type == 'range') {
        var options = question.options[0];
        if (!options.value) {
          options.value = [0,0];
        }
      }
    });

    // Animation Start : for only apply view
    schedule('afterRender', this, function() {
      this.send('stickySidebar');
    });

    this.get('windowscroll').on('scroll', () => {
      if (this.get('windowscroll.scrollTop') > 104) {
        window.$('.talent-registration-v2-bar #menu1').addClass('pos-fixed');
      } else {
        window.$('.talent-registration-v2-bar #menu1').removeClass('pos-fixed');
      }
    });
    // Animation End

    return questions;
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
    stickySidebar: function() {
      setTimeout(function() {
        window.$('.sticky-sidebars .sticky-sidebar-rightcol').stickySidebar({
          topSpacing: 120,
          bottomSpacing: 80
        });
      }, 1000);
    },
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
      if (window.$('.question textarea').length > 0) {
        window.$('.question textarea').each(function() {
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

      // SelectBoxes validations
      if (window.$('.select-question').length > 0) {
        window.$('.select-question').each(function() {
          var selectValidated = false;
          selectValidated = window.$(this).find('select[name*="single"]').val() != '';
          validations.push(selectValidated);
        });
      }

      if ((validations.indexOf(false) == -1 && validations.length > 0) || validations.length == 0) {
        window.$('.validation-error-message').hide();
        this.send('apply');
      } else {
        window.$('.validation-error-message').show();
        this.set('answers', null);
      }
    },
    apply: function() {
      this.set('applying', true);
      var self = this;
      var type = '';
      var form = window.$("form#registrationForm");
      var formData = form.serializeArray();
      var answers = {answers:{}};
      var key, value, full_value, object;
      window.$.map(formData, function(n){
        if(n['name'].indexOf('value') >= 0){
          key = parseInt(n['name'].substr(0, n['name'].indexOf('[')));
          var second_key = n['name'].match(/'([^']+)'/)[1];
          value = parseInt(n['value']);
          full_value = "{" + '"' + n['name'].match(/'([^']+)'/)[1] + '"' + ":" + n['value'] + "}";
          var object2 = JSON.parse(full_value);
          if(answers['answers'].hasOwnProperty(key)){
            answers['answers'][key][second_key] = value;
          }else{
            answers['answers'][key] = object2;
          }
        }
        else if(n['name'].indexOf('multi') >= 0){
          key = parseInt(n['name'].substr(0, n['name'].indexOf('[')));
          value = parseInt(n['value']);
          full_value = "{" + '"options_selected"' + ":[" + n['value'] + "]}";
          object = JSON.parse(full_value);
          if(answers['answers'].hasOwnProperty(key)){
            answers['answers'][key]['options_selected'].push(value);
          }else{
            answers['answers'][key] = object;
          }
        }
        else if(n['name'].indexOf('single') >= 0){
          key = parseInt(n['name'].substr(0, n['name'].indexOf('[')));
          value = parseInt(n['value']);
          full_value = "{" + '"option_selected"' + ":" + value + "}";
          object = JSON.parse(full_value);
          if(answers['answers'].hasOwnProperty(key)){
            answers['answers'][key]['option_selected'].push(value);
          }else{
            answers['answers'][key] = object;
          }
        }
        else if(n['name'].indexOf('bool') >= 0){
          key = parseInt(n['name'].substr(0, n['name'].indexOf('[')));
          value = '';
          if(n['value'] == "on"){
            value = true;
          }
          else if(n['value'] == "off"){
            value = false;
          }
          full_value = "{" + '"bool"' + ":" + value + "}";
          object = JSON.parse(full_value);
          answers['answers'][key] = object;
        }
        else{
          key = parseInt(n['name']);
          var user_input = n['value'];

          user_input = user_input.replace(/[\u0000-\u9999<>\&]/gim, function(i) {
            return '&#'+i.charCodeAt(0)+';';
          });
          full_value = "{" + '"text"' + ":" + '"' + user_input + '"' + "}";

          full_value = full_value.replace(/[\u0000-\u0019]+/g,"");
          object = JSON.parse(full_value);
          answers['answers'][key] = object;
        }
      });

      if(this.get('model.job.application_status') == 'draft') {
        type = "PATCH";
      }else {
        type = "POST";
      }

      if(this.get('currentUser.current.completion') >= 60) {
        answers['status'] = "submitted";
      }else {
        answers['status'] = "pending";
      }
      answers['ccuid'] = this.get('model.tracking.ccuid');
      answers['mediaid'] = this.get('model.tracking.mediaid');
      answers['bidcode'] = this.get('model.tracking.bidcode');
      if(this.get('model.tracking.app_source')){
        answers['app_source'] = this.get('model.tracking.app_source');
      }else{
        if(this.get('source')){
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

      var url = config.APP.API_HOST+'/jobs/'+this.get("model.job.id")+'/applications';

      this.get('session').authorize('authorizer:token', (headerName, headerValue) => {
        window.$.ajax({
          url: url,
          headers: {
            Authorization:headerValue,
          },
          type: type,
          data: JSON.stringify(answers),
          contentType: 'application/json;charset=utf-8',
          dataType: 'json'
        })
        .then(()=> {
          self.set('model.job.has_applied', true);
          self.set('model.job.application_status', 'submitted');
          later(function() {
            self.set('applying', false);
          }, 500);
          window.dataLayer.push({
            event: 'jtm.ApplicationSubmitted',
            userID: self.get('currentUser.current.id'),
            companyID: self.get('model.job.company.id'),
            jobID: self.get('model.job.id'),
            appSource: self.get('model.tracking.app_source'),
            source: self.get('model.tracking.source')
          });
          if(self.get('currentUser.current.completion') >= 60) {
            window.$('#applicationComplete').modal('show');
          }else {
            window.$('#jobCompleteBioPending').modal('show');
          }

        }, (xhr) => {
          self.set('applying', false);
          self.set('error', xhr.responseText);
          if(xhr.responseText == undefined){
            var self = this;
            later(function() {
              self.set('applying', false);
            }, 500);
            if(self.get('currentUser.current.completion') >= 60) {
              window.$('#applicationComplete').modal('show');
            }else {
              window.$('#jobCompleteBioPending').modal('show');
            }
          }
        });
      });
    },
    focus(state) {
      this.set('focused', state);
    }
  },
});
