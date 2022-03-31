import DRFAdapter from './drf';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DRFAdapter.extend(DataAdapterMixin, {
  addTrailingSlashes: false,
  authorizer: 'authorizer:token',
  // there are certain queries we'll want to intercept
  // so that we can change the url while still using
  // the meber store
  query: function(store, type) {
    switch(type.modelName){
      case 'job-other':
        return this.jobOtherQuery(...arguments)
      case 'channel-feed-item':
        return this.channelFeedItemQuery(...arguments)
      case 'channel-company':
        return this.channelCompanyQuery(...arguments)
      case 'application':
        return this.submitApplication(...arguments)
      case 'branding-gallery':
        return this.brandingGallery(...arguments)
      case 'branding-content':
        return this.brandingContent(...arguments)
      case 'branding-testimonial':
        return this.brandingTestimonial(...arguments)
      case 'job-type':
          return this.jobTypes(...arguments)
      case 'block-content':
        return this.getCompanyContent(...arguments)
      case 'nav-list':
        return this.getChannelNavList(...arguments)
      case 'blog-post':
        return this.getBlogPosts(...arguments)
      default:
        return this._super(...arguments);
    }
  },
  // same as query but for single record
  queryRecord: function(store, type) {
    switch(type.modelName){
      case 'job-slug':
        return this.jobSlugQuery(...arguments)
      case 'package':
        return this.loadPackage(...arguments)
      case 'feed-filter':
        return this.feedFilter(...arguments)
      case 'form':
        return this.formQuery(...arguments)
      case 'subscription':
        return this.subscriptions(...arguments)
      default:
        return this._super(...arguments);
    }
  },
  findRecord: function(store, type) {
    switch(type.modelName){
      case 'teammember':
        return this.loadTeamMember(...arguments)
      case 'talentresponse':
        return this.loadTalent(...arguments)
      default:
        return this._super(...arguments);
    }
  },
  createRecord: function(store, type) {
    switch(type.modelName){
      case 'registered-company':
        return this.registerCompany(...arguments)
      case 'followed-channel':
        return this.addFollowedChannelOrCompany(...arguments)
      case 'unfollowed-channel':
        return this.addUnFollowedChannelOrCompany(...arguments)
      case 'followed-company':
        return this.addFollowedChannelOrCompany(...arguments)
      case 'unfollowed-company':
        return this.addUnFollowedChannelOrCompany(...arguments)
      case 'added-job':
        return this.addJobToChannel(...arguments)
      case 'draft-job':
        return this.addFollowedJob(...arguments)
      case 'submitted-job':
        return this.addFollowedJob(...arguments)
      case 'patch-job':
        return this.patchJob(...arguments)
      case 'forgot-password-request':
        return this.sendForgotPasswordRequest(...arguments)
      case 'reset-password-request':
        return this.sendResetPasswordRequest(...arguments)
      case 'job-content':
        return this.saveJobContent(...arguments)
      case 'company-onboarding':
        return this.companyOnboarding(...arguments)
      case 'company-onboarding-job':
        return this.companyOnboardingJobs(...arguments)
      case 'company-onboarding-payment':
        return this.companyOnboardingPayments(...arguments)
      case 'redirect':
        return this.countRedirect(...arguments)
      case 'companyredirect':
        return this.countCompanyRedirect(...arguments)
      default:
        return this._super(...arguments);
    }
  },
  jobOtherQuery(store, type, query){
    var company_id = query.company_id;
    var url = this.get('host')+this.get('namespace')+"/companies/"+company_id+"/jobs";
    return this.ajax(url, 'GET', { data: query });
  },
  jobSlugQuery(store, type, query){
    var company_slug = query.company_slug;
    var job_slug = query.job_slug;
    var url = this.get('host')+this.get('namespace')+"/jobs/"+company_slug+"/"+job_slug;
    return this.ajax(url, 'GET', { data: query });
  },
  channelFeedItemQuery(store, type, query){
    var channel_id = query.channel_id;
    var url = this.get('host')+this.get('namespace')+"/channels/"+channel_id+"/feed";
    return this.ajax(url, 'GET', { data: query });
  },
  channelCompanyQuery(store, type, query){
    var channel_id = query.channel_id;
    var url = this.get('host')+this.get('namespace')+"/channels/"+channel_id+"/companies";
    return this.ajax(url, 'GET', { data: query });
  },
  submitApplication(store, type, query){
    var url = this.get('host')+this.get('namespace')+"/jobs/"+query.id+"/applications";
    return this.ajax(url, 'POST', { data: query });
  },
  brandingGallery(store, type, query){
    var url = this.get('host')+this.get('namespace')+"/companies/" + query.id + "/branding";
    return this.ajax(url, 'GET', { data: query });
  },
  brandingContent(store, type, query){
    var url = this.get('host')+this.get('namespace')+"/companies/" + query.id + "/branding";
    return this.ajax(url, 'GET', { data: query });
  },
  brandingTestimonial(store, type, query){
    var url = this.get('host')+this.get('namespace')+"/companies/" + query.id + "/branding";
    return this.ajax(url, 'GET', { data: query });
  },
  loadTalent(store, type, id){
    var url = this.get('host')+this.get('namespace')+"/users/"+id;
    return this.ajax(url, 'GET');
  },
  feedFilter(store, type, query){
    var url = this.get('host')+this.get('namespace')+"/channels/"+query.slug+"/feed/filters";
    return this.ajax(url, 'GET').then(response => {
      var d = new Date();
      var id = d.getTime();
      response.id = id;
      return response;
    });
  },
  loadTeamMember(store, type, id){
    var url = this.get('host')+this.get('namespace')+"/users/"+id;
    return this.ajax(url, 'GET');
  },
  loadPackage(store, type, query){
    var url = this.get('host')+this.get('namespace')+"/packages/"+query;
    return this.ajax(url, 'GET');
  },
  registerCompany(){
    var data = this.getData(...arguments);
    var url = this.get('host')+this.get('namespace')+"/companies";
    return this.ajax(url, 'POST', { data: data});
  },
  addFollowedChannelOrCompany(){
    var data = this.getData(...arguments);
    var url = this.get('host')+this.get('namespace')+"/talent/following";
    return this.ajax(url, 'POST', { data: data});
  },
  addUnFollowedChannelOrCompany(){
    var data = this.getData(...arguments);
    var url = this.get('host')+this.get('namespace')+"/talent/following";
    return this.ajax(url, 'DELETE', { data: data});
  },
  addJobToChannel(){
    var data = this.getData(...arguments);
    var url = this.get('host')+this.get('namespace')+"/requests/addJobToChannel";
    var res = this.ajax(url, 'POST', { data: data }).then(response => {
      var d = new Date();
      var id = d.getTime();
      response.id = id;
      return response;
    });
    return res;
  },
  addFollowedJob(){
    var data = this.getData(...arguments);
    var formData = {
      'status': data.status,
      'answers': data.answers
    };
    if(data.ccuid) formData['ccuid'] = data.ccuid;
    if(data.device) formData['device'] = data.device;
    if(data.app_source) formData['app_source'] = data.app_source;
    var url = this.get('host')+this.get('namespace')+"/jobs/"+data.job_id+"/applications";
    return this.ajax(url, 'POST', { data: formData});
  },
  patchJob(){
    var data = this.getData(...arguments);
    var formData = {
      'status': data.status,
      'answers': data.answers
    };
    if(data.ccuid) formData['ccuid'] = data.ccuid;
    if(data.device) formData['device'] = data.device;
    if(data.app_source) formData['app_source'] = data.app_source;
    var url = this.get('host')+this.get('namespace')+"/jobs/"+data.job_id+"/applications";
    return this.ajax(url, 'PATCH', { data: formData});
  },
  sendForgotPasswordRequest(){
    var data = this.getData(...arguments);
    var url = this.get('host')+this.get('namespace')+"/user/requestResetPassword";
    var res = this.ajax(url, 'POST', { data: data }).then(response => {
      var d = new Date();
      var id = d.getTime();
      response.id = id;
      return response;
    });
    return res;
  },
  sendResetPasswordRequest(){
    var data = this.getData(...arguments);
    var url = this.get('host')+this.get('namespace')+"/user/resetPassword";
    var res = this.ajax(url, 'POST', { data: data }).then(response => {
      var d = new Date();
      var id = d.getTime();
      response.id = id;
      return response;
    });
    return res;
  },
  saveJobContent(){
    var data = this.getData(...arguments);
    var url = this.get('host')+this.get('namespace')+"/jobs/content/"+data.content_id;
    var res = this.ajax(url, 'PATCH', { data: data }).then(response => {
      var d = new Date();
      var id = d.getTime();
      response.id = id;
      return response;
    });
    return res;
  },
  getData(store, type, snapshot){
    var data = {};
    var serializer = store.serializerFor(type.modelName);
    serializer.serializeIntoHash(data, type, snapshot, { includeId: true });
    return data;
  },
  jobTypes(store, type, query){
    var url = this.get('host')+this.get('namespace')+"/jobs/jobtypes";
    return this.ajax(url, 'GET', { data: query });
  },
  formQuery(store, type, query){
    var url = this.get('host')+this.get('namespace')+"/jobs/form";
    return this.ajax(url, 'GET', { data: query });
  },
  companyOnboarding(){
    var data = this.getData(...arguments);
    var url = this.get('host')+this.get('namespace')+"/companies/onboarding";
    var res = this.ajax(url, 'POST', { data: data }).then(response => {
      return response;
    });
    return res;
  },
  companyOnboardingJobs(){
    var data = this.getData(...arguments);
    var url = this.get('host')+this.get('namespace')+"/companies/"+data.oid+"/onboarding/jobs";
    var res = this.ajax(url, 'POST', { data: data }).then(response => {
      return response;
    });
    return res;
  },
  companyOnboardingPayments(){
    var data = this.getData(...arguments);
    var company_id = data.oid;
    if (data.payment_intent_id) {
      data = {
        payment_intent_id: data.payment_intent_id
      }
    }
    var url = this.get('host')+this.get('namespace')+"/companies/"+company_id+"/onboarding/payments";
    var res = this.ajax(url, 'POST', { data: data }).then(response => {
      var d = new Date();
      var id = d.getTime();
      response.id = id;
      return response;
    });
    return res;
  },
  subscriptions(store, type, query){
    var url = this.get('host')+this.get('namespace')+"/companies/subscriptions";
    return this.ajax(url, 'GET', { data: query });
  },
  countRedirect() {
    var data = this.getData(...arguments);
    var url = this.get('host')+this.get('namespace')+"/jobs/redirect";
    var res = this.ajax(url, 'POST', { data: data }).then(response => {
      return response;
    });
    return res;
  },
  getCompanyContent(store, type, query){
    var url = this.get('host')+this.get('namespace')+"/blocks/content";
    return this.ajax(url, 'GET', { data: query });
  },
  getChannelNavList(store, type, query){
    var url = this.get('host')+this.get('namespace')+"/channels/"+query+'/navlinks';
    return this.ajax(url, 'GET', { data: query });
  },
  getBlogPosts(store, type, query){
    var url = this.get('host')+this.get('namespace')+"/blogposts";
    return this.ajax(url, 'GET', { data: query });
  },
  countCompanyRedirect(){
    var data = this.getData(...arguments);
    var url = this.get('host')+this.get('namespace')+"/channels/redirect";
    var res = this.ajax(url, 'POST', { data: data }).then(response => {
      return response;
    });
    return res;
  }
});
