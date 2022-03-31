import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import EmberRouter from '@ember/routing/router';
import { on } from '@ember/object/evented';
import config from './config/environment';
import './models/custom-inflector-rules';

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

EmberRouter.reopen({
  notifyGoogleTagManager: on('didTransition', function() {
    window.dataLayer.push({
      event: 'jtm.PageView',
      path: this.get('url')
    });
  })
});

loadInitializers(App, config.modulePrefix);

export default App;
