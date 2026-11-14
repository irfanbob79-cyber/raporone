import React from 'react';
import { useApp } from '../context/AppContext';
import { exportLeggerExcel } from '../utils/excel';
import { Table, Download, Printer } from 'lucide-react';

export const LeggerView: React.FC = () => {
  const {
    rombel,
    siswa,
    mapel,
    nilaiSiswa,
    kehadiran,
    selectedRombelId,
    setSelectedRombelId
  } = useApp();

  const currentRombel = rombel.find(r => r.id === selectedRombelId) || rombel[0];
  const currentSiswa = siswa.filter(s => s.rombelId === currentRombel?.id);

  // Prepare map for excel export
  const nilaiMap: { [siswaId: string]: { [mapelId: string]: number } } = {};
  nilaiSiswa.forEach(n => {
    if (!nilaiMap[n.siswaId]) nilaiMap[n.siswaId] = {};
    nilaiMap[n.siswaId][n.mapelId] = n.nilaiAkhir;
  });

  const kehadiranMap: { [siswaId: string]: { sakit: number; izin: number; alfa: number } } = {};
  kehadiran.forEach(k => {
    kehadiranMap[k.siswaId] = { sakit: k.sakit, izin: k.izin, alfa: k.alfa };
  });

  const handleExportExcel = () => {
    if (!currentRombel) return;
    exportLeggerExcel(currentRombel, currentSiswa, mapel, nilaiMap, kehadiranMap);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Action Header */}
      <div className="no-print bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Table className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              Leger Nilai & Rekapitulasi Hasil Belajar
            </h3>
            <p className="text-xs text-slate-500">
              Rekap seluruh nilai mapel dan ketidakhadiran per kelas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <select
            value={selectedRombelId}
            onChange={(e) => setSelectedRombelId(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {rombel.map(r => (
              <option key={r.id} value={r.id}>{r.nama}</option>
            ))}
          </select>

          <button
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/20 transition active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            Export Excel Leger
          </button>
        </div>
      </div>

      {/* Legger Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 text-center">
              <tr>
                <th className="p-3 w-10 border-r border-slate-200">No</th>
                <th className="p-3 w-20 border-r border-slate-200">NISN</th>
                <th className="p-3 min-w-[180px] text-left border-r border-slate-200">Nama Siswa</th>
                <th className="p-3 w-10 border-r border-slate-200">L/P</th>
                {mapel.map(m => (
                  <th key={m.id} className="p-2 w-16 border-r border-slate-200" title={m.nama}>
                    {m.kode}
                  </th>
                ))}
                <th className="p-2 w-16 bg-blue-50/70 text-blue-900 border-r border-slate-200 font-extrabold">
                  Rata-rata
                </th>
                <th className="p-2 w-10 border-r border-slate-200 text-amber-700 font-bold">S</th>
                <th className="p-2 w-10 border-r border-slate-200 text-blue-700 font-bold">I</th>
                <th className="p-2 w-10 border-r border-slate-200 text-rose-700 font-bold">A</th>
                <th className="p-2 w-14 bg-slate-100 font-bold">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentSiswa.map((s, idx) => {
                let sum = 0;
                let count = 0;
                mapel.forEach(m => {
                  const val = nilaiMap[s.id]?.[m.id];
                  if (val && val > 0) {
                    sum += val;
                    count++;
                  }
                });

                const avg = count > 0 ? Math.round(sum / count) : 0;
                const keh = kehadiranMap[s.id] || { sakit: 0, izin: 0, alfa: 0 };
                const totalAbsen = keh.sakit + keh.izin + keh.alfa;

                return (
                  <tr key={s.id} className="hover:bg-slate-50/60 text-center">
                    <td className="p-2.5 text-slate-400 border-r border-slate-100">{idx + 1}</td>
                    <td className="p-2.5 font-mono text-slate-500 border-r border-slate-100">{s.nisn}</td>
                    <td className="p-2.5 text-left font-semibold text-slate-800 border-r border-slate-100">{s.nama}</td>
                    <td className="p-2.5 border-r border-slate-100">{s.jenisKelamin}</td>

                    {mapel.map(m => {
                      const val = nilaiMap[s.id]?.[m.id];
                      return (
                        <td key={m.id} className="p-2 font-medium border-r border-slate-100">
                          {val || '-'}
                        </td>
                      );
                    })}

                    <td className="p-2 bg-blue-50/40 font-bold text-blue-900 border-r border-slate-100">
                      {avg || '-'}
                    </td>
                    <td className="p-2 text-amber-700 border-r border-slate-100">{keh.sakit}</td>
                    <td className="p-2 text-blue-700 border-r border-slate-100">{keh.izin}</td>
                    <td className="p-2 text-rose-700 border-r border-slate-100">{keh.alfa}</td>
                    <td className="p-2 font-bold bg-slate-50">{totalAbsen}</td>
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
