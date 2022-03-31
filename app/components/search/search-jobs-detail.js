import BaseComponent from '../base-component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { later } from '@ember/runloop';
import config from '../../config/environment';

export default BaseComponent.extend({
  currentUser: inject('current-user'),
  router: inject(),
  store: inject(),
  link: config.APP.WEB_HOST,
  tracking: null,
  myStickyOptions: null,
  loading: false,
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
  device: computed('userAgent', function() {
    return this.get('userAgent.device.isDesktop') ? 'desktop' :
      this.get('userAgent.device.isMobile') ? 'mobile' :
      'unsure';
  }),
  buttons: computed('selectedJob', 'selectedJob.application_status', function() {
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
            if (this.get('selectedJob.has_applied')) {
              if (this.get('selectedJob.application_status') == 'draft') {
                if (this.get('selectedJob.questions').length) {
                  buttons.pushObject({
                    bannerID: 'jobBannerSubmitApplicationQuestions',
                    id: 'jobDetailSubmitApplicationQuestions',
                    type: 'onClickAction',
                    class: 'btn btn--md btn--primary type--uppercase',
                    text: 'Submit Application',
                    action: 'applyWithAnswers'
                  });
                } else {
                  buttons.pushObject({
                    bannerID: 'jobBannerSubmitApplicationNoQuestions',
                    id: 'jobDetailSubmitApplicationNoQuestions',
                    type: 'onClickAction',
                    class: 'btn btn--md btn--primary type--uppercase',
                    text: 'Submit Application',
                    action: 'apply',
                    actionParam: this.get('selectedJob.id')
                  });
                }
              } else if (this.get('selectedJob.application_status') == 'pending') {
                buttons.pushObject({
                  bannerID: 'jobBannerSubmitApplicationPending',
                  id: 'jobDetailSubmitApplicationPending',
                  type: 'onClickAction',
                  class: 'btn btn--md btn--primary type--uppercase',
                  text: 'Submit Application',
                  action: 'changeStatus',
                  actionParam: 'submitted'
                });
              } else {
                buttons.pushObject({
                  bannerID: 'jobBannerApplicationSubmitted',
                  id: 'jobDetailApplicationSubmitted',
                  type: 'default',
                  class: 'btn btn--md type--uppercase',
                  text: 'Application Submitted'
                });
              }
            } else {
              buttons.pushObject({
                bannerID: 'jobBannerSaveJob',
                id: 'jobDetailSaveJob',
                type: 'onClickAction',
                class: 'btn btn--md type--uppercase',
                text: 'Save Job',
                action: 'save',
                actionParam: this.get('selectedJob.id')
              });
              if (this.get('selectedJob.questions').length) {
                buttons.pushObject({
                  bannerID: 'jobBannerApplyQuestions',
                  id: 'jobDetailApplyQuestions',
                  type: 'onClickAction',
                  class: 'btn btn--md btn--primary type--uppercase',
                  text: 'Apply',
                  action: 'applyWithAnswers'
                });
              } else {
                buttons.pushObject({
                  bannerID: 'jobBannerApplyNoQuestions',
                  id: 'jobDetailApplyNoQuestions',
                  type: 'onClickAction',
                  class: 'btn btn--md btn--primary type--uppercase',
                  text: 'Apply',
                  action: 'apply',
                  actionParam: this.get('selectedJob.id')
                });
              }
            }
          } else {
            if (this.get('selectedJob.has_applied')) {
              if (this.get('selectedJob.application_status') == 'draft') {
                if (this.get('selectedJob.questions').length) {
                  buttons.pushObject({
                    bannerID: 'jobBannerSubmitApplicationQuestionsDraft',
                    id: 'jobDetailSubmitApplicationQuestionsDraft',
                    type: 'onClickAction',
                    class: 'btn btn--md btn--primary type--uppercase',
                    text: 'Submit Application',
                    action: 'applyWithAnswers'
                  });
                } else {
                  buttons.pushObject({
                    bannerID: 'jobBannerSubmitApplicationNoQuestionsDraft',
                    id: 'jobDetailSubmitApplicationNoQuestionsDraft',
                    type: 'onClickAction',
                    class: 'btn btn--md btn--primary type--uppercase',
                    text: 'Submit Application',
                    action: 'changeStatus',
                    actionParam: 'pending'
                  });
                }
              } else if (this.get('selectedJob.application_status') == 'pending') {
                buttons.pushObject({
                  bannerID: 'jobBannerSubmitApplicationPendingDraft',
                  id: 'jobDetailSubmitApplicationPendingDraft',
                  type: 'onClickAction',
                  class: 'btn btn--md btn--primary type--uppercase',
                  text: 'Submit Application',
                  action: 'popUp'
                });
              } else {
                buttons.pushObject({
                  bannerID: 'jobBannerApplicationSubmittedDraft',
                  id: 'jobDetailApplicationSubmittedDraft',
                  type: 'default',
                  class: 'btn btn--md type--uppercase',
                  text: 'Application Submitted'
                });
              }
            } else {
              buttons.pushObject({
                bannerID: 'jobBannerSaveJobNotApplied',
                id: 'jobDetailSaveJobNotApplied',
                type: 'onClickAction',
                class: 'btn btn--md type--uppercase',
                text: 'Save Job',
                action: 'save',
                actionParam: this.get('selectedJob.id')
              });
              if (this.get('selectedJob.questions').length) {
                buttons.pushObject({
                  bannerID: 'jobBannerApplyQuestionsNotApplied',
                  id: 'jobDetailApplyQuestionsNotApplied',
                  type: 'onClickAction',
                  class: 'btn btn--md btn--primary type--uppercase',
                  text: 'Apply',
                  action: 'applyWithAnswers'
                });
              } else {
                buttons.pushObject({
                  bannerID: 'jobBannerApplyNoQuestionsNotApplied',
                  id: 'jobDetailApplyNoQuestionsNotApplied',
                  type: 'onClickAction',
                  class: 'btn btn--md btn--primary type--uppercase',
                  text: 'Apply',
                  action: 'submit',
                  actionParam: this.get('selectedJob.id')
                });
              }
            }
          }
        }
      } else {
        buttons.pushObject({
          bannerID: 'jobBannerSaveJobNotMember',
          id: 'jobDetailSaveJobNotMember',
          type: 'linkTo',
          route: 'talent.register',
          class: 'btn btn--md type--uppercase',
          text: 'Save Job'
        });
        if (this.get('selectedJob.redirect')) {
          buttons.pushObject({
            bannerID: 'jobBannerApplyRedirect',
            id: 'jobDetailApplyRedirect',
            type: 'onClickAction',
            class: 'btn btn--md btn--primary type--uppercase',
            text: 'Apply',
            action: 'apply',
          });
        } else {
          buttons.pushObject({
            bannerID: 'jobBannerApplyNotRedirect',
            id: 'jobDetailApplyNotRedirect',
            type: 'linkTo',
            route: 'talent.register',
            class: 'btn btn--md btn--primary type--uppercase',
            text: 'Apply'
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
    this.set('myStickyOptions', {
      wrapperClassName: '',
      topSpacing: 140,
      bottomSpacing: 590
    });
  },
  didRender() {
    this._super(...arguments);
    window.$('.search-job-detail .search-job-detail-container').animate({
      scrollTop: 0
    }, 800);
  },
  actions: {
    applyWithAnswers: function() {
      this.set('jobQuestionsModalOpened', !this.get('jobQuestionsModalOpened'));
      window.$('#jobQuestions').modal('show');
    },
    apply: function(id) {
      var data;
      if (this.get('selectedJob.redirect')) {
        data = {"job_id":this.get('selectedJob.id')};
        this.get('store').createRecord('redirect', data).save();
        window.open(this.get('selectedJob.redirect'), '_blank');
      } else {
        this.set('loading', true);
        var self = this;
        data = {
          'status': 'submitted',
          'answers': {},
          'job_id': id,
          'ccuid': this.get('tracking.ccuid')
        };
        data['device'] = this.get('device');
        data['app_source'] = this.get('tracking.app_source');
        if (this.get('selectedJob.application_status') == 'draft' || this.get('selectedJob.application_status') == 'pending') {
          this.get('store').createRecord('patch-job', data).save().then(() => {
            self.set('selectedJob.has_applied', true);
            self.set('selectedJob.application_status', 'submitted');
            later(function() {
              self.set('loading', false);
            }, 500);
            window.dataLayer.push({
              event: 'jtm.ApplicationSubmitted',
              userID: self.get('currentUser.current.id'),
              companyID: self.get('selectedJob.company.id'),
              jobID: id,
              appSource: self.get('tracking.app_source'),
              source: self.get('tracking.source')
            });
            self.toast.success('Application submitted successfully.');
          }).catch((xhr) => {
            self.set('loading', false);
            self.set('error', xhr.errors);
          });
        } else {
          this.get('store').createRecord('submitted-job', data).save().then(() => {
            self.set('selectedJob.has_applied', true);
            self.set('selectedJob.application_status', 'submitted');
            later(function() {
              self.set('loading', false);
            }, 500);
            window.dataLayer.push({
              event: 'jtm.ApplicationSubmitted',
              userID: self.get('currentUser.current.id'),
              companyID: self.get('selectedJob.company.id'),
              jobID: id,
              appSource: self.get('tracking.app_source'),
              source: self.get('tracking.source')
            });
            self.toast.success('Application submitted successfully.');
          }).catch((xhr) => {
            self.set('loading', false);
            self.set('error', xhr.errors);
          });
        }
      }
    },
    submit: function(id) {
      var data;
      if (this.get('selectedJob.redirect')) {
        data = {"job_id":this.get('model.id')};
        this.get('store').createRecord('redirect', data).save();
        window.open(this.get('selectedJob.redirect'), '_blank');
      } else {
        this.set('loading', true);
        var self = this;
        data = {
          'status': 'pending',
          'answers': {},
          'job_id': id,
          'ccuid': this.get('tracking.ccuid')
        };
        data['device'] = this.get('device');
        data['app_source'] = this.get('tracking.app_source');
        this.get('store').createRecord('submitted-job', data).save().then(response => {
          self.set('selectedJob.has_applied', true);
          self.set('selectedJob.application_status', 'pending');
          self.set('selectedJob.application_id', response.id);
          later(function() {
            self.set('loading', false);
          }, 500);
          window.$('#jobCompleteBioPending').modal('show');
        }).catch((xhr) => {
          self.set('loading', false);
          self.set('error', xhr.errors);
        });
      }
    },
    popUp: function() {
      if (this.get('selectedJob.redirect')) {
        var data = {"job_id":this.get('model.id')};
        this.get('store').createRecord('redirect', data).save();
        window.open(this.get('selectedJob.redirect'), '_blank');
      } else {
        window.$('#jobCompleteBio').modal('show');
      }
    },
    changeStatus: function(status) {
      this.set('loading', true);
      var self = this;
      var url = `${config.APP.API_HOST}/jobs/${this.get('selectedJob.id')}/applications`;
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
          self.set('selectedJob.has_applied', true);
          self.set('selectedJob.application_status', status);
          self.set('selectedJob.application_id', response.id);
          later(function() {
            self.set('loading', false);
          }, 500);
          if (status == 'submitted') {
            self.toast.success('Application submitted successfully.');
            window.dataLayer.push({
              event: 'jtm.ApplicationSubmitted',
              userID: self.get('currentUser.current.id'),
              companyID: self.get('selectedJob.company.id'),
              jobID: self.get('selectedJob.id')
            });
          } else if (status == 'pending') {
            window.$('#jobCompleteBioPending').modal('show');
          }
        }, function(xhr) {
          self.set('loading', false);
          self.set('error', xhr.responseText);
          if (xhr.responseText == undefined) {
            var self = this;
            later(function() {
              self.set('loading', false);
            }, 500);
            if (status == 'submitted') {
              self.toast.success('Application submitted successfully.');
            } else if (status == 'pending') {
              window.$('#jobCompleteBioPending').modal('show');
            }
          }
        });
      });
    },
    goToJobPage: function(job) {
      window.open(`${this.get('link')}/companies/${job.get('company.slug')}/jobs/${job.get('slug')}?source=${job.get('company.slug')}_job`, '_blank');
    },
    goToCompanyChannel: function(job) {
      window.open(`${this.get('link')}/${job.get('company.slug')}`, '_blank');
    }
  }
});
