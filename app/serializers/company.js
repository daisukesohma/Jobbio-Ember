import DRFSerializer from './drf';

export default DRFSerializer.extend({
    attrs: {
      location: { embedded: 'always' }
    }
});
