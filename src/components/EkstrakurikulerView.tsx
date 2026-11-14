import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Ekstrakurikuler, AnggotaEkskul } from '../types';
import {
  Compass,
  Plus,
  Users,
  Edit2,
  Trash2,
  Check,
  UserPlus,
  Sparkles,
  Search,
  BookOpen
} from 'lucide-react';

export const EkstrakurikulerView: React.FC = () => {
  const {
    ekskul,
    anggotaEkskul,
    siswa,
    guru,
    rombel,
    addEkstrakurikuler,
    updateEkstrakurikuler,
    deleteEkstrakurikuler,
    saveAnggotaEkskul,
    deleteAnggotaEkskul,
    schoolProfile
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'anggota' | 'master'>('anggota');
  const [selectedEkskulId, setSelectedEkskulId] = useState<string>(ekskul[0]?.id || '');
  const [saveStatus, setSaveStatus] = useState('');

  // Modal State for Master Ekskul
  const [isEkskulModalOpen, setIsEkskulModalOpen] = useState(false);
  const [editingEkskul, setEditingEkskul] = useState<Ekstrakurikuler | null>(null);
  const [ekskulForm, setEkskulForm] = useState({
    nama: '',
    kategori: 'Pilihan' as 'Wajib' | 'Pilihan',
    pembinaGuruId: '',
    deskripsi: ''
  });

  // Modal State for Enrolling Student
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedStudentToAdd, setSelectedStudentToAdd] = useState('');
  const [selectedPredikat, setSelectedPredikat] = useState<'Sangat Baik' | 'Baik' | 'Cukup' | 'Kurang'>('Sangat Baik');
  const [keteranganBaru, setKeteranganBaru] = useState('');
  const [searchEnroll, setSearchEnroll] = useState('');

  const currentEkskul = ekskul.find(e => e.id === selectedEkskulId) || ekskul[0];
  const currentAnggota = anggotaEkskul.filter(a => a.ekskulId === currentEkskul?.id);
  const pembina = guru.find(g => g.id === currentEkskul?.pembinaGuruId);

  // Siswa yang belum masuk ekskul ini
  const enrolledStudentIds = new Set(currentAnggota.map(a => a.siswaId));
  const availableStudentsToEnroll = siswa.filter(s => !enrolledStudentIds.has(s.id) && (
    s.nama.toLowerCase().includes(searchEnroll.toLowerCase()) || s.nisn.includes(searchEnroll)
  ));

  // Handler CRUD Ekskul
  const handleOpenAddEkskul = () => {
    setEditingEkskul(null);
    setEkskulForm({ nama: '', kategori: 'Pilihan', pembinaGuruId: guru[0]?.id || '', deskripsi: '' });
    setIsEkskulModalOpen(true);
  };

  const handleOpenEditEkskul = (item: Ekstrakurikuler) => {
    setEditingEkskul(item);
    setEkskulForm({
      nama: item.nama,
      kategori: item.kategori,
      pembinaGuruId: item.pembinaGuruId || guru[0]?.id || '',
      deskripsi: item.deskripsi || ''
    });
    setIsEkskulModalOpen(true);
  };

  const handleSaveEkskul = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ekskulForm.nama.trim()) return;

    if (editingEkskul) {
      updateEkstrakurikuler({
        ...editingEkskul,
        nama: ekskulForm.nama.trim(),
        kategori: ekskulForm.kategori,
        pembinaGuruId: ekskulForm.pembinaGuruId,
        deskripsi: ekskulForm.deskripsi.trim()
      });
      setSaveStatus('Data ekstrakurikuler berhasil diperbarui!');
    } else {
      addEkstrakurikuler({
        nama: ekskulForm.nama.trim(),
        kategori: ekskulForm.kategori,
        pembinaGuruId: ekskulForm.pembinaGuruId,
        deskripsi: ekskulForm.deskripsi.trim()
      });
      setSaveStatus('Ekstrakurikuler baru berhasil ditambahkan!');
    }

    setIsEkskulModalOpen(false);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  // Handler Enroll Siswa ke Ekskul
  const handleEnrollStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentToAdd || !currentEkskul) return;

    const defaultDesc = selectedPredikat === 'Sangat Baik'
      ? `Sangat aktif, terampil, dan berprestasi dalam kegiatan ${currentEkskul.nama}.`
      : selectedPredikat === 'Baik'
      ? `Aktif dan tertib mengikuti seluruh kegiatan latihan ${currentEkskul.nama}.`
      : `Cukup aktif dalam kegiatan ${currentEkskul.nama}.`;

    saveAnggotaEkskul({
      id: `ang-${Date.now()}`,
      ekskulId: currentEkskul.id,
      siswaId: selectedStudentToAdd,
      semester: schoolProfile.semesterAktif,
      predikat: selectedPredikat,
      keterangan: keteranganBaru.trim() || defaultDesc
    });

    setIsEnrollModalOpen(false);
    setSelectedStudentToAdd('');
    setKeteranganBaru('');
    setSaveStatus('Siswa berhasil didaftarkan ke ekstrakurikuler!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleUpdatePredikat = (item: AnggotaEkskul, predikat: any) => {
    saveAnggotaEkskul({ ...item, predikat });
  };

  const handleUpdateKeterangan = (item: AnggotaEkskul, keterangan: string) => {
    saveAnggotaEkskul({ ...item, keterangan });
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                Manajemen Ekstrakurikuler & Penilaian Anggota
              </h3>
              <p className="text-xs text-slate-500">
                Input data ekskul, pembina, pendaftaran siswa, dan penilaian predikat untuk Rapor
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('anggota')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                activeSubTab === 'anggota'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Input Nilai Anggota</span>
            </button>

            <button
              onClick={() => setActiveSubTab('master')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                activeSubTab === 'master'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Master Ekskul ({ekskul.length})</span>
            </button>
          </div>
        </div>

        {saveStatus && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-600" />
            {saveStatus}
          </div>
        )}
      </div>

      {/* SUBTAB 1: ANGGOTA & PENILAIAN EKSKUL */}
      {activeSubTab === 'anggota' && (
        <div className="space-y-4">
          {/* Ekskul Selector Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Pilih Ekstrakurikuler:
              </label>
              <select
                value={selectedEkskulId}
                onChange={(e) => setSelectedEkskulId(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {ekskul.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.nama} ({e.kategori})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-xs text-slate-500">
                Pembina: <strong>{pembina ? pembina.nama : '-'}</strong>
              </div>

              <button
                onClick={() => setIsEnrollModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ Daftarkan Siswa</span>
              </button>
            </div>
          </div>

          {/* Tabel Anggota & Nilai Ekskul */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">
                  Daftar Anggota & Predikat: {currentEkskul?.nama}
                </h4>
                <p className="text-[11px] text-slate-500">
                  Total {currentAnggota.length} Siswa Terdaftar • Nilai otomatis tercetak di Rapor Resmi
                </p>
              </div>
            </div>

            {currentAnggota.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs space-y-2">
                <p>Belum ada siswa yang didaftarkan pada ekstrakurikuler ini.</p>
                <button
                  onClick={() => setIsEnrollModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 text-blue-700 font-bold rounded-lg text-xs hover:bg-blue-100"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Daftarkan Siswa Sekarang
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3 w-10 text-center border-r border-slate-200">No</th>
                      <th className="p-3 min-w-[180px] border-r border-slate-200">Nama Siswa</th>
                      <th className="p-3 w-28 border-r border-slate-200">Kelas / Rombel</th>
                      <th className="p-3 w-36 border-r border-slate-200 text-center">Predikat Nilai</th>
                      <th className="p-3 min-w-[280px] border-r border-slate-200">Keterangan Capaian / Peran</th>
                      <th className="p-3 w-16 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentAnggota.map((ang, idx) => {
                      const s = siswa.find(item => item.id === ang.siswaId);
                      const r = rombel.find(item => item.id === s?.rombelId);

                      return (
                        <tr key={ang.id} className="hover:bg-slate-50/60">
                          <td className="p-3 text-center text-slate-400 border-r border-slate-100">{idx + 1}</td>
                          <td className="p-3 font-semibold text-slate-800 border-r border-slate-100">
                            <div>{s?.nama || 'Siswa tidak ditemukan'}</div>
                            <div className="text-[10px] text-slate-400 font-mono">NISN: {s?.nisn}</div>
                          </td>
                          <td className="p-3 font-medium text-slate-600 border-r border-slate-100">
                            {r?.nama || '-'}
                          </td>
                          <td className="p-2 text-center border-r border-slate-100">
                            <select
                              value={ang.predikat}
                              onChange={(e) => handleUpdatePredikat(ang, e.target.value)}
                              className={`text-xs font-bold px-2 py-1.5 rounded-lg border focus:outline-none ${
                                ang.predikat === 'Sangat Baik' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                                ang.predikat === 'Baik' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                                'bg-amber-50 text-amber-800 border-amber-300'
                              }`}
                            >
                              <option value="Sangat Baik">Sangat Baik</option>
                              <option value="Baik">Baik</option>
                              <option value="Cukup">Cukup</option>
                              <option value="Kurang">Kurang</option>
                            </select>
                          </td>
                          <td className="p-2 border-r border-slate-100">
                            <input
                              type="text"
                              defaultValue={ang.keterangan}
                              onBlur={(e) => handleUpdateKeterangan(ang, e.target.value)}
                              className="w-full text-xs p-1.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500 bg-slate-50/50 hover:bg-white"
                              placeholder="Tuliskan peran atau catatan capaian kegiatan..."
                            />
                          </td>
                          <td className="p-2 text-center">
                            <button
                              onClick={() => {
                                if (confirm(`Keluarkan ${s?.nama} dari ekskul ${currentEkskul?.nama}?`)) {
                                  deleteAnggotaEkskul(ang.id);
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                              title="Hapus dari ekskul"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 2: DATA MASTER EKSTRAKURIKULER */}
      {activeSubTab === 'master' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={handleOpenAddEkskul}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Ekstrakurikuler Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {ekskul.map(item => {
              const countAnggota = anggotaEkskul.filter(a => a.ekskulId === item.id).length;
              const pemb = guru.find(g => g.id === item.pembinaGuruId);

              return (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.kategori === 'Wajib' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}>
                        Ekskul {item.kategori}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditEkskul(item)}
                          className="p-1 text-slate-400 hover:text-blue-600 rounded hover:bg-slate-100"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Hapus ekstrakurikuler ${item.nama}? Data anggota juga akan terhapus.`)) {
                              deleteEkstrakurikuler(item.id);
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4 className="font-bold text-slate-800 text-sm">{item.nama}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{item.deskripsi || 'Tidak ada deskripsi.'}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <div>Pembina: <strong>{pemb ? pemb.nama : '-'}</strong></div>
                    <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-lg text-[11px]">
                      {countAnggota} Siswa
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL 1: TAMBAH / EDIT MASTER EKSKUL */}
      {isEkskulModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="font-bold text-slate-800 text-base">
              {editingEkskul ? 'Edit Ekstrakurikuler' : 'Tambah Ekstrakurikuler Baru'}
            </h3>

            <form onSubmit={handleSaveEkskul} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Ekstrakurikuler</label>
                <input
                  type="text"
                  value={ekskulForm.nama}
                  onChange={(e) => setEkskulForm({ ...ekskulForm, nama: e.target.value })}
                  placeholder="Contoh: Rohis / Pramuka / Futsal"
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Kategori Kegiatan</label>
                <select
                  value={ekskulForm.kategori}
                  onChange={(e) => setEkskulForm({ ...ekskulForm, kategori: e.target.value as any })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Pilihan">Pilihan (Peminatan Siswa)</option>
                  <option value="Wajib">Wajib (Contoh: Pramuka Wajib)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Guru Pembina</label>
                <select
                  value={ekskulForm.pembinaGuruId}
                  onChange={(e) => setEkskulForm({ ...ekskulForm, pembinaGuruId: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Pilih Pembina Ekskul...</option>
                  {guru.map(g => (
                    <option key={g.id} value={g.id}>{g.nama} {g.gelarBelakang || ''}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={ekskulForm.deskripsi}
                  onChange={(e) => setEkskulForm({ ...ekskulForm, deskripsi: e.target.value })}
                  placeholder="Deskripsi kegiatan..."
                  className="w-full p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEkskulModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-sm"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: DAFTARKAN SISWA KE EKSKUL */}
      {isEnrollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="font-bold text-slate-800 text-base">
              Daftarkan Siswa ke {currentEkskul?.nama}
            </h3>

            <form onSubmit={handleEnrollStudent} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Cari & Pilih Peserta Didik</label>
                <div className="relative mb-2">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                  <input
                    type="text"
                    placeholder="Ketik nama atau NISN..."
                    value={searchEnroll}
                    onChange={(e) => setSearchEnroll(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <select
                  value={selectedStudentToAdd}
                  onChange={(e) => setSelectedStudentToAdd(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold max-h-36"
                  required
                >
                  <option value="">Pilih Siswa ({availableStudentsToEnroll.length} Tersedia)...</option>
                  {availableStudentsToEnroll.map(s => {
                    const r = rombel.find(item => item.id === s.rombelId);
                    return (
                      <option key={s.id} value={s.id}>
                        {s.nama} ({r?.nama || '-'}) - NISN: {s.nisn}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Predikat Awal</label>
                <select
                  value={selectedPredikat}
                  onChange={(e) => setSelectedPredikat(e.target.value as any)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold"
                >
                  <option value="Sangat Baik">Sangat Baik</option>
                  <option value="Baik">Baik</option>
                  <option value="Cukup">Cukup</option>
                  <option value="Kurang">Kurang</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Keterangan Capaian (Opsional)</label>
                <input
                  type="text"
                  value={keteranganBaru}
                  onChange={(e) => setKeteranganBaru(e.target.value)}
                  placeholder="Kosongkan untuk memakai teks standar otomatis..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEnrollModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={!selectedStudentToAdd}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-sm disabled:opacity-50"
                >
                  Daftarkan Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
