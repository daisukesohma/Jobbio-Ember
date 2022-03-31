import BaseComponent from '../base-component';
import { computed } from '@ember/object';

export default BaseComponent.extend({
  description: computed('job', function() {
    var jobDescription = this.get('job.description');
    jobDescription = jobDescription.replace(/(\r\n|\n|\r)/gm, "<br/>");
    jobDescription = jobDescription.replace(/(<([^>]+)>)/ig,"");
    jobDescription = jobDescription.replace(/\\([\s\S])|(")/g, "\\$1$2");
    return jobDescription;
  }),
  googleContract: computed('job', function() {
    var contract = this.get('job.contract');
    var google_contract = "";
    if(contract == "internship"){
      google_contract = "INTERN";
    }else if(contract == "apprenticeship"){
      google_contract = "OTHER";
    }else if(contract == "part-time"){
      google_contract = "PART_TIME";
    }else if(contract == "full-time"){
      google_contract = "FULL_TIME";
    }else if(contract == "flexible"){
      google_contract = "OTHER";
    }else if(contract == "contract"){
      google_contract = "CONTRACTOR";
    }else if(contract == "temporary"){
      google_contract = "TEMPORARY";
    }else{
      google_contract = "OTHER";
    }
    return google_contract;
  }),
  companyLink: computed('job', function() {
    return "https://jobbio.com/"+this.get('job.company.slug');
  }),
  datePosted: computed('job', function() {
    return window.moment(this.get('job.published_at')).format('YYYY-MM-DD');
  }),
  logo: computed('job', function(){
    return this.get('job.company.image_logo') ? this.get('job.company.image_logo') : 'https://dy793rr2xtptx.cloudfront.net/images2/topic/new/jobbio-logo-1559215894139.gif'
  }),
  script: computed('job', function() {
    return `{
      "@context" : "http://schema.org/",
      "@type" : "JobPosting",
      "title" : "${this.get('job.title')}",
      "description" : "${this.get('description')}",
      "identifier": {
        "@type": "PropertyValue",
        "name": "${this.get('job.company.name')}",
        "value": "${this.get('job.id')}"
      },
      "datePosted" : "${this.get('datePosted')}",
      "employmentType" : "${this.get('googleContract')}",
      "hiringOrganization" : {
        "@type" : "Organization",
        "name" : "${this.get('job.company.name')}",
        "sameAs" : "${this.get('companyLink')}",
        "logo" : "${this.get('logo')}"
      },
      "jobLocation" : {
        "@type" : "Place",
        "address" : {
          "@type" : "PostalAddress",
          "streetAddress" : "${this.get('job.location.address')}",
          "addressLocality" : "${this.get('job.location.city')}",
          "addressRegion" : "${this.get('job.location.state')}",
          "postalCode" : "${this.get('job.location.post_code')}",
          "addressCountry": "${this.get('job.location.country_short')}"
        }
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "${this.get('job.currency')}",
        "value": {
          "@type": "QuantitativeValue",
          "minValue": "${this.get('job.salary_from')}",
          "maxValue": "${this.get('job.salary_to')}",
          "unitText": "${this.get('job.salary_type')}"
        }
      }
    }`
  })
});
