import BaseComponent from '../base-component';

export default BaseComponent.extend({
    didRender() {
        this._super(...arguments);
        if (this.get('session.isAuthenticated') && this.get('company')) {
            window.$('#searchApplicationSubmission').modal('show');
        }
    }
});
