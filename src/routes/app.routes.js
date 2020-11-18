const express = require('express');

const routes = express.Router();

const horsesRotes = require('./horse.routes');
const bettingRotes = require('./betting.routes');

routes.use('/horses', horsesRotes);
routes.use('/betting', bettingRotes);

module.exports = routes;
