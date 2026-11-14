import React from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Sparkles, BookOpen, Menu, LogOut, User, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
  onOpenImport: () => void;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings, onOpenImport, onToggleSidebar }) => {
  const { schoolProfile, currentUser, logout, activeRole } = useApp();

  const getJenjangBadge = () => {
    switch (schoolProfile.jenjang) {
      case 'SMK': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'SMA': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'SMP': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'SD': return 'bg-red-100 text-red-800 border-red-300';
    }
  };

  const getRoleBadge = () => {
    if (activeRole === 'admin') {
      return { label: 'Administrator', bg: 'bg-purple-100 text-purple-800 border-purple-200' };
    }
    if (activeRole === 'wali_kelas') {
      return { 
        label: currentUser?.namaRombelWali ? `Wali ${currentUser.namaRombelWali}` : 'Wali Kelas', 
        bg: 'bg-blue-100 text-blue-800 border-blue-200' 
      };
    }
    return { label: 'Guru Mapel', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
  };

  const roleInfo = getRoleBadge();

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
          {/* Quick Import Excel Button (Khusus Admin) */}
          {activeRole === 'admin' && (
            <button
              onClick={onOpenImport}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-semibold transition active:scale-95 shadow-sm"
              title="Import Excel Data Master"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Import Excel</span>
            </button>
          )}

          {/* School Settings Button (Khusus Admin) */}
          {activeRole === 'admin' && (
            <button
              onClick={onOpenSettings}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium border border-slate-200 transition active:scale-95"
              title="Pengaturan Sekolah & Ganti Jenjang"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Profil Sekolah</span>
            </button>
          )}

          {/* User Profile Pill & Logout */}
          {currentUser && (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-slate-800 line-clamp-1 max-w-[140px]">
                  {currentUser.nama}
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border self-end ${roleInfo.bg}`}>
                  {roleInfo.label}
                </span>
              </div>

              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center text-xs border border-blue-200 shrink-0">
                {currentUser.nama.charAt(0)}
              </div>

              <button
                onClick={logout}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold transition active:scale-95 cursor-pointer ml-1"
                title="Keluar dari akun (Logout)"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
