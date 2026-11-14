import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SchoolProfile,
  Jurusan,
  Guru,
  Rombel,
  Siswa,
  MataPelajaran,
  Pembelajaran,
  TujuanPembelajaran,
  NilaiSiswa,
  Kehadiran,
  NilaiPKL,
  NilaiUKK,
  Ekstrakurikuler,
  AnggotaEkskul,
  SchoolLevel,
  UserRole
} from '../types';
import {
  defaultSchoolProfile,
  defaultJurusan,
  defaultGuru,
  defaultRombel,
  defaultSiswa,
  defaultMataPelajaran,
  defaultPembelajaran,
  defaultTujuanPembelajaran,
  defaultNilaiSiswa,
  defaultKehadiran,
  defaultNilaiPKL,
  defaultNilaiUKK,
  defaultEkstrakurikuler,
  defaultAnggotaEkskul
} from '../data/defaultData';
import { generateDeskripsiCapaian } from '../utils/narrativeEngine';

interface AppContextType {
  schoolProfile: SchoolProfile;
  jurusan: Jurusan[];
  guru: Guru[];
  rombel: Rombel[];
  siswa: Siswa[];
  mapel: MataPelajaran[];
  pembelajaran: Pembelajaran[];
  tujuanPembelajaran: TujuanPembelajaran[];
  nilaiSiswa: NilaiSiswa[];
  kehadiran: Kehadiran[];
  nilaiPKL: NilaiPKL[];
  nilaiUKK: NilaiUKK[];
  ekskul: Ekstrakurikuler[];
  anggotaEkskul: AnggotaEkskul[];

  // Navigation & Role states
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  currentGuruId: string;
  setCurrentGuruId: (guruId: string) => void;
  selectedRombelId: string;
  setSelectedRombelId: (id: string) => void;
  selectedMapelId: string;
  setSelectedMapelId: (id: string) => void;

  // Actions Profil & Jenjang
  updateSchoolProfile: (profile: Partial<SchoolProfile>) => void;
  switchJenjang: (level: SchoolLevel) => void;

  // CRUD SISWA
  addSiswa: (item: Omit<Siswa, 'id'>) => void;
  updateSiswa: (item: Siswa) => void;
  deleteSiswa: (id: string) => void;
  importSiswaList: (newSiswa: Omit<Siswa, 'id'>[]) => void;

  // CRUD GURU
  addGuru: (item: Omit<Guru, 'id'>) => void;
  updateGuru: (item: Guru) => void;
  deleteGuru: (id: string) => void;
  importGuruList: (newGuru: Omit<Guru, 'id'>[]) => void;

  // CRUD ROMBEL
  addRombel: (item: Omit<Rombel, 'id'>) => void;
  updateRombel: (item: Rombel) => void;
  deleteRombel: (id: string) => void;

  // CRUD MAPEL
  addMapel: (item: Omit<MataPelajaran, 'id'>) => void;
  updateMapel: (item: MataPelajaran) => void;
  deleteMapel: (id: string) => void;

  // CRUD EKSTRAKURIKULER & ANGGOTA
  addEkstrakurikuler: (item: Omit<Ekstrakurikuler, 'id'>) => void;
  updateEkstrakurikuler: (item: Ekstrakurikuler) => void;
  deleteEkstrakurikuler: (id: string) => void;
  saveAnggotaEkskul: (item: AnggotaEkskul) => void;
  deleteAnggotaEkskul: (id: string) => void;

