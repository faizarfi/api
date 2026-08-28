const express = require('express');
const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // TODO: Ganti dengan logika autentikasi sebenarnya (database, JWT, dll.)
  if (!email || !password) {
    return res.status(400).json({ error: 'Email dan password wajib diisi.' });
  }

  res.json({
    message: 'Login berhasil!',
    user: { email },
  });
});

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nama, email, dan password wajib diisi.' });
  }

  // TODO: Simpan ke database
  res.status(201).json({
    message: 'Registrasi berhasil!',
    user: { name, email },
  });
});

module.exports = router;
