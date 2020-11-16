const express = require('express');
const routes = require('./routes/app.routes');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 The server is running!');
});
