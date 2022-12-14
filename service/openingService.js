const {sequelize, OpeningModel} = require('../models');
const {NotFoundError, BadRequestError} = require('../components/errors');
const {Op} = require("sequelize");

/**
 * 요구사항 1. 채용공고 등록하기
 * @param {Object} info 채용공고 정보
 * @param {number} info.company_id 회사 ID
 * @param {string} info.country 국가
 * @param {string} info.location 지역
 * @param {string} info.position 채용 포지션
 * @param {number} info.reward 채용 보수
 * @param {string} info.content 채용 내용
 * @param {string} info.tech_stack 기술 스택
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

  return OpeningModel.create(opening);
};

/**
 * 요구사항 2. 채용공고 수정하기
 * @param {number} id 채용공고 ID
 * @param {Object} contents 수정할 정보
 * @returns {Object}
 */
exports.updateOpening = async (id, contents) => {
  if (contents.id || contents.company_id) {
    throw new BadRequestError('id value cannot be \'modified\'.');
  }

  await OpeningModel.update(contents, {
    where: {
      id: id
    }
  });

  const opening = await OpeningModel.findOne({where: {id: id}})

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
  const destroyResult = await OpeningModel.destroy({where: {id: id}});

  if (!destroyResult) {
    throw NotFoundError(`${id} doesn't exist in opening table`);
  }
}

/**
 * 요구사항 4-1. 채용공고 목록 가져오기
 */
exports.getAll = async () => {
  return await OpeningModel.findAll({
    attributes: {exclude: ['content']},
    raw: true
  });
};

/**
 * 요구사항 4-2. 채용공고 검색 기능 구현
 * @param {string} value 검색어
 * @returns {Object}
 */
exports.search = async (value) => {
  return await OpeningModel.findAll({
    raw: true,
    where: sequelize.literal("MATCH (country, location, position, content, tech_stack) AGAINST (:value)"),
    replacements: {
      value: value
    }
  });
}

/**
 * 요구사항 5. 채용 상세 페이지 가져오기
 * @param {number} id 채용공고 id
 * @returns {Object}
 */
exports.getById = async (id) => {
  if (isNaN(id)) {
    throw new BadRequestError(`${id} is not a number`);
  }

  const opening = await OpeningModel.findOne({
    raw: true,
    where: {id: id}
  });

  /**
   * 해당 회사가 올린 다른 채용공고 검색
   */
  let otherOpenings = []

  await OpeningModel.findAll({
    raw: true,
    attributes: ['id'],
    where: {
      id: {[Op.not]: id},
      company_id: opening.company_id
    }
  }).then(result => result.forEach(data =>
    otherOpenings.push(Object.values(data).pop()))
  );

  /**
   * 채용공고에 해당 회사가 올린 다른 채용공고를
   * 포함한 채용공고 상세 페이지 생성, 반환
   */
  return Object.assign(opening, {
    'other_openings_by_same_company': otherOpenings
  });
};

/**
 * 채용공고 id 유효성을 검사
 * @param {number} opening_id 채용공고 ID
 */
exports.validateOpeningId = async (opening_id) => {
  const opening = await OpeningModel.findOne({
    where: {
      id: opening_id
    }
  });

  if (!opening) {
    throw new NotFoundError(`${opening_id} doesn't exist in opening table.`);
  }
}
