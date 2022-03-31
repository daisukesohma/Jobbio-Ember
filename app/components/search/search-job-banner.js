import BaseComponent from '../base-component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';
import config from '../../config/environment';

export default BaseComponent.extend({
  store: inject(),
  link: config.APP.WEB_HOST,
  windowscroll: inject(),
  loading: false,
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
    applyWithAnswers: function() {
      this.set('jobQuestionsModalOpened', !this.get('jobQuestionsModalOpened'));
      window.$('#jobQuestions').modal('show');
    },
    save: function(id) {
      this.set('loading', true);
      var self = this;
      var data = {
        'status': 'draft',
        'answers': {},
        'job_id': id,
        'ccuid': this.get('tracking.ccuid')
      };
      data['device'] = this.get('device');
      data['app_source'] = this.get('tracking.app_source');
      this.get('store').createRecord('draft-job', data).save().then(response => {
        self.set('model.has_applied', true);
        self.set('model.application_status', 'draft');
        self.set('model.application_id', response.id);
        later(function() {
          self.set('loading', false);
        }, 500);
      }).catch((xhr) => {
        self.set('loading', false);
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
            self.set('loading', false);
          }, 500);
          window.dataLayer.push({
            event: 'jtm.ApplicationSubmitted',
            userID: self.get('currentUser.current.id'),
            companyID: self.get('model.company.id'),
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
    },
    submit: function(id) {
      var data;
      if (this.get('model.redirect')) {
        data = {"job_id":this.get('model.id')};
        this.get('store').createRecord('redirect', data).save();
        window.open(this.get('model.redirect'), '_blank');
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
          self.set('model.has_applied', true);
          self.set('model.application_status', 'pending');
          self.set('model.application_id', response.id);
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
      if (this.get('model.redirect')) {
        var data = {"job_id":this.get('model.id')};
        this.get('store').createRecord('redirect', data).save();
        window.open(this.get('model.redirect'), '_blank');
      } else {
        window.$('#jobCompleteBio').modal('show');
      }
    },
    changeStatus: function(status) {
      this.set('loading', true);
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
            self.set('loading', false);
          }, 500);
          if (status == 'submitted') {
            self.toast.success('Application submitted successfully.');
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
