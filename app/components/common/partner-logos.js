import BaseComponent from '../base-component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default BaseComponent.extend({
  image: computed(function() {
    // Binding style attributes may introduce cross-site scripting vulnerabilities warning but is escaped
    return new htmlSafe(`${this.get('cloudfront')}images2/site/content-pages/`);
  }),
  init() {
    this._super(...arguments);
    var brands = [
      {url: `${this.get('image')}betakit_homepage.png`},
      {url: `${this.get('image')}independent_homepage.png`},
      {url: `${this.get('image')}sifted_homepage.png`},
      {url: `${this.get('image')}venture_beat_homepage.png`},
      {url: `${this.get('image')}evoke_color.png`},
      {url: `${this.get('image')}fintechfutures_color.png`},
      {url: `${this.get('image')}growthhackers_color.png`},
      {url: `${this.get('image')}informationage_color.png`},
      {url: `${this.get('image')}shawacademy_color.png`},
      {url: `${this.get('image')}siliconluxembourg.png`},
      {url: `${this.get('image')}silioconcanals_color.png`},
      // {url: `${this.get('image')}thetimes.png`},
      {url: `${this.get('image')}thesun_color.png`},
      {url: `${this.get('image')}wired.png`},
    ]
    this.set('brands1', brands.slice(0,7));
    this.set('brands2', brands.slice(6));
    this.set('myOptions', {
      pagination: {
        type: 'custom',
        clickable: true,
        bulletActiveClass: 'slide-show-active-bullet'
      },
      keyboard: true,
      slidesPerView: 3,
      loop: true,
      autoplay: {
        delay: 1500,
      },
      spaceBetween: 0
    });
  },
});
