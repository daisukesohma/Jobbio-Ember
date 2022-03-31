import ActivePaginationComponent from '../active-pagination-component';
import { computed, observer } from '@ember/object';

export default ActivePaginationComponent.extend({
  modelType: 'company',
  page_size: 18,
  params: computed('cursor', function(){
    var params = this._super();
    params['location'] = this.get('location');
    return params;
  }),
  searchChanged: observer('trk', function() {
    if(this.get('resetAllowed')){
      this.get('resetSearch').perform();
    }
  }),
  init() {
    this._super(...arguments);
  },
});
