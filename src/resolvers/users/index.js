const knex = require('../../databases');
const { check, validationResult } = require('express-validator');

module.exports = {
  createUser: async (req, res) => {
    const { username, nrp } = req.body;

    // Lakukan validasi
    await check('username').isString().notEmpty().run(req);
    await check('nrp').isString().notEmpty().isLength({ min: 10, max: 10 }).run(req);

    // Periksa hasil validasi
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    // Insert data ke database menggunakan Knex
    try {
      const user = await knex('users').insert({ username, nrp });
      return res.status(201).json({ message: 'Berhasil menambahkan data pengguna' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Gagal menambahkan data pengguna' });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await knex('users').select('*');
      return res.status(200).json({ data: users });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Gagal mengambil data pengguna' });
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await knex('users').where({ id }).first();
      if (!user) {
        return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
      }
      return res.status(200).json({ data: user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Gagal mengambil data pengguna' });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { username, nrp } = req.body;

    // Lakukan validasi
    await check('username').isString().notEmpty().run(req);
    await check('nrp').isString().notEmpty().isLength({ min: 10, max: 10 }).run(req);

    // Periksa hasil validasi
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    try {
      const user = await knex('users').where({ id }).update({ username, nrp });
      if (!user) {
        return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
      }
      return res.status(200).json({ message: 'Berhasil memperbarui data pengguna' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Gagal memperbarui data pengguna' });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await knex('users').where({ id }).del();
      if (!user) {
        return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
      }
      return res.status(200).json({ message: 'Berhasil menghapus data pengguna' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Gagal menghapus data pengguna' });
    }
  },
};
