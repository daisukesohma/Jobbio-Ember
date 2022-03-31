import BaseComponent from '../base-component';
import config from '../../config/environment';

export default BaseComponent.extend({
  brands: null,
  myOptions: null,
  init() {
    this._super(...arguments);
    config.APP.CLOUD_FRONT_HOST+"images2/site/client";
    var brands = [
      {url: `${config.APP.CLOUD_FRONT_HOST}images2/site/content-pages/pwc_offering.png`},
      {url: `${config.APP.CLOUD_FRONT_HOST}images2/site/content-pages/ryanair_offering.png`},
      {url: `${config.APP.CLOUD_FRONT_HOST}images2/site/content-pages/slack_offering.png`},
      {url: `${config.APP.CLOUD_FRONT_HOST}images2/site/content-pages/fidelity_offering.png`},
      {url: `${config.APP.CLOUD_FRONT_HOST}images2/site/content-pages/airbnb_offering.png`},
      {url: `${config.APP.CLOUD_FRONT_HOST}images2/site/content-pages/jameson_offering.png`},
      {url: `${config.APP.CLOUD_FRONT_HOST}images2/site/content-pages/qualtrics_offering.png`},
      {url: `${config.APP.CLOUD_FRONT_HOST}images2/site/content-pages/aws_offering.png`},
      {url: `${config.APP.CLOUD_FRONT_HOST}images2/site/content-pages/asana_offering.png`},
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
      slidesPerView: 3,
      loop: true,
      autoplay: {
        delay: 5000,
      },
      spaceBetween: -10
    });
  }
});
