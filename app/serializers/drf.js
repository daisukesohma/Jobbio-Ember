import DRFSerializer from 'ember-django-adapter/serializers/drf';

export default DRFSerializer.extend({
  extractPageNumber: function(url) {
    var match = /cursor=(.*?)&/gm.exec(url);
    var matchEndOfLine = /cursor=(.*)/.exec(url);
    if (match) {
      return match[1];
    } else if (matchEndOfLine) {
      return matchEndOfLine[1];
    }
    return null;
  }
});
