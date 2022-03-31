import PaginationComponent from '../pagination-component';
import { computed, observer } from '@ember/object';
import config from '../../config/environment'
import { htmlSafe } from '@ember/string';

export default PaginationComponent.extend({
  modelType: 'channel-feed-item',
  type: 'all',
  location: 'all',
  link: config.APP.WEB_HOST,
  style: computed( function () {
    return new htmlSafe(`
      background-color: ${this.get('object.background_color')};
      padding: ${this.get('object.padding_top')}px ${this.get('object.padding_right')}px ${this.get('object.padding_bottom')}px ${this.get('object.padding_left')}px;
      margin: ${this.get('object.margin_top')}px ${this.get('object.margin_right')}px ${this.get('object.margin_bottom')}px ${this.get('object.margin_left')}px;
    `)
  }),
  both: computed( function () {
    if(this.get('object.job_type_filter') && this.get('object.job_location_filter')){
      return true
    }else{
      return false
    }
  }),
  onTypeChanged: observer('type', 'location', function() {
    this.set('cursor', '');
    this.setProperties({
      hasLoadedInitialy: false,
      hasMore: true,
      objects: [],
    });
    this.send('loadMore');
  }),
  onChannelSelected: observer('channel', function() {
    this.set('cursor', '');
    this.setProperties({
      hasLoadedInitialy: false,
      hasMore: true,
      objects: [],
    });
    this.send('loadMore');
  }),
  params: computed('cursor', function(){
    var params = this._super();
    params['channel_id'] = this.get('channel.id');
    params['type'] = this.get('type');
    params['location'] = this.get('location');
    if(this.get('object.pagination')){
      params['page_size'] = this.get('object.pagination');
    }
    return params;
  }),
  init() {
    this._super(...arguments);
    this.get('store').queryRecord('feed-filter', {slug: this.get('channel.slug')}).then(response => {
      this.set('filters', response);
    });
  },
  actions: {
    setType: function(type) {
      this.set('type', type);
    },
    setLocation: function (location) {
      this.set('location', location);
    }
  }
});
