const express = require('express');
const BettingController = require('../controllers/BettingController');

const bettingRoutes = express.Router();

const bettingController = new BettingController();

bettingRoutes.post('/', bettingController.create);
bettingRoutes.get('/', bettingController.index);

module.exports = bettingRoutes;
