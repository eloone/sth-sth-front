'use strict';

var _ = require('lodash');
var async = require('async');
var config = require('../../config.json');

var projectId = process.env.GAE_ID || config.gaeId;
var appEnv = process.env.APP_ENV || 'development';

if (!projectId) {
  throw new Error('Missing GAE_ID');
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

    var q = ds.createQuery(appEnv, settings.entity)
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
      var idNb = parseInt(id);

      if(idNb || idNb === 0){
        id = idNb;
      }

      ds.get(ds.key({ namespace: appEnv, path: [settings.kind, settings.kindName, settings.entity, id] }), function(err, item) {
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
