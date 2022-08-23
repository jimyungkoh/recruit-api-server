const jobApplicantService = require('../service/jobApplicationService');
const express = require('express');
const {validateOpeningId} = require('../service/openingService');
const {validateApplicantId} = require('../service/applicantService');

const router = express.Router();

/**
 * 요구사항 6. 사용자가 채용공고에 지원하기
 */
router.post('/', async (req, res, next) => {
  const info = req.body;

  try {
    await validateOpeningId(info.opening_id);

    await validateApplicantId(info.applicant_id);

    await jobApplicantService.enrollApplicant(info);
  } catch (e) {
    next(e);
  }
});
