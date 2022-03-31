import BaseComponent from '../base-component';
import { computed, observer } from '@ember/object';
import { inject } from '@ember/service';

export default BaseComponent.extend({
  store: inject(),
  router: inject(),
  contractFilter: false,
  postedFilter: false,
  errors: null,
  selected_job_types: computed('model.jobType', 'form', function() {
    var selected_job_types = [];
    var jobTypes = this.get('model.jobType') ? this.get('model.jobType').split(',') : [];
    if (this.get('form.job_types')) {
      this.get('form.job_types').forEach(type => {
        if (jobTypes.includes(type.name)) {
          selected_job_types.pushObject(type);
        }
      })
    }
    return selected_job_types;
  }),
  locations: computed('model.location', function() {
    var locations = [
      { name: 'ie', label: 'Ireland' },
      { name: 'uk', label: 'United Kingdom' },
      { name: 'ca', label: 'Canada' },
      { name: 'us', label: 'United States' },
      { name: 'all', label: 'World' }
    ];
    var modelLocations = this.get('model.location') ? this.get('model.location').split(',') : [];
    locations.forEach(type => {
      if (modelLocations.includes(type.name)) {
        type.checked = true;
      }
    })
    return locations;
  }),
  selected_contracts: computed('model.contract', 'form', function() {
    var selected_contracts = [];
    var modelContracts = this.get('model.contract') ? this.get('model.contract').split(',') : [];
    if (this.get('form.contracts')) {
      this.get('form.contracts').forEach(contract => {
        if (modelContracts.includes(contract)) {
          selected_contracts.pushObject(contract);
        }
      })
    }
    return selected_contracts;
  }),
  selected_posted_date: computed('model.date_posted', 'date_posted', function() {
    var selected_date_posted = [];
    var modelDatePosted = this.get('model.date_posted') ? this.get('model.date_posted').split(',') : [];
    if (this.get('date_posted')) {
      this.get('date_posted').forEach(date => {
        if (modelDatePosted.includes(date.value)) {
          selected_date_posted.pushObject(date.value);
        }
      })
    }
    return selected_date_posted;
  }),
  init() {
    this._super(...arguments);
    this.get('store').queryRecord('form', 1).then(response => {
      this.set('form', response);
    });
    this.set('date_posted', [
      {value:'all', name:'All'},
      {value:'24_hours', name:'Last 24 Hrs'},
      {value:'7_days', name:'Last 7 Days'},
      {value:'28_days', name:'Last 28 Days'},
      ]
    );
  },
  actions: {
    contractFilter(event){
      event.preventDefault()
      if(this.get(`contractFilter`)){
        window.$(`#contractFilter`).hide();
        this.set(`contractFilter`, false)
      }else{
        window.$(`#contractFilter`).show()
        this.set(`contractFilter`, true)
      }
    },
    postedFilter(event){
      event.preventDefault()
      if(this.get(`postedFilter`)){
        window.$(`#postedFilter`).hide();
        this.set(`postedFilter`, false)
      }else{
        window.$(`#postedFilter`).show()
        this.set(`postedFilter`, true)
      }
    },
    closeContract(){
      window.$(`#contractFilter`).hide();
      this.set(`contractFilter`, false);
    },
    closePosted(){
      window.$(`#postedFilter`).hide();
      this.set(`postedFilter`, false);
    },
    apply() {
      var formData = window.$('form#filterForm').serializeArray();
      var date_posted = '';
      var contract = '';
      window.$.map(formData, function(n) {
        if (n['name'].includes('search_date_posted_type')) {
          date_posted += date_posted ? `,${n['value']}` : n['value'];
        } else if (n['name'].includes('search_contract_type')) {
          contract += contract ? `,${n['value']}` : n['value'];
        }
      });
      this.get('router').transitionTo('search.results', {
        queryParams: {
          search: this.get('model.searchTerm'),
          location: this.get('model.location'),
          contract: contract,
          date_posted: date_posted
        }
      });
      var job_id = this.get('jobs.firstObject.id')
      if (job_id) {
        this.set('selectedJob', this.get('store').peekRecord('job-slug', job_id));
      }
      window.$('html,body').animate({
        scrollTop: 0
      }, 800);
      window.$('.search-job-detail .sticky').animate({
        scrollTop: 0
      }, 800);
    },
    setFilter(value, filterType) {
      if (value == 'all') {
        if (window.$(`#search_${filterType}_type_all`).prop('checked')) {
          window.$(`input[name=search_${filterType}_type]`).prop('checked', false);
        }
        if(filterType === 'contract'){
          this.set('selected_contracts', [])
        }
        window.$(`#search_${filterType}_type_all`).prop('checked', true);
      } else {
        if (filterType != 'date_posted'){
          if (window.$(`#search_${filterType}_type_${value}`).prop('checked')) {
            window.$(`#search_${filterType}_type_all`).prop('checked', false);
          }
          this.get('selected_contracts').pushObject(value)
        }
      }
      this.send('apply');
    },
    removeFilter(value, filterType) {
      window.$(`#search_${filterType}_type_${value}`).prop('checked', false);
      this.send('apply');
    },
    filterJobType(val) {
      var value = val.toLowerCase();
      window.$('.search-job-type').filter(function() {
        window.$(this).toggle(window.$(this).children('input').val().toLowerCase().includes(value));
      });
    }
  }
});
