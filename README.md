# 🚀 My API Backend

REST API backend dibangun dengan **Express.js**, siap di-deploy ke **Vercel** sebagai serverless function.

## 📁 Struktur Proyek

```
my-api-backend/
├── api/
│   └── index.js          # Entry point (middleware + router)
├── routes/
│   ├── auth.js            # Autentikasi (login & register)
│   └── users.js           # Manajemen pengguna
├── vercel.json            # Konfigurasi Vercel
├── package.json           # Dependencies & scripts
├── .gitignore             # File yang diabaikan Git
└── .env                   # Environment variables (tidak di-push)
```

## ⚙️ Teknologi

- **Node.js** — Runtime JavaScript
- **Express.js** — Framework web
- **CORS** — Cross-Origin Resource Sharing
- **dotenv** — Manajemen environment variables
- **Vercel** — Platform deployment serverless

## 🔗 Daftar Endpoint

| Method | Endpoint              | Deskripsi                  | Body (JSON)                          |
|--------|-----------------------|----------------------------|--------------------------------------|
| GET    | `/`                   | Tes API berjalan           | —                                    |
| POST   | `/api/auth/login`     | Login pengguna             | `{ "email", "password" }`            |
| POST   | `/api/auth/register`  | Registrasi pengguna baru   | `{ "name", "email", "password" }`    |
| GET    | `/api/users`          | Daftar semua pengguna      | —                                    |
| GET    | `/api/users/:id`      | Detail pengguna berdasar ID| —                                    |

## 🛠️ Instalasi & Menjalankan Lokal

1. **Clone repository:**
   ```bash
   git clone https://github.com/faizarfi/api.git
   cd api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Buat file `.env`:**
   ```env
   PORT=3000
   # DATABASE_URL=your_database_url
   # JWT_SECRET=your_secret_key
   ```

4. **Jalankan server:**
   ```bash
   npm start
   ```
   Server berjalan di `http://localhost:3000`

## 🚀 Deploy ke Vercel

1. Push kode ke GitHub
2. Buka [vercel.com](https://vercel.com) → **Add New > Project**
3. Import repository ini
4. Tambahkan **Environment Variables** jika diperlukan
5. Klik **Deploy**

Setiap push ke branch `main` akan otomatis trigger deployment ulang.

## 📝 Menambah Endpoint Baru

1. Buat file router baru di folder `routes/`, contoh `routes/products.js`:
   ```javascript
   const express = require('express');
   const router = express.Router();

   router.get('/', (req, res) => {
     res.json({ message: 'Daftar produk' });
   });

   module.exports = router;
   ```

2. Daftarkan router di `api/index.js`:
   ```javascript
   const productRoutes = require('../routes/products');
   app.use('/api/products', productRoutes);
   ```

## 📄 Lisensi

ISC
