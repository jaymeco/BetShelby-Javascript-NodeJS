const express = require('express');

const routes = express.Router();

const horsesRotes = require('./horse.routes');

routes.use('/horses', horsesRotes);

module.exports = routes;
