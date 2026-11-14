import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Siswa, Guru, Rombel, MataPelajaran, KelompokMapel, Jurusan } from '../types';
import {
  Users,
  GraduationCap,
  Briefcase,
  Layers,
  Search,
  Plus,
  FileSpreadsheet,
  Download,
  Edit2,
  Trash2,
  X,
  Check,
  Compass
} from 'lucide-react';
import { downloadTemplateSiswa, downloadTemplateGuru } from '../utils/excel';

export const MasterDataView: React.FC<{ onOpenImport: () => void }> = ({ onOpenImport }) => {
  const {
    siswa,
    guru,
    rombel,
    mapel,
    jurusan,
    schoolProfile,
    addJurusan,
    updateJurusan,
    deleteJurusan,
    addSiswa,
    updateSiswa,
    deleteSiswa,
    addGuru,
    updateGuru,
    deleteGuru,
    addRombel,
    updateRombel,
    deleteRombel,
    addMapel,
    updateMapel,
    deleteMapel
  } = useApp();

  const [activeTab, setActiveTab] = useState<'siswa' | 'guru' | 'rombel' | 'mapel' | 'jurusan'>('siswa');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states for CRUD
  const [modalType, setModalType] = useState<'siswa' | 'guru' | 'rombel' | 'mapel' | 'jurusan' | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form states
  const [jurusanForm, setJurusanForm] = useState<Partial<Jurusan>>({});
  const [siswaForm, setSiswaForm] = useState<Partial<Siswa>>({});
  const [guruForm, setGuruForm] = useState<Partial<Guru>>({});
  const [rombelForm, setRombelForm] = useState<Partial<Rombel>>({});
  const [mapelForm, setMapelForm] = useState<Partial<MataPelajaran>>({});

  // Filter lists
  const filteredSiswa = siswa.filter(
    s => s.nama.toLowerCase().includes(searchQuery.toLowerCase()) || s.nisn.includes(searchQuery)
  );

  const filteredGuru = guru.filter(
    g => g.nama.toLowerCase().includes(searchQuery.toLowerCase()) || g.nip.includes(searchQuery)
  );

  // Handler Buka Form Siswa
  const handleOpenAddSiswa = () => {
    setIsEditing(false);
    setSiswaForm({
      nis: `24${Math.floor(1000 + Math.random() * 9000)}`,
      nisn: `00${Math.floor(10000000 + Math.random() * 90000000)}`,
      nama: '',
      jenisKelamin: 'L',
      tempatLahir: 'Labuhan Maringgai',
      tanggalLahir: '2007-01-01',
      agama: 'Islam',
      rombelId: rombel[0]?.id || '',
      namaAyah: '',
      namaIbu: '',
      alamat: 'Labuhan Maringgai',
      noHpOrtu: ''
    });
    setModalType('siswa');
  };

  const handleOpenEditSiswa = (item: Siswa) => {
    setIsEditing(true);
    setSiswaForm({ ...item });
    setModalType('siswa');
  };

  const handleSaveSiswa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!siswaForm.nama || !siswaForm.rombelId) return;

    if (isEditing && siswaForm.id) {
      updateSiswa(siswaForm as Siswa);
    } else {
      addSiswa(siswaForm as Omit<Siswa, 'id'>);
    }
    setModalType(null);
  };

  // Handler Buka Form Guru
  const handleOpenAddGuru = () => {
    setIsEditing(false);
    setGuruForm({
      nip: '',
      nuptk: '',
      nama: '',
      gelarDepan: '',
      gelarBelakang: 'S.Pd.',
      jenisKelamin: 'L',
      email: '',
      noHp: '0812'
    });
    setModalType('guru');
  };

  const handleOpenEditGuru = (item: Guru) => {
    setIsEditing(true);
    setGuruForm({ ...item });
    setModalType('guru');
  };

  const handleSaveGuru = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guruForm.nama) return;

    if (isEditing && guruForm.id) {
      updateGuru(guruForm as Guru);
    } else {
      addGuru(guruForm as Omit<Guru, 'id'>);
    }
    setModalType(null);
  };

  // Handler Buka Form Rombel
  const handleOpenAddRombel = () => {
    setIsEditing(false);
    setRombelForm({
      kode: 'X-1',
      nama: 'X Umum 1',
      tingkat: 10,
      fase: 'Fase E',
      jurusanId: jurusan[0]?.id || '',
      waliKelasId: guru[0]?.id || '',
      tahunAjaran: schoolProfile.tahunAjaranAktif
    });
    setModalType('rombel');
  };

  const handleOpenEditRombel = (item: Rombel) => {
    setIsEditing(true);
    setRombelForm({ ...item });
    setModalType('rombel');
  };

  const handleSaveRombel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rombelForm.nama || !rombelForm.kode) return;

    if (isEditing && rombelForm.id) {
      updateRombel(rombelForm as Rombel);
    } else {
      addRombel(rombelForm as Omit<Rombel, 'id'>);
    }
    setModalType(null);
  };

  // Handler Buka Form Mapel
  const handleOpenAddMapel = () => {
    setIsEditing(false);
    setMapelForm({
      kode: 'MP-01',
      nama: '',
      kelompok: 'Kelompok Umum',
      kktp: 75,
      jenjang: ['SMK', 'SMA', 'SMP', 'SD']
    });
    setModalType('mapel');
  };

  const handleOpenEditMapel = (item: MataPelajaran) => {
    setIsEditing(true);
    setMapelForm({ ...item });
    setModalType('mapel');
  };

  const handleSaveMapel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapelForm.nama || !mapelForm.kode) return;

    if (isEditing && mapelForm.id) {
      updateMapel(mapelForm as MataPelajaran);
    } else {
      addMapel(mapelForm as Omit<MataPelajaran, 'id'>);
    }
    setModalType(null);
  };

  // Handler Buka Form Jurusan
  const handleOpenAddJurusan = () => {
    setIsEditing(false);
    setJurusanForm({
      kode: '',
      nama: '',
      bidangKeahlian: 'Teknologi Manufaktur dan Rekayasa',
      programKeahlian: ''
    });
    setModalType('jurusan');
  };

  const handleOpenEditJurusan = (item: Jurusan) => {
    setIsEditing(true);
    setJurusanForm({ ...item });
    setModalType('jurusan');
  };

  const handleSaveJurusan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jurusanForm.nama || !jurusanForm.kode) return;

    if (isEditing && jurusanForm.id) {
      updateJurusan(jurusanForm as Jurusan);
    } else {
      addJurusan(jurusanForm as Omit<Jurusan, 'id'>);
    }
    setModalType(null);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Top Banner & Tabs */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-800 text-base">Manajemen Data Master (CRUD)</h3>
            <p className="text-xs text-slate-500">
              Tambah, lihat, edit, dan hapus data Jurusan, Siswa, Guru, Rombel, dan Mata Pelajaran
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            {activeTab === 'jurusan' && (
              <button
                onClick={handleOpenAddJurusan}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Tambah Jurusan</span>
              </button>
            )}

            {activeTab === 'siswa' && (
              <button
                onClick={handleOpenAddSiswa}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Tambah Siswa</span>
              </button>
            )}

            {activeTab === 'guru' && (
              <button
                onClick={handleOpenAddGuru}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Tambah Guru</span>
              </button>
            )}

            {activeTab === 'rombel' && (
              <button
                onClick={handleOpenAddRombel}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Tambah Rombel</span>
              </button>
            )}

            {activeTab === 'mapel' && (
              <button
                onClick={handleOpenAddMapel}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Tambah Mapel</span>
              </button>
            )}

            <button
              onClick={activeTab === 'siswa' ? downloadTemplateSiswa : downloadTemplateGuru}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Format Excel</span>
            </button>

            <button
              onClick={onOpenImport}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/20 transition active:scale-95"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Import Excel</span>
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-100 gap-4 pt-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('siswa')}
            className={`flex items-center gap-2 pb-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === 'siswa' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Data Siswa ({siswa.length})
          </button>
          <button
            onClick={() => setActiveTab('guru')}
            className={`flex items-center gap-2 pb-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === 'guru' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
            }`}
          >
            <Users className="w-4 h-4" />
            Data Guru & PTK ({guru.length})
          </button>
          <button
            onClick={() => setActiveTab('rombel')}
            className={`flex items-center gap-2 pb-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === 'rombel' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
            }`}
          >
            <Layers className="w-4 h-4" />
            Rombel & Kelas ({rombel.length})
          </button>
          <button
            onClick={() => setActiveTab('mapel')}
            className={`flex items-center gap-2 pb-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === 'mapel' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Mata Pelajaran ({mapel.length})
          </button>
          <button
            onClick={() => setActiveTab('jurusan')}
            className={`flex items-center gap-2 pb-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === 'jurusan' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
            }`}
          >
            <Compass className="w-4 h-4" />
            Jurusan & Konsentrasi ({jurusan.length})
          </button>
        </div>

        {/* Search input */}
        <div className="relative pt-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Cari data berdasarkan nama, NISN, atau NIP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* TAB 1: SISWA */}
      {activeTab === 'siswa' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3 w-10 text-center">No</th>
                  <th className="p-3">Nama Lengkap</th>
                  <th className="p-3">NISN / NIS</th>
                  <th className="p-3 text-center">L/P</th>
                  <th className="p-3">Rombel / Kelas</th>
                  <th className="p-3">Alamat</th>
                  <th className="p-3 w-20 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSiswa.map((s, idx) => {
                  const r = rombel.find(item => item.id === s.rombelId);
                  return (
                    <tr key={s.id} className="hover:bg-slate-50">
                      <td className="p-3 text-center text-slate-400">{idx + 1}</td>
                      <td className="p-3 font-semibold text-slate-800">{s.nama}</td>
                      <td className="p-3 font-mono text-slate-600">
                        <div>{s.nisn}</div>
                        <div className="text-[10px] text-slate-400">NIS: {s.nis}</div>
                      </td>
                      <td className="p-3 text-center">{s.jenisKelamin}</td>
                      <td className="p-3 font-medium text-blue-700">{r?.nama || '-'}</td>
                      <td className="p-3 text-slate-500 max-w-xs truncate">{s.alamat}</td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleOpenEditSiswa(s)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                            title="Edit Siswa"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Hapus data siswa ${s.nama}?`)) {
                                deleteSiswa(s.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                            title="Hapus Siswa"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
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

      {/* TAB 2: GURU */}
      {activeTab === 'guru' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3 w-10 text-center">No</th>
                  <th className="p-3">Nama & Gelar</th>
                  <th className="p-3">NIP / NUPTK</th>
                  <th className="p-3 text-center">L/P</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">No HP / WA</th>
                  <th className="p-3 w-20 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredGuru.map((g, idx) => (
                  <tr key={g.id} className="hover:bg-slate-50">
                    <td className="p-3 text-center text-slate-400">{idx + 1}</td>
                    <td className="p-3 font-bold text-slate-800">
                      {g.gelarDepan ? `${g.gelarDepan} ` : ''}{g.nama}{g.gelarBelakang ? `, ${g.gelarBelakang}` : ''}
                    </td>
                    <td className="p-3 font-mono text-slate-600">
                      <div>{g.nip || '-'}</div>
                      <div className="text-[10px] text-slate-400">NUPTK: {g.nuptk || '-'}</div>
                    </td>
                    <td className="p-3 text-center">{g.jenisKelamin}</td>
                    <td className="p-3 text-slate-600">{g.email}</td>
                    <td className="p-3 text-slate-600">{g.noHp}</td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleOpenEditGuru(g)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                          title="Edit Guru"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Hapus data guru ${g.nama}?`)) {
                              deleteGuru(g.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                          title="Hapus Guru"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ROMBEL */}
      {activeTab === 'rombel' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {rombel.map(r => {
            const countSiswa = siswa.filter(s => s.rombelId === r.id).length;
            const wali = guru.find(g => g.id === r.waliKelasId);
            const jur = jurusan.find(j => j.id === r.jurusanId);

            return (
              <div key={r.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-blue-700 text-sm">{r.kode}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                        {r.fase}
                      </span>
                      <button
                        onClick={() => handleOpenEditRombel(r)}
                        className="p-1 text-slate-400 hover:text-blue-600 rounded hover:bg-slate-100"
                        title="Edit Rombel"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus rombel ${r.nama}?`)) {
                            deleteRombel(r.id);
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50"
                        title="Hapus Rombel"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">{r.nama}</h4>
                  {jur && (
                    <p className="text-xs text-amber-700 font-semibold">{jur.nama}</p>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Wali: <strong>{wali ? wali.nama : '-'}</strong></span>
                  <span>{countSiswa} Siswa</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 4: MAPEL */}
      {activeTab === 'mapel' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3 w-10 text-center">No</th>
                  <th className="p-3">Kode</th>
                  <th className="p-3">Nama Mata Pelajaran</th>
                  <th className="p-3 w-16 text-center">KKTP</th>
                  <th className="p-3">Kelompok Kurikulum</th>
                  <th className="p-3 w-20 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mapel.map((m, idx) => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="p-3 text-center text-slate-400">{idx + 1}</td>
                    <td className="p-3 font-mono font-bold text-blue-700">{m.kode}</td>
                    <td className="p-3 font-semibold text-slate-800">{m.nama}</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {m.kktp || 75}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {m.kelompok}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleOpenEditMapel(m)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                          title="Edit Mapel"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Hapus mata pelajaran ${m.nama}?`)) {
                              deleteMapel(m.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                          title="Hapus Mapel"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: JURUSAN */}
      {activeTab === 'jurusan' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3 w-10 text-center">No</th>
                  <th className="p-3 w-28">Kode Jurusan</th>
                  <th className="p-3">Konsentrasi Keahlian (Jurusan)</th>
                  <th className="p-3">Program Keahlian</th>
                  <th className="p-3">Bidang Keahlian</th>
                  <th className="p-3 w-20 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jurusan
                  .filter(j =>
                    j.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    j.kode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (j.programKeahlian && j.programKeahlian.toLowerCase().includes(searchQuery.toLowerCase()))
                  )
                  .map((j, idx) => (
                    <tr key={j.id} className="hover:bg-slate-50">
                      <td className="p-3 text-center text-slate-400">{idx + 1}</td>
                      <td className="p-3 font-mono font-bold text-blue-700">{j.kode}</td>
                      <td className="p-3 font-bold text-slate-800">{j.nama}</td>
                      <td className="p-3 font-medium text-slate-600">{j.programKeahlian || '-'}</td>
                      <td className="p-3 text-slate-500">{j.bidangKeahlian || '-'}</td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleOpenEditJurusan(j)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100"
                            title="Edit Jurusan"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Hapus jurusan ${j.nama} (${j.kode})?`)) {
                                deleteJurusan(j.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                            title="Hapus Jurusan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL CRUD SISWA */}
      {modalType === 'siswa' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-slate-800 text-base">
              {isEditing ? 'Edit Data Siswa' : 'Tambah Siswa Baru'}
            </h3>
            <form onSubmit={handleSaveSiswa} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">NISN</label>
                  <input
                    type="text"
                    value={siswaForm.nisn || ''}
                    onChange={(e) => setSiswaForm({ ...siswaForm, nisn: e.target.value })}
                    className="w-full p-2 border rounded-lg font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">NIS</label>
                  <input
                    type="text"
                    value={siswaForm.nis || ''}
                    onChange={(e) => setSiswaForm({ ...siswaForm, nis: e.target.value })}
                    className="w-full p-2 border rounded-lg font-mono font-bold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={siswaForm.nama || ''}
                  onChange={(e) => setSiswaForm({ ...siswaForm, nama: e.target.value })}
                  className="w-full p-2.5 border rounded-lg font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Jenis Kelamin</label>
                  <select
                    value={siswaForm.jenisKelamin || 'L'}
                    onChange={(e) => setSiswaForm({ ...siswaForm, jenisKelamin: e.target.value as any })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="L">Laki-laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Rombel / Kelas</label>
                  <select
                    value={siswaForm.rombelId || ''}
                    onChange={(e) => setSiswaForm({ ...siswaForm, rombelId: e.target.value })}
                    className="w-full p-2 border rounded-lg font-semibold"
                    required
                  >
                    {rombel.map(r => (
                      <option key={r.id} value={r.id}>{r.nama}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Nama Ayah</label>
                  <input
                    type="text"
                    value={siswaForm.namaAyah || ''}
                    onChange={(e) => setSiswaForm({ ...siswaForm, namaAyah: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Nama Ibu</label>
                  <input
                    type="text"
                    value={siswaForm.namaIbu || ''}
                    onChange={(e) => setSiswaForm({ ...siswaForm, namaIbu: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Alamat Tempat Tinggal</label>
                <input
                  type="text"
                  value={siswaForm.alamat || ''}
                  onChange={(e) => setSiswaForm({ ...siswaForm, alamat: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-sm"
                >
                  Simpan Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CRUD GURU */}
      {modalType === 'guru' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-slate-800 text-base">
              {isEditing ? 'Edit Data Pendidik (Guru)' : 'Tambah Guru Baru'}
            </h3>
            <form onSubmit={handleSaveGuru} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Nama Lengkap (Tanpa Gelar)</label>
                <input
                  type="text"
                  value={guruForm.nama || ''}
                  onChange={(e) => setGuruForm({ ...guruForm, nama: e.target.value })}
                  className="w-full p-2.5 border rounded-lg font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Gelar Depan</label>
                  <input
                    type="text"
                    value={guruForm.gelarDepan || ''}
                    onChange={(e) => setGuruForm({ ...guruForm, gelarDepan: e.target.value })}
                    placeholder="Contoh: Drs."
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Gelar Belakang</label>
                  <input
                    type="text"
                    value={guruForm.gelarBelakang || ''}
                    onChange={(e) => setGuruForm({ ...guruForm, gelarBelakang: e.target.value })}
                    placeholder="Contoh: S.Pd., M.M."
                    className="w-full p-2 border rounded-lg font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">NIP (Kosongkan jika honorer)</label>
                  <input
                    type="text"
                    value={guruForm.nip || ''}
                    onChange={(e) => setGuruForm({ ...guruForm, nip: e.target.value })}
                    className="w-full p-2 border rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">NUPTK</label>
                  <input
                    type="text"
                    value={guruForm.nuptk || ''}
                    onChange={(e) => setGuruForm({ ...guruForm, nuptk: e.target.value })}
                    className="w-full p-2 border rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Jenis Kelamin</label>
                  <select
                    value={guruForm.jenisKelamin || 'L'}
                    onChange={(e) => setGuruForm({ ...guruForm, jenisKelamin: e.target.value as any })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="L">Laki-laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">No HP / WA</label>
                  <input
                    type="text"
                    value={guruForm.noHp || ''}
                    onChange={(e) => setGuruForm({ ...guruForm, noHp: e.target.value })}
                    className="w-full p-2 border rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-sm"
                >
                  Simpan Guru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CRUD ROMBEL */}
      {modalType === 'rombel' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="font-bold text-slate-800 text-base">
              {isEditing ? 'Edit Rombel' : 'Tambah Rombel Baru'}
            </h3>
            <form onSubmit={handleSaveRombel} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Kode Kelas</label>
                  <input
                    type="text"
                    value={rombelForm.kode || ''}
                    onChange={(e) => setRombelForm({ ...rombelForm, kode: e.target.value })}
                    className="w-full p-2 border rounded-lg font-mono font-bold"
                    placeholder="Contoh: XII-TSM-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Tingkat Kelas</label>
                  <input
                    type="number"
                    value={rombelForm.tingkat || 10}
                    onChange={(e) => setRombelForm({ ...rombelForm, tingkat: Number(e.target.value) })}
                    className="w-full p-2 border rounded-lg font-bold text-center"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Nama Rombongan Belajar</label>
                <input
                  type="text"
                  value={rombelForm.nama || ''}
                  onChange={(e) => setRombelForm({ ...rombelForm, nama: e.target.value })}
                  className="w-full p-2 border rounded-lg font-bold"
                  placeholder="Contoh: XII Teknik Sepeda Motor 2"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Fase Kurikulum</label>
                  <select
                    value={rombelForm.fase || 'Fase F'}
                    onChange={(e) => setRombelForm({ ...rombelForm, fase: e.target.value as any })}
                    className="w-full p-2 border rounded-lg font-bold"
                  >
                    <option value="Fase A">Fase A (Kls 1-2 SD)</option>
                    <option value="Fase B">Fase B (Kls 3-4 SD)</option>
                    <option value="Fase C">Fase C (Kls 5-6 SD)</option>
                    <option value="Fase D">Fase D (Kls 7-9 SMP)</option>
                    <option value="Fase E">Fase E (Kls 10 SMA/SMK)</option>
                    <option value="Fase F">Fase F (Kls 11-12 SMA/SMK)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Wali Kelas</label>
                  <select
                    value={rombelForm.waliKelasId || ''}
                    onChange={(e) => setRombelForm({ ...rombelForm, waliKelasId: e.target.value })}
                    className="w-full p-2 border rounded-lg font-semibold"
                    required
                  >
                    {guru.map(g => (
                      <option key={g.id} value={g.id}>{g.nama} {g.gelarBelakang || ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-sm"
                >
                  Simpan Rombel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CRUD MAPEL */}
      {modalType === 'mapel' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="font-bold text-slate-800 text-base">
              {isEditing ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran Baru'}
            </h3>
            <form onSubmit={handleSaveMapel} className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Kode Mapel</label>
                  <input
                    type="text"
                    value={mapelForm.kode || ''}
                    onChange={(e) => setMapelForm({ ...mapelForm, kode: e.target.value })}
                    placeholder="Contoh: KIMIA"
                    className="w-full p-2 border rounded-lg font-mono font-bold"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-semibold mb-1">Nama Mata Pelajaran</label>
                  <input
                    type="text"
                    value={mapelForm.nama || ''}
                    onChange={(e) => setMapelForm({ ...mapelForm, nama: e.target.value })}
                    placeholder="Contoh: Kimia Terapan"
                    className="w-full p-2 border rounded-lg font-bold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold mb-1">KKTP (KKM)</label>
                  <input
                    type="number"
                    value={mapelForm.kktp ?? 75}
                    onChange={(e) => setMapelForm({ ...mapelForm, kktp: Number(e.target.value) })}
                    className="w-full p-2 border rounded-lg font-bold text-center"
                    min={0}
                    max={100}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-semibold mb-1">Kelompok Kurikulum</label>
                  <select
                    value={mapelForm.kelompok || 'Kelompok Umum'}
                    onChange={(e) => setMapelForm({ ...mapelForm, kelompok: e.target.value as any })}
                    className="w-full p-2 border rounded-lg font-semibold"
                  >
                    <option value="Kelompok Umum">Kelompok Umum</option>
                    <option value="Kejuruan: Dasar Program Keahlian">Kejuruan: Dasar Program Keahlian</option>
                    <option value="Kejuruan: Konsentrasi Keahlian">Kejuruan: Konsentrasi Keahlian</option>
                    <option value="Projek Kreatif dan Kewirausahaan (PKK)">Projek Kreatif dan Kewirausahaan (PKK)</option>
                    <option value="Praktik Kerja Lapangan (PKL)">Praktik Kerja Lapangan (PKL)</option>
                    <option value="Mata Pelajaran Pilihan">Mata Pelajaran Pilihan</option>
                    <option value="Muatan Lokal">Muatan Lokal</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-sm"
                >
                  Simpan Mapel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CRUD JURUSAN */}
      {modalType === 'jurusan' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="font-bold text-slate-800 text-base">
              {isEditing ? 'Edit Jurusan / Konsentrasi' : 'Tambah Jurusan / Konsentrasi Baru'}
            </h3>
            <form onSubmit={handleSaveJurusan} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Kode Jurusan</label>
                <input
                  type="text"
                  value={jurusanForm.kode || ''}
                  onChange={(e) => setJurusanForm({ ...jurusanForm, kode: e.target.value.toUpperCase() })}
                  placeholder="Contoh: TSM, DKV, AKL, PBS"
                  className="w-full p-2 border rounded-lg font-mono font-bold uppercase"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Konsentrasi Keahlian (Nama Jurusan)</label>
                <input
                  type="text"
                  value={jurusanForm.nama || ''}
                  onChange={(e) => setJurusanForm({ ...jurusanForm, nama: e.target.value })}
                  placeholder="Contoh: Teknik Sepeda Motor"
                  className="w-full p-2 border rounded-lg font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Program Keahlian</label>
                <input
                  type="text"
                  value={jurusanForm.programKeahlian || ''}
                  onChange={(e) => setJurusanForm({ ...jurusanForm, programKeahlian: e.target.value })}
                  placeholder="Contoh: Teknik Otomotif"
                  className="w-full p-2 border rounded-lg font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Bidang Keahlian</label>
                <input
                  type="text"
                  value={jurusanForm.bidangKeahlian || ''}
                  onChange={(e) => setJurusanForm({ ...jurusanForm, bidangKeahlian: e.target.value })}
                  placeholder="Contoh: Teknologi Manufaktur dan Rekayasa"
                  className="w-full p-2 border rounded-lg font-semibold"
                  required
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-sm"
                >
                  Simpan Jurusan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
