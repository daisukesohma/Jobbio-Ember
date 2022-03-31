import Service from '@ember/service';
import { inject } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { resolve } from 'rsvp';

export default Service.extend({
  session: inject('session'),
  store: inject('store'),
  load() {
    if(this.get('session.data.authenticated.talent')){
      let userId = this.get('session.data.authenticated.talent.user.id');
      if (!isEmpty(userId)) {
        return this.get('store').findRecord('talentresponse', userId).then((response) => {
          this.set('current', response.get('talent'));
        });
      } else {
        return resolve();
      }
    }
    else if(this.get('session.data.authenticated.company_member')){
      let userId = this.get('session.data.authenticated.company_member.user.id');
      if (!isEmpty(userId)) {
        return this.get('store').findRecord('teammember', userId).then((response) => {
          this.set('current', response.get('company_member'));
        });
      } else {
        return resolve();
      }
    }else{
      return resolve();
    }
  }
});
