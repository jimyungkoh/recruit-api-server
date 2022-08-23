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

/**
 * 요구사항 2. 채용공고 수정
 */
router.patch('/:id', async (req, res, next) => {
  const id = req.params.id;
  const contents = req.body;

  try {
    await openingService.validateOpeningId(id);

    res.status(200).json(await openingService.updateOpening(id, contents));
  } catch (err) {
    next(err);
  }
});

/**
 * 요구사항 3. 채용공고 삭제
 */
router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    await openingService.validateOpeningId(id);

    await openingService.delete(id);

    res.status(200).json({
      success: true,
      message: `${id} was deleted successfully.`
    });
  } catch (e) {
    next(e);
  }
});

/**
 * 요구사항 4. 채용공고 목록 가져오기
 */
router.get('/', async (req, res, next) => {
  if (req.query.search) {
    /**
     * 요구사항 4-2. 채용공고 검색 기능 구현
     * - 문자만 검색 가능,
     */
    try {
      const searchWord = req.query.search;

      res.status(200).json(await openingService.search(searchWord));
    } catch (err) {
      next(err);
    }
  } else {
    try {
      const result = await openingService.getAll();

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
});

/**
 * 요구사항 5. 채용 상세 페이지 가져오기
 */
router.get('/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    await openingService.validateOpeningId(id);

    const opening = await openingService.getById(id);

    res.status(200).end(opening);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
