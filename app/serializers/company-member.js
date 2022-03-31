import DRFSerializer from './drf';

export default DRFSerializer.extend({
    attrs: {
      user: { embedded: 'always' }
    }
});
