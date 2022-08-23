const {sequelize} = require('../models');
const {NotFoundError} = require('../components/errors');
const Opening = require('../models/opening')(sequelize);
const {Op, Sequelize} = require('sequelize');

/**
 * 요구사항 1. 채용공고 등록하기
 * @param {Object} info
 * @returns {Object}
 */
exports.postOpening = async (info) => {
  const opening = {
    company_id: info.company_id,
    country: info.country,
    location: info.location,
    position: info.position,
    reward: info.reward || 0,
    content: info.content,
    tech_stack: info.tech_stack
  };

  return Opening.create(opening);
};


/**
 * 채용공고 id 유효성을 검사
 * @param {number} opening_id
 */
exports.validateOpeningId = async (opening_id) => {
  const opening = await Opening.findOne({
    where: {
      id: opening_id
    }
  });

  if (!opening) {
    throw new NotFoundError(`${opening_id} doesn't exist in company table.`);
  }
}
