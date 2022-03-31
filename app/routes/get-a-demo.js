import Route from './base-route';
import { inject } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
import config from '../config/environment';

export default Route.extend({
  currentUser: inject(),
  queryParams: {
    source: {refreshModel:true}
  },
  titleToken: 'Get A Demo - Start Hiring Better Talent Today',
  headTags: function() {
    return [
      {
        type: 'meta',
        attrs: {
          name:'description',
          content: 'Get a demo and start hiring better talent now. Fill out this form to be contacted by our team today!'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:title',
          content: 'Get A Demo - Start Hiring Better Talent Today | Jobbio'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:description',
          content: 'Get a demo and start hiring better talent now. Fill out this form to be contacted by our team today!'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:url',
          content: 'https://jobbio.com/get-a-demo'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:type',
          content: 'website'
        }
      },
      {
        type: 'link',
        tagId: 'canonical-link',
        attrs: {
          rel: 'canonical',
          content: 'https://jobbio.com/get-a-demo'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'twitter:card',
          content: 'summary_large_image'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'twitter:site',
          content: '@Jobbio'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'twitter:title',
          content: 'Get A Demo - Start Hiring Better Talent Today | Jobbio'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'twitter:description',
          content: 'Get a demo and start hiring better talent now. Fill out this form to be contacted by our team today!'
        }
      }
    ];
  },
  model(params) {
    return {image:config.APP.CLOUD_FRONT_HOST+"images/site/", source:params.source};
  },
  afterModel() {
    var APP_ID = config.APP.INTERCOM;
    window.$("head").append(`
      <script>
        (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${APP_ID}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
      </script>
    `);
    window.Intercom('update');
    var logged_in = {
      app_id: APP_ID,
      action_color: "#ff4f4f",
      custom_launcher_selector: "#frontHeadProductLiveChat",
      email: this.get('currentUser.current.user.email'),
      user_id: this.get('currentUser.current.user.id'),
      name: `${this.get('currentUser.current.user.first_name')} ${this.get('currentUser.current.user.last_name')}`,
      utm_source: this.get('currentUser.current.company.source'),
      company: {company_id: this.get('currentUser.current.company.id'),
        name: this.get('currentUser.current.company.name'),
        created_at: this.get('currentUser.current.company.created_at')},
    };
    var logged_out = {
      app_id: APP_ID,
      action_color: "#ff4f4f",
      custom_launcher_selector: ["#frontHeadProductLiveChat", "#productFooterSpeak"],
    };
    var sess = this.get('currentUser');
    if(!sess.get('session.isAuthenticated')){
      window.Intercom('boot', logged_out);
    }else{
      window.Intercom('boot', logged_in);
    }
  },
  actions: {
    didTransition() {
      scheduleOnce('afterRender', this, function() {
        window.$('.background-image-holder').each(function () {
          var imgSrc = window.$(this).children('img').attr('src');
          window.$(this).css('background', 'url("' + imgSrc + '")').css('background-position', 'initial').css('opacity', '1');
        });

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

        // Validate phone field
        window.$('#phone').on('keypress keyup blur', function(event) {
          if (event.which < 48 || event.which > 57) {
            event.preventDefault();
          }
          if (!/^\d*$/.test(window.$('#phone').val())) {
            window.$('#phone-validation-error').show();
          } else {
            window.$('#phone-validation-error').hide();
          }
        });
        // Validate email field
        window.$('#email').on('keypress keyup blur', function() {
          if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(window.$('#email').val())) {
            window.$('#email-validation-error').show();
          } else {
            window.$('#email-validation-error').hide();
          }
        });
        window.$('form').submit(function(event){
          if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(window.$('#email').val()) || !/^\d*$/.test(window.$('#phone').val())) {
            event.preventDefault();
          }
        });
      });
    }
  }
});
