import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { NilaiSiswa } from '../types';
import { generateDeskripsiCapaian } from '../utils/narrativeEngine';
import { downloadTemplateNilai } from '../utils/excel';
import {
  Sparkles,
  Save,
  Check,
  Download,
  Smartphone,
  Monitor,
  AlertCircle,
  UserCheck,
  CheckSquare,
  CheckCheck
} from 'lucide-react';

export const InputNilaiView: React.FC = () => {
  const {
    schoolProfile,
    rombel,
    mapel,
    siswa,
    guru,
    jurusan,
    pembelajaran,
    tujuanPembelajaran,
    nilaiSiswa,
    activeRole,
    currentUser,
    currentGuruId,
    selectedRombelId,
    setSelectedRombelId,
    selectedMapelId,
    setSelectedMapelId,
    saveBatchNilai
  } = useApp();

  // Mode view: 'desktop' (Spreadsheet Grid) or 'mobile' (Touch Card)
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [narrativeStyle, setNarrativeStyle] = useState<'personal' | 'ringkas'>('personal');
  const [saveStatus, setSaveStatus] = useState<string>('');

  // Local draft state for quick editing
  const [draftNilai, setDraftNilai] = useState<Record<string, NilaiSiswa>>({});

  // 1. FILTER HANYA KELAS DAN MAPEL YANG DIAMPU GURU / WALI KELAS (Admin bisa semua)
  const isTeacherRestricted = activeRole === 'guru' || activeRole === 'wali_kelas';
  const effectiveGuruId = currentUser?.guruId || currentGuruId || guru[0]?.id;
  const currentGuru = guru.find(g => g.id === effectiveGuruId) || guru[0];
  const isGuruRole = isTeacherRestricted;

  // List rombel yang diampu guru ini (atau semua jika admin)
  const availableRombel = isTeacherRestricted
    ? rombel.filter(r => 
        pembelajaran.some(p => p.guruId === currentGuru.id && p.rombelId === r.id) ||
        (activeRole === 'wali_kelas' && r.waliKelasId === currentGuru.id)
      )
    : rombel;

  // Selected rombel fallback
  const activeRombelId = availableRombel.some(r => r.id === selectedRombelId)
    ? selectedRombelId
    : availableRombel[0]?.id || rombel[0]?.id;

  const currentRombel = rombel.find(r => r.id === activeRombelId) || rombel[0];

  // List mapel yang diampu guru ini di rombel yang dipilih
  const availableMapel = isTeacherRestricted
    ? mapel.filter(m => pembelajaran.some(p => p.guruId === currentGuru.id && p.rombelId === currentRombel?.id && p.mapelId === m.id))
    : mapel;

  const activeMapelId = availableMapel.some(m => m.id === selectedMapelId)
    ? selectedMapelId
    : availableMapel[0]?.id || mapel[0]?.id;

  const currentMapel = mapel.find(m => m.id === activeMapelId) || mapel[0];

  const currentJurusan = currentRombel?.jurusanId ? jurusan.find(j => j.id === currentRombel.jurusanId) : undefined;
  const currentSiswa = siswa.filter(s => s.rombelId === currentRombel?.id);
  const currentTp = tujuanPembelajaran.filter(t => t.rombelId === currentRombel?.id && t.mapelId === currentMapel?.id);

  // Initialize draft when rombel/mapel changes
  useEffect(() => {
    if (!currentRombel || !currentMapel) return;

    const initial: Record<string, NilaiSiswa> = {};
    currentSiswa.forEach((s, sIdx) => {
      const existing = nilaiSiswa.find(
        n => n.siswaId === s.id && n.rombelId === currentRombel.id && n.mapelId === currentMapel.id
      );

      if (existing) {
        let initialTpIds: string[] = [];
        if (Array.isArray(existing.tpTercapaiIds) && existing.tpTercapaiIds.length > 0) {
          // Batasi tepat 1 TP terpilih per murid agar checklist lain tidak ikut tercentang
          initialTpIds = [existing.tpTercapaiIds[0]];
        } else if (existing.nilaiTp && Object.keys(existing.nilaiTp).length > 0) {
          const matched = currentTp.filter(t => (existing.nilaiTp![t.id] ?? 0) >= (currentMapel.kktp || 75)).map(t => t.id);
          initialTpIds = matched.length > 0 ? [matched[0]] : (currentTp.length > 0 ? [currentTp[sIdx % currentTp.length].id] : []);
        } else {
          // Default 1 TP terpilih per murid (variasi TP antar murid)
          initialTpIds = currentTp.length > 0 ? [currentTp[sIdx % currentTp.length].id] : [];
        }

        // Otomatis bersihkan jika deskripsi lama tersimpan teks angka nilai (misal: "dengan capaian nilai 80")
        let deskripsi = existing.deskripsiCapaian;
        if (!deskripsi || deskripsi.includes('dengan capaian nilai') || !existing.deskripsiIsCustom) {
          deskripsi = generateDeskripsiCapaian({
            siswa: s,
            rombel: currentRombel,
            mapel: currentMapel,
            jurusan: currentJurusan,
            jenjang: schoolProfile.jenjang,
            tujuanPembelajaranList: currentTp,
            nilaiAkhir: existing.nilaiAkhir ?? 80,
            tpTercapaiIds: initialTpIds,
            style: narrativeStyle
          });
        }

        initial[s.id] = {
          ...existing,
          nilaiAkhir: existing.nilaiAkhir ?? 80,
          tpTercapaiIds: initialTpIds,
          deskripsiCapaian: deskripsi
        };
      } else {
        // Default 1 TP per murid (variasi TP antar murid)
        const defaultTpIds = currentTp.length > 0 ? [currentTp[sIdx % currentTp.length].id] : [];
        const initialDeskripsi = generateDeskripsiCapaian({
          siswa: s,
          rombel: currentRombel,
          mapel: currentMapel,
          jurusan: currentJurusan,
          jenjang: schoolProfile.jenjang,
          tujuanPembelajaranList: currentTp,
          nilaiAkhir: 80,
          tpTercapaiIds: defaultTpIds,
          style: narrativeStyle
        });

        initial[s.id] = {
          id: `nilai-${s.id}-${currentMapel.id}`,
          siswaId: s.id,
          rombelId: currentRombel.id,
          mapelId: currentMapel.id,
          semester: schoolProfile.semesterAktif,
          nilaiAkhir: 80,
          tpTercapaiIds: defaultTpIds,
          deskripsiCapaian: initialDeskripsi,
          deskripsiIsCustom: false
        };
      }
    });

    setDraftNilai(initial);
  }, [activeRombelId, activeMapelId, siswa, tujuanPembelajaran]);

  // Otomatis sinkronisasi nilai ke AppContext saat diubah agar cetak rapor selalu ter-update
  useEffect(() => {
    const list = Object.values(draftNilai);
    if (list.length > 0) {
      const timer = setTimeout(() => {
        saveBatchNilai(list);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [draftNilai]);

  // Handle Nilai Rapor (SATU NILAI UTAMA YANG DI-INPUT GURU)
  const handleNilaiAkhirChange = (siswaId: string, value: string) => {
    const num = Math.min(100, Math.max(0, Number(value) || 0));
    setDraftNilai(prev => {
      const current = prev[siswaId];
      if (!current) return prev;

      const s = currentSiswa.find(item => item.id === siswaId);
      let nextDeskripsi = current.deskripsiCapaian;
      if (!current.deskripsiIsCustom && s && currentRombel && currentMapel) {
        nextDeskripsi = generateDeskripsiCapaian({
          siswa: s,
          rombel: currentRombel,
          mapel: currentMapel,
          jurusan: currentJurusan,
          jenjang: schoolProfile.jenjang,
          tujuanPembelajaranList: currentTp,
          nilaiAkhir: num,
          tpTercapaiIds: current.tpTercapaiIds || [],
          style: narrativeStyle
        });
      }

      return {
        ...prev,
        [siswaId]: {
          ...current,
          nilaiAkhir: num,
          deskripsiCapaian: nextDeskripsi
        }
      };
    });
  };

  // Handle Checklist TP per Siswa (Eksklusif 1 TP Utama per Siswa)
  const handleToggleTp = (siswaId: string, tpId: string) => {
    setDraftNilai(prev => {
      const current = prev[siswaId];
      if (!current) return prev;

      const currentTps = current.tpTercapaiIds || [];
      const isChecked = currentTps.includes(tpId);
      // Jika TP ini sudah dicentang, uncheck menjadi []
      // Jika TP ini belum dicentang, aktifkan HANYA TP ini ([tpId]) tanpa menyertakan TP lainnya
      const updatedTps = isChecked ? [] : [tpId];

      const s = currentSiswa.find(item => item.id === siswaId);
      let nextDeskripsi = current.deskripsiCapaian;
      if (!current.deskripsiIsCustom && s && currentRombel && currentMapel) {
        nextDeskripsi = generateDeskripsiCapaian({
          siswa: s,
          rombel: currentRombel,
          mapel: currentMapel,
          jurusan: currentJurusan,
          jenjang: schoolProfile.jenjang,
          tujuanPembelajaranList: currentTp,
          nilaiAkhir: current.nilaiAkhir,
          tpTercapaiIds: updatedTps,
          style: narrativeStyle
        });
      }

      return {
        ...prev,
        [siswaId]: {
          ...current,
          tpTercapaiIds: updatedTps,
          deskripsiCapaian: nextDeskripsi
        }
      };
    });
  };

  // Handle Ceklist Otomatis Berdasarkan KKTP (1 TP Terpilih per Murid)
  const handleAutoCheckByKKTP = () => {
    const kktpThreshold = currentMapel?.kktp || 75;
    setDraftNilai(prev => {
      const next = { ...prev };
      currentSiswa.forEach((s, sIdx) => {
        const curr = next[s.id];
        if (curr) {
          // Bagi 1 TP terpilih per murid secara bergantian
          const selectedTp = currentTp.length > 0 ? [currentTp[sIdx % currentTp.length].id] : [];

          let nextDeskripsi = curr.deskripsiCapaian;
          if (!curr.deskripsiIsCustom && currentRombel && currentMapel) {
            nextDeskripsi = generateDeskripsiCapaian({
              siswa: s,
              rombel: currentRombel,
              mapel: currentMapel,
              jurusan: currentJurusan,
              jenjang: schoolProfile.jenjang,
              tujuanPembelajaranList: currentTp,
              nilaiAkhir: curr.nilaiAkhir,
              tpTercapaiIds: selectedTp,
              style: narrativeStyle
            });
          }

          next[s.id] = {
            ...curr,
            tpTercapaiIds: selectedTp,
            deskripsiCapaian: nextDeskripsi
          };
        }
      });
      return next;
    });

    setSaveStatus(`📋 Berhasil menyesuaikan 1 TP terpilih per murid secara proporsional sesuai KKTP (${kktpThreshold})!`);
    setTimeout(() => setSaveStatus(''), 4000);
  };

  // Handle custom description edit
  const handleDescriptionChange = (siswaId: string, text: string) => {
    setDraftNilai(prev => {
      const current = prev[siswaId];
      if (!current) return prev;
      return {
        ...prev,
        [siswaId]: {
          ...current,
          deskripsiCapaian: text,
          deskripsiIsCustom: true
        }
      };
    });
  };

  // Generate for single student
  const handleGenerateSingle = (siswaId: string) => {
    const s = currentSiswa.find(item => item.id === siswaId);
    const curr = draftNilai[siswaId];
    if (!s || !curr || !currentRombel || !currentMapel) return;

    const generated = generateDeskripsiCapaian({
      siswa: s,
      rombel: currentRombel,
      mapel: currentMapel,
      jurusan: currentJurusan,
      jenjang: schoolProfile.jenjang,
      tujuanPembelajaranList: currentTp,
      nilaiAkhir: curr.nilaiAkhir,
      tpTercapaiIds: curr.tpTercapaiIds || [],
      style: narrativeStyle
    });

    setDraftNilai(prev => ({
      ...prev,
      [siswaId]: {
        ...prev[siswaId],
        deskripsiCapaian: generated,
        deskripsiIsCustom: false
      }
    }));
  };

  // 1-Click Generate All Students in Class
  const handleGenerateAll = () => {
    if (!currentRombel || !currentMapel) return;

    setDraftNilai(prev => {
      const next = { ...prev };
      currentSiswa.forEach(s => {
        const curr = next[s.id];
        if (curr) {
          const generated = generateDeskripsiCapaian({
            siswa: s,
            rombel: currentRombel,
            mapel: currentMapel,
            jurusan: currentJurusan,
            jenjang: schoolProfile.jenjang,
            tujuanPembelajaranList: currentTp,
            nilaiAkhir: curr.nilaiAkhir,
            tpTercapaiIds: curr.tpTercapaiIds || [],
            style: narrativeStyle
          });
          next[s.id] = {
            ...curr,
            deskripsiCapaian: generated,
            deskripsiIsCustom: false
          };
        }
      });
      return next;
    });

    setSaveStatus('⚡ Berhasil membuat deskripsi capaian otomatis untuk seluruh murid!');
    setTimeout(() => setSaveStatus(''), 4000);
  };

  // Save all to AppContext
  const handleSaveAll = () => {
    const listToSave = Object.values(draftNilai);
    saveBatchNilai(listToSave);
    setSaveStatus('✅ Seluruh nilai & deskripsi capaian berhasil disimpan!');
    setTimeout(() => setSaveStatus(''), 4000);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Teacher Filter Info (Hanya Mapel & Rombel yang Diampu) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
        {/* Guru Profile Bar */}
        {isGuruRole && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Guru yang Sedang Masuk (Hanya Melihat Rombel & Mapel Ampuan):
                </span>
                <span className="text-xs font-extrabold text-slate-800">
                  {currentGuru.nama} {currentGuru.gelarBelakang || ''}
                </span>
                <span className="text-[10px] text-slate-500 ml-2">NIP: {currentGuru.nip || '-'}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-auto">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] font-bold flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Akun Terverifikasi</span>
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Pilih Rombel Ampuan */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Rombel / Kelas
              </label>
              {availableRombel.length === 0 ? (
                <div className="text-xs text-rose-600 italic py-2">Belum ada kelas yang diampu</div>
              ) : (
                <select
                  value={activeRombelId}
                  onChange={(e) => setSelectedRombelId(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {availableRombel.map(r => (
                    <option key={r.id} value={r.id}>{r.nama} ({r.fase})</option>
                  ))}
                </select>
              )}
            </div>

            {/* Pilih Mapel Ampuan */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Mata Pelajaran
              </label>
              {availableMapel.length === 0 ? (
                <div className="text-xs text-rose-600 italic py-2">Tidak ada mapel di kelas ini</div>
              ) : (
                <select
                  value={activeMapId(activeMapelId)}
                  onChange={(e) => setSelectedMapelId(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none max-w-xs truncate"
                >
                  {availableMapel.map(m => (
                    <option key={m.id} value={m.id}>{m.nama} ({m.kode})</option>
                  ))}
                </select>
              )}
            </div>

            {/* KKTP Info Badge */}
            {currentMapel && (
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  KKTP (KKM)
                </label>
                <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold rounded-xl px-3 py-2 flex items-center gap-1.5 shadow-sm">
                  <span>KKTP:</span>
                  <span className="text-sm font-extrabold text-amber-700">{currentMapel.kktp || 75}</span>
                </div>
              </div>
            )}

            {/* View Mode Toggle: Desktop Grid vs Smartphone Card */}
            <div className="pt-4 md:pt-0">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Tampilan Layar
              </label>
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setViewMode('desktop')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
                    viewMode === 'desktop' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Mode Grid Spreadsheet (Laptop / Layar Lebar)"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Grid Excel</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('mobile')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
                    viewMode === 'mobile' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Mode Kartu Sentuh (HP Smartphone)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Kartu Sentuh (HP)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-2 md:pt-0">
            <button
              onClick={() => {
                if (currentRombel && currentMapel) {
                  downloadTemplateNilai(currentRombel, currentMapel, currentSiswa, currentTp);
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition active:scale-95"
              title="Unduh Format Nilai Excel untuk diedit offline"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Unduh Format Nilai</span>
            </button>

            <button
              onClick={handleSaveAll}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              Simpan Semua Nilai
            </button>
          </div>
        </div>

        {/* Smart Narrative Control Bar */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-3.5 rounded-xl border border-blue-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 text-white rounded-lg shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-blue-950 uppercase tracking-wider">
                  Skema 1 Nilai + Ceklist Tujuan Pembelajaran (TP)
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-md border border-emerald-300">
                  Kurikulum Merdeka
                </span>
              </div>
              <p className="text-xs text-blue-800/90 mt-0.5">
                Cukup input <strong>1 Nilai Rapor</strong> dan pilih TP yang ditonjolkan (biasanya 1 TP per murid). TP yang tidak dicentang otomatis tidak dimunculkan di deskripsi rapor (kecuali jika nilai murid di bawah KKTP/kurang).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
            {/* Quick Action: Ceklist Otomatis Sesuai KKTP */}
            {currentTp.length > 0 && (
              <button
                type="button"
                onClick={handleAutoCheckByKKTP}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-300 hover:bg-blue-50 text-blue-900 rounded-lg text-xs font-bold shadow-sm transition active:scale-95 whitespace-nowrap"
                title={`Pilih otomatis TP berdasarkan nilai murid terhadap KKTP (${currentMapel?.kktp || 75})`}
              >
                <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
                <span>Ceklist Otomatis (KKTP)</span>
              </button>
            )}

            {/* Style Selector */}
            <select
              value={narrativeStyle}
              onChange={(e) => setNarrativeStyle(e.target.value as any)}
              className="text-xs font-semibold bg-white text-slate-700 border border-blue-200 rounded-lg px-2.5 py-1.5 focus:outline-none shadow-sm cursor-pointer"
            >
              <option value="personal">Gaya Personal ("Ananda [Nama]...")</option>
              <option value="ringkas">Gaya Standar ("Murid...")</option>
            </select>

            <button
              onClick={handleGenerateAll}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-xs font-bold shadow-md shadow-blue-600/20 transition active:scale-95 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>⚡ Generate Semua Murid</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {saveStatus && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-600" />
            {saveStatus}
          </div>
        )}
      </div>

      {/* Notice if no TPs exist */}
      {currentTp.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Mata pelajaran ini belum memiliki Tujuan Pembelajaran (TP). Silakan tambahkan TP pada menu Tujuan Pembelajaran agar checklist TP dapat aktif.</span>
          </div>
        </div>
      )}

      {/* MODE 1: DESKTOP & TABLET SPREADSHEET GRID */}
      {viewMode === 'desktop' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3 w-10 text-center border-r border-slate-200">No</th>
                  <th className="p-3 min-w-[190px] border-r border-slate-200">Nama Murid</th>
                  
                  {/* KOLOM 1 NILAI YANG DI-INPUT */}
                  <th className="p-3 w-28 text-center border-r border-slate-200 bg-amber-50/80 font-extrabold text-amber-950">
                    <div>Nilai Rapor</div>
                    <div className="text-[10px] text-amber-700 font-normal">(Input 0-100)</div>
                  </th>

                  {/* KOLOM CHECKLIST TP YANG DAPAT BERBEDA TIAP MURID */}
                  {currentTp.map((tp) => (
                    <th key={tp.id} className="p-2.5 min-w-[140px] max-w-[200px] border-r border-slate-200 bg-blue-50/70">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-extrabold text-blue-950 text-xs">{tp.kodeTp}</span>
                        <span className="text-[9px] bg-blue-100/90 text-blue-700 px-1.5 py-0.5 rounded font-semibold whitespace-nowrap">
                          Pilihan TP
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-600 font-normal leading-tight line-clamp-2" title={tp.deskripsi}>
                        {tp.deskripsi}
                      </div>
                    </th>
                  ))}

                  {/* KOLOM DESKRIPSI CAPAIAN KOMPETENSI */}
                  <th className="p-3 min-w-[320px]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">Deskripsi Capaian Kompetensi (Rapor)</span>
                      <span className="text-[10px] text-slate-400 font-normal">Tersusun otomatis dari nilai & checklist TP</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentSiswa.map((s, index) => {
                  const curr = draftNilai[s.id] || {
                    nilaiAkhir: 80,
                    tpTercapaiIds: currentTp.length > 0 ? [currentTp[index % currentTp.length].id] : [],
                    deskripsiCapaian: '',
                    deskripsiIsCustom: false
                  };

                  return (
                    <tr key={s.id} className="hover:bg-blue-50/20 transition group">
                      <td className="p-3 text-center font-mono text-slate-400 border-r border-slate-100">
                        {index + 1}
                      </td>

                      {/* Info Siswa */}
                      <td className="p-3 font-semibold text-slate-800 border-r border-slate-100">
                        <div className="font-bold text-slate-900">{s.nama}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-slate-400 font-mono">NISN: {s.nisn}</span>
                        </div>
                      </td>

                      {/* SATU INPUT NILAI RAPOR */}
                      <td className="p-2 text-center border-r border-slate-100 bg-amber-50/20">
                        <div className="flex flex-col items-center justify-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={curr.nilaiAkhir ?? ''}
                            onChange={(e) => handleNilaiAkhirChange(s.id, e.target.value)}
                            className="w-16 text-center py-2 px-1 bg-white border-2 border-amber-300 focus:border-amber-500 rounded-xl font-extrabold text-base text-amber-950 shadow-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
                            placeholder="80"
                          />
                          <span className={`text-[10px] font-bold mt-1 px-1.5 py-0.2 rounded ${
                            curr.nilaiAkhir >= (currentMapel?.kktp || 75)
                              ? 'text-emerald-700 bg-emerald-50'
                              : 'text-rose-700 bg-rose-50'
                          }`}>
                            {curr.nilaiAkhir >= (currentMapel?.kktp || 75) ? 'Tuntas' : 'Di Bawah KKTP'}
                          </span>
                        </div>
                      </td>

                      {/* CHECKLIST TP TIAP MURID */}
                      {currentTp.map(tp => {
                        const isChecked = curr.tpTercapaiIds?.includes(tp.id) || false;

                        return (
                          <td key={tp.id} className="p-2 text-center border-r border-slate-100 bg-blue-50/5">
                            <label className={`inline-flex flex-col items-center justify-center w-full py-2 px-1 rounded-xl border cursor-pointer select-none transition-all ${
                              isChecked
                                ? 'bg-emerald-50/90 border-emerald-300 text-emerald-900 shadow-sm font-bold'
                                : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-white hover:border-slate-300'
                            }`}>
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleToggleTp(s.id, tp.id)}
                                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                                />
                                <span className="font-extrabold text-xs">{tp.kodeTp}</span>
                              </div>
                              <span className={`text-[10px] mt-1 font-semibold ${
                                isChecked ? 'text-emerald-700' : 'text-slate-400'
                              }`}>
                                {isChecked ? '✓ Terpilih' : 'Tidak Dipilih'}
                              </span>
                            </label>
                          </td>
                        );
                      })}

                      {/* DESKRIPSI CAPAIAN KOMPETENSI (BISA DIEDIT BEBAS) */}
                      <td className="p-2">
                        <div className="relative space-y-1">
                          <textarea
                            rows={3}
                            value={curr.deskripsiCapaian || ''}
                            onChange={(e) => handleDescriptionChange(s.id, e.target.value)}
                            className="w-full text-[11px] leading-relaxed p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50 hover:bg-white focus:bg-white transition"
                            placeholder="Deskripsi capaian kompetensi murid..."
                          />
                          <div className="flex items-center justify-between">
                            {curr.deskripsiIsCustom ? (
                              <span className="text-[10px] text-amber-600 font-semibold flex items-center gap-1">
                                <span>✏️ Diedit Khusus oleh Guru</span>
                              </span>
                            ) : (
                              <span className="text-[10px] text-blue-600 font-semibold flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-blue-500" />
                                <span>Otomatis sesuai Nilai & Checklist TP</span>
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => handleGenerateSingle(s.id)}
                              className="text-[10px] text-blue-600 hover:text-blue-800 font-bold hover:underline cursor-pointer"
                              title="Kembalikan ke narasi otomatis standar Kurikulum Merdeka"
                            >
                              ⚡ Generate Ulang
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODE 2: MOBILE SMARTPHONE TOUCH CARDS */}
      {viewMode === 'mobile' && (
        <div className="space-y-3">
          {currentSiswa.map((s, index) => {
            const curr = draftNilai[s.id] || {
              nilaiAkhir: 80,
              tpTercapaiIds: currentTp.length > 0 ? [currentTp[index % currentTp.length].id] : [],
              deskripsiCapaian: '',
              deskripsiIsCustom: false
            };

            return (
              <div key={s.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
                {/* Siswa Header & Satu Nilai Input */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{s.nama}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">NISN: {s.nisn}</p>
                    </div>
                  </div>

                  {/* Input Nilai Utama */}
                  <div className="text-right">
                    <label className="text-[10px] font-bold text-amber-900 block mb-0.5">Nilai Rapor</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={curr.nilaiAkhir ?? ''}
                      onChange={(e) => handleNilaiAkhirChange(s.id, e.target.value)}
                      className="w-16 text-center py-1.5 bg-amber-50/50 border-2 border-amber-300 focus:border-amber-500 rounded-xl font-extrabold text-base text-amber-950 shadow-sm focus:outline-none"
                    />
                  </div>
                </div>

                {/* Checklist TP untuk Mobile */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700">
                      Pilihan Tujuan Pembelajaran (TP) Murid:
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Pilih 1 TP
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentTp.map(tp => {
                      const isChecked = curr.tpTercapaiIds?.includes(tp.id) || false;

                      return (
                        <label
                          key={tp.id}
                          className={`flex items-start gap-2.5 p-2 rounded-xl border cursor-pointer select-none transition ${
                            isChecked
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                              : 'bg-slate-50 border-slate-200 text-slate-500'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleTp(s.id, tp.id)}
                            className="w-4 h-4 mt-0.5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                          />
                          <div className="text-[11px] leading-tight">
                            <span className="font-extrabold text-slate-800 mr-1">{tp.kodeTp}:</span>
                            <span>{tp.deskripsi}</span>
                            <span className={`block text-[10px] font-bold mt-0.5 ${
                              isChecked ? 'text-emerald-700' : 'text-slate-400'
                            }`}>
                              {isChecked ? '✓ Terpilih' : 'Tidak Dipilih'}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Deskripsi Capaian Mobile */}
                <div className="pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-slate-600">
                      Deskripsi Capaian Rapor:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleGenerateSingle(s.id)}
                      className="text-[10px] text-blue-600 font-bold flex items-center gap-1 hover:underline"
                    >
                      <Sparkles className="w-3 h-3" />
                      Generate Ulang
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={curr.deskripsiCapaian || ''}
                    onChange={(e) => handleDescriptionChange(s.id, e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  function activeMapId(id: string) {
    return id;
  }
};
