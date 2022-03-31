import PaginationComponent from '../pagination-component';
import { computed } from '@ember/object';

export default PaginationComponent.extend({
  modelType: 'company',
  featured: false,
  partner: false,
  location: '',
  page_size: 18,
  params: computed('cursor', function(){
    var params = this._super();
    params['featured'] = this.get('featured');
    params['partner'] = this.get('partner');
    params['location'] = this.get('location');
    if(this.get('location') != 'ALL'){
      params['order'] = true;
    }
    return params;
  })
});
