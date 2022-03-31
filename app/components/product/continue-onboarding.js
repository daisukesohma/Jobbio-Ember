import BaseComponent from '../base-component';
import { inject } from '@ember/service';
import config from '../../config/environment';
import { computed } from '@ember/object';

export default BaseComponent.extend({
  store: inject(),
  router: inject(),
  currentUser: inject('current-user'),
  linkDisabled: computed('model.{job_type_id,title}', function() {
    if (this.get('model.job_type_id') && this.get('model.title')) {
      return false;
    } else {
      return true;
    }
  }),
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
  secretEscapes: `${config.APP.CLOUD_FRONT_HOST}images2/site/content-pages/secret-escapes-round.jpg`,
  init() {
    this._super(...arguments);
    this.set('model.oid', this.get('oid'));
    this.get('store').queryRecord('form', 1).then(response => {
      this.set('form', response);
      var jobTypes = this.get('form.job_types');
      jobTypes.forEach(jobType => {
        if (jobType.name == 'Undefined') {
          jobTypes.splice(jobTypes.indexOf(jobType), 1);
        }
      });
    });
  },
  didRender() {
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
    selectType: function(type) {
      this.set('model.job_type_id', type);
    },
    continueOnboarding() {
      var self = this;
      this.get('model').save().then(() => {
        self.get('router').transitionTo('company.onboarding.payment', {queryParams: {oid: self.get('oid')}});
      });
    }
  }
});
