# 🎓 eRaporOne - Sistem Informasi Rapor Terpadu Kurikulum Merdeka

**eRaporOne** adalah sistem informasi penilaian dan pencetakan rapor berbasis **Kurikulum Merdeka** yang dirancang modern, cepat, bebas ribet, serta responsif di **HP Smartphone, Tablet, dan Laptop**.

Aplikasi mendukung **Multi-Jenjang (SD, SMP, SMA, SMK)** dengan studi kasus awal: **SMKN 1 Labuhan Maringgai** (Lampung Timur).

---

## 🌟 Fitur Utama

1. **Smart Narrative Engine (Deskripsi Otomatis & Custom):**
   * Mengintegrasikan Nama Siswa, Kelas/Rombel, Jurusan, Mapel, Capaian TP Tertinggi & Terendah.
   * Tombol *Generate Semua Siswa* sekali klik & kolom teks 100% bisa disunting bebas.
2. **Pembatasan Hak Akses Cetak Rapor:**
   * Sesuai regulasi, hanya **Wali Kelas** yang berhak memvalidasi & mencetak dokumen Rapor Resmi.
3. **Format Cetak Presisi Standar A4:**
   * Bersih tanpa chrome browser atau sidebar.
   * Dimulai langsung dari baris identitas siswa (tanpa header kop bawaan).
   * Nilai PKL (khusus Kelas XII) dapat dinonaktifkan/ditampilkan sesuai kebijakan sekolah.
4. **Filter Mapel & Rombel Sesuai Guru Pengampu:**
   * Guru hanya melihat kelas dan mata pelajaran yang ditugaskan kepadanya.
5. **Modul Ekstrakurikuler (Ekskul) Terpadu:**
   * Master Ekskul & Pembina.
   * Pendaftaran anggota siswa ke ekskul.
   * Input predikat nilai (*Sangat Baik, Baik, Cukup, Kurang*) dan catatan capaian yang otomatis tersinkronisasi ke Rapor Siswa.
6. **CRUD Penuh di Data Master:**
   * Tambah, edit, dan hapus Siswa, Guru/PTK, Rombongan Belajar, dan Mata Pelajaran.
7. **Smart Bulk Import/Export Excel:**
   * Format Excel resmi untuk data master siswa, guru, dan nilai offline.
8. **Panduan & Tutorial Interaktif untuk Guru Awam:**
   * Alur cepat 3 langkah, FAQ, dan panduan teknis pengisian nilai.

---

## 💻 Panduan Push ke GitHub

Ikuti langkah mudah berikut di terminal laptop Anda:

### 1. Buat Repository Baru di GitHub
1. Buka [GitHub](https://github.com) dan login ke akun Anda.
2. Klik tombol **New** (atau **+** di pojok kanan atas $\rightarrow$ *New repository*).
3. Beri nama repository, misalnya: `eraporone`.
4. Pilih **Public** atau **Private** (sesuai kebutuhan Anda).
5. **Jangan centang** *"Add a README file"* (karena proyek lokal sudah memiliki file README).
6. Klik **Create repository**.

### 2. Hubungkan & Push Repository Lokal ke GitHub
Jalankan perintah berikut di terminal (ganti `USERNAME` dengan username GitHub Anda):

```bash
# Hubungkan ke remote GitHub Anda
git remote add origin https://github.com/USERNAME/eraporone.git

# Pastikan branch utama bernama main
git branch -M main

# Push seluruh kode ke GitHub
git push -u origin main
```

---

## 🚀 Panduan Deploy / Tanam ke Server (VPS / Cloud)

Aplikasi ini dapat dijalankan di server Linux (Ubuntu/Debian) atau Windows Server dengan beberapa metode pilihan:

### Metode 1: Menggunakan Docker (Paling Praktis & Cepat)
Proyek sudah dilengkapi file `Dockerfile` dan `nginx.conf`:

```bash
# 1. Clone repository di server Anda
git clone https://github.com/USERNAME/eraporone.git
cd eraporone

# 2. Build image docker
docker build -t eraporone .

# 3. Jalankan container di port 80 (atau port yang diinginkan)
docker run -d --name eraporone-app -p 80:80 --restart always eraporone
```
Aplikasi langsung aktif di `http://IP-SERVER-ANDA`!

---

### Metode 2: Deploy Standar dengan Nginx di Ubuntu Server
Jika server Anda sudah memiliki Nginx terinstall:

```bash
# 1. Clone dan install dependencies di server
git clone https://github.com/USERNAME/eraporone.git
cd eraporone
npm install

# 2. Build file production
npm run build

# 3. Copy folder dist hasil build ke direktori web server
sudo cp -r dist/* /var/www/html/
```

Konfigurasi Nginx (`/etc/nginx/sites-available/default`):
```nginx
server {
    listen 80;
    server_name erapor.sekolahanda.sch.id; # atau IP Server

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
Reload Nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

### Metode 3: Deploy Cepat via Node.js / PM2
```bash
# Install serve secara global
npm install -g serve pm2

# Build proyek
npm run build

# Jalankan dengan PM2 agar berjalan di background terus-menerus
pm2 start "serve -s dist -l 3000" --name eraporone

# Simpan konfigurasi PM2 saat server reboot
pm2 startup
pm2 save
```

---

## 🛠️ Menjalankan di Komputer Lokal (Development)

```bash
# Install package
npm install

# Jalankan server lokal
npm run dev
```
Buka browser di: **http://localhost:3000**

---

**eRaporOne** • Dikembangkan untuk efisiensi administrasi guru dan digitalisasi sekolah Kurikulum Merdeka.
