import Controller from '@ember/controller';

export default Controller.extend({
  isMobile: false,
  init() {
    this._super(...arguments);
    if (this.get('userAgent.device.isMobile')) {
      this.set('isMobile', true);
    }
  },
});
