import ChannelComponent from './channel-component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { htmlSafe } from '@ember/string';

export default ChannelComponent.extend({
  store: inject(),
  currentUser: inject('current-user'),
  backgroundImage: computed('channel', function(){
    // Produces
    // Binding style attributes may introduce cross-site scripting vulnerabilities warning
    // but is escaped
    var imageUrl = this.get('channel').get('banner');
    if(imageUrl === null){
      var max = 4; // inclusive
      var min = 1; // inclusive
      var number = Math.floor(Math.random() * (max - min + 1)) + min;
      imageUrl = "company-placeholders/company-banner-"+number+".jpeg"
      return new htmlSafe(this.get('cloudfront')+"images/site/"+imageUrl);
    }
    return new htmlSafe(imageUrl);
  }),
  caption: computed('channel', function(){
    var caption = this.get('channel').get('caption');
    return new htmlSafe(caption);
  }),
  description: computed('channel', function(){
    var description = this.get('channel').get('description');
    return new htmlSafe(description);
  }),
  isNotCompanyMember: computed('currentUser', function(){
    return this.get('currentUser.current.user.role') != 'company_member';
  }),
  isAdmin: computed('currentUser', function(){
      return this.get('session.data.authenticated.jobbio_admin.user.role') == 'jobbio_admin';
    }),
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
    scrollToClicked: function() {
      // Close nav bar dropdowns
      window.$('.dropdown--active').removeClass('dropdown--active');
    }
  }
});
