import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Target, Plus, Trash2, CheckCircle2, UserCheck } from 'lucide-react';

export const TujuanPembelajaranView: React.FC = () => {
  const {
    rombel,
    mapel,
    guru,
    pembelajaran,
    tujuanPembelajaran,
    activeRole,
    currentGuruId,
    selectedRombelId,
    setSelectedRombelId,
    selectedMapelId,
    setSelectedMapelId,
    addTujuanPembelajaran,
    deleteTujuanPembelajaran,
    schoolProfile
  } = useApp();

  const isGuruRole = activeRole === 'guru';
  const currentGuru = guru.find(g => g.id === currentGuruId) || guru[0];

  // Filter rombel & mapel ampuan
  const availableRombel = isGuruRole
    ? rombel.filter(r => pembelajaran.some(p => p.guruId === currentGuru.id && p.rombelId === r.id))
    : rombel;

  const activeRombelId = availableRombel.some(r => r.id === selectedRombelId)
    ? selectedRombelId
    : availableRombel[0]?.id || rombel[0]?.id;

  const currentRombel = rombel.find(r => r.id === activeRombelId) || rombel[0];

  const availableMapel = isGuruRole
    ? mapel.filter(m => pembelajaran.some(p => p.guruId === currentGuru.id && p.rombelId === currentRombel?.id && p.mapelId === m.id))
    : mapel;

  const activeMapelId = availableMapel.some(m => m.id === selectedMapelId)
    ? selectedMapelId
    : availableMapel[0]?.id || mapel[0]?.id;

  const currentMapel = mapel.find(m => m.id === activeMapelId) || mapel[0];

  const currentTpList = tujuanPembelajaran.filter(
    t => t.rombelId === currentRombel?.id && t.mapelId === currentMapel?.id
  );

  const [kodeTp, setKodeTp] = useState(`TP ${currentTpList.length + 1}`);
  const [deskripsi, setDeskripsi] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deskripsi.trim() || !currentRombel || !currentMapel) return;

    addTujuanPembelajaran({
      rombelId: currentRombel.id,
      mapelId: currentMapel.id,
      semester: schoolProfile.semesterAktif,
      kodeTp: kodeTp.trim(),
      deskripsi: deskripsi.trim()
    });

    setDeskripsi('');
    setKodeTp(`TP ${currentTpList.length + 2}`);
    setSuccessMsg('Tujuan Pembelajaran berhasil ditambahkan!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Top Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              Bank Tujuan Pembelajaran (TP)
            </h3>
            <p className="text-xs text-slate-500">
              Kelola TP yang akan menjadi rujukan nilai dan deskripsi otomatis rapor
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={activeRombelId}
            onChange={(e) => setSelectedRombelId(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {availableRombel.map(r => (
              <option key={r.id} value={r.id}>{r.nama}</option>
            ))}
          </select>

          <select
            value={activeMapelId}
            onChange={(e) => setSelectedMapelId(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none max-w-xs truncate"
          >
            {availableMapel.map(m => (
              <option key={m.id} value={m.id}>{m.nama}</option>
            ))}
          </select>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {successMsg}
        </div>
      )}

      {/* Form Tambah TP */}
      <form onSubmit={handleAdd} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Tambah Tujuan Pembelajaran Baru
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Kode TP</label>
            <input
              type="text"
              value={kodeTp}
              onChange={(e) => setKodeTp(e.target.value)}
              placeholder="Contoh: TP 1"
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold"
              required
            />
          </div>
          <div className="sm:col-span-3">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Rumusan Deskripsi Kompetensi TP (Kata Kerja Operasional)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Contoh: mendiagnosis dan memperbaiki gangguan sistem bahan bakar EFI"
                className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Tambah TP
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* List TP */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Daftar TP Kelas {currentRombel?.nama} - {currentMapel?.nama} ({currentTpList.length} TP)
          </h4>
        </div>

        {currentTpList.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            Belum ada Tujuan Pembelajaran yang ditambahkan pada mapel ini.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {currentTpList.map((tp) => (
              <div key={tp.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-extrabold text-xs">
                    {tp.kodeTp}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{tp.deskripsi}</p>
                    <p className="text-[10px] text-slate-400">Semester: {tp.semester}</p>
                  </div>
                </div>

                <button
                  onClick={() => deleteTujuanPembelajaran(tp.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                  title="Hapus TP"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
