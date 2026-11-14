import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  downloadTemplateSiswa,
  downloadTemplateGuru,
  parseExcelSiswa,
  parseExcelGuru,
  ValidationIssue
} from '../utils/excel';
import { Siswa, Guru } from '../types';
import {
  X,
  FileSpreadsheet,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Users,
  GraduationCap
} from 'lucide-react';

interface ImportExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportExcelModal: React.FC<ImportExcelModalProps> = ({ isOpen, onClose }) => {
  const { rombel, importSiswaList, importGuruList } = useApp();

  const [activeTab, setActiveTab] = useState<'siswa' | 'guru'>('siswa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [issues, setIssues] = useState<ValidationIssue[]>([]);
  const [previewSiswa, setPreviewSiswa] = useState<Omit<Siswa, 'id'>[]>([]);
  const [previewGuru, setPreviewGuru] = useState<Omit<Guru, 'id'>[]>([]);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setSuccessMessage('');
    setIssues([]);

    try {
      if (activeTab === 'siswa') {
        const result = await parseExcelSiswa(file, rombel);
        setPreviewSiswa(result.data);
        setIssues(result.issues);
      } else {
        const result = await parseExcelGuru(file);
        setPreviewGuru(result.data);
        setIssues(result.issues);
      }
    } catch (err: any) {
      setIssues([
        { row: 0, field: 'File', message: 'Gagal membaca berkas Excel. Pastikan format valid (.xlsx).', severity: 'error' }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCommit = () => {
    if (activeTab === 'siswa') {
      if (previewSiswa.length === 0) return;
      importSiswaList(previewSiswa);
      setSuccessMessage(`Berhasil menambahkan ${previewSiswa.length} data siswa baru!`);
      setPreviewSiswa([]);
    } else {
      if (previewGuru.length === 0) return;
      importGuruList(previewGuru);
      setSuccessMessage(`Berhasil menambahkan ${previewGuru.length} data guru baru!`);
      setPreviewGuru([]);
    }
  };

  const resetState = () => {
    setPreviewSiswa([]);
    setPreviewGuru([]);
    setIssues([]);
    setSuccessMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">Smart Bulk Import Excel</h3>
              <p className="text-xs text-slate-500">Unggah berkas Excel data master dengan validasi otomatis</p>
            </div>
          </div>
          <button
            onClick={() => { resetState(); onClose(); }}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-100 px-6 pt-3 gap-4">
          <button
            onClick={() => { setActiveTab('siswa'); resetState(); }}
            className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition ${
              activeTab === 'siswa'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Data Master Siswa
          </button>
          <button
            onClick={() => { setActiveTab('guru'); resetState(); }}
            className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition ${
              activeTab === 'guru'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Users className="w-4 h-4" />
            Data Pendidik & Tenaga Kependidikan (Guru)
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Step 1: Download Template */}
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                Langkah 1: Unduh Format Template
              </h4>
              <p className="text-xs text-blue-700 mt-0.5">
                Gunakan format Excel standar eRaporOne agar data terbaca rapi dan tanpa gagal validasi.
              </p>
            </div>
            <button
              onClick={activeTab === 'siswa' ? downloadTemplateSiswa : downloadTemplateGuru}
              className="flex items-center gap-2 px-3.5 py-2 bg-white text-blue-700 border border-blue-200 hover:bg-blue-100/50 rounded-lg text-xs font-bold shadow-sm transition active:scale-95 whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              Unduh Template ({activeTab === 'siswa' ? 'Siswa' : 'Guru'})
            </button>
          </div>

          {/* Step 2: Upload Area */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Langkah 2: Unggah File Excel (.xlsx / .xls)
            </h4>
            <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-blue-50/20 transition group">
              <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-600 mb-2 transition" />
              <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-700">
                Klik atau Tarik Berkas Excel ke Sini
              </span>
              <span className="text-xs text-slate-400 mt-1">Mendukung file .xlsx dan .xls</span>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Loading State */}
          {isProcessing && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
              <p className="text-xs font-medium text-slate-600 mt-2">Sedang memvalidasi baris data Excel...</p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <p className="text-xs font-semibold">{successMessage}</p>
            </div>
          )}

          {/* Validation Issues */}
          {issues.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Catatan & Validasi Berkas:
              </div>
              <ul className="text-xs text-amber-800 space-y-1 pl-5 list-disc max-h-32 overflow-y-auto">
                {issues.map((iss, idx) => (
                  <li key={idx}>
                    <strong>Baris {iss.row} [{iss.field}]:</strong> {iss.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Data Preview Table */}
          {previewSiswa.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Preview Data Siswa ({previewSiswa.length} Baris Siap Diimpor)
                </h4>
              </div>
              <div className="border border-slate-200 rounded-xl overflow-hidden max-h-56 overflow-y-auto text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-700 font-semibold sticky top-0">
                    <tr>
                      <th className="p-2 border-b">NISN</th>
                      <th className="p-2 border-b">Nama Lengkap</th>
                      <th className="p-2 border-b">L/P</th>
                      <th className="p-2 border-b">Agama</th>
                      <th className="p-2 border-b">Alamat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {previewSiswa.map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2 font-mono text-slate-600">{s.nisn}</td>
                        <td className="p-2 font-semibold text-slate-800">{s.nama}</td>
                        <td className="p-2">{s.jenisKelamin}</td>
                        <td className="p-2">{s.agama}</td>
                        <td className="p-2 text-slate-500 truncate max-w-xs">{s.alamat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {previewGuru.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Preview Data Guru ({previewGuru.length} Baris Siap Diimpor)
                </h4>
              </div>
              <div className="border border-slate-200 rounded-xl overflow-hidden max-h-56 overflow-y-auto text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-700 font-semibold sticky top-0">
                    <tr>
                      <th className="p-2 border-b">Nama & Gelar</th>
                      <th className="p-2 border-b">NIP / NUPTK</th>
                      <th className="p-2 border-b">L/P</th>
                      <th className="p-2 border-b">Email</th>
                      <th className="p-2 border-b">No HP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {previewGuru.map((g, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2 font-semibold text-slate-800">
                          {g.gelarDepan ? `${g.gelarDepan} ` : ''}{g.nama}{g.gelarBelakang ? `, ${g.gelarBelakang}` : ''}
                        </td>
                        <td className="p-2 font-mono text-slate-600">{g.nip || g.nuptk || '-'}</td>
                        <td className="p-2">{g.jenisKelamin}</td>
                        <td className="p-2 text-slate-600">{g.email}</td>
                        <td className="p-2 text-slate-600">{g.noHp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => { resetState(); onClose(); }}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition"
          >
            Tutup
          </button>
          
          {(previewSiswa.length > 0 || previewGuru.length > 0) && (
            <button
              onClick={handleCommit}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-md shadow-emerald-600/20 transition active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              Simpan Data ke Sistem ({activeTab === 'siswa' ? previewSiswa.length : previewGuru.length} Data)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
