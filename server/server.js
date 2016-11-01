import express from 'express';
import bodyParser from 'body-parser'
import logger from 'winston';
import mongoose from 'mongoose';

import routes from './routes';

var localURI = 'mongodb://localhost:27017/herokuMERN';

// Set up app server
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Connect to database
mongoose.connect(process.env.MONGODB_URI || localURI);

// Database connection events
mongoose.connection.on('connected', function () {
  logger.info('[SERVER] Database connection ready');
});

mongoose.connection.on('error',function (err) {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
});

var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  logger.info(`[SERVER] App now running on port ${port}`)
});

// Build API routes & handlers.
for (let route in routes) {
  if (routes.hasOwnProperty(route)) {
    let router = express.Router();
    let routeFragment = `/api/${route}`;
    app.use(routeFragment, routes[route](router));
    logger.info(`[SERVER] Route created: ${routeFragment}`)
  }
}

