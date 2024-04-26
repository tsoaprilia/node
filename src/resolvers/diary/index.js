const knex = require('../../databases');
const { check, validationResult } = require('express-validator');

module.exports = {
  createDiary: async (req, res) => {
    const { title, description, user_id } = req.body;
    await check('title').isString().notEmpty().run(req);
    await check('description').isString().notEmpty().run(req);
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).json({ errors: result.array() });
    const diary = await knex('diary').insert({
      user_id,
      title,
      description,
    });
    if (diary.length == 0) return res.status(400).json({ message: 'Failed Create diary' });
    return res.status(200).json({ message: 'Success Create diary' });
  },
  getsDiary: async (req, res) => {
    const diary = await knex('diary');
    if (diary.length == 0) return res.status(404).json({ message: 'diary is Empty' });
    return res.status(200).json({ data: diary });
  },
  getsDiaryByUser: async (req, res) => {
    const { user_id } = req.params;
    const diary = await knex('diary').where('user_id', user_id);
    if (diary.length == 0) return res.status(404).json({ message: 'diary is Empty' });
    return res.status(200).json({ data: diary });
  },
  getDiary: async (req, res) => {
    const { id } = req.params;
    const diary = await knex('diary').where('id', id).first();
    if (!diary) return res.status(404).json({ message: 'diary Not Found' });
    return res.status(200).json({ data: diary });
  },
  updateDiary: async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    await check('title').isString().notEmpty().run(req);
    await check('description').isString().notEmpty().run(req);
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).json({ errors: result.array() });
    const diary = await knex('diary').where('id', id).update({
      title,
      description,
    });
    if (diary.length == 0) return res.status(400).json({ message: 'Failed Update diary' });
    return res.status(200).json({ message: 'Success Update diary' });
  },
  deleteDiary: async (req, res) => {
    const { id } = req.params;
    const diary = await knex('diary').where('id', id).del();
    if (diary.length == 0) return res.status(400).json({ message: 'Failed Delete diary' });
    return res.status(200).json({ message: 'Success Delete diary' });
  },
};
