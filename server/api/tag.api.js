'use strict';

var documentApi = require('./document.api');
var async = require('async');

var tagApi = documentApi({
  kind: 'Portfolio',
  kindName: 'tags',
  entity: 'tag'
});

module.exports = tagApi;
