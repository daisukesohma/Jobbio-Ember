import BaseComponent from '../base-component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import config from '../../config/environment';

export default BaseComponent.extend({
  currentUser: inject('current-user'),
  router: inject(),
  store: inject(),
  job: null,
  link: config.APP.WEB_HOST,
  tracking: null,
  isTalent: computed('currentUser', function() {
    return this.get('currentUser.current.user.role') == 'talent';
  }),
  bioCompleted: computed('currentUser', function() {
    return this.get('currentUser.current.completion') >= 60;
  }),
  isNotCompanyMember: computed('currentUser', function() {
    return this.get('currentUser.current.user.role') != 'company_member';
  }),
  isAdmin: computed('currentUser', function() {
    return this.get('session.data.authenticated.jobbio_admin.user.role') == 'jobbio_admin';
  }),
  salary: computed('job', function() {
    if (this.get('job.salary_disclosed')) {
      var salaryFrom = this.get('job.salary_from');
      var salaryTo = this.get('job.salary_to');
    }
    return salaryFrom > 0 && salaryTo > 0 ? `${salaryFrom} - ${salaryTo}` :
      salaryTo > 0 ? salaryTo :
      salaryFrom > 0 ? salaryFrom :
      '';
  }),
  salaryType: computed('job', function() {
    var salary = '';
    if (this.get('job.salary_disclosed')) {
      salary = this.get('job.salary_type') == 'hour' ? 'p/hr' : '';
    }
    return salary;
  }),
  device: computed('userAgent', function() {
    return this.get('userAgent.device.isDesktop') ? 'desktop' :
      this.get('userAgent.device.isMobile') ? 'mobile' :
      'unsure';
  }),
  buttons: computed('job', 'job.application_status', function() {
    // ##Button types and attributes##
    //
    // -- default --
    // id: unique ID
    // type: default
    // class: CSS classes
    // text: text inside the button
    // href: URL where the button will redirect to
    // target: _blank, etc
    //
    // -- linkTo --
    // id: unique ID
    // type: linkTo
    // class: CSS classes
    // text: text inside the button
    // route: Ember route where the button will redirect to
    //
    // -- onClickAction --
    // id: unique ID
    // type: onClickAction
    // class: CSS classes
    // text: text inside the button
    // action: name of the action to be performed on click,
    // actionParam: input parameter for the button's action

    var buttons = [];
    if (!this.get('isAdmin')) {
      if (this.get('currentUser.current')) {
        if (this.get('isTalent')) {
          if (this.get('bioCompleted')) {
            if (this.get('job.has_applied')) {
              if (this.get('job.application_status') == 'draft') {
                if (this.get('job.questions').length) {
                  buttons.pushObject({
                    id: `searchSubmitApplicationQuestions_${this.get('job.id')}`,
                    type: 'onClickAction',
                    class: 'btn btn--sm btn--primary type--uppercase',
                    text: 'Submit Application',
                    action: 'applyWithAnswers',
                    actionParam: this.get('job')
                  });
                } else {
                  buttons.pushObject({
                    id: `searchSubmitApplicationNoQuestions_${this.get('job.id')}`,
                    type: 'onClickAction',
                    class: 'btn btn--sm btn--primary type--uppercase',
                    text: 'Submit Application',
                    action: 'apply',
                    actionParam: this.get('job.id')
                  });
                }
              } else if (this.get('job.application_status') == 'pending') {
                buttons.pushObject({
                  id: `searchSubmitApplicationPending_${this.get('job.id')}`,
                  type: 'onClickAction',
                  class: 'btn btn--sm btn--primary type--uppercase',
                  text: 'Submit Application',
                  action: 'changeStatus',
                  actionParam: 'submitted'
                });
              } else {
                buttons.pushObject({
                  id: `searchApplicationSubmitted_${this.get('job.id')}`,
                  type: 'default',
                  class: 'btn btn--sm type--uppercase',
                  text: 'Application Submitted'
                });
              }
            } else {
              if (this.get('job.questions').length) {
                buttons.pushObject({
                  id: `searchApplyQuestions_${this.get('job.id')}`,
                  type: 'onClickAction',
                  class: 'btn btn--sm btn--primary type--uppercase',
                  text: 'Apply',
                  action: 'applyWithAnswers',
                  actionParam: this.get('job')
                });
              } else {
                buttons.pushObject({
                  id: `searchApplyNoQuestions_${this.get('job.id')}`,
                  type: 'onClickAction',
                  class: 'btn btn--sm btn--primary type--uppercase',
                  text: 'Apply',
                  action: 'apply',
                  actionParam: this.get('job.id')
                });
              }
            }
          } else {
            if (this.get('job.has_applied')) {
              if (this.get('job.application_status') == 'draft') {
                if (this.get('job.questions').length) {
                  buttons.pushObject({
                    id: `searchSubmitApplicationQuestionsDraft_${this.get('job.id')}`,
                    type: 'onClickAction',
                    class: 'btn btn--sm btn--primary type--uppercase',
                    text: 'Submit Application',
                    action: 'applyWithAnswers',
                    actionParam: this.get('job')
                  });
                } else {
                  buttons.pushObject({
                    id: `searchSubmitApplicationNoQuestionsDraft_${this.get('job.id')}`,
                    type: 'onClickAction',
                    class: 'btn btn--sm btn--primary type--uppercase',
                    text: 'Submit Application',
                    action: 'changeStatus',
                    actionParam: 'pending'
                  });
                }
              } else if (this.get('job.application_status') == 'pending') {
                buttons.pushObject({
                  id: `searchSubmitApplicationPendingDraft_${this.get('job.id')}`,
                  type: 'onClickAction',
                  class: 'btn btn--sm btn--primary type--uppercase',
                  text: 'Submit Application',
                  action: 'popUp'
                });
              } else {
                buttons.pushObject({
                  id: `searchApplicationSubmittedDraft_${this.get('job.id')}`,
                  type: 'default',
                  class: 'btn btn--sm type--uppercase',
                  text: 'Application Submitted'
                });
              }
            } else {
              if (this.get('job.questions').length) {
                buttons.pushObject({
                  id: `searchApplyQuestionsNotApplied_${this.get('job.id')}`,
                  type: 'onClickAction',
                  class: 'btn btn--sm btn--primary type--uppercase',
                  text: 'Apply',
                  action: 'applyWithAnswers',
                  actionParam: this.get('job')
                });
              } else {
                buttons.pushObject({
                  id: `searchApplyNoQuestionsNotApplied_${this.get('job.id')}`,
                  type: 'onClickAction',
                  class: 'btn btn--sm btn--primary type--uppercase',
                  text: 'Apply',
                  action: 'submit',
                  actionParam: this.get('job.id')
                });
              }
            }
          }
        }
      } else {
        if (this.get('isNotCompanyMember')) {
          buttons.pushObject({
            id: `searchApplyRegister_${this.get('job.id')}`,
            type: 'onClickAction',
            class: 'btn btn--sm btn--primary type--uppercase',
            text: 'Apply',
            action: 'goToRegister',
            actionParam: this.get('job')
          });
        }
      }
    }
    return buttons;
  }),
  init() {
    this._super(...arguments);
    this.set('tracking', {
      ccuid: null,
      source: 'search_job',
      app_source: 'search_job'
    });
  },
  actions: {
    applyWithAnswers: function(job) {
      this.set('selectedJob', job);
      this.set('jobQuestionsModalOpened', !this.get('jobQuestionsModalOpened'));
      window.$('#jobQuestions').modal('show');
    },
    apply: function(id) {
      if (this.get('job.redirect')) {
        window.open(this.get('job.redirect'), '_blank');
      } else {
        this.set('selectedJob', this.get('job'));
        var self = this;
        var data = {
          'status': 'submitted',
          'answers': {},
          'job_id': id,
          'ccuid': this.get('tracking.ccuid')
        };
        data['device'] = this.get('device');
        data['app_source'] = this.get('tracking.app_source');
        let modelType;
        if (this.get('job.application_status') == 'draft' || this.get('job.application_status') == 'pending') {
          modelType = 'patch-job';
        } else {
          modelType = 'submitted-job';
        }
        this.get('store').createRecord(modelType, data).save().then(() => {
          self.set('job.has_applied', true);
          self.set('job.application_status', 'submitted');
          window.dataLayer.push({
            event: 'jtm.ApplicationSubmitted',
            userID: self.get('currentUser.current.id'),
            companyID: self.get('job.company.id'),
            jobID: id,
            appSource: self.get('tracking.app_source'),
            source: self.get('tracking.source')
          });
          window.$('#applicationComplete').modal('show');
          self.toast.success('Application submitted successfully.');
        }).catch((xhr) => {
          self.set('error', xhr.errors);
        });
      }
    },
    submit: function(id) {
      if (this.get('job.redirect')) {
        window.open(this.get('job.redirect'), '_blank');
      } else {
        this.set('selectedJob', this.get('job'));
        var self = this;
        var data = {
          'status': 'pending',
          'answers': {},
          'job_id': id,
          'ccuid': this.get('tracking.ccuid')
        };
        data['device'] = this.get('device');
        data['app_source'] = this.get('tracking.app_source');
        this.get('store').createRecord('submitted-job', data).save().then(response => {
          self.set('job.has_applied', true);
          self.set('job.application_status', 'pending');
          self.set('job.application_id', response.id);
          window.$('#jobCompleteBioPending').modal('show');
        }).catch((xhr) => {
          self.set('error', xhr.errors);
        });
      }
    },
    popUp: function() {
      if (this.get('job.redirect')) {
        window.open(this.get('job.redirect'), '_blank');
      } else {
        window.$('#jobCompleteBio').modal('show');
      }
    },
    changeStatus: function(status) {
      this.set('selectedJob', this.get('job'));
      var self = this;
      var url = config.APP.API_HOST + '/jobs/' + this.get('job.id') + '/applications';
      var data = {
        'status': status,
        'answers': {}
      };
      this.get('session').authorize('authorizer:token', (headerName, headerValue) => {
        window.$.ajax({
          url: url,
          headers: {
            Authorization: headerValue,
          },
          type: 'PATCH',
          data: JSON.stringify(data),
          contentType: 'application/json;charset=utf-8',
          dataType: 'json'
        }).then(function(response) {
          self.set('job.has_applied', true);
          self.set('job.application_status', status);
          self.set('job.application_id', response.id);
          if (status == 'submitted') {
            self.toast.success('Application submitted successfully.');
            window.$('#applicationComplete').modal('show');
            window.dataLayer.push({
              event: 'jtm.ApplicationSubmitted',
              userID: self.get('currentUser.current.id'),
              companyID: self.get('job.company.id'),
              jobID: self.get('job.id')
            });
          } else if (status == 'pending') {
            window.$('#jobCompleteBioPending').modal('show');
          }
        }, function(xhr) {
          self.set('error', xhr.responseText);
          if (xhr.responseText == undefined) {
            if (status == 'submitted') {
              self.toast.success('Application submitted successfully.');
              window.$('#applicationComplete').modal('show');
            } else if (status == 'pending') {
              window.$('#jobCompleteBio').modal('show');
            }
          }
        });
      });
    },
    goToRegister: function(job) {
      if (this.get('job.redirect')) {
        window.open(job.get('redirect'), '_blank');
      } else {
        this.get('router').transitionTo('talent.register', {
          queryParams: {
            job: job.get('id'),
            ccuid: this.get('tracking.ccuid'),
            app_source: this.get('tracking.app_source'),
            source: this.get('tracking.source')
          }
        });
      }
    },
  }
});
