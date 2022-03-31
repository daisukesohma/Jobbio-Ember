import ChannelComponent from './channel-component';
import { inject } from '@ember/service';

export default ChannelComponent.extend({
    store: inject(),
    galleries: null,
    myOptions: null,
    init() {
        this._super(...arguments);
        this.set('myOptions', {
            pagination: {
                clickable: true,
                bulletActiveClass: 'slide-show-active-bullet'
            },
            centered: true,
            keyboard: true,
            slidesPerView: 3,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            spaceBetween: 30
        });
        this.get('store').query('branding-gallery', {type: 'gallery', id: this.get('channel.company.id')}).then(response => {
            var galleries = [];
            response.forEach(function(gallery) {
                galleries.pushObject(gallery);
            });
            this.set('galleries', galleries);
        });
    }
});
