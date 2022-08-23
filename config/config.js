require('dotenv').config();

const env = process.env;

/**
 * server port
 * */
const PORT = 3000;

const development = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_NAME,
  host: env.MYSQL_HOST,
  dialect: 'mysql',
  port: env.MYSQL_PORT
};

const production = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_NAME,
  host: env.MYSQL_HOST,
  dialect: 'mysql',
  port: env.MYSQL_PORT
};

const test = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_NAME,
  host: env.MYSQL_HOST,
  dialect: 'mysql',
  port: env.MYSQL_PORT
};

module.exports = {development, production, test, PORT};
