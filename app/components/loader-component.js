import BaseComponent from './base-component';
import { inject } from '@ember/service';

// this component will load whatever modelType is passed to it
// it can also reload the modelType when its attrs are updated if needed
// it functions very similarily to pagination component except without expecting
// a paginated list but rather and ordinary array of results
export default BaseComponent.extend({
  store: inject(),
  modelType: '',
  objects: null,
  loading: false,
  autoLoad: true,
  reloadOnUpdateAttrs: false,
  loaded: false,
  params(){
    return {};
  },
  init: function() {
    this._super();
    // stops objects from being shared across instances of this component
    this.set("objects", []);
    if(this.get('autoLoad')){
      this.send('load');
    }
  },
  didUpdateAttrs(){
    if(this.get('reloadOnUpdateAttrs')){
      this.set('loading', false)
      this.set('loaded', false)
      this.set("objects", []);
      this.send('load');
    }
  },
  actions: {
    load(){
      if( this.get('loading') || this.get('loaded')){
        return;
      }
      var params = this.get('params')(this);

      this.set('loading', true);
      this.get('store').query(this.get('modelType'), params)
      .then(response => {
        this.set('loading', false);

        if(response == null){
          return;
        }
        var self = this;
        // clear tags if any present, we do this jsut before setting them
        // so as to limit flickering during loading
        this.set('objects', []);
        response.forEach(function(object) {
          self.get('objects').pushObject(object);
        });
        this.set('loaded', true)
        this.send("loaded")
      }).catch(() => {
        this.set('loading', false);
      });
    },
    loaded(){

    },
  },
});
