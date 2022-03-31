// import Route from '../base-route';
// import config from '../../config/environment';
// import { scheduleOnce } from '@ember/runloop';
//
// function previousModal() {
//   var modalIndex = parseInt(window.$('.modal-active')[0].getAttribute('data-modal-index'));
//   if (modalIndex > 0) {
//     window.$('.modal-active').removeClass('modal-active');
//     window.$(`div.modal-container[data-modal-index='${modalIndex - 1}']`).addClass('modal-active');
//   }
// }
//
// function nextModal() {
//   var modalIndex = parseInt(window.$('.modal-active')[0].getAttribute('data-modal-index'));
//   if (modalIndex < window.$('.modal-container').length - 1) {
//     window.$('.modal-active').removeClass('modal-active');
//     window.$(`div.modal-container[data-modal-index='${modalIndex + 1}']`).addClass('modal-active');
//   }
// }
//
// export default Route.extend({
//   model() {
//     return config.APP.CLOUD_FRONT_HOST + "images2/site/content-pages";
//   },
//   actions: {
//     didTransition() {
//       scheduleOnce('afterRender', this, function() {
//         window.$('.modal-trigger').click(function() {
//           window.$('.arrow-icon-modal').show();
//         });
//         window.$('.modal-container').click(function() {
//           if (window.$('.modal-active').length == 0) {
//             window.$('.arrow-icon-modal').hide();
//           }
//         });
//         var leftArrow = window.$('<div class="arrow-icon-modal" onclick="previousModal()" style="display: none; position: fixed; top: 50%; left: 3%; z-index: 9999; cursor: pointer;"><i class="icon icon--sm icon-Triangle-ArrowLeft color--white"></i></div>');
//         var rightArrow = window.$('<div class="arrow-icon-modal" onclick="nextModal()" style="display: none; position: fixed; top: 50%; right: 3%; z-index: 9999; cursor: pointer;"><i class="icon icon--sm icon-Triangle-ArrowRight color--white"></i></div>');
//         window.$('.all-page-modals').prepend(leftArrow);
//         window.$('.all-page-modals').append(rightArrow);
//
//         var container = document.querySelector('#masonry-grid');
//         var msnry = new Masonry( container, {
//           itemSelector: '.masonry__item',
//           // columnWidth: '.grid-sizer',
//           percentPosition: true
//         });
//       });
//     }
//   }
// });
