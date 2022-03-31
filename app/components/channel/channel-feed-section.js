import PaginationComponent from '../pagination-component';
import { computed, observer } from '@ember/object';

export default PaginationComponent.extend({
  modelType: 'channel-feed-item',
  type: 'all',
  onTypeChanged: observer('type', function() {
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
    if(this.get('channel.type') == "company"){
      params['page_size'] = 5;
    }
    return params;
  }),
  isTopicChannel: computed('channel.type', function(){
    return this.get('channel.type') == "topic" || this.get('channel.type') == "activity";
  }),
  didRender() {
    this._super(...arguments);
    window.$('#channel-view-more').attr('href', '#');
  },
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
  }
});
