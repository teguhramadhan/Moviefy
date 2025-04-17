# 🎬 Moviefy

Moviefy adalah aplikasi web sederhana untuk menelusuri dan melihat detail film terbaru dari TMDB API. Dibuat menggunakan React dan TailwindCSS, dengan antarmuka modern yang responsif dan mudah digunakan.

## ✨ Fitur Utama

- 🎥 Menampilkan daftar film populer
- 📄 Halaman detail lengkap untuk setiap film
- 🔍 Responsif di semua ukuran layar
- 🌙 Dark mode look dengan nuansa modern
- 🍔 Navbar mobile dengan hamburger menu dan animasi slide
- 🚀 Konsumsi data langsung dari TMDB API

## 🛠️ Teknologi yang Digunakan

- React
- React Router DOM
- TailwindCSS
- TMDB API
- Vite (jika kamu pakai)

## 📦 Instalasi

```bash
# Clone repositori ini
git clone https://github.com/username/moviefy.git

# Masuk ke folder proyek
cd moviefy

# Install dependencies
npm install

# Jalankan aplikasi di lokal
npm run dev

```

🔑 API Key
Untuk menjalankan aplikasi ini, kamu perlu mendapatkan API Key dari The Movie Database (TMDB).

Daftar dan login ke TMDB

Dapatkan API Key dari dashboard akun kamu

Buat file .env di root project dan tambahkan:
```bash
VITE_TMDB_API_KEY=your_api_key_here
```

```bash
src/
│
├── api/             # Koneksi API TMDB
├── components/      # Komponen UI reusable (Navbar, Card, dll)
├── pages/           # Halaman seperti Home, MovieDetail, About
├── App.jsx          # Routing utama
└── main.jsx         # Entry point React
```

👨‍💻 Kontribusi
Pull request dan ide baru sangat terbuka! Jangan ragu untuk membuat issue atau fitur baru.


