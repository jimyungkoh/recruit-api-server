const {sequelize} = require('../models');
const {NotFoundError, BadRequestError} = require('../components/errors');
const {Op} = require("sequelize");
const Opening = require('../models/opening')(sequelize);

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
 * 요구사항 2. 채용공고 수정하기
 * @param {number} id
 * @param {Object} contents
 * @returns {Object}
 */
exports.updateOpening = async (id, contents) => {
  if (contents.id || contents.company_id) {
    throw new BadRequestError('id value cannot be \'modified\'.');
  }

  await Opening.update(contents, {
    where: {
      id: id
    }
  });

  const opening = await Opening.findOne({where: {id: id}})

  if (!opening) {
    throw new NotFoundError('채용공고를 찾을 수 없습니다.');
  }

  return opening;
}

/**
 * 요구사항 3. 채용공고 삭제하기
 * @param {number} id
 */
exports.delete = async (id) => {
  const destroyResult = await Opening.destroy({where: {id: id}});

  if (!destroyResult) {
    throw NotFoundError(`${id} doesn't exist in opening table`);
  }
}

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

/**
 * 요구사항 4-1. 채용공고 목록 가져오기
 */
exports.getAll = async () => {
  return await Opening.findAll({
    attributes: {exclude: ['content']},
    raw: true
  });
};

/**
 * 요구사항 4-2. 채용공고 검색 기능 구현
 */
exports.search = async (value) => {
  const searchResult = await Opening.findAll({
    raw: true,
    where: sequelize.literal("MATCH (country, location, position, content, tech_stack) AGAINST (:value)"),
    replacements: {
      value: value
    }
  });

  return JSON.stringify(searchResult);
}
