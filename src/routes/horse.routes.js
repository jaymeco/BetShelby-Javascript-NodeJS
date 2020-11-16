const express = require('express');
const HorsesController = require('../controllers/HorsesController');

const horsesRoutes = express.Router();

const horsesController = new HorsesController();

horsesRoutes.post('/', horsesController.create);

module.exports = horsesRoutes;
