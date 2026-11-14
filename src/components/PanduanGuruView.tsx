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
  Lightbulb
} from 'lucide-react';

export const PanduanGuruView: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  const faqs = [
    {
      q: 'Kenapa saya tidak bisa mencetak rapor murid?',
      a: 'Berdasarkan regulasi resmi Kurikulum Merdeka, hanya Wali Kelas yang memiliki wewenang untuk mencetak dan mengesahkan dokumen Rapor Resmi rombel tersebut. Guru Mata Pelajaran bertugas menginput nilai dan memverifikasi deskripsi capaian pada mapel yang diampu.'
    },
    {
      q: 'Apakah kalimat deskripsi hasil generate otomatis boleh saya ganti / edit?',
      a: 'Sangat boleh! Fitur Smart Narrative Engine dibuat untuk meringankan beban mengetik dari nol. Guru tetap memiliki kendali penuh 100% untuk menyunting, menambahkan kalimat khusus, atau menyesuaikan bahasa secara bebas pada kolom teks sebelum menekan tombol simpan.'
    },
    {
      q: 'Bagaimana cara mengisi nilai jika saya membukanya dari HP / Smartphone?',
      a: 'Pada menu "Input Nilai", pilih mode "Kartu Sentuh (HP)". Tampilan akan otomatis berubah menjadi kartu vertikal dengan kotak input besar yang sangat nyaman disentuh jemari tanpa perlu memperbesar layar.'
    },
    {
      q: 'Apakah Praktik Kerja Lapangan (PKL) wajib ada di semua tingkatan kelas?',
      a: 'Tidak. Sesuai kurikulum SMK terkini, mata pelajaran PKL secara resmi hanya diperuntukkan bagi murid Kelas XII (Fase F). Untuk kelas X dan XI, modul PKL tidak ditampilkan pada rapor.'
    },
    {
      q: 'Bagaimana jika koneksi internet lambat saat mendekati pembagian rapor?',
      a: 'Guru dapat mengunduh format nilai Excel melalui tombol "Unduh Format Nilai", mengisi nilai siswa di laptop secara santai/offline tanpa internet, lalu mengunggahnya kembali ke sistem saat koneksi sudah stabil.'
    }
  ];

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-blue-900/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
            <BookOpen className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider block">
              Pusat Edukasi & Bantuan Guru
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Panduan Lengkap Pengisian eRaporOne
            </h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed max-w-2xl mt-2">
          Panduan praktis langkah-demi-langkah bagi Bapak/Ibu Guru dan Wali Kelas agar pengolahan nilai dan pencetakan rapor berjalan cepat, mudah, dan bebas kendala.
        </p>
      </div>

      {/* Alur Cepat 3 Langkah Bagi Guru Mapel */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h3 className="font-extrabold text-slate-800 text-base">
            Alur Cepat Pengisian Nilai (Cukup 3 Langkah)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1 */}
          <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200/70 space-y-2">
            <div className="w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center font-extrabold text-xs">
              1
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Pilih Kelas & Mapel</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Buka menu <strong>Input Nilai</strong> di sidebar kiri. Pilih rombongan belajar dan mata pelajaran yang Bapak/Ibu ampu.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-200/70 space-y-2">
            <div className="w-7 h-7 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-extrabold text-xs">
              2
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Input Nilai & Generate</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ketik nilai pada kolom TP dan SAS. Lalu klik tombol <strong>"⚡ Generate Semua Siswa"</strong> untuk merangkai deskripsi capaian otomatis.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/70 space-y-2">
            <div className="w-7 h-7 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-extrabold text-xs">
              3
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Simpan Nilai</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Periksa kembali hasil inputan, lalu klik tombol biru <strong>"Simpan Semua Nilai"</strong>. Data langsung tersimpan aman ke database sekolah.
            </p>
          </div>
        </div>
      </div>

      {/* Penjelasan Detail Fitur Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fitur 1: Smart Narrative Engine */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">
              Cara Kerja Smart Narrative Generator
            </h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Sistem otomatis membandingkan nilai pada masing-masing Tujuan Pembelajaran (TP):
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
            <li><strong>Capaian Tertinggi:</strong> Menghasilkan kalimat apresiasi penguasaan terbaik (contoh: <em>"Menunjukkan penguasaan sangat baik dalam..."</em>).</li>
            <li><strong>Capaian Terendah:</strong> Menghasilkan rekomendasi materi yang perlu pendampingan lebih lanjut.</li>
            <li><strong>Nama & Kelas Otomatis:</strong> Narasi sudah otomatis menyertakan nama murid, kelas, dan jurusan tanpa perlu ketik berulang.</li>
          </ul>
        </div>

        {/* Fitur 2: Fleksibilitas Laptop vs HP */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
              <Smartphone className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">
              Bekerja di Laptop vs Smartphone
            </h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Bapak/Ibu dapat memilih tampilan yang paling cocok dengan perangkat yang sedang digunakan:
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
            <li><strong>Mode Grid Excel (Laptop/PC):</strong> Cocok untuk mengetik cepat ke bawah dengan tombol <code>Enter</code> atau <code>Tab</code>.</li>
            <li><strong>Mode Kartu Sentuh (HP/Tablet):</strong> Tampilan berbentuk kartu per siswa dengan tombol dan angka berukuran besar yang mudah disentuh di layar HP.</li>
          </ul>
        </div>

        {/* Fitur 3: Khusus Wali Kelas */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">
              Tugas Wali Kelas (Absensi & Catatan)
            </h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Wali kelas memiliki menu khusus untuk kelengkapan rapor:
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
            <li><strong>Input Absensi:</strong> Ketik jumlah hari Sakit, Izin, dan Alfa pada tabel kehadiran.</li>
            <li><strong>Generate Catatan Otomatis:</strong> Tekan tombol <em>"Generate Semua Catatan"</em> untuk membuat evaluasi perkembangan kepribadian siswa yang disesuaikan dengan nilai rata-rata dan tingkat kehadiran.</li>
            <li><strong>Cetak Rapor Resmi:</strong> Buka menu <em>Cetak Rapor</em> untuk mencetak format A4 atau menyimpannya dalam format PDF.</li>
          </ul>
        </div>

        {/* Fitur 4: Import Excel */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">
              Panduan Import Excel Data Master
            </h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Untuk memasukkan data siswa atau guru dalam jumlah banyak:
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
            <li>Klik tombol <strong>"Import Excel"</strong> di header atau menu Data Master.</li>
            <li>Unduh format template resmi yang telah disediakan.</li>
            <li>Buka file template di Excel laptop, paste data siswa/guru, lalu unggah kembali ke sistem.</li>
            <li>Sistem akan memvalidasi data dan menampilkan pratinjau sebelum disimpan.</li>
          </ul>
        </div>
      </div>

      {/* Tanya Jawab & Kendala Umum (FAQ Accordion) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h3 className="font-extrabold text-slate-800 text-base">
            Tanya Jawab & Kendala Umum (FAQ)
          </h3>
        </div>

        <div className="divide-y divide-slate-100">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-3">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-slate-800 hover:text-blue-600 transition"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                )}
              </button>
              {openFaq === idx && (
                <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 animate-fadeIn">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
