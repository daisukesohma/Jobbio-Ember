import BaseRoute from './base-route';

export default BaseRoute.extend({
  beforeModel() {
    window.location.href = "https://content.jobbio.com/work-happy-100";
  }
});
