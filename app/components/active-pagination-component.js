import PaginationComponent from './pagination-component';
import { task, timeout } from 'ember-concurrency';
import { computed, observer } from '@ember/object';

// This component actively searchs when the 'searchTerm' property is changed
export default PaginationComponent.extend({
  resetAllowed: true,
  isLoading: computed('loading', 'resetSearch.isRunning', function(){
    return this.get('loading') | this.get('resetSearch.isRunning');
  }),
  didRender() {
    if(this.get('autoLoad') && this.get('hasLoadedInitialy') == false){
      this.send('loadMore');
    }
  },
  // searchTermChanged: observer('searchTerm', 'type', function() {
  //   if(this.get('resetAllowed')){
  //     this.set('objects', []);
  //     this.get('resetSearch').perform();
  //   }
  // }),
  resetSearch: task(function * (){
    // wait while user is typing
    // yield timeout(500);

    this.set('cursor', '');
    this.setProperties({
      hasLoadedInitialy: false,
      hasMore: true,
      objects: [],
    });
    this.send('loadMore');
  }).restartable(),
});
