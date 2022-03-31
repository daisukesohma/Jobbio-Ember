import LoaderComponent from '../loader-component';

export default LoaderComponent.extend({
  modelType: 'block-content',
  params(self) {
    var params = {};
    params['company_slug'] = self.get('channel.slug');
    return params;
  },
});
