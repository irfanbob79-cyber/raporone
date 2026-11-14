import React from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Sparkles, BookOpen, Menu, ShieldAlert, CheckCircle } from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  onOpenSettings: () => void;
  onOpenImport: () => void;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings, onOpenImport, onToggleSidebar }) => {
  const { schoolProfile, activeRole, setActiveRole } = useApp();

  const getJenjangBadge = () => {
    switch (schoolProfile.jenjang) {
      case 'SMK': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'SMA': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'SMP': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'SD': return 'bg-red-100 text-red-800 border-red-300';
    }
  };

  return (
    <header className="no-print sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-6 py-2.5 transition-all">
      <div className="flex items-center justify-between gap-3 max-w-7xl mx-auto">
        {/* Brand & Sidebar Toggle */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
              title="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                eRapor<span className="text-blue-600">One</span>
              </span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${getJenjangBadge()}`}>
                {schoolProfile.jenjang}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium line-clamp-1 max-w-[180px] sm:max-w-xs md:max-w-md">
              {schoolProfile.namaSekolah}
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Role Selector (Simulasi Role RBAC) */}
          <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
            <span className="hidden sm:inline text-[11px] font-bold text-slate-500 px-2">Peran:</span>
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value as UserRole)}
              className={`text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm cursor-pointer transition ${
                activeRole === 'wali_kelas'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-800 border border-slate-200'
              }`}
            >
              <option value="wali_kelas">⭐ Wali Kelas (Bisa Cetak)</option>
              <option value="guru">Guru Mapel</option>
              <option value="admin">Admin / Operator</option>
              <option value="waka_kurikulum">Waka Kurikulum</option>
              <option value="kepala_sekolah">Kepala Sekolah</option>
            </select>
          </div>

          {/* Quick Import Excel Button */}
          <button
            onClick={onOpenImport}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-semibold transition active:scale-95 shadow-sm"
            title="Import Excel Data Master"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Import Excel</span>
          </button>

          {/* School Settings Button */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium border border-slate-200 transition active:scale-95"
            title="Pengaturan Sekolah & Ganti Jenjang"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Ganti Jenjang / Profil</span>
          </button>
        </div>
      </div>
    </header>
  );
};
