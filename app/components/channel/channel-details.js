import ChannelComponent from './channel-component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default ChannelComponent.extend({
  store: inject(),
  myStickyOptions: null,
  currentUser: inject('current-user'),
  isNotTalent: computed('currentUser', function(){
    return this.get('currentUser.current.user.role') != 'talent';
  }),
  isCompanyMember: computed('currentUser', function(){
    return this.get('currentUser.current.user.role') == 'company_member';
  }),
  isNotCompanyMember: computed('currentUser', function(){
    return this.get('currentUser.current.user.role') != 'company_member';
  }),
  isAdmin: computed('currentUser', function(){
    return this.get('session.data.authenticated.jobbio_admin.user.role') == 'jobbio_admin';
  }),
  init() {
    this._super(...arguments);
    this.set('myStickyOptions', {
      wrapperClassName: '',
      topSpacing: 80,
      bottomSpacing: 560
    });
  },
  actions: {
    follow: function(id) {
      var data = {"channel_id":id};
      this.get('store').createRecord('followed-channel', data).save();
      this.set('channel.is_following', true);
    },
    unfollow: function(id) {
      var data = {"channel_id":id};
      this.get('store').createRecord('unfollowed-channel', data).save();
      this.set('channel.is_following', false);
    },
    addJob: function(id) {
      var data = {"channel_id":id};
      this.get('store').createRecord('added-job', data).save().then(() => {
        window.$('#addJobAlert').modal('show');
      }).catch((xhr) => {
        this.set('error', xhr.errors);
      });
    },
  }
});
