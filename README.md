# X-first Bot 🤖

Bot Discord untuk menganalisis dan menemukan **First Followers** (pengikut pertama) dari akun X (Twitter) mana pun. Dibangun menggunakan `discord.js` dan ditenagai oleh SocialData API.

## ✨ Fitur
- **Cek First Follower:** Menemukan daftar pengikut paling awal dari sebuah akun X.
- **Analisis Akun:** Memberikan informasi dasar akun target.
- **Format Cantik:** Hasil ditampilkan menggunakan Discord Embed yang rapi.

## 🚀 Cara Setup

### 1. Prasyarat
- [Node.js](https://nodejs.org/) v18.x atau lebih tinggi.
- Token Bot Discord (Dapatkan di [Discord Developer Portal](https://discord.com/developers/applications)).
- API Key SocialData (Dapatkan di [SocialData.tools](https://socialdata.tools/)).

### 2. Instalasi
Clone repositori ini dan masuk ke foldernya:
```bash
git clone https://github.com/DezXBT/X-first.git
cd X-first
```

Instal library yang dibutuhkan:
```bash
npm install
```

### 3. Konfigurasi (PENTING)
Buat file bernama `.env` di folder utama dan masukkan kode berikut:
```env
DISCORD_TOKEN=MASUKKAN_TOKEN_BOT_DISCORD_KAMU
X_API_KEY=MASUKKAN_API_KEY_SOCIALDATA_KAMU
```

### 4. Menjalankan Bot
Jalankan bot dengan perintah:
```bash
node src/index.js
```

### 5. Cara Penggunaan di Discord
Gunakan command berikut di channel server kamu:
`!cek-first @username`

Contoh: `!cek-first @Twitter`

## 🛡️ Keamanan
- File `.env` sudah dimasukkan ke `.gitignore` agar kunci rahasia kamu tidak terekspos.
- Pastikan untuk tidak membagikan API Key atau Token Bot kamu kepada siapa pun.

## 🤝 Kontribusi
Silakan fork repo ini dan kirimkan Pull Request jika ingin menambahkan fitur baru!

---
*Dibuat dengan ❤️ oleh Irine (Dez's Specialized AI Assistant)*
