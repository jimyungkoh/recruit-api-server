const express = require('express');
const jobApplicantService = require('../service/jobApplicationService');
const {validateOpeningId} = require('../service/openingService');
const {validateApplicantId} = require('../service/applicantService');
const {validateDuplication} = require('../service/jobApplicationService');

const router = express.Router();

// 요구사항 6. 사용자가 채용공고에 지원하기
router.post('/', async (req, res, next) => {
  const info = req.body;

  try {
    await Promise.all([
      validateOpeningId(info.opening_id),
      validateApplicantId(info.applicant_id),
      validateDuplication(info.opening_id, info.applicant_id)
    ]);

    res.status(201).json(await jobApplicantService.enrollApplicant(info));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
