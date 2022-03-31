import BaseComponent from '../base-component';
import { computed } from '@ember/object';
import config from '../../config/environment';

export default BaseComponent.extend({
  job: null,
  link: config.APP.WEB_HOST,
  salary: computed(function(){
    var salary = "Not disclosed";
    if (this.get('job.salary_disclosed')) {
      var salaryFrom = this.get('job.salary_from');
      var salaryTo = this.get('job.salary_to');

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
  salaryType: computed(function(){
    var salary = "";
    if (this.get('job.salary_disclosed')) {
      if(this.get('job.salary_type') == 'hour'){
        salary = "p/hr"
      }
    }
    return salary;
  }),
});
