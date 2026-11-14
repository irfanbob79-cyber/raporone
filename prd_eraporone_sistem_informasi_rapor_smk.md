# Product Requirements Document (PRD): eRaporOne (Sistem Informasi Rapor SMK Kurikulum Merdeka)

**Nama Produk:** eRaporOne  
**Tagline:** *Sistem Terpadu Pengolahan Nilai & Rapor Kurikulum Merdeka*  
**Versi Dokumen:** 1.3 (Brand Integration: eRaporOne)  
**Status:** Ready for Development  
**Target Platform:** Web Application (Responsive Desktop & Mobile)

---

## 1. Ringkasan Eksekutif & Latar Belakang

**eRaporOne** adalah aplikasi sistem informasi penilaian dan rapor terpadu yang dirancang untuk menyederhanakan proses pengolahan nilai, pemantauan capaian kompetensi, pencatatan kehadiran, hingga pencetakan rapor hasil belajar peserta didik di Sekolah Menengah Kejuruan (SMK) berbasis **Kurikulum Merdeka**.

**eRaporOne** hadir untuk menjawab kendala klasik sistem rapor konvensional—seperti antarmuka yang lambat saat *traffic* tinggi, proses input deskripsi capaian yang berulang, serta kurangnya fleksibilitas dalam mengelola komponen khas SMK seperti **Praktik Kerja Lapangan (PKL)**, **Uji Kompetensi Keahlian (UKK)**, dan **Konsentrasi Keahlian**.

### Tujuan Utama
* Memangkas waktu administrasi guru dalam mengolah nilai dan menyusun deskripsi capaian kompetensi hingga 60% melalui otomasi di dalam **eRaporOne**.
* Menyediakan satu alur kerja terpadu (*all-in-one*) yang cepat dan intuitif untuk seluruh komponen wajib rapor SMK (Intrakurikuler, Kokurikuler/P5, PKL, serta Ketidakhadiran).
* Menjamin keamanan, integritas data, dan kemudahan sinkronisasi dengan Data Pokok Pendidikan (Dapodik).

---

## 2. Target Pengguna & Hak Akses (Role-Based Access Control)

| Peran (Role) | Tanggung Jawab Utama di Sistem eRaporOne |
| :--- | :--- |
| **Admin / Operator Sekolah** | Manajemen tahun ajaran, pengaturan hari efektif semester, sinkronisasi/import data Dapodik (Siswa, Guru, Rombel, Mapel), pengaturan format cetak rapor, dan manajemen hak akses pengguna. |
| **Wakil Kepala Kurikulum** | Monitoring progres input nilai dan absensi seluruh kelas secara *real-time*, mengunci periode penilaian, dan validasi legger nilai. |
| **Ketua Program Keahlian (Kaprog)** | Memantau capaian mata pelajaran kejuruan/konsentrasi keahlian, penempatan pembimbing PKL, dan rekap hasil UKK. |
| **Guru Mata Pelajaran** | Mengelola Tujuan Pembelajaran (TP), menginput nilai formatif/sumatif, serta memverifikasi deskripsi capaian kompetensi. |
| **Guru Pembimbing PKL** | Menginput nilai tujuan pembelajaran PKL, catatan dari Dunia Usaha/Dunia Industri (DUDI), dan rekap ketidakhadiran khusus selama PKL. |
| **Wali Kelas** | Menginput manual rekap ketidakhadiran siswa (Sakit, Izin, Tanpa Keterangan/Alfa), nilai ekstrakurikuler, prestasi, catatan perkembangan siswa, status kenaikan kelas/kelulusan, serta mencetak rapor. |
| **Kepala Sekolah** | Melihat dashboard analitik sekolah dan melakukan otorisasi/tanda tangan elektronik (QR Code) pada rapor terbitan **eRaporOne**. |
| **Siswa & Orang Tua** | Mengakses hasil rapor digital melalui portal **eRaporOne** (mode *read-only*) dan mengunduh salinan PDF rapor resmi. |

---

## 3. Ruang Lingkup Fitur Utama (Core Features)

### 3.1. Manajemen Data Master & Integrasi Dapodik
* **Import Data Terstruktur:** Mendukung tarik data langsung via Web Service/API Dapodik lokal maupun upload template Excel standar **eRaporOne** (Data Siswa, PTK, Rombongan Belajar, dan Pembelajaran).
* **Pemetaan Kurikulum SMK:** Pengelompokan otomatis mata pelajaran ke dalam kelompok Umum, Kejuruan (Dasar-dasar Program Keahlian & Konsentrasi Keahlian), Mata Pelajaran Pilihan, serta Projek Kreatif dan Kewirausahaan (PKK).

### 3.2. Pengolahan Nilai Intrakurikuler
* **Manajemen Tujuan Pembelajaran (TP):** Guru dapat menyusun bank TP per mata pelajaran di **eRaporOne** dan menggunakannya kembali di semester berikutnya.
* **Input Nilai Fleksibel:** Mendukung input nilai Sumatif Lingkup Materi dan Sumatif Akhir Semester dalam satu tampilan *grid* (mirip spreadsheet) yang responsif.
* **Kalkulasi Nilai Akhir Otomatis:** Pembobotan nilai yang dapat disesuaikan dengan kebijakan kurikulum sekolah.

