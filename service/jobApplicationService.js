const {sequelize} = require('../models');
const JobApplication = require('../models/jobApplication')(sequelize);
const {BadRequestError} = require('../components/errors');

/**
 * 요구사항 6. 사용자가 채용공고에 지원하기
 * @param {Object} info
 * @returns {Object}
 */
exports.enrollApplicant = async (info) => {

  const jobApplication = {
    opening_id: info.opening_id,
    applicant_id: info.applicant_id,
  };

  return JobApplication.create(jobApplication);
};

/**
 * 같은 채용공고에 중복으로 지원한 채용자가 있는지 확인하기
 * @param {number} opening_id
 * @param {number} applicant_id
 * */
exports.validateDuplication = async (opening_id, applicant_id) => {

  const jobApplication = await JobApplication.findOne({
    raw: true,
    where:{
      opening_id: opening_id,
      applicant_id: applicant_id
    }
  })

  if (!!jobApplication){
    throw new BadRequestError('해당 채용공고에는 1회만 지원 가능합니다.')
  }
}
