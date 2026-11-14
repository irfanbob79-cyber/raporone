import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Kehadiran } from '../types';
import { generateCatatanWaliKelas } from '../utils/narrativeEngine';
import { CalendarCheck, Save, Check, Sparkles } from 'lucide-react';

export const KehadiranView: React.FC = () => {
  const {
    schoolProfile,
    rombel,
    siswa,
    kehadiran,
    nilaiSiswa,
    selectedRombelId,
    setSelectedRombelId,
    saveBatchKehadiran
  } = useApp();

  const [draftKehadiran, setDraftKehadiran] = useState<Record<string, Kehadiran>>({});
  const [saveStatus, setSaveStatus] = useState('');

  const currentRombel = rombel.find(r => r.id === selectedRombelId) || rombel[0];
  const currentSiswa = siswa.filter(s => s.rombelId === currentRombel?.id);

  useEffect(() => {
    if (!currentRombel) return;

    const initial: Record<string, Kehadiran> = {};
    currentSiswa.forEach(s => {
      const existing = kehadiran.find(k => k.siswaId === s.id && k.rombelId === currentRombel.id);
      if (existing) {
        initial[s.id] = { ...existing };
      } else {
        initial[s.id] = {
          id: `keh-${s.id}-${Date.now()}`,
          siswaId: s.id,
          rombelId: currentRombel.id,
          semester: schoolProfile.semesterAktif,
          sakit: 0,
          izin: 0,
          alfa: 0,
          catatanWaliKelas: 'Tingkatkan terus semangat belajar dan kedisiplinan.'
        };
      }
    });

    setDraftKehadiran(initial);
  }, [selectedRombelId, siswa, kehadiran]);

  const handleInputChange = (siswaId: string, field: 'sakit' | 'izin' | 'alfa', val: string) => {
    const num = Math.max(0, parseInt(val, 10) || 0);
    setDraftKehadiran(prev => {
      const curr = prev[siswaId];
      if (!curr) return prev;
      return {
        ...prev,
        [siswaId]: {
          ...curr,
          [field]: num
        }
      };
    });
  };

  const handleCatatanChange = (siswaId: string, text: string) => {
    setDraftKehadiran(prev => {
      const curr = prev[siswaId];
      if (!curr) return prev;
      return {
        ...prev,
        [siswaId]: {
          ...curr,
          catatanWaliKelas: text
        }
      };
    });
  };

  // Generate Catatan Otomatis untuk 1 Siswa
  const handleGenerateCatatanSingle = (siswaId: string) => {
    const s = currentSiswa.find(item => item.id === siswaId);
    const curr = draftKehadiran[siswaId];
    if (!s || !curr || !currentRombel) return;

    // Get average score
    const studentScores = nilaiSiswa.filter(n => n.siswaId === s.id && n.rombelId === currentRombel.id);
    const avgScore = studentScores.length > 0
      ? Math.round(studentScores.reduce((acc, curr) => acc + curr.nilaiAkhir, 0) / studentScores.length)
      : 82;

    const generated = generateCatatanWaliKelas({
      siswa: s,
      rombel: currentRombel,
      sakit: curr.sakit,
      izin: curr.izin,
      alfa: curr.alfa,
      avgNilai: avgScore
    });

    setDraftKehadiran(prev => ({
      ...prev,
      [siswaId]: {
        ...prev[siswaId],
        catatanWaliKelas: generated
      }
    }));
  };

  // Generate Catatan Otomatis untuk Seluruh Siswa di Kelas
  const handleGenerateCatatanAll = () => {
    if (!currentRombel) return;

    setDraftKehadiran(prev => {
      const next = { ...prev };
      currentSiswa.forEach(s => {
        const curr = next[s.id];
        if (curr) {
          const studentScores = nilaiSiswa.filter(n => n.siswaId === s.id && n.rombelId === currentRombel.id);
          const avgScore = studentScores.length > 0
            ? Math.round(studentScores.reduce((acc, curr) => acc + curr.nilaiAkhir, 0) / studentScores.length)
            : 82;

          const generated = generateCatatanWaliKelas({
            siswa: s,
            rombel: currentRombel,
            sakit: curr.sakit,
            izin: curr.izin,
            alfa: curr.alfa,
            avgNilai: avgScore
          });

          next[s.id] = {
            ...curr,
            catatanWaliKelas: generated
          };
        }
      });
      return next;
    });

    setSaveStatus('⚡ Berhasil membuat catatan perkembangan wali kelas otomatis untuk seluruh siswa!');
    setTimeout(() => setSaveStatus(''), 4000);
  };

  const handleSaveAll = () => {
    const listToSave = Object.values(draftKehadiran);
    saveBatchKehadiran(listToSave);
    setSaveStatus('✅ Seluruh data kehadiran & catatan wali kelas berhasil disimpan!');
    setTimeout(() => setSaveStatus(''), 4000);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Top Filter & Info Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              Pencatatan Kehadiran & Catatan Siswa (Wali Kelas)
            </h3>
            <p className="text-xs text-slate-500">
              Hari Efektif Semester: <strong>{schoolProfile.hariEfektifSemester} hari</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          <select
            value={selectedRombelId}
            onChange={(e) => setSelectedRombelId(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {rombel.map(r => (
              <option key={r.id} value={r.id}>{r.nama}</option>
            ))}
          </select>

          {/* Tombol Generate Otomatis Catatan */}
          <button
            onClick={handleGenerateCatatanAll}
            className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95"
            title="Generate otomatis catatan wali kelas berdasarkan presensi dan nilai rata-rata"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Semua Catatan</span>
          </button>

          <button
            onClick={handleSaveAll}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/20 transition active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Absensi & Catatan</span>
          </button>
        </div>
      </div>

      {saveStatus && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600" />
          {saveStatus}
        </div>
      )}

      {/* Grid Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3 w-10 text-center border-r border-slate-200">No</th>
                <th className="p-3 min-w-[170px] border-r border-slate-200">Nama Siswa</th>
                <th className="p-3 w-16 text-center border-r border-slate-200">NISN</th>
                <th className="p-3 w-16 text-center border-r border-slate-200 bg-amber-50/50 text-amber-900">
                  Sakit
                </th>
                <th className="p-3 w-16 text-center border-r border-slate-200 bg-blue-50/50 text-blue-900">
                  Izin
                </th>
                <th className="p-3 w-16 text-center border-r border-slate-200 bg-rose-50/50 text-rose-900">
                  Alfa
                </th>
                <th className="p-3 w-20 text-center border-r border-slate-200 bg-slate-100 font-bold">
                  Total
                </th>
                <th className="p-3 min-w-[320px]">
                  <div className="flex items-center justify-between">
                    <span>Catatan Perkembangan Siswa (Wali Kelas)</span>
                    <span className="text-[10px] text-slate-400 font-normal">Otomatis & Bisa Diedit Manual</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentSiswa.map((s, index) => {
                const curr = draftKehadiran[s.id] || { sakit: 0, izin: 0, alfa: 0, catatanWaliKelas: '' };
                const totalAbsen = curr.sakit + curr.izin + curr.alfa;
                const isOverLimit = totalAbsen > schoolProfile.hariEfektifSemester;

                return (
                  <tr key={s.id} className="hover:bg-slate-50/60 transition">
                    <td className="p-3 text-center font-mono text-slate-400 border-r border-slate-100">
                      {index + 1}
                    </td>
                    <td className="p-3 font-semibold text-slate-800 border-r border-slate-100">
                      <div>{s.nama}</div>
                      <div className="text-[10px] text-slate-400 font-mono">NIS: {s.nis}</div>
                    </td>
                    <td className="p-3 text-center font-mono text-slate-500 text-[11px] border-r border-slate-100">
                      {s.nisn}
                    </td>

                    {/* Sakit */}
                    <td className="p-2 text-center border-r border-slate-100 bg-amber-50/10">
                      <input
                        type="number"
                        min="0"
                        value={curr.sakit}
                        onChange={(e) => handleInputChange(s.id, 'sakit', e.target.value)}
                        className="w-12 text-center py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </td>

                    {/* Izin */}
                    <td className="p-2 text-center border-r border-slate-100 bg-blue-50/10">
                      <input
                        type="number"
                        min="0"
                        value={curr.izin}
                        onChange={(e) => handleInputChange(s.id, 'izin', e.target.value)}
                        className="w-12 text-center py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </td>

                    {/* Alfa */}
                    <td className="p-2 text-center border-r border-slate-100 bg-rose-50/10">
                      <input
                        type="number"
                        min="0"
                        value={curr.alfa}
                        onChange={(e) => handleInputChange(s.id, 'alfa', e.target.value)}
                        className="w-12 text-center py-1.5 bg-white border border-rose-200 rounded-lg font-bold text-rose-800 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                      />
                    </td>

                    {/* Total */}
                    <td className="p-2 text-center border-r border-slate-100 bg-slate-50">
                      <span className={`inline-block px-2 py-0.5 rounded-md font-bold text-xs ${
                        isOverLimit ? 'bg-rose-600 text-white animate-pulse' :
                        totalAbsen > 5 ? 'bg-amber-100 text-amber-800' : 'bg-slate-200/70 text-slate-700'
                      }`}>
                        {totalAbsen} hr
                      </span>
                    </td>

                    {/* Catatan Wali Kelas (Bisa Generate Otomatis & Bisa Edit Manual) */}
                    <td className="p-2">
                      <div className="space-y-1">
                        <textarea
                          rows={2}
                          value={curr.catatanWaliKelas || ''}
                          onChange={(e) => handleCatatanChange(s.id, e.target.value)}
                          className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50 hover:bg-white focus:bg-white transition"
                          placeholder="Ketik catatan manual atau klik tombol generate..."
                        />
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-slate-400">
                            💡 Bisa diedit bebas kapan saja
                          </span>
                          <button
                            type="button"
                            onClick={() => handleGenerateCatatanSingle(s.id)}
                            className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 hover:underline"
                          >
                            <Sparkles className="w-3 h-3" />
                            Generate Otomatis Siswa Ini
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
    </div>
  );
};
