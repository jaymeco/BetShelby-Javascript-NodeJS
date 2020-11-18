const express = require('express');
const BettingController = require('../controllers/BettingController');

const bettingRoutes = express.Router();

const bettingController = new BettingController();

bettingRoutes.post('/', bettingController.create);

module.exports = bettingRoutes;
