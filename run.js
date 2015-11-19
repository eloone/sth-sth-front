var server = require('./server/server');
var app = server.app;
var PORT = 8080;

 app.listen(PORT, function(){
    console.log('Server running on ' + PORT);
 });