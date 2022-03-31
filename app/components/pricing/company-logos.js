import BaseComponent from '../base-component';
import config from '../../config/environment';

export default BaseComponent.extend({
  brands: null,
  myOptions: null,
  imageLocation: config.APP.CLOUD_FRONT_HOST,
  init() {
    this._super(...arguments);
    var brands = [
      {url: `${this.get('imageLocation')}images2/site/content-pages/airbnb.png`},
      {url: `${this.get('imageLocation')}images2/site/content-pages/asana.png`},
      {url: `${this.get('imageLocation')}images2/site/content-pages/fidelity.png`},
      {url: `${this.get('imageLocation')}images2/site/content-pages/jamerson.png`},
      {url: `${this.get('imageLocation')}images2/site/content-pages/pwc.png`},
      {url: `${this.get('imageLocation')}images2/site/content-pages/qualtrics.png`},
      {url: `${this.get('imageLocation')}images2/site/content-pages/ryanair.png`},
      {url: `${this.get('imageLocation')}images2/site/content-pages/slack.png`},
    ]
    this.set('brands', brands);
    this.set('myOptions', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        clickable: true,
        bulletActiveClass: 'slide-show-active-bullet'
      },
      keyboard: true,
      slidesPerView: 4,
      loop: true,
      autoplay: {
        delay: 5000,
      },
      spaceBetween: 0
    });
  },
  didRender(){
    window.$('.background-image-holder').each(function () {
      var imgSrc = window.$(this).children('img').attr('src');
      window.$(this).css('background', 'url("' + imgSrc + '")').css('background-position', 'initial').css('opacity', '1');
    });
  },
  actions: {
  }
});
