'use strict';

const Sequelize = require('sequelize');
const config = require('../config/config');
const environment = 'production';
const env_conf = config[environment];

const sequelize = new Sequelize(env_conf.database,
  env_conf.username, env_conf.password, env_conf);

const defineCompanyModel = require('./company');
const defineOpeningModel = require('./opening');
const defineApplicantModel = require('./applicant');
const defineJobApplicationModel = require('./jobApplication');

const CompanyModel = defineCompanyModel(sequelize);
const OpeningModel = defineOpeningModel(sequelize);
const ApplicantModel = defineApplicantModel(sequelize);
const JobApplicationModel = defineJobApplicationModel(sequelize);

Object.values(sequelize.models).forEach(model => {
  if (model.associate) {
    model.associate(sequelize.models);
  }
});

/**
 * sequelize, 모델 모음
 * */
module.exports = {
  sequelize,
  CompanyModel,
  OpeningModel,
  ApplicantModel,
  JobApplicationModel
};
