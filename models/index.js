'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const companyModel = require('./company')(sequelize, Sequelize.DataTypes);
const openingModel = require('./opening')(sequelize, Sequelize.DataTypes);
const applicantModel = require('./applicant')(sequelize, Sequelize.DataTypes);
const jobApplicationModel = require('./jobApplication')(sequelize, Sequelize.DataTypes);

db[companyModel.name] = companyModel;
db[openingModel.name] = openingModel;
db[applicantModel.name] = applicantModel;
db[jobApplicationModel.name] = jobApplicationModel;

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
