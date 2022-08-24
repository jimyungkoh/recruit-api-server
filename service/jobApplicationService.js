const {JobApplicationModel} = require('../models');
const {BadRequestError} = require('../components/errors');

/**
 * 요구사항 6. 사용자가 채용공고에 지원하기
 * @param {Object} info 지원 정보
 * @param {number} info.opening_id 채용공고 ID
 * @param {number} info.applicant_id 사용자 ID
 * @returns {Object}
 */
exports.enrollApplicant = async (info) => {

  const jobApplication = {
    opening_id: info.opening_id,
    applicant_id: info.applicant_id,
  };

  return JobApplicationModel.create(jobApplication);
};

/**
 * 같은 채용공고에 중복으로 지원한 채용자가 있는지 확인하기
 * @param {number} opening_id 채용공고 ID
 * @param {number} applicant_id 사용자 ID
 * */
exports.validateDuplication = async (opening_id, applicant_id) => {

  const jobApplication = await JobApplicationModel.findOne({
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
