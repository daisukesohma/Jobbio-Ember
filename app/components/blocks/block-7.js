import BaseComponent from '../base-component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default BaseComponent.extend({
  style: computed( function () {
    return new htmlSafe(`
      background-color: ${this.get('object.background_color')};
      padding: ${this.get('object.padding_top')}px ${this.get('object.padding_right')}px ${this.get('object.padding_bottom')}px ${this.get('object.padding_left')}px;
      margin: ${this.get('object.margin_top')}px ${this.get('object.margin_right')}px ${this.get('object.margin_bottom')}px ${this.get('object.margin_left')}px;
    `)
  }),
  didRender(){
    this._super(...arguments);
    window.$('.modal-container').each(function () {

      // Add modal close if none exists

      var modal = window.$(this),
        modalContent = modal.find('.modal-content');


      if (!modal.find('.modal-close').length) {
        modal.find('.modal-content').append('<div class="modal-close modal-close-cross"></div>');
      }

      // Set modal height

      if (modalContent.attr('data-width') !== undefined) {
        var modalWidth = modalContent.attr('data-width').substr(0, modalContent.attr('data-width').indexOf('%')) * 1;
        modalContent.css('width', modalWidth + '%');
      }
      if (modalContent.attr('data-height') !== undefined) {
        var modalHeight = modalContent.attr('data-height').substr(0, modalContent.attr('data-height').indexOf('%')) * 1;
        modalContent.css('height', modalHeight + '%');
      }

      // Set iframe's src to data-src to stop autoplaying iframes
      window.mr.util.idleSrc(modal, 'iframe');

    });


    window.$('.modal-instance').each(function (index) {
      var modalInstance = window.$(this);
      var modal = modalInstance.find('.modal-container');
      var trigger = modalInstance.find('.modal-trigger');

      // Link modal with modal-id attribute

      trigger.attr('data-modal-index', index);
      modal.attr('data-modal-index', index);

      // Set unique id for multiple triggers

      if (typeof modal.attr('data-modal-id') !== typeof undefined) {
        trigger.attr('data-modal-id', modal.attr('data-modal-id'));
      }


      // Attach the modal to the body
      modal = modal.detach();
      window.mr.modals.allModalsContainer.append(modal);
    });


    window.$('.modal-trigger').on('click', function () {

      var modalTrigger = window.$(this);
      var uniqueID, targetModal;
      // Determine if the modal id is set by user or is set programatically

      if (typeof modalTrigger.attr('data-modal-id') !== typeof undefined) {
        uniqueID = modalTrigger.attr('data-modal-id');
        targetModal = window.mr.modals.allModalsContainer.find('.modal-container[data-modal-id="' + uniqueID + '"]');
      } else {
        uniqueID = window.$(this).attr('data-modal-index');
        targetModal = window.mr.modals.allModalsContainer.find('.modal-container[data-modal-index="' + uniqueID + '"]');
      }

      window.mr.util.activateIdleSrc(targetModal, 'iframe');
      window.mr.modals.autoplayVideo(targetModal);

      window.mr.modals.showModal(targetModal);

      return false;
    });

    window.$(document).on('click', '.modal-close', window.mr.modals.closeActiveModal);

    window.$(document).keyup(function (e) {
      if (e.keyCode === 27) { // escape key maps to keycode `27`
        window.mr.modals.closeActiveModal();
      }
    });

    window.$('.modal-container:not(.modal--prevent-close)').on('click', function (e) {
      if (e.target !== this) return;
      window.mr.modals.closeActiveModal();
    });
  }
});
