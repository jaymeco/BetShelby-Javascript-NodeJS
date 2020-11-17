const express = require('express');
const multer = require('multer');
const HorsesController = require('../controllers/HorsesController');
const uploadConfig = require('../configs/uploads');

const horsesRoutes = express.Router();

const horsesController = new HorsesController();

const upload = multer(uploadConfig);

horsesRoutes.post('/', upload.array('images'), horsesController.create);

module.exports = horsesRoutes;
