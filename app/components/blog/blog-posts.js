import PaginationComponent from '../pagination-component';
import { computed } from '@ember/object';

export default PaginationComponent.extend({
  modelType: 'blog-post',
  params: computed('cursor', function(){
    var params = this._super();
    params['page_size'] = 3;
    return params;
  })
});