### 3.3. Modul Khusus SMK: PKL & UKK
* **Penilaian PKL (Mata Pelajaran Tersendiri di Kurikulum Merdeka):**
  * Input nama mitra DUDI, lokasi, dan durasi pelaksanaan.
  * Penilaian berdasarkan TP PKL (Internalisasi *soft skills*, penerapan *hard skills*, dan kemandirian berwirausaha).
  * Rekapitulasi ketidakhadiran khusus selama di industri (Sakit, Izin, Tanpa Keterangan).
* **Rekap Uji Kompetensi Keahlian (UKK):** Pencatatan nilai ujian praktik kejuruan beserta status predikat kompeten/belum kompeten sebagai lampiran pendamping rapor.

### 3.4. Modul Kokurikuler (Projek Penguatan Profil Pelajar Pancasila / P5)
* Pemilihan tema projek, dimensi, elemen, dan sub-elemen P5 yang disasar pada semester berjalan.
* Input penilaian kualitatif (**BB** - Belum Berkembang, **MB** - Mulai Berkembang, **BSH** - Berkembang Sesuai Harapan, **SB** - Sangat Berkembang) oleh koordinator/fasilitator projek.
* Pengisian catatan proses projek per siswa.

### 3.5. Modul Kehadiran & Ketidakhadiran (100% Input Manual Wali Kelas)
Pada rilis tahap ini, pencatatan kehadiran/ketidakhadiran di **eRaporOne** difokuskan sepenuhnya melalui **input manual oleh Wali Kelas** tanpa integrasi mesin presensi eksternal. Data ini akan dicetak langsung pada tabel **Ketidakhadiran** di halaman akhir rapor.

**Struktur Data Ketidakhadiran pada Rapor Cetakan:**

| Komponen di Rapor Cetakan | Tipe Data | Keterangan & Validasi |
| :--- | :--- | :--- |
| **Sakit** | Integer (minimal `0`) | Jumlah hari tidak masuk sekolah karena sakit (default `0` hari). |
| **Izin** | Integer (minimal `0`) | Jumlah hari tidak masuk sekolah dengan keterangan izin (default `0` hari). |
| **Tanpa Keterangan (Alfa)** | Integer (minimal `0`) | Jumlah hari tidak masuk sekolah tanpa keterangan (default `0` hari). |
| **Jumlah Kehadiran** *(Opsional)* | Integer / Persentase | Dapat diaktifkan pada pengaturan cetak rapor jika sekolah ingin menampilkan total hari hadir (dihitung otomatis dari `Hari Efektif - Total Tidak Hadir`). |

> **Aturan Format Cetak:** Jika angka ketidakhadiran bernilai `0`, Admin dapat mengatur format cetaknya menjadi `0 hari` atau tanda strip (`- hari`) sesuai standar tata naskah dinas sekolah.

**Alur Input Manual oleh Wali Kelas (User Flow):**
1. Wali Kelas membuka menu **Wali Kelas - Input Kehadiran & Catatan** di dashboard **eRaporOne**.
2. Sistem menampilkan daftar seluruh siswa dalam rombel tersebut dalam tampilan **Tabel Grid Satu Kelas** (*inline-editable* mirip spreadsheet) dengan kolom: `Nama Siswa`, `NISN`, `Sakit`, `Izin`, `Tanpa Keterangan (Alfa)`, dan `Total Tidak Hadir` (terhitung otomatis).
3. Wali Kelas mengetik angka langsung pada sel masing-masing siswa dengan dukungan navigasi keyboard (`Tab` atau `Enter` untuk berpindah sel/baris dengan cepat).
4. **Validasi Otomatis:** Sistem memberi peringatan jika total `Sakit + Izin + Alfa` melebihi jumlah hari efektif semester yang diatur Admin (mencegah salah ketik angka).
5. Wali Kelas menekan tombol **Simpan Perubahan** untuk menyimpan data seluruh kelas sekaligus.

### 3.6. Administrasi Kelengkapan Rapor & Pencetakan
* **Kelengkapan Rapor:** Input nilai ekstrakurikuler, prestasi siswa, catatan wali kelas, dan keputusan kenaikan kelas atau kelulusan.
* **Generate PDF Rapor & Legger:**
  * Cetak rapor satuan maupun massal (1 kelas dalam 1 file ZIP/PDF) sesuai standar format Kementerian Pendidikan terbaru dengan identitas **eRaporOne** pada footer verifikasi.
  * Export **Legger Nilai** (termasuk rekap Sakit, Izin, Alfa) dan **Buku Induk** ke format Excel/PDF dengan satu klik.

---

## 4. Saran Fitur Tambahan (Value-Added Features)

Untuk menjadikan **eRaporOne** jauh lebih praktis, akurat, dan modern dibandingkan aplikasi rapor standar, berikut adalah fitur-fitur strategis yang disarankan:

