import React from 'react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from './Navigation';
import {
  LayoutDashboard,
  Users,
  Target,
  Edit3,
  CalendarCheck,
  Briefcase,
  Award,
  FileText,
  Table,
  ChevronLeft,
  ChevronRight,
  BookOpenCheck,
  Compass,
  LogOut,
  User,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed
}) => {
  const { schoolProfile, activeRole, currentUser, logout } = useApp();
  const isSMK = schoolProfile.jenjang === 'SMK';

  const isWali = activeRole === 'wali_kelas';
  const isAdmin = activeRole === 'admin';
  const isPembina = currentUser?.isPembinaEkskul;
  const isWaliXII = isWali && (currentUser?.namaRombelWali?.includes('XII') || false);

  const allNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'guru', 'wali_kelas'] },
    { id: 'master', label: 'Data Master (CRUD)', icon: Users, roles: ['admin'], badge: 'Admin' },
    { id: 'tp', label: 'Tujuan Pembelajaran', icon: Target, roles: ['admin', 'guru', 'wali_kelas'] },
    { id: 'nilai', label: 'Input Nilai & Deskripsi', icon: Edit3, highlight: true, roles: ['admin', 'guru', 'wali_kelas'] },
    { id: 'kehadiran', label: 'Absensi / Kehadiran', icon: CalendarCheck, roles: ['admin', 'wali_kelas'], badge: isWali ? 'Wali Kelas' : undefined },
    { id: 'ekskul', label: 'Ekstrakurikuler', icon: Compass, roles: isAdmin || isPembina ? ['admin', 'guru', 'wali_kelas'] : ['admin'], badge: isPembina ? 'Pembina' : undefined },
    ...(isSMK ? [
      { id: 'pkl', label: 'Nilai PKL (Kls XII)', icon: Briefcase, badge: 'SMK', roles: isAdmin || isWaliXII ? ['admin', 'wali_kelas'] : ['admin'] },
      { id: 'ukk', label: 'Uji Kompetensi (UKK)', icon: Award, badge: 'SMK', roles: isAdmin || isWaliXII ? ['admin', 'wali_kelas'] : ['admin'] }
    ] : []),
    {
      id: 'rapor',
      label: 'Cetak Rapor',
      icon: FileText,
      roles: ['admin', 'wali_kelas'],
      badge: isWali ? 'Wali Kelas' : 'Admin'
    },
    { id: 'legger', label: 'Leger Nilai', icon: Table, roles: ['admin', 'wali_kelas'] },
    { id: 'panduan', label: 'Panduan Guru', icon: BookOpenCheck, badge: 'Bantuan', roles: ['admin', 'guru', 'wali_kelas'] },
  ];

  const navItems = allNavItems.filter(item => item.roles.includes(activeRole));

  return (
    <aside
      className={`no-print hidden md:flex flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] z-20 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Sidebar header / Toggle */}
      <div className="p-3 border-b border-slate-100 flex items-center justify-between">
        {!isCollapsed && (
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
            Menu Utama
          </span>
        )}
        <button
          onClick={() => setIsCollapsed(prev => !prev)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition mx-auto"
          title={isCollapsed ? 'Perluas Sidebar' : 'Ciutkan Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5 no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isRaporItem = item.id === 'rapor';
          const isWaliKelas = activeRole === 'wali_kelas';

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as ActiveTab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group relative ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive
                    ? 'text-white'
                    : item.highlight
                    ? 'text-blue-600 group-hover:text-blue-700'
                    : isRaporItem && !isWaliKelas
                    ? 'text-amber-500'
                    : 'text-slate-400 group-hover:text-slate-600'
                }`}
              />

              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between text-left truncate">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ml-1 shrink-0 ${
                        isActive
                          ? 'bg-blue-700 text-blue-100'
                          : isRaporItem && !isWaliKelas
                          ? 'bg-amber-100 text-amber-800'
                          : item.id === 'panduan'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer: User Identity & School info */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/70 space-y-2">
        {currentUser && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-sm">
              {currentUser.nama.charAt(0)}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate leading-tight">
                  {currentUser.nama}
                </p>
                <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 border border-blue-200">
                    {activeRole === 'admin' 
                      ? 'Administrator' 
                      : activeRole === 'wali_kelas' 
                      ? (currentUser.namaRombelWali || 'Wali Kelas') 
                      : 'Guru'}
                  </span>
                  {currentUser.isPembinaEkskul && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-200">
                      {currentUser.namaEkskul || 'Pembina'}
                    </span>
                  )}
                </div>
              </div>
            )}
            {!isCollapsed && (
              <button
                onClick={logout}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                title="Keluar / Ganti Akun"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {!isCollapsed && (
          <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200/50">
            <p className="font-semibold text-slate-600 truncate">{schoolProfile.namaSekolah}</p>
            <p className="truncate">Sem. {schoolProfile.semesterAktif} • {schoolProfile.tahunAjaranAktif}</p>
          </div>
        )}
      </div>
    </aside>
  );
};
