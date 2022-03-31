import BaseComponent from '../base-component';

export default BaseComponent.extend({
  didRender() {
    this._super(...arguments);
    //////////////// Accordions
    var mr = (function (mr, $, window, document){
      "use strict";
      window.mr.accordions = window.mr.accordions || {};
      window.$('.accordion__title').on('click', function(){
        window.mr.accordions.activatePanel(window.$(this));
      });
      window.$('.accordion').each(function(){
        var accordion = window.$(this);
        var minHeight = accordion.outerHeight(true);
        accordion.css('min-height',minHeight);
      });
      if(window.location.hash !== '' && window.location.hash !== '#' && window.location.hash.match(/#\/.*/) === null){
        if(window.$('.accordion > li > .accordion__title'+window.location.hash).length){
          window.mr.accordions.activatePanelById(window.location.hash, true);
        }
      }
      window.$(document).on('click', 'a[href^="#"]:not(a[href="#"])', function(){
        if(window.$('.accordion > li > .accordion__title'+window.$(this).attr('href')).length){
          window.mr.accordions.activatePanelById(window.$(this).attr('href'), true);
        }
      });
      window.mr.accordions.activatePanel = function(panel, forceOpen){
        var $panel = window.$(panel),
        accordion = $panel.closest('.accordion'),
        li = $panel.closest('li'),
        openEvent = document.createEvent('Event'),
        closeEvent = document.createEvent('Event');
        openEvent.initEvent('panelOpened.accordions.mr', true, true);
        closeEvent.initEvent('panelClosed.accordions.mr', true, true);
        if(li.hasClass('active')){
          if(forceOpen !== true){
            li.removeClass('active');
            $panel.trigger('panelClosed.accordions.mr').get(0).dispatchEvent(closeEvent);
          }
        }else{
          if(accordion.hasClass('accordion--oneopen')){
            var wasActive = accordion.find('li.active');
            if(wasActive.length){
              wasActive.removeClass('active');
              wasActive.trigger('panelClosed.accordions.mr').get(0).dispatchEvent(closeEvent);
            }
            li.addClass('active');
            li.trigger('panelOpened.accordions.mr').get(0).dispatchEvent(openEvent);
          }else{
            if(!li.is('.active')){
              li.trigger('panelOpened.accordions.mr').get(0).dispatchEvent(openEvent);
            }
            li.addClass('active');
          }
        }
      };
      window.mr.accordions.activatePanelById = function(id, forceOpen){
        var panel;
        if(id !== '' && id !== '#' && id.match(/#\/.*/) === null){
          panel = window.$('.accordion > li > .accordion__title#'+id.replace('#', ''));
          if(panel.length){
            window.$('html, body').stop(true).animate({
              scrollTop: (panel.offset().top - 50)
            }, 1200);
            window.mr.accordions.activatePanel(panel, forceOpen);
          }
        }
      };
      window.mr.components.documentReady.push(window.mr.accordions.documentReady);
      return mr;
    }(mr, window.$, window, document));
  }
});
