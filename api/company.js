const express = require('express');
const companyService = require('../service/companyService');

const router = express.Router();

// 등록된 모든 회사 조회
router.get('/', async (req, res, next) => {
  res.status(200).json(await companyService.getAll());
});

module.exports = router;
