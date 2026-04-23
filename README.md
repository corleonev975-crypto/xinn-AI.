# XINN AI

UI chat mirip mockup yang kamu kirim, dengan:
- Dark / Light mode
- Sidebar mirip referensi
- Avatar bulat gaya XINN
- Koneksi API Groq lewat route server Next.js
- Siap deploy ke Vercel

## Jalankan lokal

1. Install dependency
   ```bash
   npm install
   ```
2. Salin env
   ```bash
   cp .env.example .env.local
   ```
3. Isi `GROQ_API_KEY` di `.env.local`
4. Jalankan
   ```bash
   npm run dev
   ```
5. Buka `http://localhost:3000`

## Deploy Vercel
- Upload project ke GitHub
- Import ke Vercel
- Tambah Environment Variable:
  - `GROQ_API_KEY`

## Catatan
- Avatar dibuat sebagai SVG animasi ringan supaya langsung jalan tanpa perlu file GIF.
- Kalau mau, kamu bisa ganti `/public/xinn-avatar.svg` dengan GIF kamu sendiri.