### 1. Smart Bulk Import/Export Excel Nilai dengan Validasi Otomatis
* **Masalah:** Server sekolah sering mengalami *bottleneck* ketika puluhan guru menginput nilai secara bersamaan menjelang pembagian rapor.
* **Solusi:** Sediakan fitur unduh template Excel per kelas/mapel dari **eRaporOne** yang sudah terisi daftar siswa dan TP. Guru mengisi nilai secara *offline* di laptop masing-masing lalu mengunggahnya kembali. Sistem otomatis memvalidasi format angka/karakter sebelum menyimpan ke database.

### 2. Auto-Generate Deskripsi Capaian Kompetensi (Smart Narrative Engine)
* **Masalah:** Guru harus mengetik atau mengedit manual narasi deskripsi kelebihan dan area peningkatan untuk ratusan siswa.
* **Solusi:** Mesin narasi **eRaporOne** secara otomatis merangkai kalimat deskripsi yang natural dan bebas pengulangan kata berdasarkan nilai tertinggi dan terendah pada masing-masing Tujuan Pembelajaran (TP). Guru tetap memiliki opsi untuk menyunting hasil *generate* tersebut sebelum dikunci.

### 3. Integrasi API / Import Hasil Ujian CBT
* **Masalah:** Guru harus menyalin ulang nilai Sumatif Akhir Semester (SAS) dari aplikasi ujian (CBT) ke aplikasi rapor.
* **Solusi:** Menyediakan *endpoint* API atau parser file ekspor CBT sehingga nilai ujian langsung masuk ke kolom Sumatif di **eRaporOne** tanpa input manual ulang.

### 4. Portal Rapor Digital & Verifikasi QR Code Anti-Pemalsuan
* **Masalah:** Pencetakan rapor fisik memakan biaya kertas dan tinta besar, sementara salinan digital rentan dimanipulasi nilainya.
* **Solusi:** Setiap halaman PDF rapor yang dicetak melalui **eRaporOne** dilengkapi **QR Code unik** yang mengarah ke halaman verifikasi publik milik sekolah untuk membuktikan keaslian dokumen. Orang tua juga dapat melihat ringkasan rapor anak melalui portal *mobile-friendly* setelah akun diaktifkan oleh wali kelas.

### 5. Dashboard Monitoring & Early Warning System (EWS)
* **Masalah:** Wali kelas dan Waka Kurikulum sering terlambat menyadari siswa yang nilainya banyak di bawah kriteria atau tingkat absensinya kritis.
* **Solusi:**
  * **Progress Tracker Waka Kurikulum:** Grafik persentase guru dan wali kelas yang sudah menyelesaikan input nilai dan ketidakhadiran per jurusan/kelas.
  * **EWS Akademik & Kehadiran:** Notifikasi otomatis kepada Wali Kelas jika siswa memiliki nilai di bawah KKTP pada lebih dari 3 mata pelajaran atau input **Tanpa Keterangan (Alfa)** melampaui batas tata tertib sekolah (misal lebih dari `5 hari` atau `10 hari`).

### 6. Lampiran E-Portofolio & Sertifikat Kompetensi Siswa SMK
* **Masalah:** Lulusan SMK membutuhkan bukti karya dan sertifikat keahlian saat melamar kerja atau magang.
* **Solusi:** Fitur bagi guru kejuruan atau siswa untuk mengunggah tautan portofolio karya terbaik dan sertifikat uji kompetensi (LSP/Industri) yang terhubung langsung dengan profil akademik siswa di **eRaporOne**.

---

## 5. Spesifikasi Non-Fungsional & Keamanan

* **Performa & Skalabilitas:** **eRaporOne** mampu menangani minimal 150–300 pengguna aktif bersamaan (*concurrent users*) tanpa penurunan waktu respons (target *page load* kurang dari 1,5 detik).
* **Keamanan Data:**
  * Enkripsi kata sandi standar industri (Bcrypt/Argon2).
  * *Audit Log* lengkap untuk melacak siapa yang mengubah nilai maupun data ketidakhadiran beserta stempel waktunya.
  * Fitur **Kunci Periode (Lock Semester)** agar data rapor yang sudah dibagikan tidak dapat diubah secara tidak sengaja.
* **Backup Otomatis:** Pencadangan database harian terjadwal (*automated daily backup*) ke penyimpanan lokal maupun *cloud*.

---

## 6. Roadmap Pengembangan eRaporOne (Bertahap)

1. **Fase 1 (MVP - Minimum Viable Product):** Manajemen Data Master/Import Excel Dapodik, Input TP & Nilai Intrakurikuler, Smart Narrative Generator, Modul PKL & P5, Input Manual Kehadiran Wali Kelas (Sakit, Izin, Alfa), serta Cetak PDF Rapor & Legger.
2. **Fase 2 (Optimasi & Otomasi):** Dashboard Monitoring Waka Kurikulum, Integrasi Impor Nilai CBT, serta sistem *Audit Log* dan *Lock Semester*.
3. **Fase 3 (Ekspansi Ekosistem):** Portal Rapor Orang Tua/Siswa, Verifikasi QR Code, Early Warning System, dan Lampiran E-Portofolio Kejuruan.