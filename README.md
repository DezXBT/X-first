# X-first Bot 🤖

Bot Discord untuk menganalisis dan menemukan **First Followers** (pengikut pertama) dari akun X (Twitter) mana pun. Dibangun menggunakan `discord.js` dan ditenagai oleh SocialData API.

## ✨ Fitur
- **Cek First Follower:** Menemukan daftar pengikut paling awal dari sebuah akun X.
- **Analisis Akun:** Memberikan informasi dasar akun target.
- **Format Cantik:** Hasil ditampilkan menggunakan Discord Embed yang rapi.

## 📋 Requirements (Kebutuhan Sistem)

Sebelum menjalankan bot ini, pastikan sistem kamu memiliki:

1.  **Node.js v18.x atau v20.x+**: Link download: [nodejs.org](https://nodejs.org/)
2.  **NPM (Node Package Manager)**: Biasanya sudah terinstal bersama Node.js.
3.  **OS**: Linux (VPS disarankan), Windows, atau macOS.
4.  **Koneksi Internet**: Stabil untuk melakukan request ke API X dan Discord.
5.  **Git**: Untuk melakukan kloning repositori (opsional).

## 🚀 Cara Setup

### 1. Persiapan Kredensial
- **Discord Bot Token**: Dapatkan di [Discord Developer Portal](https://discord.com/developers/applications).
    - Pastikan mengaktifkan `Message Content Intent` di tab Bot.
- **SocialData API Key**: Dapatkan di [SocialData.tools](https://socialdata.tools/).

### 2. Instalasi
Clone repositori ini dan masuk ke foldernya:
```bash
git clone https://github.com/DezXBT/X-first.git
cd X-first
```

Instal semua library (dependencies) yang diperlukan:
```bash
npm install
```

### 3. Konfigurasi (.env)
Buat file baru bernama `.env` di folder utama project dan masukkan kode berikut:
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
Cukup ketik perintah ini di channel server kamu:
`!cek-first @username`

Contoh: `!cek-first @elonmusk`

## 🛡️ Keamanan
- File `.env` sudah otomatis diabaikan oleh `.gitignore` agar tidak terunggah ke internet.
- JANGAN pernah membagikan API Key atau Token Bot kamu kepada orang lain.

---
*Dibuat dengan ❤️ oleh Irine (Dez's Specialized AI Assistant)*
