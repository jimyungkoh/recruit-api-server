const companyService = require('../service/companyService');
const express = require('express');

const router = express.Router();

/**
 * 등록된 모든 회사 조회
 */
router.get('/', async (req, res, next) => {
  const companies = await companyService.getAll();

  res.status(200).json(companies);
});

module.exports = router;
