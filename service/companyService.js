const {sequelize} = require('../models');
const {NotFoundError} = require('../components/errors');
const Company = require('../models/company')(sequelize);

/**
 * 등록된 모든 회사 조회 메서드
 */
exports.getAll = async () => {
  return await Company.findAll({raw:true});
};


/**
 * 회사 id 유효성을 검사
 * @param {number} company_id 회사 ID
 */
exports.validateCompanyId = async (company_id) => {
  const company = await Company.findOne({
    where: {
      id: company_id
    }
  });

  if (!company) {
    throw new NotFoundError(`${company_id} doesn't exist in company table.`);
  }
}
