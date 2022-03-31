import BaseComponent from '../base-component';

export default BaseComponent.extend({
  didRender(){
    window.$('.radial').each(function () {
      var chart = window.jQuery(this),
        value = 0,
        color = '#000000',
        time = 2000,
        pieSize = 110,
        barWidth = 3,
        defaults = {},
        attributeOverrides = {},
        options;

      defaults = {
        animate: ({
          duration: time,
          enabled: true
        }),
        barColor: color,
        scaleColor: false,
        size: pieSize,
        lineWidth: barWidth
      };

      if (typeof window.mr.easypiecharts.options.size !== typeof undefined) {
        pieSize = window.mr.easypiecharts.options.size;
      }
      if (typeof chart.attr('data-timing') !== typeof undefined) {
        attributeOverrides.animate = {
          duration: parseInt(chart.attr('data-timing'), 10),
          enabled: true
        };
      }
      if (typeof chart.attr('data-color') !== typeof undefined) {
        attributeOverrides.barColor = chart.attr('data-color');
      }
      if (typeof chart.attr('data-size') !== typeof undefined) {
        pieSize = attributeOverrides.size = parseInt(chart.attr('data-size'), 10);
      }
      if (typeof chart.attr('data-bar-width') !== typeof undefined) {
        attributeOverrides.lineWidth = parseInt(chart.attr('data-bar-width'), 10);
      }

      chart.css('height', pieSize).css('width', pieSize);



      if (typeof window.mr.easypiecharts.options === 'object') {
        options = window.jQuery.extend({}, defaults, window.mr.easypiecharts.options, attributeOverrides);
      }

      chart.easyPieChart(options);
      chart.data('easyPieChart').update(0);
    });

    if (window.$('.radial').length) { 
      window.mr.easypiecharts.init();
      window.mr.easypiecharts.activate();
      window.mr.scroll.listeners.push(window.mr.easypiecharts.activate);
    }
  }
});
