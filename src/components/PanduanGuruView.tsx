import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Edit3,
  Sparkles,
  CalendarCheck,
  Printer,
  FileSpreadsheet,
  HelpCircle,
  Smartphone,
  Monitor,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ShieldCheck,
  Award,
  Briefcase,
  Compass,
  Users,
  Target,
  GraduationCap,
  Search,
  FileText,
  Layers,
  ArrowRight
} from 'lucide-react';

export const PanduanGuruView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'guru' | 'wali' | 'ekskul' | 'smk' | 'manajemen' | 'faq'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  const faqs = [
    {
      q: 'Kenapa saya tidak bisa mencetak rapor murid?',
      a: 'Sesuai regulasi resmi Kurikulum Merdeka Kemendikbudristek, hanya Wali Kelas, Administrator, Kepala Sekolah, dan Waka Kurikulum yang memiliki hak akses mencetak dan mengesahkan dokumen Rapor Resmi. Guru Mata Pelajaran bertugas menginput nilai formatif/sumatif serta memverifikasi deskripsi capaian pada mapel yang diampu.'
    },
    {
      q: 'Apakah kalimat narasi deskripsi hasil generate otomatis boleh diedit?',
      a: 'Sangat boleh! Fitur Smart Narrative Engine dirancang untuk menghemat waktu pengetikan guru dari nol. Guru memiliki kendali 100% untuk menyunting, menambahkan apresiasi khusus, atau menyesuaikan kalimat secara langsung pada kolom teks deskripsi sebelum menekan tombol "Simpan Nilai".'
    },
    {
      q: 'Bagaimana cara mengisi nilai jika menggunakan Smartphone / HP?',
      a: 'Pada menu "Input Nilai", klik tombol mode "Kartu Sentuh (HP)". Antarmuka akan otomatis berubah menjadi kartu vertikal per siswa dengan tombol angka besar yang nyaman disentuh jemari tanpa perlu memperbesar layar (zoom-in).'
    },
    {
      q: 'Kapan modul PKL dan UKK muncul di cetak rapor?',
      a: 'Mata pelajaran Praktik Kerja Lapangan (PKL) dan Uji Kompetensi Keahlian (UKK) secara kurikulum hanya diperuntukkan bagi murid Kelas XII (Fase F) SMK. Pada siswa Kelas X dan XI atau sekolah jenjang SD/SMP/SMA, modul PKL dan UKK disembunyikan secara bersih dan otomatis dari lembar rapor.'
    },
    {
      q: 'Bagaimana jika koneksi internet di sekolah sedang lambat atau padam?',
      a: 'Bapak/Ibu Guru dapat memanfaatkan fitur "Unduh Format Nilai" (file Excel). Isi nilai seluruh siswa secara offline di aplikasi Microsoft Excel laptop Anda, simpan file tersebut, lalu unggah kembali melalui menu "Upload Nilai Excel" saat jaringan internet sudah kembali stabil.'
    },
    {
      q: 'Bagaimana cara menentukan Tujuan Pembelajaran (TP) yang efektif?',
      a: 'Buka menu "Tujuan Pembelajaran (TP)". Buat 2 hingga 4 TP utama per semester yang mewakili kompetensi esensial materi pelajaran. Penamaan TP sebaiknya ringkas dan jelas, diawali kata kerja operasional (contoh: "Memahami konsep dasar perbankan", "Menganalisis rangkaian kelistrikan motor").'
    },
    {
      q: 'Apakah Pembina Ekstrakurikuler bisa langsung memberi nilai untuk rapor?',
      a: 'Bisa! Guru yang ditugaskan sebagai Pembina Ekstrakurikuler dapat membuka menu "Ekstrakurikuler", memilih ekskul binaannya, dan memberikan predikat (Sangat Baik / Baik / Cukup / Kurang) beserta deskripsi keaktifan. Nilai ini otomatis langsung mengalir ke lembar Cetak Rapor bagian C/Ekstrakurikuler.'
    },
    {
      q: 'Mengapa nilai di cetak rapor belum terupdate setelah saya edit di Input Nilai?',
      a: 'Pastikan Bapak/Ibu sudah menekan tombol hijau "Simpan Nilai" di lembar input nilai. Sistem eRaporOne kini dilengkapi fitur auto-sync dan multi-strategy matching, sehingga nilai yang sudah tersimpan akan langsung otomatis sinkron ke lembar Cetak Rapor dan Leger Nilai secara instan.'
    },
    {
      q: 'Apa perbedaan akun Guru Mapel, Wali Kelas, Waka Kurikulum, dan Kepala Sekolah?',
      a: 'Guru Mapel hanya mengakses kelas dan mapel yang diampunya saja. Wali Kelas memiliki tugas tambahan mengelola absensi dan mencetak rapor rombelnya. Waka Kurikulum & Kepala Sekolah memiliki wewenang supervisi menyeluruh untuk memantau kelengkapan nilai seluruh guru se-sekolah dan mengekspor rekapitulasi leger.'
    },
    {
      q: 'Bagaimana jika terdapat murid pindahan / mutasi di pertengahan semester?',
      a: 'Administrator dapat menambahkan data siswa tersebut melalui menu "Data Master -> Siswa" atau melalui fitur "Import Excel Siswa". Begitu didaftarkan ke rombel terkait, nama siswa akan otomatis muncul di seluruh lembar penilaian guru pengampu kelas tersebut.'
    }
  ];

  const filteredFaqs = faqs.filter(f =>
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-blue-900/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold border border-white/20">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>Pusat Edukasi & Dokumentasi Resmi eRaporOne</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Panduan Lengkap Tata Kelola Rapor Kurikulum Merdeka
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
            Petunjuk operasional praktis langkah-demi-langkah bagi Pendidik, Wali Kelas, Pembina Ekstrakurikuler, Waka Kurikulum, dan Kepala Sekolah agar proses penilaian berjalan transparan, akurat, dan sesuai regulasi.
          </p>

          {/* Quick Search Bar */}
          <div className="pt-2 max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari topik panduan atau kendala (misal: pkl, hp, deskripsi)..."
                className="w-full bg-white/95 text-slate-800 pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-md placeholder-slate-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'all', label: 'Semua Panduan', icon: BookOpen },
          { id: 'guru', label: 'Guru Mapel', icon: Edit3 },
          { id: 'wali', label: 'Wali Kelas', icon: CalendarCheck },
          { id: 'ekskul', label: 'Pembina Ekskul', icon: Compass },
          { id: 'smk', label: 'SMK (PKL & UKK)', icon: Briefcase },
          { id: 'manajemen', label: 'Wakur & Kepala Sekolah', icon: GraduationCap },
          { id: 'faq', label: 'Tanya Jawab (FAQ)', icon: HelpCircle },
        ].map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: ROLE & HAK AKSES (RBAC) */}
      {(activeCategory === 'all' || activeCategory === 'manajemen') && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-base">
                1. Struktur Peran & Hak Akses Pengguna (Role-Based Access Control)
              </h3>
              <p className="text-xs text-slate-500">
                Setiap pengguna memiliki ruang kerja dan wewenang yang dibatasi secara ketat demi keamanan data nilai
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {/* Role 1 */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Guru Mata Pelajaran
                </span>
                <Edit3 className="w-4 h-4 text-emerald-600" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">Input Nilai & TP Ampuan</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hanya melihat mata pelajaran dan rombongan belajar yang ditugaskan kepadanya. Bebas menginput formatif TP, SAS, dan menyunting deskripsi capaian.
              </p>
            </div>

            {/* Role 2 */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
                  Wali Kelas
                </span>
                <CalendarCheck className="w-4 h-4 text-blue-600" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">Absensi & Cetak Rapor</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Memiliki hak guru mapel + wewenang khusus menginput ketidakhadiran (S/I/A), merangkai catatan wali kelas, dan mengesahkan/mencetak dokumen Rapor Resmi rombel binaan.
              </p>
            </div>

            {/* Role 3 */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                  Pembina Ekskul
                </span>
                <Compass className="w-4 h-4 text-amber-600" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">Penilaian Kegiatan Ekskul</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hanya dapat mengakses dan menilai murid yang terdaftar pada kegiatan ekstrakurikuler binaannya saja (contoh: Pramuka, Klub Otomotif, PMR, Desain Kreatif).
              </p>
            </div>

            {/* Role 4 */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-indigo-100 text-indigo-800 border border-indigo-200">
                  Waka Kurikulum
                </span>
                <Layers className="w-4 h-4 text-indigo-600" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">Supervisi Akademik Sekolah</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Memantau keterisian nilai seluruh guru se-sekolah di dashboard secara real-time, mengecek mutu TP setiap mapel, dan mengekspor rekapitulasi leger seluruh kelas.
              </p>
            </div>

            {/* Role 5 */}
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-200">
                  Kepala Sekolah
                </span>
                <GraduationCap className="w-4 h-4 text-rose-600" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">Monitoring & Pengesahan</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Akses monitoring menyeluruh hasil capaian belajar seluruh jurusan, memantau kemajuan PKL & UKK SMK, serta meninjau lembar pratinjau rapor sebelum ditandatangani.
              </p>
            </div>

            {/* Role 6 */}
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200">
                  Administrator
                </span>
                <ShieldCheck className="w-4 h-4 text-purple-600" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">Tata Kelola Sistem Penuh</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mengatur profil instansi, manajemen akun & ubah role pengguna, import/export data master, serta manajemen rombel dan mata pelajaran.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: ALUR PENGISIAN NILAI GURU MAPEL */}
      {(activeCategory === 'all' || activeCategory === 'guru') && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-base">
                2. Alur Kerja Pengisian Nilai Guru Mata Pelajaran
              </h3>
              <p className="text-xs text-slate-500">
                Tata cara pengisian nilai harian (TP), sumatif akhir semester (SAS), dan pembuatan deskripsi capaian otomatis
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-7 h-7 bg-blue-600 text-white rounded-xl flex items-center justify-center font-extrabold text-xs shadow-sm">
                1
              </div>
              <h4 className="font-bold text-slate-800 text-xs">Tetapkan TP</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Buka menu <strong>Tujuan Pembelajaran</strong>. Tambahkan 2 - 4 TP esensial untuk mapel dan rombel yang diampu di semester ini.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-7 h-7 bg-blue-600 text-white rounded-xl flex items-center justify-center font-extrabold text-xs shadow-sm">
                2
              </div>
              <h4 className="font-bold text-slate-800 text-xs">Pilih Mode Input</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Pilih mode <strong>Grid Excel (Laptop)</strong> untuk mengetik cepat ke bawah dengan tombol <code>Enter</code>, atau mode <strong>Kartu Sentuh (HP)</strong> saat membuka dari smartphone.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-7 h-7 bg-blue-600 text-white rounded-xl flex items-center justify-center font-extrabold text-xs shadow-sm">
                3
              </div>
              <h4 className="font-bold text-slate-800 text-xs">Generate Deskripsi</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Klik tombol <strong>"⚡ Generate Semua Siswa"</strong>. Sistem otomatis menganalisis capaian tertinggi dan terendah menjadi kalimat narasi rapor.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-7 h-7 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-extrabold text-xs shadow-sm">
                4
              </div>
              <h4 className="font-bold text-slate-800 text-xs">Simpan Permanen</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Periksa nilai, lalu tekan tombol hijau <strong>"Simpan Nilai"</strong>. Data otomatis tersimpan dan langsung mengalir ke lembar cetak rapor.
              </p>
            </div>
          </div>

          {/* Tips Box Smart Narrative */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="font-bold text-blue-900 text-xs sm:text-sm">
                Mekanisme Cerdas Smart Narrative Engine:
              </h5>
              <p className="text-xs text-blue-800 leading-relaxed">
                Sistem tidak lagi menggunakan kalimat kaku manual. Generator membaca perolehan angka TP:
              </p>
              <ul className="text-xs text-blue-800 list-disc pl-4 space-y-0.5">
                <li><strong>Capaian Tertinggi:</strong> Menghasilkan narasi penguasaan materi (misal: <em>"Menunjukkan penguasaan sangat baik dalam..."</em>).</li>
                <li><strong>Capaian Terendah:</strong> Menghasilkan rekomendasi penguatan (misal: <em>"Perlu pendampingan lebih lanjut dalam..."</em>).</li>
                <li><strong>Personalisasi:</strong> Sudah otomatis menyematkan nama siswa, kelas, dan nama mapel secara proporsional.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: TUGAS WALI KELAS */}
      {(activeCategory === 'all' || activeCategory === 'wali') && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-base">
                3. Panduan Khusus Wali Kelas (Absensi, Catatan, & Cetak Rapor)
              </h3>
              <p className="text-xs text-slate-500">
                Langkah penyelesaian kelengkapan rapor semester sebelum dokumen dibagikan kepada orang tua/wali murid
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-emerald-600" />
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">1. Input Presensi / Kehadiran</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Buka menu <strong>Absensi</strong>. Masukkan total hari <strong>Sakit (S)</strong>, <strong>Izin (I)</strong>, dan <strong>Tanpa Keterangan / Alfa (A)</strong> untuk seluruh murid dalam tabel spreadsheet satu layar.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">2. Catatan Perkembangan Siswa</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gunakan tombol <strong>"Generate Semua Catatan"</strong> pada menu Absensi. Sistem akan membuatkan narasi motivasi kepribadian dan kedisiplinan yang diselaraskan dengan absensi dan prestasi belajar siswa.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-amber-600" />
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">3. Cetak Rapor Resmi & Leger</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Buka menu <strong>Cetak Rapor</strong>. Periksa identitas sekolah, tabel nilai Kurikulum Merdeka, tanda tangan Kepala Sekolah & Wali Kelas, lalu cetak menggunakan kertas standar A4 atau simpan sebagai PDF.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: KHUSUS SMK (PKL & UKK) */}
      {(activeCategory === 'all' || activeCategory === 'smk') && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-base">
                4. Modul Khusus Kejuruan SMK (PKL & UKK Tingkat Kelas XII)
              </h3>
              <p className="text-xs text-slate-500">
                Pencatatan evaluasi Praktik Kerja Lapangan di dunia industri dan Uji Kompetensi Keahlian
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* PKL */}
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-700" />
                <h4 className="font-extrabold text-slate-800 text-sm">Praktik Kerja Lapangan (PKL)</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Khusus murid <strong>Kelas XII SMK (Fase F)</strong>. Guru pembimbing atau wali kelas XII mengisi:
              </p>
              <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                <li>Nama Mitra DUDI & Alamat/Lokasi PKL</li>
                <li>Durasi pelaksanaan (biasanya 3 hingga 6 bulan)</li>
                <li>Penilaian 3 aspek: Soft Skills, Hard Skills, & Kemandirian</li>
                <li>Predikat kualitatif resmi: <em>Sangat Baik, Baik, Cukup, Kurang</em></li>
                <li>Catatan perkembangan dari instruktur industri</li>
              </ul>
            </div>

            {/* UKK */}
            <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-700" />
                <h4 className="font-extrabold text-slate-800 text-sm">Uji Kompetensi Keahlian (UKK)</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sertifikasi kompetensi kejuruan yang diujikan oleh Asesor / Penguji Eksternal LSP:
              </p>
              <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                <li>Nama skema sertifikasi kompetensi (KKNI Level II)</li>
                <li>Nilai Ujian Teori Kejuruan & Ujian Praktik</li>
                <li>Nilai Akhir & Status Kelulusan: <em>Kompeten / Sangat Kompeten</em></li>
                <li>Nomor registrasi sertifikat kompetensi kejuruan</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: SUPERVISI WAKUR & KEPSEK */}
      {(activeCategory === 'all' || activeCategory === 'manajemen') && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-base">
                5. Supervisi Akademik (Waka Kurikulum & Kepala Sekolah)
              </h3>
              <p className="text-xs text-slate-500">
                Fitur pemantauan keterisian nilai, rekapitulasi sekolah, dan audit mutu pelaporan rapor
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h5 className="font-bold text-slate-800 text-sm">Monitoring Real-Time</h5>
              <p className="text-slate-600 leading-relaxed">
                Dashboard menyajikan indikator persentase keterisian nilai per guru, penilaian ekskul, absensi kelas, PKL, dan UKK se-sekolah secara transparan.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h5 className="font-bold text-slate-800 text-sm">Ekspor Leger Excel</h5>
              <p className="text-slate-600 leading-relaxed">
                Menu <strong>Leger Nilai</strong> memungkinkan manajemen sekolah mengunduh rekap seluruh nilai mapel per rombel ke dalam format spreadsheet Excel resmi untuk arsip kurikulum.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h5 className="font-bold text-slate-800 text-sm">Audit & Cetak Seluruh Kelas</h5>
              <p className="text-slate-600 leading-relaxed">
                Akun Kepala Sekolah dan Waka Kurikulum memiliki akses tanpa batas untuk membuka dan mencetak rapor dari kelas manapun tanpa batasan rombel.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: FAQ ACCORDION */}
      {(activeCategory === 'all' || activeCategory === 'faq') && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-base">
                Tanya Jawab & Penyelesaian Kendala Umum (FAQ)
              </h3>
              <p className="text-xs text-slate-500">
                Solusi cepat terhadap pertanyaan yang paling sering diajukan oleh guru saat pengolahan nilai
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredFaqs.length === 0 ? (
              <div className="py-6 text-center text-slate-400 text-xs italic">
                Tidak ada pertanyaan yang sesuai dengan kata kunci pencarian.
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => (
                <div key={idx} className="py-3.5">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-slate-800 hover:text-blue-600 transition gap-2"
                  >
                    <span>{idx + 1}. {faq.q}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="text-xs text-slate-600 mt-2.5 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
