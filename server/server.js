'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var app = module.exports.app = express();
var api = module.exports.api = express();
var apiRouter = require('./api/api.router');
var projectsApi = require('./api/project.api');
var tagsApi = require('./api/tag.api');

api.use(bodyParser.json());

app.use('/api', api);

app.use('/assets', serveStatic(path.join(__dirname, '..', 'client', 'assets')));
app.use('/bower_components', serveStatic(path.join(__dirname, '..', 'bower_components')));
app.use('/app', serveStatic(path.join(__dirname, '..', 'client', 'app')));

apiRouter.setApiRouter('projects', api, projectsApi);
apiRouter.setApiRouter('tags', api, tagsApi);

// Respond to the App Engine health check
app.get('/_ah/health', function(req, res) {
  res.status(200)
    .set('Content-Type', 'text/plain')
    .send('ok');
});
//test
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});
