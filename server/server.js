var express     = require('express');
var path        = require('path');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
import graphqlHTTP from 'express-graphql';
var localURI    = 'mongodb://localhost:27017/herokuMERN';
import schema from './graphql';


var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// GraphqQL server route
app.use('/graphql', graphqlHTTP(req => ({
  schema,
  pretty: true,
  graphiql: true
})));

mongoose.connect(process.env.MONGODB_URI || localURI);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
    console.log("App now running on port", port)
  });
});



