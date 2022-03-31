import Route from '../base-route';

export default Route.extend({
  renderTemplate: function() {
      this.render('talent/questionnaire', { into: 'application' });
  },
  model(params) {
    return this.store.findRecord('job', params.jid).then(function(job) {
      return {job: job};
    });
  },
  afterModel: function() {
    // window.$("head").append(`
    //   <link rel="stylesheet" href="https://assets.ziggeo.com/v2-stable/ziggeo.css" />
    //   <script src="https://assets.ziggeo.com/v2-stable/ziggeo.js"></script>
    //   <script>
    //     var ziggeoApp = new ZiggeoApi.V2.Application({
    //       token:"r1fe55282ce51b9d318a8f21252ecc9c"
    //     });
    //     ZiggeoApi.V2.Locale.setLocale("en");
    //   </script>
    // `);
  },
});
