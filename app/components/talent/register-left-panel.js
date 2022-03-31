import BaseComponent from '../base-component';
import { computed } from '@ember/object';

export default BaseComponent.extend({
  toggleDescription: 'View Full',
  simpleDescription: computed('model.job', function() {
    return !this.get('model.job.description').includes('</');
  }),
  longDescription: computed('model.job', function() {
    return parseInt(window.$('.moredetails').css('height')) >= parseInt('210px');
  }),
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
  didRender() {
    this._super(...arguments);
    window.$('.moredetails').find('p').each(function() {
      window.$(this).addClass('lead');
    });
    window.$('html,body').animate({ scrollTop: window.$('.nav-container').height() }, 'slow');
  },
  actions: {
    expandDescription: function() {
      if (this.get('toggleDescription') == 'View Full') {
        window.$('.moredetails').css('height', 'auto');
        window.$( ".job-details" ).parent().removeClass( "height-100 " );
        this.set('toggleDescription', 'Hide');
      } else {
        window.$('.moredetails').css('height', '210px');
        window.$( ".job-details" ).parent().addClass( "height-100 " );
        this.set('toggleDescription', 'View Full');
      }
    }
  }
});
