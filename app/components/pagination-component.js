import BaseComponent from './base-component';
import { get, computed } from '@ember/object';
import { inject } from '@ember/service';

// this component allows the 'searchTerm' to be paginated
// changing the 'searchTerm' will not cause a refresh
// see active-pagination-component for that functionality
export default BaseComponent.extend({
  store: inject(),
  infinity: inject(),
  objects: null,
  modelType: '',
  searchTerm: '',
  cursor: '',
  page_size: 20,
  hasLoadedInitialy: false,
  hasMore: true,
  autoLoad: true,
  resetAllowed: true,
  loading: false,
  init: function() {
    this._super();
    // stops objects from being shared across instances of this component
    this.set("objects", []);
  },
  didRender() {
    if(this.get('autoLoad') && this.get('hasLoadedInitialy') == false){
      this.send('loadMore');
    }
  },
  params: computed('searchTerm', 'cursor', 'page_size', function(){
    return {
      search: this.get('searchTerm'),
      cursor: this.get('cursor'),
      page_size: this.get('page_size')
    };
  }),
  isLoading: computed('loading', function(){
    return this.get('loading');
  }),
  actions: {
    loadMore(){
      if(this.get('loading') || this.get('hasMore') == false){
        return;
      }

      this.set('loading', true);

      this.get('store').query(this.get('modelType'), this.get('params')).then(response => {
        if (this.get('params') != response.get('query')) {
          return;
        }

        this.set('loading', false);
        this.set('hasLoadedInitialy', true);
        if(response == null){
          this.set('hasMore', false);
          return;
        }

        var self = this;
        response.forEach(function(object) {
          self.get('objects').pushObject(object);
        });

        get(this, 'infinity').infinityLoad(this.get('objects'));

        var meta = response.get('meta');
        this.set('cursor', unescape(meta.next))
        if(meta.next == null){
          this.set('hasMore', false);
        }
        meta.previous == null ? this.set('hasPrevious', false) : this.set('hasPrevious', true);
        this.send('loaded');
      });
    },
    // DO NOT REMOVE THIS
		// it functions as a life cyclehook for components that extend this class
		// to hook into
		loaded(){

		}
  },
});
