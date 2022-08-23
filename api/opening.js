const express = require('express');
const openingService = require('../service/openingService');
const companyService = require('../service/companyService');

const router = express.Router();

/**
 * 요구사항 1. 채용공고 등록
 */
router.post('/',
  async (req, res, next) => {
    const company_id = req.body.company_id;
    const info = req.body;

    try {
      await companyService.validateCompanyId(company_id)

      res.status(201).json(await openingService.postOpening(info));
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
