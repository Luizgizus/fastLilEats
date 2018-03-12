const bodyParser = require('body-parser')
const express = require('express')
const tablesRouter = require('./routes/tables')
const datasource = require('./config/datasource')
const config = require('./config/config')

const app = express();
app.config = config;
app.datasource = datasource(app);

app.use(bodyParser.json());

tablesRouter(app);

module.exports = app;
