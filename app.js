const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/config');
const routers = require('./api');

/**
 * express middleware들을 사용합니다.
 * @param {express.Application} app express app
 * @return {express.Application}
 */
function loader(app) {
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

  return app;
}

/**
 * API Routers를 등록합니다.
 * @param {express.Application} app express app
 */
function registerRouters(app) {
  app.use('/company', routers.companyApi);
  app.use('/job-application', routers.jobApplicationApi);
  app.use('/opening', routers.openingApi);

  return app;
}

/**
 * express 서비스를 생성합니다.
 */
async function bootstrap() {
  const app = express();

  loader(app);
  registerRouters(app);

  return app.listen(PORT, () => {
    console.log('Running server on ' + PORT);
  });
}

module.exports = {
  bootstrap,
};
