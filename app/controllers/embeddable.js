import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import config from '../config/environment';

// The params below and the inline.js and frame.js are from legacy Jobbio
// and so must be kept the same in order to preserve backwards compatibility
export default Controller.extend({
  queryParams: {'container': {refreshModel: true},
                'type': {refreshModel: true},
                'slug': {refreshModel: true}, // channel / company slug
                'id': {refreshModel: true}, // job id
                'banner': {refreshModel: true},
                'heroLine': {refreshModel: true},
                'companyUrlTemplate': {refreshModel: true},
                'subLine': {refreshModel: true},
                'showFilterByCompanies': {refreshModel: true},
                'showAddJobToChannel': {refreshModel: true},
                'showDiscoverMoreChannels': {refreshModel: true},
                'prefixCSS': {refreshModel: true},
                },
  // below are default settings for the above queryParams
  container: 'div1',
  type: 'channel',
  slug: 'techjobs',
  id: 1,
  banner: computed(function() {
    return new htmlSafe(config.APP.CLOUD_FRONT_HOST+"images/site/front_page_banner.jpg");
  }),
  heroLine: 'Jobbio',
  companyUrlTemplate: config.APP.DOMAIN,
  subLine: 'find your future',
  showFilterByCompanies: 0,
  showAddJobToChannel: 1,
  showDiscoverMoreChannels: 1,
  // potential models
  job: null,
  channel: null,
  prefixCSS: false,
  isJob: computed(function(){
    return this.get('type') == 'job';
  }),
});
