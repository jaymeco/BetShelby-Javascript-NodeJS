const { request } = require('express');
const express = require('express');

const horsesRoutes = express.Router();

horsesRoutes.get('/', (request, response) => {
  response.json({ ok: true });
});

module.exports = horsesRoutes;
