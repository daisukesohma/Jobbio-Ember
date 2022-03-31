import BaseComponent from '../base-component';
import { computed } from '@ember/object';

export default BaseComponent.extend({
  num: computed('question', function() {
    return this.get('index') + 1
  }),
  didRender() {
    this._super(...arguments);
    // var id = "replace_me-v2_player_"+this.get('num');
    // var video = this.get('question.video_token');
    // ziggeoApp.on("ready", function() {
    //   var player = new ZiggeoApi.V2.Player({
    //     element: document.getElementById(id),
    //     attrs: {
    //       width: 555,
    //       height: 320,
    //       theme: "modern",
    //       themecolor: "red",
    //       video: video
    //     }
    //   });
    //   player.activate();
    // });
  }
});
