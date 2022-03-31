import BaseComponent from '../base-component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { later } from '@ember/runloop';
import config from '../../config/environment';

export default BaseComponent.extend({
  store: inject(),
  link: config.APP.WEB_HOST,
  windowscroll: inject(),
  applying: false,
  saving: false,
  currentUser: inject('current-user'),
  backgroundImage: computed(function() {
    // Binding style attributes may introduce cross-site scripting vulnerabilities warning
    // but is escaped
    var imageUrl = this.get('model').get('company.image_banner');
    if (imageUrl === null) {
      var number = Math.floor(Math.random() * 4) + 1;
      imageUrl = `company-placeholders/company-banner-${number}.jpeg`;
      return new htmlSafe(`${this.get('cloudfront')}images/site/${imageUrl}`);
    }
    return new htmlSafe(imageUrl);
  }),
  isTalent: computed('currentUser', function() {
    return this.get('currentUser.current.user.role') == 'talent';
  }),
  bioCompleted: computed('currentUser', function() {
    return this.get('currentUser.current.completion') >= 60;
  }),
  isNotTalent: computed('currentUser', function() {
    return this.get('currentUser.current.user.role') != 'talent';
  }),
  isNotCompanyMember: computed('currentUser', function() {
    return this.get('currentUser.current.user.role') != 'company_member';
  }),
  isAdmin: computed('currentUser', function() {
    return this.get('session.data.authenticated.jobbio_admin.user.role') == 'jobbio_admin';
  }),
  salary: computed('model', function() {
    if (this.get('model.salary_disclosed')) {
      var salaryFrom = this.get('model.salary_from');
      var salaryTo = this.get('model.salary_to');
    }
    return salaryFrom > 0 && salaryTo > 0 ? `${salaryFrom} - ${salaryTo}` :
      salaryTo > 0 ? salaryTo :
      salaryFrom > 0 ? salaryFrom :
      '';
  }),
  salaryType: computed('model', function() {
    var salary = '';
    if (this.get('model.salary_disclosed')) {
      salary = this.get('model.salary_type') == 'hour' ? 'p/hr' : '';
    }
    return salary;
  }),
  device: computed('userAgent', function() {
    return this.get('userAgent.device.isDesktop') ? 'desktop' :
      this.get('userAgent.device.isMobile') ? 'mobile' :
      'unsure';
  }),
  appSource: computed('tracking.app_source', function() {
    if (this.get('tracking.app_source')) {
      return this.get('tracking.app_source');
    } else if (this.get('source')) {
      return this.get('tracking.source');
    }
  }),
  buttons: computed('model', 'model.application_status', function() {
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
    // -- linkToApply --
    // id: unique ID
    // type: linkTo
    // class: CSS classes
    // text: text inside the button
    // route: Ember route where the button will redirect to
    // param1: first query parameter
    // param2: second query parameter
    //
    // -- linkToRegister --
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
      if (this.get('embed')) {
        buttons.pushObject({
          id: `jobListItemSlug_${this.get('model.id')}`,
          type: 'default',
          class: 'btn btn--md btn--primary type--uppercase',
          text: 'Apply',
          href: `${this.get('link')}/talent/register?job=${this.get('model.id')}&source=${this.get('model.company.slug')}_career_page`,
          target: '_blank'
        });
      } else {
        if (this.get('currentUser.current')) {
          if (this.get('isTalent')) {
            if (this.get('bioCompleted')) {
              if (this.get('model.has_applied')) {
                if (this.get('model.application_status') == 'draft') {
                  if (this.get('model.questions').length) {
                    buttons.pushObject({
                      id: 'jobBannerSubmitApplicationQuestions',
                      type: 'linkToApply',
                      class: 'btn btn--md btn--primary type--uppercase',
                      text: 'Submit Application',
                      route: 'job.apply',
                      param1: this.get('model.company.slug'),
                      param2: this.get('model.slug')
                    });
                  } else {
                    buttons.pushObject({
                      id: 'jobBannerSubmitApplicationNoQuestions',
                      type: 'onClickAction',
                      class: 'btn btn--md btn--primary type--uppercase',
                      text: 'Submit Application',
                      action: 'apply',
                      actionParam: this.get('model.id')
                    });
                  }
                } else if (this.get('model.application_status') == 'pending') {
                  buttons.pushObject({
                    id: 'jobBannerSubmitApplicationPending',
                    type: 'onClickAction',
                    class: 'btn btn--md btn--primary type--uppercase',
                    text: 'Submit Application',
                    action: 'changeStatus',
                    actionParam: 'submitted'
                  });
                } else {
                  buttons.pushObject({
                    id: 'jobBannerApplicationSubmitted',
                    type: 'default',
                    class: 'btn btn--md type--uppercase',
                    text: 'Application Submitted'
                  });
                }
              } else {
                buttons.pushObject({
                  id: 'jobBannerSaveJob',
                  type: 'onClickAction',
                  class: 'btn btn--md type--uppercase',
                  text: 'Save Job',
                  action: 'save',
                  actionParam: this.get('model.id')
                });
                if (this.get('model.questions').length) {
                  buttons.pushObject({
                    id: 'jobBannerApplyQuestions',
                    type: 'linkToApply',
                    class: 'btn btn--md btn--primary type--uppercase',
                    text: 'Apply',
                    route: 'job.apply',
                    param1: this.get('model.company.slug'),
                    param2: this.get('model.slug')
                  });
                } else {
                  buttons.pushObject({
                    id: 'jobBannerApplyNoQuestions',
                    type: 'onClickAction',
                    class: 'btn btn--md btn--primary type--uppercase',
                    text: 'Apply',
                    action: 'apply',
                    actionParam: this.get('model.id')
                  });
                }
              }
            } else {
              if (this.get('model.has_applied')) {
                if (this.get('model.application_status') == 'draft') {
                  if (this.get('model.questions').length) {
                    buttons.pushObject({
                      id: 'jobBannerSubmitApplicationQuestionsDraft',
                      type: 'linkToApply',
                      class: 'btn btn--md btn--primary type--uppercase',
                      text: 'Submit Application',
                      route: 'job.apply',
                      param1: this.get('model.company.slug'),
                      param2: this.get('model.slug')
                    });
                  } else {
                    buttons.pushObject({
                      id: 'jobBannerSubmitApplicationNoQuestionsDraft',
                      type: 'onClickAction',
                      class: 'btn btn--md btn--primary type--uppercase',
                      text: 'Submit Application',
                      action: 'changeStatus',
                      actionParam: 'pending'
                    });
                  }
                } else if (this.get('model.application_status') == 'pending') {
                  buttons.pushObject({
                    id: 'jobBannerSubmitApplicationPendingDraft',
                    type: 'onClickAction',
                    class: 'btn btn--md btn--primary type--uppercase',
                    text: 'Submit Application',
                    action: 'popUp'
                  });
                } else {
                  buttons.pushObject({
                    id: 'jobBannerApplicationSubmittedDraft',
                    type: 'default',
                    class: 'btn btn--md type--uppercase',
                    text: 'Application Submitted'
                  });
                }
              } else {
                buttons.pushObject({
                  id: 'jobBannerSaveJobNotApplied',
                  type: 'onClickAction',
                  class: 'btn btn--md type--uppercase',
                  text: 'Save Job',
                  action: 'save',
                  actionParam: this.get('model.id')
                });
                if (this.get('model.questions').length) {
                  buttons.pushObject({
                    id: 'jobBannerApplyQuestionsNotApplied',
                    type: 'linkToApply',
                    class: 'btn btn--md btn--primary type--uppercase',
                    text: 'Apply',
                    route: 'job.apply',
                    param1: this.get('model.company.slug'),
                    param2: this.get('model.slug')
                  });
                } else {
                  buttons.pushObject({
                    id: 'jobBannerApplyNoQuestionsNotApplied',
                    type: 'onClickAction',
                    class: 'btn btn--md btn--primary type--uppercase',
                    text: 'Apply',
                    action: 'submit',
                    actionParam: this.get('model.id')
                  });
                }
              }
            }
          }
        } else {
          buttons.pushObject({
            id: 'jobBannerSaveJobNotMember',
            type: 'linkToRegister',
            route: 'talent.register',
            class: 'btn btn--md type--uppercase',
            text: 'Save Job'
          });
          if (this.get('model.redirect')) {
            buttons.pushObject({
              id: 'jobBannerApplyRedirect',
              type: 'onClickAction',
              class: 'btn btn--md btn--primary type--uppercase',
              text: 'Apply',
              action: 'apply',
            });
          } else {
            buttons.pushObject({
              id: 'jobBannerApplyNotRedirect',
              type: 'linkToRegister',
              route: 'talent.register',
              class: 'btn btn--md btn--primary type--uppercase',
              text: 'Apply'
            });
          }
        }
      }
    }
    return buttons;
  }),
  bottomButtons: computed('buttons', function() {
    var bottomButtons = [];
    this.get('buttons').forEach(button => {
      var bottomButton = button;
      bottomButton.buttonID = `${button.id}Bottom`;
      bottomButtons.pushObject(bottomButton);
    });
    return bottomButtons;
  }),
  didInsertElement() {
    this._super(...arguments);
    this.get('windowscroll').on('scroll', () => {
      if (this.get('windowscroll.scrollTop') > 1) {
        window.$('#bottom-fixed-banner').slideDown('slow');
      } else {
        window.$('#bottom-fixed-banner').slideUp('slow');
      }
    });
  },
  actions: {
    save: function(id) {
      this.set('saving', true);
      var self = this;
      var data = {
        'status': 'draft',
        'answers': {},
        'job_id': id,
        'ccuid': this.get('tracking.ccuid')
      };
      data['device'] = this.get('device');
      data['app_source'] = this.get('appSource');
      this.get('store').createRecord('draft-job', data).save().then(response => {
        self.set('model.has_applied', true);
        self.set('model.application_status', 'draft');
        self.set('model.application_id', response.id);
        later(function() {
          self.set('saving', false);
        }, 500);
      }).catch((xhr) => {
        self.set('saving', false);
        self.set('error', xhr.errors);
      });
    },
    apply: function(id) {
      var data;
      if (this.get('model.redirect')) {
        data = {"job_id":this.get('model.id')};
        this.get('store').createRecord('redirect', data).save();
        window.open(this.get('model.redirect'), '_blank');
      } else {
        this.set('applying', true);
        var self = this;
        data = {
          'status': 'submitted',
          'answers': {},
          'job_id': id,
          'ccuid': this.get('tracking.ccuid')
        };
        data['device'] = this.get('device');
        data['app_source'] = this.get('appSource');
        let modelType;
        if (this.get('model.application_status') == 'draft' || this.get('model.application_status') == 'pending') {
          modelType = 'patch-job';
        } else {
          modelType = 'submitted-job';
        }
        this.get('store').createRecord(modelType, data).save().then(() => {
          self.set('model.has_applied', true);
          self.set('model.application_status', 'submitted');
          later(function() {
            self.set('applying', false);
          }, 500);
          window.dataLayer.push({
            event: 'jtm.ApplicationSubmitted',
            userID: self.get('currentUser.current.id'),
            companyID: self.get('model.company.id'),
            jobID: id,
            appSource: self.get('tracking.app_source'),
            source: self.get('tracking.source')
          });
          window.$('#applicationComplete').modal('show');
        }).catch((xhr) => {
          self.set('applying', false);
          self.set('error', xhr.errors);
        });
      }
    },
    submit: function(id) {
      var data;
      if (this.get('model.redirect')) {
        data = {"job_id":this.get('model.id')};
        this.get('store').createRecord('redirect', data).save();
        window.open(this.get('model.redirect'), '_blank');
      } else {
        this.set('applying', true);
        var self = this;
        data = {
          'status': 'pending',
          'answers': {},
          'job_id': id,
          'ccuid': this.get('tracking.ccuid')
        };
        data['device'] = this.get('device');
        data['app_source'] = this.get('appSource');
        this.get('store').createRecord('submitted-job', data).save().then(response => {
          self.set('model.has_applied', true);
          self.set('model.application_status', 'pending');
          self.set('model.application_id', response.id);
          later(function() {
            self.set('applying', false);
          }, 500);
          window.$('#jobCompleteBioPending').modal('show');
        }).catch((xhr) => {
          self.set('applying', false);
          self.set('error', xhr.errors);
        });
      }
    },
    popUp: function() {
      if (this.get('model.redirect')) {
        var data = {"job_id":this.get('model.id')};
        this.get('store').createRecord('redirect', data).save();
        window.open(this.get('model.redirect'), '_blank');
      } else {
        window.$('#jobCompleteBio').modal('show');
      }
    },
    changeStatus: function(status) {
      this.set('applying', true);
      var self = this;
      var url = `${config.APP.API_HOST}/jobs/${this.get('model.id')}/applications`;
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
          self.set('model.has_applied', true);
          self.set('model.application_status', status);
          self.set('model.application_id', response.id);
          later(function() {
            self.set('applying', false);
          }, 500);
          if (status == 'submitted') {
            window.$('#applicationComplete').modal('show');
            window.dataLayer.push({
              event: 'jtm.ApplicationSubmitted',
              userID: self.get('currentUser.current.id'),
              companyID: self.get('model.company.id'),
              jobID: self.get('model.id')
            });
          } else if (status == 'pending') {
            window.$('#jobCompleteBioPending').modal('show');
          }
        }, function(xhr) {
          self.set('applying', false);
          self.set('error', xhr.responseText);
          if (xhr.responseText == undefined) {
            var self = this;
            later(function() {
              self.set('applying', false);
            }, 500);
            if (status == 'submitted') {
              window.$('#applicationComplete').modal('show');
            } else if (status == 'pending') {
              window.$('#jobCompleteBioPending').modal('show');
            }
          }
        });
      });
    }
  }
});
