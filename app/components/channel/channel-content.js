import ChannelComponent from './channel-component';
import { inject } from '@ember/service';

export default ChannelComponent.extend({
    store: inject(),
    panels: null,
    init() {
        this._super(...arguments);
        this.get('store').query('branding-content', {type: 'panel', id: this.get('channel.company.id')}).then(response => {
            var panels = [];
            var layoutType = true;
            response.forEach(function(panel) {
                panel.set('layoutType', layoutType);
                panels.pushObject(panel);
                layoutType = !layoutType;
            });
            this.set('panels', panels);
        })
    }
});
