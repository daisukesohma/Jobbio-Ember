import BaseComponent from '../base-component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { later } from '@ember/runloop';
import config from '../../config/environment';

export default BaseComponent.extend({
  currentUser: inject('current-user'),
  store: inject(),
  applying: false,
  link: config.APP.WEB_HOST,
  isTalent: computed('currentUser', function() {
    return this.get('currentUser.current.user.role') == 'talent';
  }),
  isNotCompanyMember: computed('currentUser', function() {
    return this.get('currentUser.current.user.role') != 'company_member';
  }),
  isAdmin: computed('currentUser', function() {
    return this.get('session.data.authenticated.jobbio_admin.user.role') == 'jobbio_admin';
  }),
  bioCompleted: computed('currentUser', function() {
    return this.get('currentUser.current.completion') >= 60;
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
  jobFooterLink: computed('embed', function() {
    return this.get('embed') ? 'embed.channel' : 'channel';
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
          id: 'jobFootApplyEmbed',
          type: 'default',
          class: 'btn btn--primary type--uppercase',
          text: 'Apply',
          href: `${this.get('link')}/talent/register?job=${this.get('model.id')}&source=${this.get('model.company.slug')}_career_page`,
          target: '_blank'
        });
      } else {
        if (this.get('isNotCompanyMember')) {
          if (this.get('currentUser.current')) {
            if (this.get('isTalent')) {
              if (this.get('bioCompleted')) {
                if (this.get('model.has_applied')) {
                  if (this.get('model.application_status') == 'draft') {
                    if (this.get('model.questions').length) {
                      buttons.pushObject({
                        id: 'jobFootSubmitApplicationQuestions',
                        type: 'linkToApply',
                        class: 'btn btn--primary type--uppercase',
                        text: 'Submit Application',
                        route: 'job.apply',
                        param1: this.get('model.company.slug'),
                        param2: this.get('model.slug')
                      });
                    } else {
                      buttons.pushObject({
                        id: 'jobFootSubmitApplicationNoQuestions',
                        type: 'onClickAction',
                        class: 'btn btn--primary type--uppercase modal-trigger',
                        text: 'Submit Application',
                        action: 'apply',
                        actionParam: this.get('model.id')
                      });
                    }
                  } else if (this.get('model.application_status') == 'pending') {
                    buttons.pushObject({
                      id: 'jobFootSubmitApplicationPending',
                      type: 'onClickAction',
                      class: 'btn btn--primary type--uppercase modal-trigger',
                      text: 'Submit Application',
                      action: 'changeStatus',
                      actionParam: 'submitted'
                    });
                  } else {
                    buttons.pushObject({
                      id: 'jobFootApplicationSubmitted',
                      type: 'default',
                      class: 'btn btn--md type--uppercase',
                      text: 'Application Submitted'
                    });
                  }
                } else {
                  if (this.get('model.questions').length) {
                    buttons.pushObject({
                      id: 'jobFootApplyQuestions',
                      type: 'linkToApply',
                      class: 'btn btn--primary type--uppercase',
                      text: 'Apply',
                      route: 'job.apply',
                      param1: this.get('model.company.slug'),
                      param2: this.get('model.slug')
                    });
                  } else {
                    buttons.pushObject({
                      id: 'jobFootApplyNoQuestions',
                      type: 'onClickAction',
                      class: 'btn btn--primary type--uppercase modal-trigger',
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
                        id: 'jobFootSubmitApplicationQuestionsDraft',
                        type: 'linkToApply',
                        class: 'btn btn--primary type--uppercase',
                        text: 'Submit Application',
                        route: 'job.apply',
                        param1: this.get('model.company.slug'),
                        param2: this.get('model.slug')
                      });
                    } else {
                      buttons.pushObject({
                        id: 'jobFootSubmitApplicationNoQuestionsDraft',
                        type: 'onClickAction',
                        class: 'btn btn--primary type--uppercase modal-trigger',
                        text: 'Submit Application',
                        action: 'changeStatus',
                        actionParam: 'pending'
                      });
                    }
                  } else if (this.get('model.application_status') == 'pending') {
                    buttons.pushObject({
                      id: 'jobFootSubmitApplicationPendingDraft',
                      type: 'onClickAction',
                      class: 'btn btn--primary type--uppercase modal-trigger',
                      text: 'Submit Application',
                      action: 'popUp'
                    });
                  } else {
                    buttons.pushObject({
                      id: 'jobFootApplicationSubmittedDraft',
                      type: 'default',
                      class: 'btn btn--md type--uppercase',
                      text: 'Application Submitted'
                    });
                  }
                } else {
                  if (this.get('model.questions').length) {
                    buttons.pushObject({
                      id: 'jobFootApplyQuestionsDraft',
                      type: 'linkToApply',
                      class: 'btn btn--primary type--uppercase',
                      text: 'Apply',
                      route: 'job.apply',
                      param1: this.get('model.company.slug'),
                      param2: this.get('model.slug')
                    });
                  } else {
                    buttons.pushObject({
                      id: 'jobFootApplyNoQuestionsDraft',
                      type: 'onClickAction',
                      class: 'btn btn--primary type--uppercase modal-trigger',
                      text: 'Apply',
                      action: 'submit',
                      actionParam: this.get('model.id')
                    });
                  }
                }
              }
            }
          } else {
            if (this.get('model.redirect')) {
              buttons.pushObject({
                id: 'jobFootApplyRedirect',
                type: 'onClickAction',
                class: 'btn btn--primary type--uppercase',
                text: 'Apply',
                action: 'apply',
              });
            } else {
              buttons.pushObject({
                id: 'jobFootApplyNotRedirect',
                type: 'linkToRegister',
                route: 'talent.register',
                class: 'btn btn--primary type--uppercase',
                text: 'Apply'
              });
            }
          }
        }
      }
    }
    return buttons;
  }),
  actions: {
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
        data['app_source'] = this.get('appSource');
        data['device'] = this.get('device');
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
        data['app_source'] = this.get('appSource');
        data['device'] = this.get('device');
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
        }).then((response) => {
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
        }, (xhr) => {
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
