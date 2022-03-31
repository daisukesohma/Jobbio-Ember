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
  didRender(){
    this._super(...arguments);
    window.$('.video-cover').each(function(){
      var videoCover = window.$(this);
      if(videoCover.find('iframe[src]').length){
        videoCover.find('iframe').attr('data-src', videoCover.find('iframe').attr('src'));
        videoCover.find('iframe').attr('src','');
      }
    });

    window.$('.video-cover .video-play-icon').on("click", function(){
      var playIcon = window.$(this);
      var videoCover = playIcon.closest('.video-cover');
      if(videoCover.find('video').length){
        var video = videoCover.find('video').get(0);
        videoCover.addClass('reveal-video');
        video.play();
        return false;
      }else if(videoCover.find('iframe').length){
        var iframe = videoCover.find('iframe');
        iframe.attr('src',iframe.attr('data-src'));
        videoCover.addClass('reveal-video');
        return false;
      }
    });

    window.$('.background-image-holder').each(function () {
      var imgSrc = window.$(this).children('img').attr('src');
      window.$(this).css('background', 'url("' + imgSrc + '")').css('background-position', 'initial').css('opacity', '1');
    });
  }
});
