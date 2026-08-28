const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import & daftarkan router
const authRoutes = require('../routes/auth');
const userRoutes = require('../routes/users');
const chatRoutes = require('../routes/chat');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);

// Endpoint tes utama
app.get('/', (req, res) => {
  res.json({ message: 'API Vercel Berjalan Lancar!' });
});

// Export untuk Serverless Vercel
module.exports = app;
