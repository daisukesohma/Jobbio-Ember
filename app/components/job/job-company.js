import BaseComponent from '../base-component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';
import config from '../../config/environment';

export default BaseComponent.extend({
  store: inject(),
  myStickyOptionsLocation: null,
  myStickyOptions: null,
  applying: false,
  saving: false,
  currentUser: inject('current-user'),
  isTalent: computed('currentUser', function() {
    return this.get('currentUser.current.user.role') == 'talent';
  }),
  isAdmin: computed('currentUser', function() {
    return this.get('session.data.authenticated.jobbio_admin.user.role') == 'jobbio_admin';
  }),
  bioCompleted: computed('currentUser', function() {
    return this.get('currentUser.current.completion') >= 60;
  }),
  isNotCompanyMember: computed('currentUser', function() {
    return this.get('currentUser.current.user.role') != 'company_member';
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
  buttons: computed('model', 'model.{application_status,company.is_following}', function() {
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
      if (this.get('currentUser.current')) {
        if (this.get('isTalent')) {
          if (this.get('bioCompleted')) {
            if (this.get('model.has_applied')) {
              if (this.get('model.application_status') == 'draft') {
                if (this.get('model.questions').length) {
                  buttons.pushObject({
                    id: 'jobCompanySubmitApplicationQuestions',
                    type: 'linkToApply',
                    class: 'btn btn--primary v1 btn--sm btn-block',
                    text: 'Submit Application',
                    route: 'job.apply',
                    param1: this.get('model.company.slug'),
                    param2: this.get('model.slug')
                  });
                } else {
                  buttons.pushObject({
                    id: 'jobCompanySubmitApplicationNoQuestions',
                    type: 'onClickAction',
                    class: 'btn btn--primary v1 btn--sm btn-block',
                    text: 'Submit Application',
                    action: 'apply',
                    actionParam: this.get('model.id')
                  });
                }
              } else if (this.get('model.application_status') == 'pending') {
                buttons.pushObject({
                  id: 'jobCompanySubmitApplicationPending',
                  type: 'onClickAction',
                  class: 'btn btn--primary v1 btn--sm btn-block',
                  text: 'Submit Application',
                  action: 'changeStatus',
                  actionParam: 'submitted'
                });
              } else {
                buttons.pushObject({
                  id: 'jobCompanyApplicationSubmitted',
                  type: 'default',
                  class: 'btn btn--sm btn-block',
                  text: 'Application Submitted'
                });
              }
            } else {
              if (this.get('model.questions').length) {
                buttons.pushObject({
                  id: 'jobCompanyApplyQuestions',
                  type: 'linkToApply',
                  class: 'btn btn--primary v1 btn--sm btn-block',
                  text: 'Apply',
                  route: 'job.apply',
                  param1: this.get('model.company.slug'),
                  param2: this.get('model.slug')
                });
              } else {
                buttons.pushObject({
                  id: 'jobCompanyApplyNoQuestions',
                  type: 'onClickAction',
                  class: 'btn btn--primary v1 btn--sm btn-block',
                  text: 'Apply',
                  action: 'apply',
                  actionParam: this.get('model.id')
                });
              }
              buttons.pushObject({
                id: 'jobCompanySaveJob',
                type: 'onClickAction',
                class: 'btn btn--sm btn-block',
                text: 'Save Job',
                action: 'save',
                actionParam: this.get('model.id')
              });
            }
          } else {
            if (this.get('model.has_applied')) {
              if (this.get('model.application_status') == 'draft') {
                if (this.get('model.questions').length) {
                  buttons.pushObject({
                    id: 'jobCompanySubmitApplicationQuestionsDraft',
                    type: 'linkToApply',
                    class: 'btn btn--primary v1 btn--sm btn-block',
                    text: 'Submit Application',
                    route: 'job.apply',
                    param1: this.get('model.company.slug'),
                    param2: this.get('model.slug')
                  });
                } else {
                  buttons.pushObject({
                    id: 'jobCompanySubmitApplicationNoQuestionsDraft',
                    type: 'onClickAction',
                    class: 'btn btn--primary v1 btn--sm btn-block',
                    text: 'Submit Application',
                    action: 'changeStatus',
                    actionParam: 'pending'
                  });
                }
              } else if (this.get('model.application_status') == 'pending') {
                buttons.pushObject({
                  id: 'jobCompanySubmitApplicationPendingDraft',
                  type: 'onClickAction',
                  class: 'btn btn--primary v1 btn--sm btn-block',
                  text: 'Submit Application',
                  action: 'popUp'
                });
              } else {
                buttons.pushObject({
                  id: 'jobCompanyApplicationSubmittedDraft',
                  type: 'default',
                  class: 'btn btn--sm btn-block',
                  text: 'Application Submitted'
                });
              }
            } else {
              if (this.get('model.questions').length) {
                buttons.pushObject({
                  id: 'jobCompanyApplyQuestionsDraft',
                  type: 'linkToApply',
                  class: 'btn btn--primary v1 btn--sm btn-block',
                  text: 'Apply',
                  route: 'job.apply',
                  param1: this.get('model.company.slug'),
                  param2: this.get('model.slug')
                });
              } else {
                buttons.pushObject({
                  id: 'jobCompanyApplyNoQuestionsDraft',
                  type: 'onClickAction',
                  class: 'btn btn--primary v1 btn--sm btn-block',
                  text: 'Apply',
                  action: 'submit',
                  actionParam: this.get('model.id')
                });
              }
              buttons.pushObject({
                id: 'jobCompanySaveJobDraft',
                type: 'onClickAction',
                class: 'btn btn--sm btn-block',
                text: 'Save Job',
                action: 'save',
                actionParam: this.get('model.id')
              });
            }
          }
        }
      } else {
        if (this.get('isNotCompanyMember')) {
          buttons.pushObject({
            id: 'jobCompanyApplyNotMember',
            type: 'linkToRegister',
            route: 'talent.register',
            class: 'btn btn--primary v1 btn--sm btn-block',
            text: 'Apply'
          });
          buttons.pushObject({
            id: 'jobCompanySaveJobNotMember',
            type: 'linkToRegister',
            route: 'talent.register',
            class: 'btn btn--sm btn-block',
            text: 'Save Job'
          });
        }
      }
      if (this.get('isNotCompanyMember')) {
        if (this.get('session.isAuthenticated')) {
          if (this.get('model.company.is_following')) {
            buttons.pushObject({
              id: 'jobCompanyUnfollow',
              type: 'onClickAction',
              class: 'btn btn--sm btn-block',
              text: 'Unfollow',
              action: 'unfollow',
              actionParam: this.get('model.company.id')
            });
          } else {
            buttons.pushObject({
              id: 'jobCompanyFollowAuthenticated',
              type: 'onClickAction',
              class: 'btn btn--sm btn-block',
              text: 'Follow',
              action: 'follow',
              actionParam: this.get('model.company.id')
            });
          }
        } else {
          buttons.pushObject({
            id: 'jobCompanyFollow',
            type: 'linkToRegister',
            route: 'talent.register',
            class: 'btn btn--primary btn--sm btn-block',
            text: 'Follow'
          });
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
    if (!this.get('isTalent') && this.get('isNotCompanyMember') && !this.get('isAdmin')) {
      var newBottomButtons = bottomButtons.slice(-1);
      newBottomButtons.unshiftObject({
        buttonID: 'jobCompanySaveJobNoRedirectBottom',
        type: 'linkToRegister',
        route: 'talent.register',
        class: 'btn btn--sm btn-block',
        text: 'Save Job'
      });
      if (this.get('model.redirect')) {
        newBottomButtons.unshiftObject({
          buttonID: 'jobCompanyApplyRedirectBottom',
          type: 'onClickAction',
          class: 'btn btn--primary v1 btn--sm btn-block',
          text: 'Apply',
          action: 'apply',
        });
      } else {
        newBottomButtons.unshiftObject({
          buttonID: 'jobCompanyApplyNoRedirectBottom',
          type: 'linkToRegister',
          route: 'talent.register',
          class: 'btn btn--primary v1 btn--sm btn-block',
          text: 'Apply'
        });
      }
      bottomButtons = newBottomButtons;
    }
    return bottomButtons;
  }),
  init() {
    this._super(...arguments);
    this.set('myStickyOptionsLocation', {
      wrapperClassName: '',
      topSpacing: 80,
      bottomSpacing: 1400
    });
    this.set('myStickyOptions', {
      wrapperClassName: '',
      topSpacing: 80,
      bottomSpacing: 590
    });
  },
  actions: {
    follow: function(id) {
      var data = {
        'company_id': id
      };
      this.get('store').createRecord('followed-company', data).save();
      this.set('model.company.is_following', true);
    },
    unfollow: function(id) {
      var data = {
        'company_id': id
      };
      this.get('store').createRecord('unfollowed-company', data).save();
      this.set('model.company.is_following', false);
    },
    save: function(id) {
      this.set('saving', true);
      var self = this;
      var data = {
        'status': 'draft',
        'answers': {},
        'job_id': id,
        'ccuid': this.get('tracking.ccuid'),
        'app_source': this.get('tracking.app_source')
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
