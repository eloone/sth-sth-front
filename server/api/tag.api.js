'use strict';

var documentApi = require('./document.api');

var tagApi = documentApi({
  kind: 'Portfolio',
  kindName: 'tags',
  entity: 'tag'
});

module.exports = tagApi;