  // NILAI & ABSENSI
  saveNilaiSiswa: (item: NilaiSiswa) => void;
  saveBatchNilai: (items: NilaiSiswa[]) => void;
  generateAllDeskripsiForClass: (rombelId: string, mapelId: string, style?: 'personal' | 'ringkas') => void;
  saveKehadiran: (item: Kehadiran) => void;
  saveBatchKehadiran: (items: Kehadiran[]) => void;
  saveNilaiPKL: (item: NilaiPKL) => void;
  saveNilaiUKK: (item: NilaiUKK) => void;
  addTujuanPembelajaran: (tp: Omit<TujuanPembelajaran, 'id'>) => void;
  deleteTujuanPembelajaran: (id: string) => void;
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'eraporone_data_v3';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_school`);
    return saved ? JSON.parse(saved) : defaultSchoolProfile;
  });

  const [jurusan, setJurusan] = useState<Jurusan[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_jurusan`);
    return saved ? JSON.parse(saved) : defaultJurusan;
  });

  const [guru, setGuru] = useState<Guru[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_guru`);
    return saved ? JSON.parse(saved) : defaultGuru;
  });

  const [rombel, setRombel] = useState<Rombel[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_rombel`);
    return saved ? JSON.parse(saved) : defaultRombel;
  });

  const [siswa, setSiswa] = useState<Siswa[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_siswa`);
    return saved ? JSON.parse(saved) : defaultSiswa;
  });

  const [mapel, setMapel] = useState<MataPelajaran[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_mapel`);
    return saved ? JSON.parse(saved) : defaultMataPelajaran;
  });

  const [pembelajaran, setPembelajaran] = useState<Pembelajaran[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_pembelajaran`);
    return saved ? JSON.parse(saved) : defaultPembelajaran;
  });

  const [tujuanPembelajaran, setTujuanPembelajaran] = useState<TujuanPembelajaran[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_tp`);
    return saved ? JSON.parse(saved) : defaultTujuanPembelajaran;
  });

  const [nilaiSiswa, setNilaiSiswa] = useState<NilaiSiswa[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_nilai`);
    return saved ? JSON.parse(saved) : defaultNilaiSiswa;
  });

  const [kehadiran, setKehadiran] = useState<Kehadiran[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_kehadiran`);
    return saved ? JSON.parse(saved) : defaultKehadiran;
  });

  const [nilaiPKL, setNilaiPKL] = useState<NilaiPKL[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_pkl`);
    return saved ? JSON.parse(saved) : defaultNilaiPKL;
  });

  const [nilaiUKK, setNilaiUKK] = useState<NilaiUKK[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_ukk`);
    return saved ? JSON.parse(saved) : defaultNilaiUKK;
  });

  const [ekskul, setEkskul] = useState<Ekstrakurikuler[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_ekskul`);
    return saved ? JSON.parse(saved) : defaultEkstrakurikuler;
  });

  const [anggotaEkskul, setAnggotaEkskul] = useState<AnggotaEkskul[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_anggota_ekskul`);
    return saved ? JSON.parse(saved) : defaultAnggotaEkskul;
  });

  const [activeRole, setActiveRole] = useState<UserRole>('guru');
  const [currentGuruId, setCurrentGuruId] = useState<string>('guru-1');
  const [selectedRombelId, setSelectedRombelId] = useState<string>('rombel-xii-tsm-1');
  const [selectedMapelId, setSelectedMapelId] = useState<string>('mapel-kk-tsm');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_school`, JSON.stringify(schoolProfile));
    localStorage.setItem(`${STORAGE_KEY}_jurusan`, JSON.stringify(jurusan));
    localStorage.setItem(`${STORAGE_KEY}_guru`, JSON.stringify(guru));
    localStorage.setItem(`${STORAGE_KEY}_rombel`, JSON.stringify(rombel));
    localStorage.setItem(`${STORAGE_KEY}_siswa`, JSON.stringify(siswa));
    localStorage.setItem(`${STORAGE_KEY}_mapel`, JSON.stringify(mapel));
    localStorage.setItem(`${STORAGE_KEY}_pembelajaran`, JSON.stringify(pembelajaran));
    localStorage.setItem(`${STORAGE_KEY}_tp`, JSON.stringify(tujuanPembelajaran));
    localStorage.setItem(`${STORAGE_KEY}_nilai`, JSON.stringify(nilaiSiswa));
    localStorage.setItem(`${STORAGE_KEY}_kehadiran`, JSON.stringify(kehadiran));
    localStorage.setItem(`${STORAGE_KEY}_pkl`, JSON.stringify(nilaiPKL));
    localStorage.setItem(`${STORAGE_KEY}_ukk`, JSON.stringify(nilaiUKK));
    localStorage.setItem(`${STORAGE_KEY}_ekskul`, JSON.stringify(ekskul));
    localStorage.setItem(`${STORAGE_KEY}_anggota_ekskul`, JSON.stringify(anggotaEkskul));
  }, [schoolProfile, jurusan, guru, rombel, siswa, mapel, pembelajaran, tujuanPembelajaran, nilaiSiswa, kehadiran, nilaiPKL, nilaiUKK, ekskul, anggotaEkskul]);

  const updateSchoolProfile = (newProfile: Partial<SchoolProfile>) => {
    setSchoolProfile(prev => ({ ...prev, ...newProfile }));
  };

  const switchJenjang = (level: SchoolLevel) => {
    setSchoolProfile(prev => ({
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

  // CRUD SISWA
  const addSiswa = (item: Omit<Siswa, 'id'>) => {
    const newItem: Siswa = { ...item, id: `siswa-${Date.now()}` };
    setSiswa(prev => [newItem, ...prev]);
  };

  const updateSiswa = (item: Siswa) => {
    setSiswa(prev => prev.map(s => s.id === item.id ? item : s));
  };

  const deleteSiswa = (id: string) => {
    setSiswa(prev => prev.filter(s => s.id !== id));
  };

  const importSiswaList = (newSiswaData: Omit<Siswa, 'id'>[]) => {
    const created: Siswa[] = newSiswaData.map((item, idx) => ({
      ...item,
      id: `siswa-import-${Date.now()}-${idx}`
    }));
    setSiswa(prev => [...prev, ...created]);
  };

  // CRUD GURU
  const addGuru = (item: Omit<Guru, 'id'>) => {
    const newItem: Guru = { ...item, id: `guru-${Date.now()}` };
    setGuru(prev => [newItem, ...prev]);
  };

  const updateGuru = (item: Guru) => {
    setGuru(prev => prev.map(g => g.id === item.id ? item : g));
  };

  const deleteGuru = (id: string) => {
    setGuru(prev => prev.filter(g => g.id !== id));
  };

  const importGuruList = (newGuruData: Omit<Guru, 'id'>[]) => {
    const created: Guru[] = newGuruData.map((item, idx) => ({
      ...item,
      id: `guru-import-${Date.now()}-${idx}`
    }));
    setGuru(prev => [...prev, ...created]);
  };

  // CRUD ROMBEL
  const addRombel = (item: Omit<Rombel, 'id'>) => {
    const newItem: Rombel = { ...item, id: `rombel-${Date.now()}` };
    setRombel(prev => [...prev, newItem]);
  };

  const updateRombel = (item: Rombel) => {
    setRombel(prev => prev.map(r => r.id === item.id ? item : r));
  };

  const deleteRombel = (id: string) => {
    setRombel(prev => prev.filter(r => r.id !== id));
  };

  // CRUD MAPEL
  const addMapel = (item: Omit<MataPelajaran, 'id'>) => {
    const newItem: MataPelajaran = { ...item, id: `mapel-${Date.now()}` };
    setMapel(prev => [...prev, newItem]);
  };

  const updateMapel = (item: MataPelajaran) => {
    setMapel(prev => prev.map(m => m.id === item.id ? item : m));
  };

  const deleteMapel = (id: string) => {
    setMapel(prev => prev.filter(m => m.id !== id));
  };

  // CRUD EKSTRAKURIKULER & ANGGOTA
  const addEkstrakurikuler = (item: Omit<Ekstrakurikuler, 'id'>) => {
    const newItem: Ekstrakurikuler = { ...item, id: `eks-${Date.now()}` };
    setEkskul(prev => [...prev, newItem]);
  };

  const updateEkstrakurikuler = (item: Ekstrakurikuler) => {
    setEkskul(prev => prev.map(e => e.id === item.id ? item : e));
  };

  const deleteEkstrakurikuler = (id: string) => {
    setEkskul(prev => prev.filter(e => e.id !== id));
    setAnggotaEkskul(prev => prev.filter(a => a.ekskulId !== id));
  };

  const saveAnggotaEkskul = (item: AnggotaEkskul) => {
    setAnggotaEkskul(prev => {
      const idx = prev.findIndex(a => a.id === item.id || (a.ekskulId === item.ekskulId && a.siswaId === item.siswaId));
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        return next;
      }
      return [...prev, item];
    });
  };

  const deleteAnggotaEkskul = (id: string) => {
    setAnggotaEkskul(prev => prev.filter(a => a.id !== id));
  };

  // NILAI & ABSENSI
  const saveNilaiSiswa = (item: NilaiSiswa) => {
    setNilaiSiswa(prev => {
      const idx = prev.findIndex(n => n.id === item.id || (n.siswaId === item.siswaId && n.mapelId === item.mapelId && n.rombelId === item.rombelId));
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        return next;
      }
      return [...prev, item];
    });
  };

  const saveBatchNilai = (items: NilaiSiswa[]) => {
    setNilaiSiswa(prev => {
      const copy = [...prev];
      items.forEach(newItem => {
        const idx = copy.findIndex(n => (n.siswaId === newItem.siswaId && n.mapelId === newItem.mapelId && n.rombelId === newItem.rombelId));
        if (idx >= 0) copy[idx] = newItem;
        else copy.push(newItem);
      });
      return copy;
    });
  };

  const generateAllDeskripsiForClass = (rombelId: string, mapelId: string, style: 'personal' | 'ringkas' = 'personal') => {
    const currentRombel = rombel.find(r => r.id === rombelId);
    const currentMapel = mapel.find(m => m.id === mapelId);
    const currentJurusan = currentRombel?.jurusanId ? jurusan.find(j => j.id === currentRombel.jurusanId) : undefined;
    const currentTp = tujuanPembelajaran.filter(t => t.rombelId === rombelId && t.mapelId === mapelId);
    const classSiswa = siswa.filter(s => s.rombelId === rombelId);

    if (!currentRombel || !currentMapel) return;

    const updatedNilai = classSiswa.map(s => {
      const existing = nilaiSiswa.find(n => n.siswaId === s.id && n.rombelId === rombelId && n.mapelId === mapelId);
      const nilaiTp = existing?.nilaiTp || {};
      
      const generated = generateDeskripsiCapaian({
        siswa: s,
        rombel: currentRombel,
        mapel: currentMapel,
        jurusan: currentJurusan,
        jenjang: schoolProfile.jenjang,
        tujuanPembelajaranList: currentTp,
        nilaiTp,
        style
      });

      return {
        id: existing?.id || `nilai-${s.id}-${mapelId}`,
        siswaId: s.id,
        rombelId,
        mapelId,
        semester: schoolProfile.semesterAktif,
        nilaiTp,
        nilaiSAS: existing?.nilaiSAS || 80,
        nilaiAkhir: existing?.nilaiAkhir || 80,
        deskripsiCapaian: generated,
        deskripsiIsCustom: false
      };
    });

    saveBatchNilai(updatedNilai);
  };

  const saveKehadiran = (item: Kehadiran) => {
    setKehadiran(prev => {
      const idx = prev.findIndex(k => k.id === item.id || (k.siswaId === item.siswaId && k.rombelId === item.rombelId));
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        return next;
      }
      return [...prev, item];
    });
  };

  const saveBatchKehadiran = (items: Kehadiran[]) => {
    setKehadiran(prev => {
      const copy = [...prev];
      items.forEach(newItem => {
        const idx = copy.findIndex(k => k.siswaId === newItem.siswaId && k.rombelId === newItem.rombelId);
        if (idx >= 0) copy[idx] = newItem;
        else copy.push(newItem);
      });
      return copy;
    });
  };

  const saveNilaiPKL = (item: NilaiPKL) => {
    setNilaiPKL(prev => {
      const idx = prev.findIndex(p => p.id === item.id || p.siswaId === item.siswaId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        return next;
      }
      return [...prev, item];
    });
  };

  const saveNilaiUKK = (item: NilaiUKK) => {
    setNilaiUKK(prev => {
      const idx = prev.findIndex(u => u.id === item.id || u.siswaId === item.siswaId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        return next;
      }
      return [...prev, item];
    });
  };

  const addTujuanPembelajaran = (tp: Omit<TujuanPembelajaran, 'id'>) => {
    const newItem: TujuanPembelajaran = { ...tp, id: `tp-${Date.now()}` };
    setTujuanPembelajaran(prev => [...prev, newItem]);
  };

  const deleteTujuanPembelajaran = (id: string) => {
    setTujuanPembelajaran(prev => prev.filter(t => t.id !== id));
  };

  const resetToDefaultData = () => {
    localStorage.clear();
    setSchoolProfile(defaultSchoolProfile);
    setJurusan(defaultJurusan);
    setGuru(defaultGuru);
    setRombel(defaultRombel);
    setSiswa(defaultSiswa);
    setMapel(defaultMataPelajaran);
    setPembelajaran(defaultPembelajaran);
    setTujuanPembelajaran(defaultTujuanPembelajaran);
    setNilaiSiswa(defaultNilaiSiswa);
    setKehadiran(defaultKehadiran);
    setNilaiPKL(defaultNilaiPKL);
    setNilaiUKK(defaultNilaiUKK);
    setEkskul(defaultEkstrakurikuler);
    setAnggotaEkskul(defaultAnggotaEkskul);
  };

  return (
    <AppContext.Provider
      value={{
        schoolProfile,
        jurusan,
        guru,
        rombel,
        siswa,
        mapel,
        pembelajaran,
        tujuanPembelajaran,
        nilaiSiswa,
        kehadiran,
        nilaiPKL,
        nilaiUKK,
        ekskul,
        anggotaEkskul,
        activeRole,
        setActiveRole,
        currentGuruId,
        setCurrentGuruId,
        selectedRombelId,
        setSelectedRombelId,
        selectedMapelId,
        setSelectedMapelId,
        updateSchoolProfile,
        switchJenjang,
        addSiswa,
        updateSiswa,
        deleteSiswa,
        importSiswaList,
        addGuru,
        updateGuru,
        deleteGuru,
        importGuruList,
        addRombel,
        updateRombel,
        deleteRombel,
        addMapel,
        updateMapel,
        deleteMapel,
        addEkstrakurikuler,
        updateEkstrakurikuler,
        deleteEkstrakurikuler,
        saveAnggotaEkskul,
        deleteAnggotaEkskul,
        saveNilaiSiswa,
        saveBatchNilai,
        generateAllDeskripsiForClass,
        saveKehadiran,
        saveBatchKehadiran,
        saveNilaiPKL,
        saveNilaiUKK,
        addTujuanPembelajaran,
        deleteTujuanPembelajaran,
        resetToDefaultData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
