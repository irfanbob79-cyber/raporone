import React from 'react';
import {
  LayoutDashboard,
  Users,
  Edit3,
  CalendarCheck,
  FileText,
  BookOpenCheck
} from 'lucide-react';

export type ActiveTab = 'dashboard' | 'master' | 'tp' | 'nilai' | 'kehadiran' | 'ekskul' | 'pkl' | 'ukk' | 'rapor' | 'legger' | 'panduan';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    /* Mobile Bottom Navigation Bar (Optimized for Smartphones - Hidden on desktop) */
    <div className="no-print md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex flex-col items-center justify-center p-1 rounded-lg text-[10px] font-medium transition ${
          activeTab === 'dashboard' ? 'text-blue-600 font-bold' : 'text-slate-500'
        }`}
      >
        <LayoutDashboard className="w-5 h-5 mb-0.5" />
        <span>Beranda</span>
      </button>

      <button
        onClick={() => setActiveTab('nilai')}
        className={`flex flex-col items-center justify-center p-1 rounded-lg text-[10px] font-medium transition relative ${
          activeTab === 'nilai' ? 'text-blue-600 font-bold' : 'text-slate-500'
        }`}
      >
        <div className="relative">
          <Edit3 className="w-5 h-5 mb-0.5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
        </div>
        <span>Nilai</span>
      </button>

      <button
        onClick={() => setActiveTab('kehadiran')}
        className={`flex flex-col items-center justify-center p-1 rounded-lg text-[10px] font-medium transition ${
          activeTab === 'kehadiran' ? 'text-blue-600 font-bold' : 'text-slate-500'
        }`}
      >
        <CalendarCheck className="w-5 h-5 mb-0.5" />
        <span>Absensi</span>
      </button>

      <button
        onClick={() => setActiveTab('rapor')}
        className={`flex flex-col items-center justify-center p-1 rounded-lg text-[10px] font-medium transition ${
          activeTab === 'rapor' ? 'text-blue-600 font-bold' : 'text-slate-500'
        }`}
      >
        <FileText className="w-5 h-5 mb-0.5" />
        <span>Cetak</span>
      </button>

      <button
        onClick={() => setActiveTab('panduan')}
        className={`flex flex-col items-center justify-center p-1 rounded-lg text-[10px] font-medium transition ${
          activeTab === 'panduan' ? 'text-blue-600 font-bold' : 'text-slate-500'
        }`}
      >
        <BookOpenCheck className="w-5 h-5 mb-0.5" />
        <span>Panduan</span>
      </button>
    </div>
  );
};
