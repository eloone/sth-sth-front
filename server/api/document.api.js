'use strict';

var _ = require('lodash');
var async = require('async');

var projectId = process.env.GAE_LONG_APP_ID || process.env.DATASET_ID || 'portfolio-997';

if (!projectId) {
  var MISSING_ID = [
    'Cannot find your project ID. Please set an environment variable named ',
    '"DATASET_ID", holding the ID of your project.'
  ].join('');
  throw new Error(MISSING_ID);
}

var gcloud = require('gcloud')({
  projectId: projectId,
  credentials: require('../../key.json')
});

var ds = gcloud.datastore.dataset();

module.exports = function(settings){
    return new documentApi(settings);
};

function formatItem(result) {
  var item = result.data;
  item.id = result.key.path.pop();
  return item;
}

function documentApi(settings){
  var self = this;

  this.ds = ds;

  this.formatItem = formatItem;

  this.getAll = function(callback) {

    var q = ds.createQuery(settings.entity)
      .hasAncestor(ds.key([settings.kind, settings.kindName]));

    if(settings.orderBy){
      q.order(settings.orderBy);
    }

    ds.runQuery(q, function(err, items) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, items.map(formatItem));
    });
  };

  this.get = function(id, callback) {
    id = decodeURIComponent(id);

    if(!_.contains(id, ';')) {
      query(id, callback);
    } else {
      var results = [];
      // Multiple ids are separated by ;
      var ids = id.split(';');

      async.each(ids, function(id, next){
        query(id, function(err, result){
          if(err) {
            console.log(err);
            // We don't block next items
            return next();
          };

          results = results.concat(result);
          next();
        });
      }, function(err){
        if(err) return callback(err);
        callback(null, results);
      });
    }

    function query(id, callback){
      ds.get(ds.key([settings.kind, settings.kindName, settings.entity, id]), function(err, item) {
        if (err) {
          callback(err);
          return;
        }

        if (!item) {
          callback({
            code: 404,
            message: 'No matching entity was found.' + ' id= ' + id
          });
          return;
        }

        callback(null, [formatItem(item)]);
      });
    }

  };

  if(settings.handlers){
    _.forEach(settings.handlers, function(value, key){
      self[key] = value.bind(self);
    });
  }

}
