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
  Compass
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
  const { schoolProfile, activeRole } = useApp();
  const isSMK = schoolProfile.jenjang === 'SMK';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'master', label: 'Data Master', icon: Users },
    { id: 'tp', label: 'Tujuan Pembelajaran', icon: Target },
    { id: 'nilai', label: 'Input Nilai & Deskripsi', icon: Edit3, highlight: true },
    { id: 'kehadiran', label: 'Absensi / Kehadiran', icon: CalendarCheck },
    { id: 'ekskul', label: 'Ekstrakurikuler', icon: Compass },
    ...(isSMK ? [
      { id: 'pkl', label: 'Nilai PKL (Kls XII)', icon: Briefcase, badge: 'SMK' },
      { id: 'ukk', label: 'Uji Kompetensi (UKK)', icon: Award, badge: 'SMK' }
    ] : []),
    {
      id: 'rapor',
      label: 'Cetak Rapor',
      icon: FileText,
      badge: activeRole === 'wali_kelas' ? 'Wali Kelas' : 'Khusus Wali Kelas'
    },
    { id: 'legger', label: 'Leger Nilai', icon: Table },
    { id: 'panduan', label: 'Panduan & Tutorial Guru', icon: BookOpenCheck, badge: 'Bantuan' },
  ];

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

      {/* Sidebar Footer info */}
      {!isCollapsed && (
        <div className="p-3 border-t border-slate-100 bg-slate-50/50 text-[10px] text-slate-400">
          <p className="font-semibold text-slate-600 truncate">{schoolProfile.namaSekolah}</p>
          <p className="truncate">Sem. {schoolProfile.semesterAktif} • {schoolProfile.tahunAjaranAktif}</p>
        </div>
      )}
    </aside>
  );
};
