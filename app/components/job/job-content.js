import BaseComponent from '../base-component';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';
import { inject } from '@ember/service';

export default BaseComponent.extend({
  store: inject(),
  isText: computed(function(){
    return this.get('content.type') == "text";
  }),
  isImage: computed(function(){
    return this.get('content.type') == "image";
  }),
  isVideo: computed(function(){
    return this.get('content.type') == "video";
  }),
  options: null,
  saving: false,
  init() {
    this._super(...arguments);
    this.set('options', {
      menubar: false,
      height: 50,
      theme: 'modern',
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern imagetools'
      ],
      toolbar1: 'undo redo | bold | bullist | link ',
    });
  },
  actions: {
    removeContent: function(content, items) {
      content.destroyRecord();
      items.removeObject(content);
    },
    updateContent: function(content) {
      this.set('saving', true);
      var data = {
        branding: content.branding,
        detail: content.detail,
        image: content.image,
        impressions: content.impressions,
        in_bank: content.in_bank,
        text: content.text,
        title: content.title,
        type: content.type,
        video: content.video,
        views: content.views,
        content_id: content.id
      };
      this.get('store').createRecord('job-content', data).save().then(() => {
        var self = this;
        later(function() {
          self.set('saving', false);
        }, 500);
      });
    }
  }
});
