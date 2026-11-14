import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NilaiPKL, NilaiUKK } from '../types';
import { Briefcase, Award, Check, AlertCircle } from 'lucide-react';
import { getPredikatPKL } from '../utils/curriculumStructure';

export const PKLUKKView: React.FC<{ defaultSubTab?: 'pkl' | 'ukk' }> = ({ defaultSubTab = 'pkl' }) => {
  const { rombel, siswa, nilaiPKL, nilaiUKK, selectedRombelId, setSelectedRombelId, saveNilaiPKL, saveNilaiUKK } = useApp();

  const [activeTab, setActiveTab] = useState<'pkl' | 'ukk'>(defaultSubTab);
  const [saveStatus, setSaveStatus] = useState('');

  // FILTER HANYA KELAS XII UNTUK PKL
  const rombelKelasXII = rombel.filter(r => r.tingkat === 12);
  const activeRombelId = activeTab === 'pkl'
    ? (rombelKelasXII.some(r => r.id === selectedRombelId) ? selectedRombelId : (rombelKelasXII[0]?.id || selectedRombelId))
    : selectedRombelId;

  const currentRombel = rombel.find(r => r.id === activeRombelId) || rombel[0];
  const isKelasXII = currentRombel?.tingkat === 12;
  const currentSiswa = siswa.filter(s => s.rombelId === currentRombel?.id);

  const handleSavePKLItem = (item: NilaiPKL) => {
    saveNilaiPKL(item);
    setSaveStatus('✅ Data penilaian PKL berhasil disimpan!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleSaveUKKItem = (item: NilaiUKK) => {
    saveNilaiUKK(item);
    setSaveStatus('✅ Data rekap UKK berhasil disimpan!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Switcher & Class Filter */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('pkl')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'pkl'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Praktik Kerja Lapangan (PKL - Khusus Kls XII)
          </button>
          <button
            onClick={() => setActiveTab('ukk')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'ukk'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            Uji Kompetensi Keahlian (UKK)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Pilih Kelas:</span>
          <select
            value={activeRombelId}
            onChange={(e) => setSelectedRombelId(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {activeTab === 'pkl'
              ? rombelKelasXII.map(r => (
                  <option key={r.id} value={r.id}>{r.nama}</option>
                ))
              : rombel.map(r => (
                  <option key={r.id} value={r.id}>{r.nama}</option>
                ))
            }
          </select>
        </div>
      </div>

      {saveStatus && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600" />
          {saveStatus}
        </div>
      )}

      {/* PKL SECTION */}
      {activeTab === 'pkl' && (
        <div className="space-y-3">
          {!isKelasXII ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center space-y-2">
              <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
              <h4 className="font-bold text-amber-900 text-sm">
                PKL Hanya Diperuntukkan bagi Siswa Kelas XII
              </h4>
              <p className="text-xs text-amber-800 max-w-md mx-auto">
                Berdasarkan struktur Kurikulum Merdeka SMK, mata pelajaran Praktik Kerja Lapangan (PKL) dilaksanakan pada tingkat Kelas XII (Fase F). Silakan pilih rombongan belajar Kelas XII pada dropdown di atas.
              </p>
            </div>
          ) : (
            currentSiswa.map((s, index) => {
              const pklItem = nilaiPKL.find(p => p.siswaId === s.id) || {
                id: `pkl-${s.id}`,
                siswaId: s.id,
                rombelId: currentRombel.id,
                mitraDudi: 'AHASS Daya Motor Labuhan Maringgai',
                lokasi: 'Jl. Lintas Timur, Labuhan Maringgai',
                durasiBulan: 6,
                nilaiSoftSkills: 85,
                nilaiHardSkills: 85,
                nilaiKemandirian: 85,
                nilaiAkhir: 85,
                catatanDudi: 'Menunjukkan kedisiplinan dan keterampilan kerja yang baik selama di industri.',
                kehadiranSakit: 0,
                kehadiranIzin: 0,
                kehadiranAlfa: 0,
              };

              return (
                <div key={s.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 border-b border-slate-100 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{s.nama}</h4>
                        <p className="text-[10px] text-slate-400 font-mono">NISN: {s.nisn} • {currentRombel.nama}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">Predikat PKL:</span>
                      <select
                        value={pklItem.predikat || getPredikatPKL(pklItem.nilaiAkhir)}
                        onChange={(e) => {
                          const pred = e.target.value as 'Sangat Baik' | 'Baik' | 'Cukup' | 'Kurang';
                          handleSavePKLItem({ ...pklItem, predikat: pred });
                        }}
                        className="text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 rounded-lg px-2 py-1 focus:ring-1 focus:ring-amber-500"
                      >
                        <option value="Sangat Baik">Sangat Baik (Baik Sekali)</option>
                        <option value="Baik">Baik</option>
                        <option value="Cukup">Cukup</option>
                        <option value="Kurang">Kurang</option>
                      </select>
                      <span className="text-xs text-slate-500 font-medium ml-1">Nilai:</span>
                      <span className="text-sm font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                        {pklItem.nilaiAkhir}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">Mitra DUDI / Industri</label>
                      <input
                        type="text"
                        defaultValue={pklItem.mitraDudi}
                        onBlur={(e) => {
                          const updated = { ...pklItem, mitraDudi: e.target.value };
                          handleSavePKLItem(updated);
                        }}
                        className="w-full p-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-medium mb-1">Lokasi PKL</label>
                      <input
                        type="text"
                        defaultValue={pklItem.lokasi}
                        onBlur={(e) => {
                          const updated = { ...pklItem, lokasi: e.target.value };
                          handleSavePKLItem(updated);
                        }}
                        className="w-full p-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-medium mb-1">Durasi Pelaksanaan</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          defaultValue={pklItem.durasiBulan}
                          onBlur={(e) => {
                            const updated = { ...pklItem, durasiBulan: Number(e.target.value) };
                            handleSavePKLItem(updated);
                          }}
                          className="w-20 p-2 border border-slate-200 rounded-lg text-center"
                        />
                        <span className="text-slate-500">Bulan</span>
                      </div>
                    </div>
                  </div>

                  {/* Nilai Aspek */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs">
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 block">Soft Skills</span>
                      <input
                        type="number"
                        defaultValue={pklItem.nilaiSoftSkills}
                        onBlur={(e) => {
                          const val = Number(e.target.value);
                          const final = Math.round((val + pklItem.nilaiHardSkills + pklItem.nilaiKemandirian) / 3);
                          handleSavePKLItem({ ...pklItem, nilaiSoftSkills: val, nilaiAkhir: final, predikat: getPredikatPKL(final) });
                        }}
                        className="w-full text-center font-bold p-1 border rounded bg-white mt-1"
                      />
                    </div>

                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 block">Hard Skills</span>
                      <input
                        type="number"
                        defaultValue={pklItem.nilaiHardSkills}
                        onBlur={(e) => {
                          const val = Number(e.target.value);
                          const final = Math.round((pklItem.nilaiSoftSkills + val + pklItem.nilaiKemandirian) / 3);
                          handleSavePKLItem({ ...pklItem, nilaiHardSkills: val, nilaiAkhir: final, predikat: getPredikatPKL(final) });
                        }}
                        className="w-full text-center font-bold p-1 border rounded bg-white mt-1"
                      />
                    </div>

                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-500 block">Kemandirian</span>
                      <input
                        type="number"
                        defaultValue={pklItem.nilaiKemandirian}
                        onBlur={(e) => {
                          const val = Number(e.target.value);
                          const final = Math.round((pklItem.nilaiSoftSkills + pklItem.nilaiHardSkills + val) / 3);
                          handleSavePKLItem({ ...pklItem, nilaiKemandirian: val, nilaiAkhir: final, predikat: getPredikatPKL(final) });
                        }}
                        className="w-full text-center font-bold p-1 border rounded bg-white mt-1"
                      />
                    </div>

                    <div className="bg-amber-50/50 p-2 rounded-lg border border-amber-200">
                      <span className="text-[10px] text-amber-800 block">Sakit PKL</span>
                      <input
                        type="number"
                        defaultValue={pklItem.kehadiranSakit}
                        onBlur={(e) => handleSavePKLItem({ ...pklItem, kehadiranSakit: Number(e.target.value) })}
                        className="w-full text-center font-bold p-1 border rounded bg-white mt-1"
                      />
                    </div>

                    <div className="bg-blue-50/50 p-2 rounded-lg border border-blue-200">
                      <span className="text-[10px] text-blue-800 block">Izin PKL</span>
                      <input
                        type="number"
                        defaultValue={pklItem.kehadiranIzin}
                        onBlur={(e) => handleSavePKLItem({ ...pklItem, kehadiranIzin: Number(e.target.value) })}
                        className="w-full text-center font-bold p-1 border rounded bg-white mt-1"
                      />
                    </div>

                    <div className="bg-rose-50/50 p-2 rounded-lg border border-rose-200">
                      <span className="text-[10px] text-rose-800 block">Alfa PKL</span>
                      <input
                        type="number"
                        defaultValue={pklItem.kehadiranAlfa}
                        onBlur={(e) => handleSavePKLItem({ ...pklItem, kehadiranAlfa: Number(e.target.value) })}
                        className="w-full text-center font-bold p-1 border rounded bg-white mt-1"
                      />
                    </div>
                  </div>

                  {/* Catatan DUDI */}
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-1">
                      Catatan Pembimbing DUDI / Industri:
                    </label>
                    <input
                      type="text"
                      defaultValue={pklItem.catatanDudi}
                      onBlur={(e) => handleSavePKLItem({ ...pklItem, catatanDudi: e.target.value })}
                      className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-amber-500 bg-slate-50/50 hover:bg-white"
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* UKK SECTION */}
      {activeTab === 'ukk' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3 w-10 text-center">No</th>
                  <th className="p-3">Nama Siswa</th>
                  <th className="p-3 min-w-[200px]">Skema Uji Kompetensi</th>
                  <th className="p-3 w-20 text-center">Teori</th>
                  <th className="p-3 w-20 text-center">Praktik</th>
                  <th className="p-3 w-24 text-center">Nilai Akhir</th>
                  <th className="p-3 w-36">Status Predikat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentSiswa.map((s, index) => {
                  const ukkItem = nilaiUKK.find(u => u.siswaId === s.id) || {
                    id: `ukk-${s.id}`,
                    siswaId: s.id,
                    rombelId: currentRombel.id,
                    namaSkema: 'Skema KKNI Level II Kejuruan',
                    nilaiTeori: 80,
                    nilaiPraktik: 85,
                    nilaiAkhir: 84,
                    statusKompeten: 'Kompeten' as const,
                  };

                  return (
                    <tr key={s.id} className="hover:bg-slate-50/60">
                      <td className="p-3 text-center text-slate-400">{index + 1}</td>
                      <td className="p-3 font-semibold text-slate-800">{s.nama}</td>
                      <td className="p-2">
                        <input
                          type="text"
                          defaultValue={ukkItem.namaSkema}
                          onBlur={(e) => handleSaveUKKItem({ ...ukkItem, namaSkema: e.target.value })}
                          className="w-full p-1.5 border border-slate-200 rounded text-xs"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <input
                          type="number"
                          defaultValue={ukkItem.nilaiTeori}
                          onBlur={(e) => {
                            const teori = Number(e.target.value);
                            const final = Math.round((teori * 0.3) + (ukkItem.nilaiPraktik * 0.7));
                            handleSaveUKKItem({ ...ukkItem, nilaiTeori: teori, nilaiAkhir: final });
                          }}
                          className="w-14 text-center p-1.5 border border-slate-200 rounded font-bold"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <input
                          type="number"
                          defaultValue={ukkItem.nilaiPraktik}
                          onBlur={(e) => {
                            const praktik = Number(e.target.value);
                            const final = Math.round((ukkItem.nilaiTeori * 0.3) + (praktik * 0.7));
                            handleSaveUKKItem({ ...ukkItem, nilaiPraktik: praktik, nilaiAkhir: final });
                          }}
                          className="w-14 text-center p-1.5 border border-slate-200 rounded font-bold"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <span className="font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                          {ukkItem.nilaiAkhir}
                        </span>
                      </td>
                      <td className="p-2">
                        <select
                          defaultValue={ukkItem.statusKompeten}
                          onChange={(e) => handleSaveUKKItem({ ...ukkItem, statusKompeten: e.target.value as any })}
                          className="p-1.5 border border-slate-200 rounded font-bold text-xs bg-slate-50"
                        >
                          <option value="Sangat Kompeten">Sangat Kompeten</option>
                          <option value="Kompeten">Kompeten</option>
                          <option value="Cukup Kompeten">Cukup Kompeten</option>
                          <option value="Belum Kompeten">Belum Kompeten</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
