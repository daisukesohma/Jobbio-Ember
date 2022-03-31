import BaseComponent from '../base-component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default BaseComponent.extend({
  imageLink: computed( function () {
    return new htmlSafe(this.get('cloudfront')+'images2/topic/');
  }),
  style: computed( function () {
    return new htmlSafe(`
      padding: ${this.get('object.padding_top')}px ${this.get('object.padding_right')}px ${this.get('object.padding_bottom')}px ${this.get('object.padding_left')}px;
      margin: ${this.get('object.margin_top')}px ${this.get('object.margin_right')}px ${this.get('object.margin_bottom')}px ${this.get('object.margin_left')}px;
    `)
  }),
  videoID: computed( function () {
    var ID = '';
    var url = this.get('object.video');
    url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if(url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i);
      ID = ID[0];
    } else {
      ID = url;
    }
    return ID;
  }),
  didRender() {
    this._super(...arguments);

    //////////////// Youtube Background
    if (window.$('.youtube-background').length) {
      window.$('.youtube-background').each(function () {
        var player = window.$(this),
            themeDefaults = {
              containment: "self",
              autoPlay: true,
              mute: true,
              opacity: 1
            },
            ao = {};

        // Attribute overrides - provides overrides to the global options on a per-video basis
        ao.videoURL = window.$(this).attr('data-video-url');
        ao.startAt = window.$(this).attr('data-start-at') ? parseInt(window.$(this).attr('data-start-at'), 10) : undefined;

        player.closest('.videobg').append('<div class="loading-indicator"></div>');
        player.YTPlayer(window.$.extend({}, themeDefaults, window.mr.video.options.ytplayer, ao));
        player.on("YTPStart", function () {
          player.closest('.videobg').addClass('video-active');
        });
      });
    }
    if (window.$('.videobg').find('video').length) {
      window.$('.videobg').find('video').closest('.videobg').addClass('video-active');
    }

    //////////////// Video Cover Play Icons
    window.$('.video-cover').each(function () {
      var videoCover = window.$(this);
      if (videoCover.find('iframe[src]').length) {
        videoCover.find('iframe').attr('data-src', videoCover.find('iframe').attr('src'));
        videoCover.find('iframe').attr('src', '');
      }
    });
    window.$('.video-cover .video-play-icon').on("click", function () {
      var playIcon = window.$(this);
      var videoCover = playIcon.closest('.video-cover');
      if (videoCover.find('video').length) {
        var video = videoCover.find('video').get(0);
        videoCover.addClass('reveal-video');
        video.play();
        return false;
      } else if (videoCover.find('iframe').length) {
        var iframe = videoCover.find('iframe');
        iframe.attr('src', iframe.attr('data-src'));
        videoCover.addClass('reveal-video');
        return false;
      }
    });
  }
});
