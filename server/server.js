import express      from 'express';
import path         from 'path';
import bodyParser   from 'body-parser';
import mongoose     from 'mongoose';
import graphqlHTTP  from 'express-graphql';
import schema       from './graphql';

const localURI = 'mongodb://localhost:27017/herokuMERN';

const app = express();
app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.json());

// GraphqQL server route
app.use('/graphql', graphqlHTTP(req => ({
  schema,
  pretty: true,
  graphiql: true
})));

mongoose.connect(process.env.MONGODB_URI || localURI);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  const server = app.listen(process.env.PORT || 8080, function() {
    const port = server.address().port;
    console.log("App now running on port", port)
  });
});



