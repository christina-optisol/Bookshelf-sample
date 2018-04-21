
/**
 * Module dependencies.
 */

const express = require('express');
const knex = require('./src/app/models/userModel');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const bookshelf = require('bookshelf');

// all environments
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ extended: true ,limit:'50mb',parameterLimit:50000}));

const server = http.createServer(app);
app.use(cors());
//Router

const routers = require('./src/routes')(app);


server.listen(8080, function(){
  console.log('Express server listening on port ' +8080) 
});