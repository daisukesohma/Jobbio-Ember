import HeadComponent from '../head-component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import config from '../../config/environment';

export default HeadComponent.extend({
  windowscroll: inject(),
  cookies: inject(),
  cookieOptions: null,
  active: false,
  visited: computed('cookies', function() {
    return this.get('cookies').read('visited');
  }),
  visible: computed('opacity', function() {
    if(this.get('opacity')){
      return 'bar--transparent bar--absolute';
    }
    return '';
  }),
  init() {
    this._super(...arguments);
    this.set('cookieOptions', {'path' : '/'});
    this.get('windowscroll').on('scroll', () => {
      if (this.get('windowscroll.scrollTop') > 366) {
        window.$('.front-head #menu1').addClass('pos-fixed');
      } else {
        window.$('.front-head #menu1').removeClass('pos-fixed');
      }
    });
  },
  actions: {
    hideCookiePolicyPopup: function(){
      window.$('.cookie-policy-popup').hide();
      let cookieService = this.get('cookies');
      cookieService.write('visited', true, this.get('cookieOptions'));
    },
    callBack: function () {
      let data = {phone_number: this.get('phone')};

      window.$.ajax({
        url: config.APP.API_HOST + '/callback',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=utf-8',
        dataType: 'json'
      }).then(() => {
        this.set('phone', '');
        window.$('#callBackComplete').modal('show');
      }, (xhr) => {
        var errors = JSON.parse(xhr.responseText);

      });
    }
  }
});
