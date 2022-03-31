import BaseComponent from '../base-component';
import config from '../../config/environment';

export default BaseComponent.extend({
  banner: `${config.APP.CLOUD_FRONT_HOST}images/site/homepage-banner-airbnb.jpg`,
  init() {
    this._super(...arguments);
    ////////////////// Application Count
    (function ($, s) {
      'use strict';
      // Application Count Widget
      // Convert to 1,000 notation
      var get_count_fmt = function (count) {
        return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      };
      var $application_count;
      var start;
      var per_day;
      var current_number;
      var today_date;
      var today_start;
      // Check for transitions
      var transitions = false;
      transitions = 'transition' in s || 'webkitTransition' in s || 'MozTransition' in s || 'msTransition' in s || 'OTransition' in s;
      var update_number_init = function () {
        $application_count = window.$('.application_count');
        start = parseInt($application_count.data('start') || 49191049);
        per_day = parseInt($application_count.data('per-day') || 125280);
        current_number = start;
        today_date = new Date();
        today_start = (new Date(today_date.getFullYear(), today_date.getMonth(), today_date.getDate())).getTime();

        $application_count.html('');
        setInterval(update_number, 1500);
      };
      // Update the current displayed number
      var update_number = function () {
        var current_timestamp = (new Date()).getTime();
        // Figure out average applications since the last check
        var next_number = start + Math.floor(per_day * ((current_timestamp - today_start) / (60 * 60 * 24 * 1000)));
        var current_fmt_number = get_count_fmt(current_number);
        var next_fmt_number = get_count_fmt(next_number);
        var current_numbers = current_fmt_number.split('');
        var next_numbers = next_fmt_number.split('');
        var current;
        var idx;
        for (var i = 0; i < next_numbers.length; i++) {
          // Using a closure here since Timeouts are needed for css transitions :\
          (function () {
            idx = next_numbers.length - i - 1;
            current = current_numbers[idx];
            var next = next_numbers[idx];
            var $number = $application_count.find('.number' + i);
            // Make the span
            if (!$number.length) {
              $number = window.$('<span/>')
              .addClass('number animate number' + i + (next === ',' ? ' comma' : ''))
              .bind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                var $this = window.$(this);
                var html = $this.html();
                $this
                .removeClass('animate');
                setTimeout(function () {
                  $this
                  .html(html.substring(html.length - 1))
                  .removeClass('change');
                }, 10);
              });
              $application_count.prepend($number);
              current = '&nbsp;';
            }
            // Change the number
            if (current != next) {
              $number
              .html(current + ' ' + next)
              .removeClass('animate change') // Will theoretically avoid a bug with transitionend not firing
              .addClass('animate');

              setTimeout(function () {
                if (transitions) {
                  $number.addClass('change');
                } else {
                  $number.html(next);
                }
              }, 10);
            }
          })();
        }
        current_number = next_number;
      };
      // Run number counter
      setTimeout( function() {
        update_number_init();
      }, 1000);
    })(window.$, document.documentElement.style);
  }
});
