const companyService = require('../service/companyService');
const express = require('express');

const router = express.Router();

/**
 * 등록된 모든 회사 조회
 * */
router.get('/', async (req, res, next) => {
  res.status(200).end(await companyService.getAll());
});

module.exports = router;
