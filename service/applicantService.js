const {ApplicantModel} = require('../models');
const {NotFoundError} = require('../components/errors');

/**
 * 등록된 모든 지원자 조회 메서드
 */
exports.getAll = async () => {
  const applicants = await ApplicantModel.findAll();

  return JSON.stringify(applicants);
};

/**
 * 회사 id 유효성을 검사
 * @param {number} applicant_id
 */
exports.validateApplicantId = async (applicant_id) => {
  const applicant = await ApplicantModel.findOne({
    where: {
      id: applicant_id
    }
  });

  if (!applicant) {
    throw new NotFoundError(`${applicant_id} doesn't exist in applicant table.`);
  }
}
