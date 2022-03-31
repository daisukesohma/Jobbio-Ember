import Controller from '@ember/controller';
import config from '../../config/environment';

export default Controller.extend({
  brands: null,
  myOptions: null,
  init() {
    this._super(...arguments);
    var brands = [
        {url: `${config.APP.CLOUD_FRONT_HOST}images2/site/content-pages/inm-logo.png`},
        {url: `${config.APP.CLOUD_FRONT_HOST}images2/site/content-pages/idg_logo.png`},
        {url: `${config.APP.CLOUD_FRONT_HOST}images2/site/content-pages/venture-beat.png`},
        {url: `${config.APP.CLOUD_FRONT_HOST}images2/site/content-pages/techworld.png`},
        {url: `${config.APP.CLOUD_FRONT_HOST}images2/site/content-pages/computerworld-logo.png`},
        {url: `${config.APP.CLOUD_FRONT_HOST}images2/site/content-pages/infoworld-logo.png`}
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
      slidesPerView: 5,
      loop: true,
      autoplay: {
        delay: 5000,
      },
      spaceBetween: -10
    });
  }
});
