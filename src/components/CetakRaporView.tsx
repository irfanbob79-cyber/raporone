import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Printer, ChevronLeft, ChevronRight, ShieldAlert, CheckCircle2, UserCheck, Eye, EyeOff } from 'lucide-react';
import { getCurriculumGroupsForRombel, getPredikatPKL } from '../utils/curriculumStructure';

export const CetakRaporView: React.FC = () => {
  const {
    schoolProfile,
    rombel,
    siswa,
    mapel,
    nilaiSiswa,
    kehadiran,
    nilaiPKL,
    jurusan,
    guru,
    ekskul,
    anggotaEkskul,
    activeRole,
    setActiveRole,
    selectedRombelId,
    setSelectedRombelId
  } = useApp();

  const isWaliKelas = activeRole === 'wali_kelas';

  const currentRombel = rombel.find(r => r.id === selectedRombelId) || rombel[0];
  const currentSiswaList = siswa.filter(s => s.rombelId === currentRombel?.id);
  const waliKelas = guru.find(g => g.id === currentRombel?.waliKelasId);
  const currentJurusan = currentRombel?.jurusanId ? jurusan.find(j => j.id === currentRombel.jurusanId) : undefined;

  const [activeStudentIndex, setActiveStudentIndex] = useState(0);

  // Opsi cetak PKL (Bisa dinonaktifkan oleh pengguna)
  const [showPKLSection, setShowPKLSection] = useState(true);

  const activeSiswa = currentSiswaList[activeStudentIndex] || currentSiswaList[0];
  const activeKehadiran = kehadiran.find(k => k.siswaId === activeSiswa?.id && k.rombelId === currentRombel?.id);
  const activePKL = nilaiPKL.find(p => p.siswaId === activeSiswa?.id);

  // PKL HANYA UNTUK KELAS XII
  const isKelasXII = currentRombel?.tingkat === 12;
  const isPKLVisible = schoolProfile.jenjang === 'SMK' && isKelasXII && showPKLSection && activePKL;

  // Struktur Kurikulum & Urutan Mapel Berdasarkan Excel Rapor (Kelompok Umum, Kejuruan, Mulok)
  const curriculumGroups = activeSiswa && currentRombel 
    ? getCurriculumGroupsForRombel(currentRombel, activeSiswa, mapel) 
    : [];

  const handlePrint = () => {
    if (!isWaliKelas) return;
    window.print();
  };

  return (
    <div className="space-y-4 pb-20">
      {/* 1. HAK AKSES: HANYA WALI KELAS YANG BISA CETAK RAPOR */}
      {!isWaliKelas ? (
        <div className="no-print bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-sm animate-fadeIn">
          <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-lg font-extrabold text-amber-900">
              Akses Dibatasi: Khusus Wali Kelas
            </h3>
            <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
              Berdasarkan tata kelola Kurikulum Merdeka, <strong>hanya Wali Kelas</strong> yang memiliki wewenang untuk mencetak dokumen Rapor Resmi murid.
            </p>
            <p className="text-xs text-amber-700/90 font-medium">
              Saat ini Anda masuk dengan peran: <span className="font-bold underline uppercase">{activeRole}</span>
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setActiveRole('wali_kelas')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition active:scale-95"
            >
              <UserCheck className="w-4 h-4" />
              Beralih ke Peran Wali Kelas
            </button>
          </div>
        </div>
      ) : (
        /* Status Banner for Wali Kelas */
        <div className="no-print bg-blue-50 border border-blue-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs text-blue-900">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              Anda terverifikasi sebagai <strong>Wali Kelas ({waliKelas ? waliKelas.nama : 'Bambang Irawan'})</strong>. Hak cetak rapor aktif.
            </span>
          </div>
          <span className="hidden sm:inline text-[10px] font-bold bg-blue-200 text-blue-800 px-2 py-0.5 rounded">
            Hak Akses: Valid
          </span>
        </div>
      )}

      {/* Control Action Bar (Sembunyi saat Cetak) */}
      <div className="no-print bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Rombel Selector */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Rombel / Kelas
            </label>
            <select
              value={selectedRombelId}
              onChange={(e) => {
                setSelectedRombelId(e.target.value);
                setActiveStudentIndex(0);
              }}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {rombel.map(r => (
                <option key={r.id} value={r.id}>{r.nama}</option>
              ))}
            </select>
          </div>

          {/* Student Switcher */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Navigasi Siswa
            </label>
            <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 border border-slate-200">
              <button
                onClick={() => setActiveStudentIndex(prev => Math.max(0, prev - 1))}
                disabled={activeStudentIndex === 0}
                className="p-1.5 rounded-lg text-slate-600 hover:bg-white disabled:opacity-30 transition"
                title="Siswa Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-slate-700 px-2 whitespace-nowrap">
                {activeStudentIndex + 1} / {currentSiswaList.length} Siswa
              </span>
              <button
                onClick={() => setActiveStudentIndex(prev => Math.min(currentSiswaList.length - 1, prev + 1))}
                disabled={activeStudentIndex === currentSiswaList.length - 1}
                className="p-1.5 rounded-lg text-slate-600 hover:bg-white disabled:opacity-30 transition"
                title="Siswa Berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Opsi Nonaktifkan Cetak PKL (Khusus SMK Kelas XII) */}
          {schoolProfile.jenjang === 'SMK' && isKelasXII && (
            <div className="pt-2 sm:pt-0">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Tampilan Nilai PKL
              </label>
              <button
                type="button"
                onClick={() => setShowPKLSection(prev => !prev)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                  showPKLSection
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}
                title="Klik untuk aktifkan / nonaktifkan tabel PKL di cetak rapor"
              >
                {showPKLSection ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{showPKLSection ? 'Tabel PKL: Tampil' : 'Tabel PKL: Disembunyikan'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Print Button (Hanya Aktif untuk Wali Kelas) */}
        <div className="w-full lg:w-auto pt-2 lg:pt-0 flex items-center justify-end">
          <button
            onClick={handlePrint}
            disabled={!isWaliKelas}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition active:scale-95 w-full sm:w-auto ${
              isWaliKelas
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
            title={isWaliKelas ? 'Cetak Halaman Rapor Siswa Ini' : 'Hanya Wali Kelas yang dapat mencetak'}
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Rapor Ini (PDF / Print)</span>
          </button>
        </div>
      </div>

      {!activeSiswa ? (
        <div className="bg-white rounded-2xl p-8 text-center text-slate-500">
          Belum ada siswa pada rombel ini.
        </div>
      ) : (
        /* DOKUMEN RAPOR RESMI A4 (TANPA HEADER KOP & TANPA QR CODE) */
        <div className="w-full flex justify-center">
          <div
            id="printable-rapor"
            className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-lg max-w-4xl w-full mx-auto text-black leading-normal print:p-0 print:border-none print:shadow-none print:max-w-none print:w-full print:m-0"
          >
            {/* DATA IDENTITAS SISWA (LANGSUNG DIMULAI DARI SINI) */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs py-3 border-b-2 border-black">
              <div className="flex">
                <span className="w-36 font-semibold">Nama Murid</span>
                <span className="font-bold">: {activeSiswa.nama}</span>
              </div>
              <div className="flex">
                <span className="w-32 font-semibold">Kelas / Fase</span>
                <span>: {currentRombel.nama} ({currentRombel.fase})</span>
              </div>

              <div className="flex">
                <span className="w-36 font-semibold">NIS / NISN</span>
                <span className="font-mono">: {activeSiswa.nis} / {activeSiswa.nisn}</span>
              </div>
              <div className="flex">
                <span className="w-32 font-semibold">Semester / T.A.</span>
                <span>: {schoolProfile.semesterAktif} / {schoolProfile.tahunAjaranAktif}</span>
              </div>

              {currentJurusan && (
                <div className="flex col-span-2">
                  <span className="w-36 font-semibold">Program Keahlian</span>
                  <span>: {currentJurusan.nama} ({currentJurusan.bidangKeahlian})</span>
                </div>
              )}
            </div>

            {/* A. NILAI INTRAKURIKULER */}
            <div className="mt-4 space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider bg-slate-100 print:bg-slate-200 p-1.5 rounded text-black border border-slate-300 print:border-black">
                A. Capaian Kompetensi Intrakurikuler
              </h3>
              <table className="w-full text-left text-xs border border-black border-collapse">
                <thead>
                  <tr className="bg-slate-50 print:bg-slate-100 font-bold border-b border-black text-center">
                    <th className="p-2 w-10 border-r border-black">No</th>
                    <th className="p-2 min-w-[160px] text-left border-r border-black">Mata Pelajaran</th>
                    <th className="p-2 w-16 border-r border-black">Nilai Akhir</th>
                    <th className="p-2 text-left">Capaian Kompetensi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black">
                  {curriculumGroups.map((group) => (
                    <React.Fragment key={group.groupTitle}>
                      <tr className="bg-slate-100 print:bg-slate-200 font-bold border-y border-black">
                        <td colSpan={4} className="p-1.5 px-2 text-xs uppercase tracking-wide bg-slate-100 print:bg-slate-200">
                          {group.groupTitle}
                        </td>
                      </tr>
                      {group.items.map((item) => {
                        const matchedMapel = item.matchedMapelId
                          ? mapel.find(m => m.id === item.matchedMapelId)
                          : mapel.find(m => m.nama.toLowerCase() === item.nama.toLowerCase());

                        const nilai = nilaiSiswa.find(
                          n => n.siswaId === activeSiswa.id && (
                            (item.matchedMapelId && n.mapelId === item.matchedMapelId) ||
                            (matchedMapel && n.mapelId === matchedMapel.id)
                          )
                        );

                        return (
                          <tr key={group.groupTitle + item.nama + item.no} className="align-top border-b border-black">
                            <td className="p-2 text-center border-r border-black">{item.no}</td>
                            <td className="p-2 font-medium border-r border-black">
                              <div>{item.nama}</div>
                            </td>
                            <td className="p-2 text-center font-bold text-sm border-r border-black">
                              {nilai?.nilaiAkhir || '-'}
                            </td>
                            <td className="p-2 text-[11px] leading-relaxed">
                              {nilai?.deskripsiCapaian || `Murid telah menuntaskan capaian pembelajaran pada mata pelajaran ${item.nama}.`}
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* B. PRAKTIK KERJA LAPANGAN (HANYA KELAS XII & BISA DINONAKTIFKAN) */}
            {isPKLVisible && (
              <div className="mt-4 space-y-1.5">
                <h3 className="text-xs font-bold uppercase tracking-wider bg-slate-100 print:bg-slate-200 p-1.5 rounded text-black border border-slate-300 print:border-black">
                  B. Praktik Kerja Lapangan (PKL)
                </h3>
                <table className="w-full text-left text-xs border border-black border-collapse">
                  <thead>
                    <tr className="bg-slate-50 print:bg-slate-100 font-bold border-b border-black text-center">
                      <th className="p-2 border-r border-black text-left">Mitra DUDI / Industri</th>
                      <th className="p-2 border-r border-black">Lokasi</th>
                      <th className="p-2 border-r border-black">Lamanya</th>
                      <th className="p-2 border-r border-black">Predikat / Nilai</th>
                      <th className="p-2 text-left">Keterangan / Catatan DUDI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center align-top border-b border-black">
                      <td className="p-2 font-semibold border-r border-black text-left">{activePKL.mitraDudi}</td>
                      <td className="p-2 border-r border-black">{activePKL.lokasi}</td>
                      <td className="p-2 border-r border-black">{activePKL.durasiBulan} Bulan</td>
                      <td className="p-2 border-r border-black">
                        <div className="font-bold text-sm text-black">
                          {activePKL.predikat || getPredikatPKL(activePKL.nilaiAkhir)}
                        </div>
                        {activePKL.nilaiAkhir > 0 && (
                          <div className="text-[10px] text-slate-500 print:text-black">
                            ({activePKL.nilaiAkhir})
                          </div>
                        )}
                      </td>
                      <td className="p-2 text-left text-[11px]">{activePKL.catatanDudi}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* C. EKSTRAKURIKULER & D. KETIDAKHADIRAN */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 print:grid-cols-2">
              {/* Ekstrakurikuler */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold uppercase tracking-wider bg-slate-100 print:bg-slate-200 p-1.5 rounded text-black border border-slate-300 print:border-black">
                  {isPKLVisible ? 'C. Ekstrakurikuler' : 'B. Ekstrakurikuler'}
                </h3>
                <table className="w-full text-left text-xs border border-black border-collapse">
                  <thead>
                    <tr className="bg-slate-50 print:bg-slate-100 font-bold border-b border-black">
                      <th className="p-2 border-r border-black">Kegiatan Ekstrakurikuler</th>
                      <th className="p-2 border-r border-black text-center">Predikat</th>
                      <th className="p-2">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black">
                    {(() => {
                      const studentEkskul = anggotaEkskul.filter(a => a.siswaId === activeSiswa.id);
                      if (studentEkskul.length === 0) {
                        return (
                          <tr>
                            <td colSpan={3} className="p-2 text-center text-slate-500 italic">Belum ada kegiatan ekstrakurikuler.</td>
                          </tr>
                        );
                      }
                      return studentEkskul.map(ang => {
                        const itemEks = ekskul.find(e => e.id === ang.ekskulId);
                        return (
                          <tr key={ang.id} className="align-top border-b border-black">
                            <td className="p-2 font-medium border-r border-black">{itemEks?.nama || 'Ekstrakurikuler'}</td>
                            <td className="p-2 text-center font-bold border-r border-black">{ang.predikat}</td>
                            <td className="p-2 text-[11px]">{ang.keterangan}</td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>

              {/* Ketidakhadiran */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold uppercase tracking-wider bg-slate-100 print:bg-slate-200 p-1.5 rounded text-black border border-slate-300 print:border-black">
                  {isPKLVisible ? 'D. Ketidakhadiran' : 'C. Ketidakhadiran'}
                </h3>
                <table className="w-full text-left text-xs border border-black border-collapse">
                  <tbody className="divide-y divide-black">
                    <tr className="border-b border-black">
                      <td className="p-2 font-medium border-r border-black w-44">Sakit</td>
                      <td className="p-2 font-bold">{activeKehadiran?.sakit ?? 0} hari</td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-2 font-medium border-r border-black">Izin</td>
                      <td className="p-2 font-bold">{activeKehadiran?.izin ?? 0} hari</td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-2 font-medium border-r border-black">Tanpa Keterangan (Alfa)</td>
                      <td className="p-2 font-bold">{activeKehadiran?.alfa ?? 0} hari</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* CATATAN WALI KELAS */}
            <div className="mt-4 space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider bg-slate-100 print:bg-slate-200 p-1.5 rounded text-black border border-slate-300 print:border-black">
                {isPKLVisible ? 'E. Catatan Wali Kelas' : 'D. Catatan Wali Kelas'}
              </h3>
              <div className="p-3 border border-black rounded text-xs italic">
                "{activeKehadiran?.catatanWaliKelas || 'Tingkatkan terus motivasi belajar dan raih prestasi yang lebih gemilang.'}"
              </div>
            </div>

            {/* TANDA TANGAN (BERSIH TANPA QR CODE) */}
            <div className="rapor-signatures mt-8 pt-4 grid grid-cols-2 text-xs gap-8">
              {/* Orang Tua */}
              <div className="text-center">
                <p>Mengetahui,</p>
                <p className="font-medium mt-1">Orang Tua / Wali Siswa</p>
                <div className="h-16"></div>
                <p className="font-bold border-b border-black inline-block px-8">
                  (........................................)
                </p>
              </div>

              {/* Wali Kelas */}
              <div className="text-center">
                <p>{schoolProfile.kecamatan}, 20 Desember 2024</p>
                <p className="font-medium mt-1">Wali Kelas,</p>
                <div className="h-16 flex items-center justify-center">
                  <span className="text-[10px] text-slate-400 print:text-slate-600 italic">[Tanda Tangan Digital]</span>
                </div>
                <p className="font-bold underline">
                  {waliKelas ? `${waliKelas.gelarDepan || ''} ${waliKelas.nama}, ${waliKelas.gelarBelakang || ''}` : 'Wali Kelas'}
                </p>
                <p className="text-[10px]">NIP. {waliKelas?.nip || '-'}</p>
              </div>

              {/* Kepala Satuan Pendidikan (Tengah Bawah) */}
              <div className="col-span-2 text-center mt-4">
                <p>Mengetahui,</p>
                <p className="font-medium mt-0.5">Kepala Satuan Pendidikan</p>
                <div className="h-14 flex items-center justify-center">
                  <span className="text-[10px] text-slate-400 print:text-slate-600 italic">[Otorisasi e-Sign]</span>
                </div>
                <p className="font-bold underline text-sm">{schoolProfile.kepalaSekolah}</p>
                <p className="text-xs">NIP. {schoolProfile.nipKepalaSekolah}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
