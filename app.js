const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { config } = require('./config/config');
const HttpError = require('./models/http-error');

const routes = require('./routes/index');

const app = express();

// Middleware
app.use(bodyParser.json());

app.use('/api', routes);

// Handle unknown route
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose.connect(config.db_url)
    .then(() => 
        app.listen(config.port, function() {
            console.log(`App listening on port: ${config.port}, env: ${config.env}`);
        })
     ).catch((error) => {
       console.log('Error: ', error);
     })