import BaseComponent from '../base-component';
import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';

export default BaseComponent.extend({
  style: computed( function () {
    return new htmlSafe(`
      background-color: ${this.get('object.background_color')};
      padding: ${this.get('object.padding_top')}px ${this.get('object.padding_right')}px ${this.get('object.padding_bottom')}px ${this.get('object.padding_left')}px;
      margin: ${this.get('object.margin_top')}px ${this.get('object.margin_right')}px ${this.get('object.margin_bottom')}px ${this.get('object.margin_left')}px;
    `)
  }),
  didRender() {
    this._super(...arguments);

    if (this.get('object.social_type') == 'twitter') {
      //////////////// Twitter Feeds
      window.$('.tweets-feed').each(function (index) {
        window.$(this).attr('id', 'tweets-' + index);
      }).each(function (index) {
        var element = window.$('#tweets-' + index);
        var TweetConfig = {
          "domId": '',
          "maxTweets": 6,
          "enableLinks": true,
          "showUser": true,
          "showTime": true,
          "dateFunction": '',
          "showRetweet": false,
          "customCallback": handleTweets
        };
        TweetConfig = window.$.extend(TweetConfig, window.mr.twitter.options);
        if (typeof element.attr('data-widget-id') !== typeof undefined) {
          TweetConfig.id = element.attr('data-widget-id');
        } else if (typeof element.attr('data-feed-name') !== typeof undefined && element.attr('data-feed-name') !== "") {
          TweetConfig.profile = {
            "screenName": element.attr('data-feed-name').replace('@', '')
          };
        } else if (typeof window.mr.twitter.options.profile !== typeof undefined) {
          TweetConfig.profile = {
            "screenName": window.mr.twitter.options.profile.replace('@', '')
          };
        } else {
          TweetConfig.profile = {
            "screenName": 'twitter'
          };
        }
        TweetConfig.maxTweets = element.attr('data-amount') ? element.attr('data-amount') : TweetConfig.maxTweets;
        if (element.closest('.twitter-feed--slider').length) {
          element.addClass('slider');
        }
        function handleTweets(tweets) {
          var x = tweets.length;
          var n = 0;
          var html = '<ul class="slides">';
          while (n < x) {
            html += '<li>' + tweets[n] + '</li>';
            n++;
          }
          html += '</ul>';
          element.html(html);
          // Initialize twitter feed slider
          if (element.closest('.slider').length) {
            window.mr.sliders.documentReady(window.mr.setContext());
            return html;
          }
        }
        window.twitterFetcher.fetch(TweetConfig);
      });
    } else if(this.get('object.social_type') == 'instagram') {
      //////////////// Instagram
      var themeDefaults, options, ao = {};
      if (window.$('.instafeed').length) {
        // Replace with your own Access Token and Client ID
        var token = '4079540202.b9b1d8a.1d13c245c68d4a17bfbff87919aaeb14',
            client = 'b9b1d8ae049d4153b24a6332f0088686',
            elementToken, elementClient;
        if (window.$('.instafeed[data-access-token][data-client-id]').length) {
          elementToken = window.$('.instafeed[data-access-token][data-client-id]').first().attr('data-access-token');
          elementClient = window.$('.instafeed[data-access-token][data-client-id]').first().attr('data-client-id');
          if (elementToken !== "") {
            token = elementToken;
          }
          if (elementClient !== "") {
            client = elementClient;
          }
        }
        window.$.fn.spectragram.accessData = {
          accessToken: token,
          clientID: client
        };
      }
      window.$('.instafeed').each(function () {
        var feed = window.$(this);
        themeDefaults = {
          query: 'mediuwindow.mrarethemes',
          max: 12
        };
        // Attribute Overrides taken from data attributes allow for per-feed customization
        ao.max = feed.attr('data-amount')
        ao.query = feed.attr('data-user-name');
        options = window.$.extend({}, themeDefaults, window.mr.instagram.options, ao);
        feed.append('<ul></ul>');
        feed.children('ul').spectragram('getUserFeed', options);
      });
    }
  }
});
