import Component from '@ember/component';
import { inject } from '@ember/service';
import config from '../config/environment';

export default Component.extend({
    tagName: '',
    session: inject('session'),
    cloudfront: config.APP.CLOUD_FRONT_HOST,
    homepage: config.APP.WEB_HOST,
    talentDashboard: config.APP.TALENT_DASHBOARD,
    talentDashboardBio: config.APP.TALENT_DASHBOARD + '/edit',
    talentDashboardApplications: config.APP.TALENT_DASHBOARD + '/applications',
    companyDashboard: config.APP.COMPANY_DASHBOARD,
    consoleDashboard: config.APP.CONSOLE_DASHBOARD,
    partnerhub: config.APP.HTTP_PROTOCOL + 'partner.' + config.APP.DOMAIN 
});
