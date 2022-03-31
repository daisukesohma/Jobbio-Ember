import BaseRoute from './base-route';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';

export default BaseRoute.extend({
  cookies: inject(),
  headTags: function() {
    return [
      {
        type: 'meta',
        attrs: {
          name:'description',
          content: 'Jobbio is a job search platform that connects great talent like you with great companies quickly, directly and privately. 6,000+ companies post job opportunities on Jobbio, and you can learn about their mission, their teams and their culture. Start a job search and find the job that works for you!'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:title',
          content: 'Search Jobs And Find Your Dream Job Today! | Jobbio'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:description',
          content: 'Jobbio is a job search platform that connects great talent like you with great companies quickly, directly and privately. 6,000+ companies post job opportunities on Jobbio, and you can learn about their mission, their teams and their culture. Start a job search and find the job that works for you!'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'og:url',
          content: 'https://jobbio.com'
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
          content: 'https://jobbio.com/'
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
          content: 'Search Jobs And Find Your Dream Job Today! | Jobbio'
        }
      },
      {
        type: 'meta',
        attrs: {
          property: 'twitter:description',
          content: 'Jobbio is a job search platform that connects great talent like you with great companies quickly, directly and privately. 6,000+ companies post job opportunities on Jobbio, and you can learn about their mission, their teams and their culture. Start a job search and find the job that works for you!'
        }
      }
    ];
  },
  titleToken: 'Search Jobs And Find Your Dream Job Today!',
  location: computed(function(){
    return this.get('cookies').read('location')
  }),
  model(params){
    return {location: this.get('location'), error: params.error};
  },
  actions: {
    didTransition() {
      scheduleOnce('afterRender', this, function() {
        window.$('[data-gradient-bg]').each(function (index) {
          var granimParent = window.$(this),
              granimID = 'granim-' + index + '',
              colours = granimParent.attr('data-gradient-bg'),
              pairs = [],
              tempPair = [],
              ao = {},
              count,
              passes,
              i,
              themeDefaults,

              options;

          // Canvas element forms the gradient background
          granimParent.prepend('<canvas id="' + granimID + '"></canvas>');

          // Regular expression to match comma separated list of hex colour values
          passes = /^(#[0-9|a-f|A-F]{6}){1}([ ]*,[ ]*#[0-9|a-f|A-F]{6})*$/.test(colours);

          if (passes === true) {
              colours = colours.replace(' ', '');
              colours = colours.split(',');
              count = colours.length;
              // If number of colours is odd - duplicate last colour to make even array
              if (count % 2 !== 0) {
                  colours.push(colours[count - 1]);
              }
              for (i = 0; i < (count / 2); i++) {
                  tempPair = [];
                  tempPair.push(colours.shift());
                  tempPair.push(colours.shift());
                  pairs.push(tempPair);
              }

              // attribute overrides - allows per-gradient override of global options.
              ao.states = {
                  "default-state": {
                      gradients: pairs
                  }
              }
          }

          themeDefaults = {
              element: '#' + granimID,
              name: 'basic-gradient',
              direction: 'left-right',
              opacity: [1, 1],
              isPausedWhenNotInView: true,
              states: {
                  "default-state": {
                      gradients: pairs
                  }
              }
          };

          options = window.$.extend({}, themeDefaults, window.mr.granim.options, ao);
          window.$(this).data('gradientOptions', options);
          new window.Granim(options);
        });

        window.$('.background-image-holder').each(function () {
          var imgSrc = window.$(this).children('img').attr('src');
          window.$(this).css('background', 'url("' + imgSrc + '")').css('background-position', 'initial').css('opacity', '1');
        });
      });
    }
  }
});
