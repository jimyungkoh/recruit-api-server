const express = require('express');
const bodyParser = require('body-parser');

const companyApi = require('./api/company');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin',
    '*');
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers',
    'Content-Type, Authorization');
  next();
});

app.use('/company', companyApi);

app.listen(3000);
