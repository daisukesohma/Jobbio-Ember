import BaseComponent from '../base-component';
import { computed } from '@ember/object';
import config from '../../config/environment';

export default BaseComponent.extend({
  num: computed('question', function() {
    return this.get('index') + 1
  }),
  didRender() {
    this._super(...arguments);
    // var id = "replace_me-v2_recorder_"+this.get('num');
    // ziggeoApp.on("ready", function() {
    //   var recorder = new ZiggeoApi.V2.Recorder({
    //     element: document.getElementById(id),
    //     attrs: {
    //       width: 555,
    //       height: 320,
    //       theme: "modern",
    //       themecolor: "red",
    //       allowupload: false,
    //       title: "talent_id",
    //       manualsubmit: true,
    //     }
    //   });
    //   recorder.activate();
    // });
    // var element = document.getElementById(id);
    // var embedding = ZiggeoApi.V2.Recorder.findByElement(element);
    // embedding.on("manually_submitted", function () {
    //   var token = embedding.get('video')
    //   self.send('postResponse', token);
    // });
  },
  actions: {
    postResponse: function(token) {
      var data = {};
      data.video_token = token;
      var url = `${config.APP.API_HOST}/jobs/${this.get('jid')}/questions/${this.get('question.id')}/applications/${this.get('id')}/answers`;
      this.get('session').authorize('authorizer:token', (headerName, headerValue) => {
        window.$.ajax({
          url: url,
          headers: {
            Authorization: headerValue,
          },
          type: "POST",
          data: JSON.stringify(data),
          contentType: 'application/json;charset=utf-8',
          dataType: 'json'
        })
      });
    },
  }
});
