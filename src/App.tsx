import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Navigation, ActiveTab } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { MasterDataView } from './components/MasterDataView';
import { TujuanPembelajaranView } from './components/TujuanPembelajaranView';
import { InputNilaiView } from './components/InputNilaiView';
import { KehadiranView } from './components/KehadiranView';
import { EkstrakurikulerView } from './components/EkstrakurikulerView';
import { PKLUKKView } from './components/PKLUKKView';
import { CetakRaporView } from './components/CetakRaporView';
import { LeggerView } from './components/LeggerView';
import { PanduanGuruView } from './components/PanduanGuruView';
import { SchoolSettingsModal } from './components/SchoolSettingsModal';
import { ImportExcelModal } from './components/ImportExcelModal';

const MainLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const { schoolProfile } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header with hamburger toggle for left sidebar */}
      <Header
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenImport={() => setIsImportOpen(true)}
        onToggleSidebar={() => setIsSidebarCollapsed(prev => !prev)}
      />

      {/* Main Body Layout: Left Sidebar + Center Content */}
      <div className="flex-1 flex w-full relative">
        {/* Collapsible Left Sidebar (Desktop/Tablet) */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />

        {/* Content Area */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 overflow-x-hidden main-content-wrapper">
          {activeTab === 'dashboard' && (
            <DashboardView
              setActiveTab={setActiveTab}
              onOpenImport={() => setIsImportOpen(true)}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          )}

          {activeTab === 'master' && (
            <MasterDataView onOpenImport={() => setIsImportOpen(true)} />
          )}

          {activeTab === 'tp' && <TujuanPembelajaranView />}

          {activeTab === 'nilai' && <InputNilaiView />}

          {activeTab === 'kehadiran' && <KehadiranView />}

          {activeTab === 'ekskul' && <EkstrakurikulerView />}

          {activeTab === 'pkl' && <PKLUKKView defaultSubTab="pkl" />}

          {activeTab === 'ukk' && <PKLUKKView defaultSubTab="ukk" />}

          {activeTab === 'rapor' && <CetakRaporView />}

          {activeTab === 'legger' && <LeggerView />}

          {activeTab === 'panduan' && <PanduanGuruView />}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Smartphones) */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Footer */}
      <footer className="no-print border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-500">
        <p>
          <strong>eRaporOne</strong> • Sistem Terpadu Pengolahan Nilai & Rapor Kurikulum Merdeka (SD, SMP, SMA, SMK)
        </p>
        <p className="text-[11px] text-slate-400 mt-1">
          {schoolProfile.namaSekolah} • Tahun Ajaran {schoolProfile.tahunAjaranAktif}
        </p>
      </footer>

      {/* Modals */}
      <SchoolSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <ImportExcelModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
};

export default App;
