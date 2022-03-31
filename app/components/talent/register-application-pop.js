import BaseComponent from '../base-component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { htmlSafe } from '@ember/string';

export default BaseComponent.extend({
    router: inject(),
    logoDark: computed(function(){
        // Produces
        // Binding style attributes may introduce cross-site scripting vulnerabilities warning
        // but is escaped
        return new htmlSafe(this.get('cloudfront')+"images/site/logo_dark.png");
    }),
    init () {
        this._super(...arguments);
    }
});
