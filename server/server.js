var http = require('http');

var express = require('express');
var clientApp = express();
var adminApp = express();


var clientServer = http.createServer(clientApp);
var ioClient = require('./clientApp/sockets').listen(clientServer);
// var ioClientInstructions = require('./clientApp/sockets');

clientApp.use( express.static(__dirname + '/../client/clientApp') );
clientServer.listen( process.env.PORT || 8080 );
// ioClient.on('connection', ioClientInstructions.connection);


//It seems odd to me that we generally have our admin pages available from the internet. 
//The admin app will be available on a different port.
var adminServer = http.createServer(adminApp);
var ioAdmin = require('./adminApp/sockets').listen(adminServer);

adminApp.use( express.static(__dirname + '/../client/adminApp/') );
adminServer.listen( 1337 );


module.exports.clientApp = clientApp;
module.exports.adminApp  = adminApp;