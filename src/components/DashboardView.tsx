import React, { useState } from 'react';
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
  Clock,
  Compass,
  FileText,
  Target,
  BarChart3,
  Award,
  Filter,
  Check,
  AlertCircle
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
  const {
    schoolProfile,
    siswa,
    guru,
    rombel,
    mapel,
    jurusan,
    pembelajaran,
    nilaiSiswa,
    kehadiran,
    ekskul,
    anggotaEkskul,
    activeRole,
    currentUser,
    setSelectedRombelId,
    setSelectedMapelId
  } = useApp();

  const isWali = activeRole === 'wali_kelas';
  const isAdmin = activeRole === 'admin';

  // State Tabs & Filters Progres
  const [activeProgressTab, setActiveProgressTab] = useState<'nilai' | 'ekskul' | 'absensi'>('nilai');
  const [filterRombel, setFilterRombel] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // 1. Perhitungan Progres Nilai Mapel per Guru
  const learningProgressList = pembelajaran.map((p, idx) => {
    const targetRombel = rombel.find(r => r.id === p.rombelId);
    const targetMapel = mapel.find(m => m.id === p.mapelId);
    const targetGuru = guru.find(g => g.id === p.guruId);
    const studentsInClass = siswa.filter(s => s.rombelId === p.rombelId);

    const ratedCount = studentsInClass.filter(s =>
      nilaiSiswa.some(n => n.siswaId === s.id && n.rombelId === p.rombelId && n.mapelId === p.mapelId && (n.nilaiAkhir > 0 || Object.keys(n.nilaiTp || {}).length > 0))
    ).length;

    const totalStudents = studentsInClass.length;
    const percent = totalStudents > 0 ? Math.round((ratedCount / totalStudents) * 100) : 100;

    let status: 'selesai' | 'sebagian' | 'belum' = 'belum';
    if (ratedCount >= totalStudents && totalStudents > 0) status = 'selesai';
    else if (ratedCount > 0) status = 'sebagian';

    return {
      id: p.id || `p-${idx}`,
      rombelId: p.rombelId,
      rombelNama: targetRombel?.nama || 'Kelas',
      mapelId: p.mapelId,
      mapelNama: targetMapel?.nama || 'Mapel',
      guruId: p.guruId,
      guruNama: targetGuru ? `${targetGuru.gelarDepan ? targetGuru.gelarDepan + ' ' : ''}${targetGuru.nama}${targetGuru.gelarBelakang ? ', ' + targetGuru.gelarBelakang : ''}` : 'Guru',
      totalStudents,
      ratedCount,
      percent,
      status
    };
  });

  const totalPembelajaran = learningProgressList.length;
  const selesaiPembelajaran = learningProgressList.filter(l => l.status === 'selesai').length;
  const overallNilaiPercent = totalPembelajaran > 0 ? Math.round((selesaiPembelajaran / totalPembelajaran) * 100) : 100;

  // 2. Perhitungan Progres Ekstrakurikuler
  const ekskulProgressList = ekskul.map(e => {
    const angList = anggotaEkskul.filter(a => a.ekskulId === e.id);
    const ratedAnggota = angList.filter(a => !!a.predikat && !!a.keterangan).length;
    const pembina = guru.find(g => g.id === e.pembinaGuruId);
    const percent = angList.length > 0 ? Math.round((ratedAnggota / angList.length) * 100) : 100;

    return {
      id: e.id,
      nama: e.nama,
      kategori: e.kategori,
      pembinaNama: pembina ? `${pembina.nama} ${pembina.gelarBelakang || ''}` : 'Belum Ditugaskan',
      totalAnggota: angList.length,
      ratedAnggota,
      percent,
      status: ratedAnggota >= angList.length && angList.length > 0 ? 'selesai' : ratedAnggota > 0 ? 'sebagian' : 'belum'
    };
  });

  const totalAnggotaEks = anggotaEkskul.length;
  const ratedAnggotaEks = anggotaEkskul.filter(a => !!a.predikat && !!a.keterangan).length;
  const overallEkskulPercent = totalAnggotaEks > 0 ? Math.round((ratedAnggotaEks / totalAnggotaEks) * 100) : 100;

  // 3. Perhitungan Progres Absensi Rombel
  const absensiProgressList = rombel.map(r => {
    const rSiswa = siswa.filter(s => s.rombelId === r.id);
    const rKehadiran = kehadiran.filter(k => k.rombelId === r.id);
    const wali = guru.find(g => g.id === r.waliKelasId);
    const isCompleted = rKehadiran.length >= rSiswa.length && rSiswa.length > 0;
    const filledCount = rKehadiran.length;
    const percent = rSiswa.length > 0 ? Math.min(100, Math.round((filledCount / rSiswa.length) * 100)) : 100;

    return {
      id: r.id,
      nama: r.nama,
      waliNama: wali ? `${wali.nama} ${wali.gelarBelakang || ''}` : 'Belum Ditentukan',
      totalSiswa: rSiswa.length,
      filledCount,
      percent,
      isCompleted
    };
  });

  const totalRombel = rombel.length;
  const selesaiAbsensi = absensiProgressList.filter(a => a.isCompleted).length;
  const overallAbsensiPercent = totalRombel > 0 ? Math.round((selesaiAbsensi / totalRombel) * 100) : 100;

  // Filter list pembelajaran
  const filteredLearningProgress = learningProgressList.filter(item => {
    const matchRombel = filterRombel === 'all' || item.rombelId === filterRombel;
    const matchStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchRombel && matchStatus;
  });

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
            Selamat Datang, <span className="text-amber-300">{currentUser?.nama || 'Bapak/Ibu Pendidik'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
            Sistem informasi penilaian rapor terpadu untuk <strong>{schoolProfile.namaSekolah}</strong>.
            {isWali && currentUser?.namaRombelWali ? ` Anda bertugas sebagai Wali Kelas ${currentUser.namaRombelWali}.` : ''}
            {isAdmin ? ' Anda memiliki akses administrator penuh untuk seluruh data master, konfigurasi role akun, dan progres sekolah.' : ''}
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveTab('nilai')}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-blue-800 hover:bg-blue-50 font-bold rounded-xl text-xs shadow-md transition active:scale-95"
            >
              <Edit3 className="w-4 h-4 text-blue-600" />
              Mulai Input Nilai & Deskripsi
            </button>

            {isWali && (
              <button
                onClick={() => setActiveTab('rapor')}
                className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-xl text-xs shadow-md transition active:scale-95"
              >
                <Printer className="w-4 h-4" />
                Cetak Rapor Rombel
              </button>
            )}

            {isWali && (
              <button
                onClick={() => setActiveTab('kehadiran')}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl text-xs transition active:scale-95 border border-white/30"
              >
                <CalendarCheck className="w-4 h-4" />
                Absensi Siswa
              </button>
            )}

            {!isWali && !isAdmin && (
              <button
                onClick={() => setActiveTab('tp')}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600/60 hover:bg-blue-600 border border-white/20 text-white font-semibold rounded-xl text-xs transition active:scale-95"
              >
                <Target className="w-4 h-4" />
                Tujuan Pembelajaran
              </button>
            )}

            {isAdmin && (
              <button
                onClick={onOpenImport}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600/60 hover:bg-blue-600 border border-white/20 text-white font-semibold rounded-xl text-xs transition active:scale-95"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Import Data Master Excel
              </button>
            )}
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 rounded-l-full pointer-events-none hidden md:block"></div>
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {schoolProfile.jenjang === 'SMK' && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-400 block uppercase">Jurusan</span>
              <span className="text-xl font-extrabold text-slate-900">{jurusan.length}</span>
              <span className="text-[10px] text-slate-500 block">Konsentrasi</span>
            </div>
          </div>
        )}

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 block uppercase">Total Murid</span>
            <span className="text-xl font-extrabold text-slate-900">{siswa.length}</span>
            <span className="text-[10px] text-slate-500 block">Murid Aktif</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 block uppercase">Guru & PTK</span>
            <span className="text-xl font-extrabold text-slate-900">{guru.length}</span>
            <span className="text-[10px] text-slate-500 block">Pendidik</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 block uppercase">Rombel</span>
            <span className="text-xl font-extrabold text-slate-900">{rombel.length}</span>
            <span className="text-[10px] text-slate-500 block">Kelas Aktif</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 block uppercase">Mata Pelajaran</span>
            <span className="text-xl font-extrabold text-slate-900">{mapel.length}</span>
            <span className="text-[10px] text-slate-500 block">Kurikulum</span>
          </div>
        </div>
      </div>

      {/* MONITORING PROGRES PENGISIAN NILAI, EKSKUL & ABSENSI */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-800">
                Monitoring Progres Pengisian Rapor
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Pantau kelengkapan nilai dari guru mata pelajaran, penilaian ekstrakurikuler, dan absensi wali kelas secara real-time.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveProgressTab('nilai')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeProgressTab === 'nilai'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Progres Guru ({overallNilaiPercent}%)
            </button>
            <button
              onClick={() => setActiveProgressTab('ekskul')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeProgressTab === 'ekskul'
                  ? 'bg-white text-amber-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ekstrakurikuler ({overallEkskulPercent}%)
            </button>
            <button
              onClick={() => setActiveProgressTab('absensi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeProgressTab === 'absensi'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Absensi Wali ({overallAbsensiPercent}%)
            </button>
          </div>
        </div>

        {/* 3 Progress Bars Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Nilai Guru */}
          <div
            onClick={() => setActiveProgressTab('nilai')}
            className={`p-4 rounded-2xl border transition cursor-pointer ${
              activeProgressTab === 'nilai'
                ? 'bg-blue-50/60 border-blue-300 ring-2 ring-blue-500/20'
                : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                Nilai Guru Mapel
              </span>
              <span className="text-xs font-extrabold text-blue-700">{overallNilaiPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${overallNilaiPercent}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500 font-medium">
              <span>{selesaiPembelajaran} dari {totalPembelajaran} Pembelajaran Tuntas</span>
              <span className="font-bold text-blue-600">{totalPembelajaran - selesaiPembelajaran} Belum</span>
            </div>
          </div>

          {/* Card 2: Nilai Ekskul */}
          <div
            onClick={() => setActiveProgressTab('ekskul')}
            className={`p-4 rounded-2xl border transition cursor-pointer ${
              activeProgressTab === 'ekskul'
                ? 'bg-amber-50/60 border-amber-300 ring-2 ring-amber-500/20'
                : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                Penilaian Ekstrakurikuler
              </span>
              <span className="text-xs font-extrabold text-amber-700">{overallEkskulPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-amber-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${overallEkskulPercent}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500 font-medium">
              <span>{ratedAnggotaEks} dari {totalAnggotaEks} Anggota Dinilai</span>
              <span className="font-bold text-amber-600">{totalAnggotaEks - ratedAnggotaEks} Belum</span>
            </div>
          </div>

          {/* Card 3: Absensi Wali Kelas */}
          <div
            onClick={() => setActiveProgressTab('absensi')}
            className={`p-4 rounded-2xl border transition cursor-pointer ${
              activeProgressTab === 'absensi'
                ? 'bg-emerald-50/60 border-emerald-300 ring-2 ring-emerald-500/20'
                : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <CalendarCheck className="w-3.5 h-3.5 text-emerald-600" />
                Absensi & Catatan Rombel
              </span>
              <span className="text-xs font-extrabold text-emerald-700">{overallAbsensiPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${overallAbsensiPercent}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500 font-medium">
              <span>{selesaiAbsensi} dari {totalRombel} Rombel Terisi</span>
              <span className="font-bold text-emerald-600">{totalRombel - selesaiAbsensi} Belum</span>
            </div>
          </div>
        </div>

        {/* DETAIL TAB 1: TABEL PROGRES NILAI GURU MAPEL */}
        {activeProgressTab === 'nilai' && (
          <div className="space-y-3">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-slate-600 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  Filter Kelas:
                </span>
                <select
                  value={filterRombel}
                  onChange={(e) => setFilterRombel(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold"
                >
                  <option value="all">Semua Rombel ({rombel.length})</option>
                  {rombel.map(r => (
                    <option key={r.id} value={r.id}>{r.nama}</option>
                  ))}
                </select>

                <span className="font-bold text-slate-600 ml-2">Status:</span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold"
                >
                  <option value="all">Semua Status</option>
                  <option value="selesai">Selesai (100%)</option>
                  <option value="sebagian">Sedang Mengisi</option>
                  <option value="belum">Belum Diisi</option>
                </select>
              </div>

              <span className="text-[11px] text-slate-400 font-medium">
                Menampilkan {filteredLearningProgress.length} tugas mengajar
              </span>
            </div>

            {/* Table Detail */}
            <div className="overflow-x-auto border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3 w-10 text-center">No</th>
                    <th className="p-3">Guru Pengampu</th>
                    <th className="p-3">Mata Pelajaran</th>
                    <th className="p-3">Kelas / Rombel</th>
                    <th className="p-3 text-center">Murid Dinilai</th>
                    <th className="p-3 w-36">Progres Nilai</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 w-28 text-center">Aksi Cepat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLearningProgress.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-6 text-center text-slate-400 italic">
                        Tidak ada data pembelajaran yang cocok dengan filter.
                      </td>
                    </tr>
                  ) : (
                    filteredLearningProgress.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="p-3 text-center text-slate-400">{idx + 1}</td>
                        <td className="p-3 font-bold text-slate-800">{item.guruNama}</td>
                        <td className="p-3 font-semibold text-slate-700">{item.mapelNama}</td>
                        <td className="p-3 font-medium text-blue-700">{item.rombelNama}</td>
                        <td className="p-3 text-center font-bold">
                          {item.ratedCount} / {item.totalStudents}
                        </td>
                        <td className="p-3">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-bold">
                              <span>{item.percent}%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-2 rounded-full ${
                                  item.percent === 100
                                    ? 'bg-emerald-500'
                                    : item.percent > 0
                                    ? 'bg-amber-500'
                                    : 'bg-rose-500'
                                }`}
                                style={{ width: `${item.percent}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          {item.status === 'selesai' ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              ✓ Tuntas
                            </span>
                          ) : item.status === 'sebagian' ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                              ⏳ Sebagian
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                              ✕ Belum
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => {
                              setSelectedRombelId(item.rombelId);
                              setSelectedMapelId(item.mapelId);
                              setActiveTab('nilai');
                            }}
                            className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg text-[11px] transition"
                          >
                            Input Nilai
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DETAIL TAB 2: GRID PROGRES EKSTRAKURIKULER */}
        {activeProgressTab === 'ekskul' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {ekskulProgressList.map(item => (
                <div key={item.id} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                        {item.kategori}
                      </span>
                      <h4 className="font-extrabold text-slate-800 text-sm mt-1">{item.nama}</h4>
                      <p className="text-xs text-slate-500">Pembina: <strong>{item.pembinaNama}</strong></p>
                    </div>
                    {item.status === 'selesai' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                        ✓ Tuntas
                      </span>
                    ) : item.status === 'sebagian' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 shrink-0">
                        ⏳ Sebagian
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200 shrink-0">
                        ✕ Belum
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>{item.ratedAnggota} / {item.totalAnggota} Anggota Dinilai</span>
                      <span>{item.percent}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-amber-500 h-2 rounded-full"
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('ekskul')}
                    className="w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <span>Buka Penilaian Ekskul</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DETAIL TAB 3: TABEL PROGRES ABSENSI ROMBEL */}
        {activeProgressTab === 'absensi' && (
          <div className="overflow-x-auto border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3 w-10 text-center">No</th>
                  <th className="p-3">Rombel / Kelas</th>
                  <th className="p-3">Wali Kelas</th>
                  <th className="p-3 text-center">Siswa Tercatat</th>
                  <th className="p-3 w-36">Kelengkapan</th>
                  <th className="p-3 text-center">Status Absensi</th>
                  <th className="p-3 w-28 text-center">Aksi Cepat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {absensiProgressList.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="p-3 text-center text-slate-400">{idx + 1}</td>
                    <td className="p-3 font-bold text-blue-700">{item.nama}</td>
                    <td className="p-3 font-semibold text-slate-800">{item.waliNama}</td>
                    <td className="p-3 text-center font-bold">
                      {item.filledCount} / {item.totalSiswa} Siswa
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span>{item.percent}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full ${item.isCompleted ? 'bg-emerald-500' : 'bg-amber-500'}`}
                            style={{ width: `${item.percent}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      {item.isCompleted ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          ✓ Lengkap
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          ⏳ Belum Lengkap
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => {
                          setSelectedRombelId(item.id);
                          setActiveTab('kehadiran');
                        }}
                        className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg text-[11px] transition"
                      >
                        Input Absensi
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
              Otomatis merangkai narasi capaian kompetensi tertinggi dan terendah dengan menyertakan nama murid, rombel, jurusan, dan mapel. Tetap bisa diedit bebas oleh guru.
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
              Input Sakit, Izin, dan Alfa seluruh murid dalam 1 layar tabel mirip spreadsheet, lengkap dengan pencegahan typo dan validasi batas hari efektif.
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
