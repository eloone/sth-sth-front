'use strict';

var documentApi = require('./document.api');
var appEnv = process.env.APP_ENV || 'development';

var projectApi = documentApi({
  kind: 'Portfolio',
  kindName: 'projects',
  entity: 'project',
  orderBy: '-date',
  handlers: {
    getCategory: getCategory
  }
});
// Gets projects by category
function getCategory(category, callback){
  var ds = this.ds;
  var formatItem = this.formatItem;
  var q = ds.createQuery(appEnv, 'project')
  .filter('tags =', category)
  .order('-date');

  ds.runQuery(q, function(err, items) {
   if (err) {
      callback(err);
      return;
    }
    callback(null, items.map(formatItem));
  });
}

module.exports = projectApi;