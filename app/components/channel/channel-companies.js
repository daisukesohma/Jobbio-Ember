import ChannelFeedComponent from './channel-feed';

export default ChannelFeedComponent.extend({
  modelType: 'channel-company',
  myStickyOptions: null,
  init() {
    this._super(...arguments);
    this.set('myStickyOptions', {
      wrapperClassName: '',
      topSpacing: 80,
      bottomSpacing: 560
    });
  }
});
