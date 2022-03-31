'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('vendor/stack-interface.css');
  app.import('vendor/lightbox.css');
  app.import('vendor/socicon.css');
  app.import('vendor/iconsmind.css');
  app.import('vendor/font-awesome.min.css');
  app.import('node_modules/bootstrap/dist/css/bootstrap.css');
  app.import('vendor/flickity.css');
  app.import('vendor/stack-interface.css');
  app.import('vendor/theme-red.css');
  app.import('vendor/custom.css');

  app.import('node_modules/sweetalert/dist/sweetalert.min.js');
  app.import('vendor/jquery-3.1.1.min.js');
  app.import('vendor/flickity.min.js');
  app.import('node_modules/bootstrap/dist/js/bootstrap.js');
  app.import('bower_components/isotope-layout/dist/isotope.pkgd.js');
  app.import('bower_components/masonry-layout/dist/masonry.pkgd.js');
  app.import('vendor/parallax.js');
  app.import('vendor/typed.min.js');
  app.import('vendor/granim.min.js');
  app.import('vendor/twitterfetcher.min.js');
  app.import('vendor/spectragram.min.js');
  app.import('vendor/smooth-scroll.min.js');
  app.import('vendor/jquery.sticky-sidebar.js');
  app.import('vendor/scripts.js');
  app.import('vendor/easypiechart.min.js');
  app.import('bower_components/jquery-validation/dist/jquery.validate.min.js');

  // for serializing forms into json objects, used for job applications with questions
  app.import('vendor/jquery.serialize-object.min.js');

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
