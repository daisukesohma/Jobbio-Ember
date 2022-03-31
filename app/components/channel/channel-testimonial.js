import ChannelComponent from './channel-component';
import { inject } from '@ember/service';

export default ChannelComponent.extend({
    store: inject(),
    testimonials: null,
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
            slidesPerView: 1,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            spaceBetween: 30
        });
        this.get('store').query('branding-testimonial', {type: 'testimony', id: this.get('channel.company.id')}).then(response => {
            var testimonials = [];
            response.forEach(function(testimonial) {
                testimonials.pushObject(testimonial);
            });
            if (testimonials.length == 1) {
                this.set('myOptions.autoplay', false);
            }
            this.set('testimonials', testimonials);
        });
    }
});
