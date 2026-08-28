const express = require('express');
const router = express.Router();

// GET /api/users
router.get('/', (req, res) => {
  // TODO: Ambil data users dari database
  res.json({
    message: 'Daftar semua pengguna',
    users: [
      { id: 1, name: 'User Pertama', email: 'user1@example.com' },
      { id: 2, name: 'User Kedua', email: 'user2@example.com' },
    ],
  });
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  // TODO: Cari user berdasarkan ID di database
  res.json({
    message: `Detail pengguna ID: ${id}`,
    user: { id: Number(id), name: 'Contoh User', email: 'contoh@example.com' },
  });
});

module.exports = router;
