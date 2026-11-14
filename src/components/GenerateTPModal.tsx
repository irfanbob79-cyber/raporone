import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MataPelajaran, Rombel, Jurusan } from '../types';
import { generateRecommendedTP, GeneratedTPOption } from '../utils/tpGenerator';
import {
  Sparkles,
  X,
  Check,
  CheckCircle2,
  BookOpen,
  Sliders,
  HelpCircle,
  Lightbulb,
  Layers
} from 'lucide-react';

interface GenerateTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMapel: MataPelajaran;
  currentRombel: Rombel;
  currentJurusan?: Jurusan;
}

export const GenerateTPModal: React.FC<GenerateTPModalProps> = ({
  isOpen,
  onClose,
  currentMapel,
  currentRombel,
  currentJurusan
}) => {
  const { schoolProfile, addTujuanPembelajaran } = useApp();

  const [mode, setMode] = useState<'bskap' | 'custom'>('bskap');
  const [selectedSemester, setSelectedSemester] = useState<'1 (Ganjil)' | '2 (Genap)'>(
    schoolProfile.semesterAktif.includes('1') ? '1 (Ganjil)' : '2 (Genap)'
  );
  const [targetCount, setTargetCount] = useState<number>(4);
  const [customKeyword, setCustomKeyword] = useState<string>('');

  // Generated results
  const [generatedItems, setGeneratedItems] = useState<GeneratedTPOption[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<Record<number, boolean>>({});
  const [editedDescriptions, setEditedDescriptions] = useState<Record<number, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Generate when parameters change
  useEffect(() => {
    if (!isOpen) return;

    const list = generateRecommendedTP(
      currentMapel,
      currentRombel,
      currentJurusan,
      selectedSemester,
      mode === 'custom' ? customKeyword : undefined,
      targetCount
    );

    setGeneratedItems(list);

    // Default select all
    const defaultSelect: Record<number, boolean> = {};
    const defaultEdited: Record<number, string> = {};
    list.forEach((item, idx) => {
      defaultSelect[idx] = true;
      defaultEdited[idx] = item.deskripsi;
    });
    setSelectedIndices(defaultSelect);
    setEditedDescriptions(defaultEdited);
  }, [isOpen, mode, selectedSemester, targetCount, currentMapel, currentRombel, currentJurusan]);

  if (!isOpen) return null;

  const handleManualRegenerate = () => {
    const list = generateRecommendedTP(
      currentMapel,
      currentRombel,
      currentJurusan,
      selectedSemester,
      mode === 'custom' ? customKeyword : undefined,
      targetCount
    );
    setGeneratedItems(list);

    const defaultSelect: Record<number, boolean> = {};
    const defaultEdited: Record<number, string> = {};
    list.forEach((item, idx) => {
      defaultSelect[idx] = true;
      defaultEdited[idx] = item.deskripsi;
    });
    setSelectedIndices(defaultSelect);
    setEditedDescriptions(defaultEdited);
  };

  const handleToggleSelect = (index: number) => {
    setSelectedIndices(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleDescriptionChange = (index: number, text: string) => {
    setEditedDescriptions(prev => ({
      ...prev,
      [index]: text
    }));
  };

  const handleCommit = () => {
    const selectedList = generatedItems
      .map((item, idx) => ({
        ...item,
        deskripsi: editedDescriptions[idx]?.trim() || item.deskripsi
      }))
      .filter((_, idx) => selectedIndices[idx]);

    if (selectedList.length === 0) return;

    selectedList.forEach((tp, idx) => {
      addTujuanPembelajaran({
        rombelId: currentRombel.id,
        mapelId: currentMapel.id,
        semester: selectedSemester,
        kodeTp: `TP ${idx + 1}`,
        deskripsi: tp.deskripsi
      });
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  const selectedCount = Object.values(selectedIndices).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-base">
                Smart Generator Tujuan Pembelajaran (TP)
              </h3>
              <p className="text-xs text-slate-500">
                Otomatis merumuskan TP berbasis Kurikulum Merdeka (BSKAP) & Taksonomi KKO
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-white/80 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Context Badge */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex flex-wrap items-center gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Mata Pelajaran:</span>
              <strong className="text-slate-800 text-xs">{currentMapel.nama} ({currentMapel.kode})</strong>
            </div>
            <div className="border-l pl-3 border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Rombel & Fase:</span>
              <strong className="text-blue-700 text-xs">{currentRombel.nama} ({currentRombel.fase})</strong>
            </div>
            {currentJurusan && (
              <div className="border-l pl-3 border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Konsentrasi:</span>
                <strong className="text-amber-700 text-xs">{currentJurusan.nama}</strong>
              </div>
            )}
          </div>

          {/* Mode Selector & Configuration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Mode Generator */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Sumber / Mode Generator
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as any)}
                className="w-full text-xs font-semibold p-2 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="bskap">Standar Resmi BSKAP</option>
                <option value="custom">AI Kustom (Topik Khusus)</option>
              </select>
            </div>

            {/* Semester Target */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Semester Target
              </label>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value as any)}
                className="w-full text-xs font-semibold p-2 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="1 (Ganjil)">Semester 1 (Ganjil)</option>
                <option value="2 (Genap)">Semester 2 (Genap)</option>
              </select>
            </div>

            {/* Target Count */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Jumlah TP yang Dihasilkan
              </label>
              <select
                value={targetCount}
                onChange={(e) => setTargetCount(Number(e.target.value))}
                className="w-full text-xs font-semibold p-2 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value={2}>2 TP (Ringkas)</option>
                <option value={3}>3 TP (Standar)</option>
                <option value={4}>4 TP (Optimal / Rekomendasi)</option>
                <option value={5}>5 TP (Mendalam)</option>
              </select>
            </div>
          </div>

          {/* AI Custom Keyword Input (If mode custom) */}
          {mode === 'custom' && (
            <div className="bg-purple-50/60 border border-purple-200 rounded-2xl p-3.5 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-purple-600" />
                <label className="text-xs font-bold text-purple-900">
                  Fokus Topik / Kata Kunci Khusus
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customKeyword}
                  onChange={(e) => setCustomKeyword(e.target.value)}
                  placeholder="Contoh: perawatan sistem injeksi PGM-FI dan transmisi CVT matic"
                  className="w-full text-xs p-2 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"
                />
                <button
                  type="button"
                  onClick={handleManualRegenerate}
                  className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs whitespace-nowrap transition active:scale-95"
                >
                  Generate Ulang
                </button>
              </div>
              <p className="text-[10px] text-purple-700">
                Sistem akan menyusun TP dengan Kata Kerja Operasional (KKO) Taksonomi Bloom sesuai topik Anda.
              </p>
            </div>
          )}

          {/* Result Preview List */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Pratinjau Hasil Rumusan TP ({generatedItems.length} Dihasilkan)
              </span>
              <span className="text-[11px] text-blue-600 font-semibold">
                {selectedCount} dari {generatedItems.length} TP dipilih
              </span>
            </div>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {generatedItems.map((item, idx) => {
                const isChecked = !!selectedIndices[idx];

                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isChecked
                        ? 'border-blue-300 bg-blue-50/30'
                        : 'border-slate-200 bg-slate-50/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleSelect(idx)}
                        className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                      />

                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-xs text-blue-800">
                            {item.kodeTp}
                          </span>
                          <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                            {item.elemen}
                          </span>
                        </div>

                        {/* Editable Description */}
                        <textarea
                          rows={2}
                          value={editedDescriptions[idx] || ''}
                          onChange={(e) => handleDescriptionChange(idx, e.target.value)}
                          disabled={!isChecked}
                          className="w-full text-xs p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium text-slate-800 leading-relaxed disabled:bg-slate-100"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition"
          >
            Batal
          </button>

          <button
            onClick={handleCommit}
            disabled={selectedCount === 0 || isSuccess}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition active:scale-95 disabled:opacity-40"
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Berhasil Ditambahkan!</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Tambahkan ({selectedCount}) TP ke Bank TP</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
