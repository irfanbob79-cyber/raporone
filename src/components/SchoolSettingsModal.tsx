import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SchoolLevel } from '../types';
import { X, School, Check, RefreshCw } from 'lucide-react';

interface SchoolSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SchoolSettingsModal: React.FC<SchoolSettingsModalProps> = ({ isOpen, onClose }) => {
  const { schoolProfile, updateSchoolProfile, switchJenjang, resetToDefaultData } = useApp();

  const [formData, setFormData] = useState({ ...schoolProfile });

  if (!isOpen) return null;

  const handleJenjangChange = (level: SchoolLevel) => {
    switchJenjang(level);
    setFormData(prev => ({
      ...prev,
      jenjang: level,
      namaSekolah: level === 'SMK' 
        ? 'SMKN 1 LABUHAN MARINGGAI' 
        : level === 'SMA' 
        ? 'SMAN 1 LABUHAN MARINGGAI'
        : level === 'SMP'
        ? 'SMPN 1 LABUHAN MARINGGAI'
        : 'SDN 1 KARANG ANYAR'
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchoolProfile(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <School className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">Pengaturan Profil & Jenjang Sekolah</h3>
              <p className="text-xs text-slate-500">Universal Kurikulum Merdeka (SD / SMP / SMA / SMK)</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4 mt-4">
          {/* Pilihan Jenjang */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Pilih Jenjang Sekolah
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['SD', 'SMP', 'SMA', 'SMK'] as SchoolLevel[]).map((level) => {
                const isSelected = formData.jenjang === level;
                return (
                  <button
                    type="button"
                    key={level}
                    onClick={() => handleJenjangChange(level)}
                    className={`py-2.5 px-3 rounded-xl border text-center font-bold text-sm transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    }`}
                  >
                    {level}
                    {level === 'SMK' && (
                      <span className="block text-[10px] font-normal text-slate-500 mt-0.5">Ada PKL & UKK</span>
                    )}
                    {level === 'SMA' && (
                      <span className="block text-[10px] font-normal text-slate-500 mt-0.5">Fase E & F</span>
                    )}
                    {level === 'SMP' && (
                      <span className="block text-[10px] font-normal text-slate-500 mt-0.5">Fase D</span>
                    )}
                    {level === 'SD' && (
                      <span className="block text-[10px] font-normal text-slate-500 mt-0.5">Fase A, B, C</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nama Sekolah & NPSN */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Satuan Pendidikan</label>
              <input
                type="text"
                value={formData.namaSekolah}
                onChange={(e) => setFormData({ ...formData, namaSekolah: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">NPSN</label>
              <input
                type="text"
                value={formData.npsn}
                onChange={(e) => setFormData({ ...formData, npsn: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Kepala Sekolah & NIP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Kepala Sekolah</label>
              <input
                type="text"
                value={formData.kepalaSekolah}
                onChange={(e) => setFormData({ ...formData, kepalaSekolah: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">NIP Kepala Sekolah</label>
              <input
                type="text"
                value={formData.nipKepalaSekolah}
                onChange={(e) => setFormData({ ...formData, nipKepalaSekolah: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Alamat & Wilayah */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kecamatan</label>
              <input
                type="text"
                value={formData.kecamatan}
                onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kabupaten / Kota</label>
              <input
                type="text"
                value={formData.kabupaten}
                onChange={(e) => setFormData({ ...formData, kabupaten: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Tahun Ajaran & Hari Efektif */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tahun Ajaran</label>
              <input
                type="text"
                value={formData.tahunAjaranAktif}
                onChange={(e) => setFormData({ ...formData, tahunAjaranAktif: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Hari Efektif Semester (Batas Absen)</label>
              <input
                type="number"
                value={formData.hariEfektifSemester}
                onChange={(e) => setFormData({ ...formData, hariEfektifSemester: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Domain / Alamat Server Web */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Domain / Alamat Web Publik Server eRapor
            </label>
            <input
              type="text"
              value={formData.domainUrl || ''}
              onChange={(e) => setFormData({ ...formData, domainUrl: e.target.value })}
              placeholder="Contoh: https://raporone.hsgserver.my.id"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-blue-700 font-semibold"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Alamat domain aktif yang digunakan guru dan sekolah untuk mengakses eRaporOne secara online.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                if (confirm('Kembalikan ke data awal SMKN 1 Labuhan Maringgai?')) {
                  resetToDefaultData();
                  onClose();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Data Awal
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
              >
                <Check className="w-3.5 h-3.5" />
                Simpan Profil
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
