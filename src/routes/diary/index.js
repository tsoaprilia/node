const express = require('express');
const { createDiary, getDiary, getsDiaryByUser, updateDiary, deleteDiary } = require('../../resolvers/diary/index');

const router = express.Router();

router.post('/', createDiary);
router.get('/', getDiary);
router.get('/:id', getDiary);
router.get('/user/:user_id', getsDiaryByUser);
router.put('/:id', updateDiary);
router.delete('/:id', deleteDiary);

module.exports = router;
