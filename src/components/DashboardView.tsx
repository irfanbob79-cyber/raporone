import React from 'react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from './Navigation';
import {
  Users,
  GraduationCap,
  Layers,
  BookOpen,
  Edit3,
  CalendarCheck,
  FileSpreadsheet,
  Printer,
  Sparkles,
  ArrowRight,
  School,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface DashboardViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenImport: () => void;
  onOpenSettings: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  setActiveTab,
  onOpenImport,
  onOpenSettings
}) => {
  const { schoolProfile, siswa, guru, rombel, mapel, nilaiSiswa } = useApp();

  // Progress estimation
  const totalEntriesNeeded = siswa.length * 3; // sample approximation
  const totalEntriesFilled = nilaiSiswa.length;
  const progressPercent = Math.min(100, Math.round((totalEntriesFilled / Math.max(1, totalEntriesNeeded)) * 100));

  return (
    <div className="space-y-6 pb-20">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-blue-900/10">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold border border-white/20">
            <School className="w-3.5 h-3.5 text-blue-200" />
            <span>Kurikulum Merdeka • {schoolProfile.jenjang}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Selamat Datang di <span className="text-amber-300">eRaporOne</span>
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
            Sistem informasi penilaian rapor terpadu untuk <strong>{schoolProfile.namaSekolah}</strong>.
            Cepat, simpel, bebas ribet, dan siap digunakan langsung dari HP, tablet, maupun laptop.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveTab('nilai')}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-blue-800 hover:bg-blue-50 font-bold rounded-xl text-xs shadow-md transition active:scale-95"
            >
              <Edit3 className="w-4 h-4 text-blue-600" />
              Mulai Input Nilai & Deskripsi
            </button>

            <button
              onClick={onOpenImport}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600/60 hover:bg-blue-600 border border-white/20 text-white font-semibold rounded-xl text-xs transition active:scale-95"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Import Data Master Excel
            </button>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 rounded-l-full pointer-events-none hidden md:block"></div>
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block uppercase">Total Siswa</span>
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900">{siswa.length}</span>
            <span className="text-[10px] text-slate-500 block">Peserta Didik Aktif</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block uppercase">Total Guru & PTK</span>
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900">{guru.length}</span>
            <span className="text-[10px] text-slate-500 block">Pendidik Terdaftar</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block uppercase">Rombel / Kelas</span>
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900">{rombel.length}</span>
            <span className="text-[10px] text-slate-500 block">Rombongan Belajar</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block uppercase">Mata Pelajaran</span>
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900">{mapel.length}</span>
            <span className="text-[10px] text-slate-500 block">Struktur Kurikulum</span>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Smart Narrative Engine */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Smart Narrative Engine</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Otomatis merangkai narasi capaian kompetensi tertinggi dan terendah dengan menyertakan nama siswa, rombel, jurusan, dan mapel. Tetap bisa diedit bebas oleh guru.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('nilai')}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 pt-2 group"
          >
            <span>Buka Input Nilai</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </button>
        </div>

        {/* Card 2: 100% Input Absensi Wali Kelas */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Absensi Manual Wali Kelas</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Input Sakit, Izin, dan Alfa seluruh siswa dalam 1 layar tabel mirip spreadsheet, lengkap dengan pencegahan typo dan validasi batas hari efektif.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('kehadiran')}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-800 pt-2 group"
          >
            <span>Input Absensi Kelas</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </button>
        </div>

        {/* Card 3: Universal K-12 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
              <School className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Universal K-12 Kurikulum Merdeka</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Mendukung SD, SMP, SMA, dan SMK. Modul PKL & UKK otomatis aktif pada jenjang SMK, dan disembunyikan secara bersih pada jenjang SD/SMP/SMA.
            </p>
          </div>
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-800 pt-2 group"
          >
            <span>Ubah Jenjang Sekolah</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </button>
        </div>
      </div>
    </div>
  );
};
