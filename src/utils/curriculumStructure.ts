import { MataPelajaran, Rombel, Siswa, NilaiSiswa } from '../types';

export interface GroupedSubjectItem {
  no: number;
  nama: string;
  kode: string;
  kktp?: number;
  matchedMapelId?: string;
}

export interface SubjectGroup {
  groupTitle: string;
  items: GroupedSubjectItem[];
}

/**
 * Predikat PKL kualitatif Kurikulum Merdeka SMK
 */
export function getPredikatPKL(nilai?: number): 'Sangat Baik' | 'Baik' | 'Cukup' | 'Kurang' {
  if (nilai === undefined || nilai === null) return 'Baik';
  if (nilai >= 86) return 'Sangat Baik';
  if (nilai >= 71) return 'Baik';
  if (nilai >= 56) return 'Cukup';
  return 'Kurang';
}

/**
 * Menentukan nama mata pelajaran Pendidikan Agama yang sesuai dengan agama murid
 */
export function getNamaMapelAgama(agamaMurid?: string): string {
  const norm = (agamaMurid || '').toLowerCase().trim();
  if (norm.includes('kristen') || norm.includes('protestan')) {
    return 'Pendidikan Agama Kristen dan Budi Pekerti';
  }
  if (norm.includes('katolik') || norm.includes('khatolik')) {
    return 'Pendidikan Agama Khatolik dan Budi Pekerti';
  }
  if (norm.includes('hindu')) {
    return 'Pendidikan Agama Hindu dan Budi Pekerti';
  }
  if (norm.includes('budha') || norm.includes('buddha')) {
    return 'Pendidikan Agama Budha dan Budi Pekerti';
  }
  if (norm.includes('khonghucu') || norm.includes('konghucu')) {
    return 'Pendidikan Agama Khonghucu dan Budi Pekerti';
  }
  return 'Pendidikan Agama Islam dan Budi Pekerti';
}

/**
 * Mendapatkan struktur kurikulum mata pelajaran per rombel sesuai template Excel
 * (X TSM, X DKV, X PBS, XI TSM, XI DKV, XI PBS, XII TSM, XII DKV, XII PBS)
 */
export function getCurriculumGroupsForRombel(
  rombel: Rombel,
  siswa: Siswa,
  masterMapel: MataPelajaran[]
): SubjectGroup[] {
  const tingkat = rombel.tingkat;
  const rombelName = rombel.nama.toUpperCase();
  const rombelKode = (rombel.kode || '').toUpperCase();

  // Deteksi jurusan dari kode/nama rombel (Mendukung penamaan resmi SMKN 1 Labuhan Maringgai)
  const isTSM = rombelName.includes('TSM') || rombelName.includes('SEPEDA MOTOR') || rombelName.includes('OTOMOTIF') || rombelKode.includes('TSM') || rombelKode.includes('TO');
  const isDKV = rombelName.includes('DKV') || rombelName.includes('DESAIN') || rombelKode.includes('DKV');
  const isPBS = rombelName.includes('PBS') || rombelName.includes('PERBANKAN') || rombelName.includes('LEMBAGA 2') || rombelKode.includes('PBS');

  const agamaSubjectName = getNamaMapelAgama(siswa?.agama);

  // 1. KELOMPOK MATA PELAJARAN UMUM
  let umumSubjectNames: string[] = [];
  if (tingkat === 12) {
    // Kelas XII: Hanya 3 mapel umum (Agama, Pancasila, Bahasa Indonesia)
    umumSubjectNames = [
      agamaSubjectName,
      'Pendidikan Pancasila',
      'Bahasa Indonesia',
    ];
  } else {
    // Kelas X & XI: 6 mapel umum
    umumSubjectNames = [
      agamaSubjectName,
      'Pendidikan Pancasila',
      'Bahasa Indonesia',
      'Pendidikan Jasmani, Olahraga dan Kesehatan',
      'Sejarah',
      'Seni Budaya',
    ];
  }

  // 2. KELOMPOK MATA PELAJARAN KEJURUAN
  let kejuruanSubjectNames: string[] = [];
  if (tingkat === 10) {
    // Kelas X (TSM, DKV, PBS)
    kejuruanSubjectNames = [
      'Matematika',
      'Bahasa Inggris',
      'Informatika',
      'Projek Ilmu Pengetahuan Alam dan Sosial',
      'Dasar-dasar Program Keahlian',
      'Koding dan Kecerdasan Artifisial',
    ];
  } else if (tingkat === 11) {
    // Kelas XI
    const elective = isTSM 
      ? 'Pengelasan' 
      : isDKV 
        ? 'Koding dan Kecerdasan Artifisial' 
        : 'Microsoft Office'; // PBS

    kejuruanSubjectNames = [
      'Matematika',
      'Bahasa Inggris',
      'Konsentrasi Keahlian',
      'Kreativitas, Inovasi dan Kewirausahaan',
      elective,
    ];
  } else {
    // Kelas XII
    const elective = isTSM 
      ? 'Pengelasan' 
      : isDKV 
        ? 'Koding dan Kecerdasan Artifisial' 
        : 'Layanan Perbankan Syariah'; // PBS

    kejuruanSubjectNames = [
      'Matematika',
      'Bahasa Inggris',
      'Konsentrasi Keahlian',
      'Kreativitas, Inovasi dan Kewirausahaan',
      elective,
    ];
  }

  // 3. MATA PELAJARAN MULOK
  const mulokSubjectNames = [
    'PAK',
    'Bahasa Lampung',
  ];

  // Helper pencocokan mapel ke masterMapel untuk mendapatkan ID
  const findMasterId = (name: string): string | undefined => {
    const clean = name.toLowerCase().trim();
    // 1. Coba pencocokan agama
    if (clean.includes('agama')) {
      const found = masterMapel.find(m => m.nama.toLowerCase().includes('agama') || m.kode === 'PABP');
      if (found) return found.id;
    }
    // 2. Coba pencocokan eksak
    const exact = masterMapel.find(m => m.nama.toLowerCase().trim() === clean);
    if (exact) return exact.id;

    // 3. Coba pencocokan substring
    const partial = masterMapel.find(m => {
      const mClean = m.nama.toLowerCase().trim();
      return mClean.includes(clean) || clean.includes(mClean);
    });
    if (partial) return partial.id;

    // 4. Coba pencocokan kode alias
    if (clean === 'pak') {
      const m = masterMapel.find(x => x.kode === 'PAK' || x.nama.toLowerCase().includes('anti korupsi'));
      if (m) return m.id;
    }
    if (clean.includes('kreativitas') || clean.includes('kewirausahaan')) {
      const m = masterMapel.find(x => x.kode === 'PKK' || x.nama.toLowerCase().includes('kreatif'));
      if (m) return m.id;
    }
    if (clean.includes('konsentrasi keahlian')) {
      if (isTSM) {
        const m = masterMapel.find(x => x.id === 'mapel-kk-tsm' || x.kode === 'KK-TSM');
        if (m) return m.id;
      }
      if (isDKV) {
        const m = masterMapel.find(x => x.id === 'mapel-kk-dkv' || x.kode === 'KK-DKV');
        if (m) return m.id;
      }
      const m = masterMapel.find(x => x.kode.startsWith('KK') || x.nama.toLowerCase().includes('konsentrasi'));
      if (m) return m.id;
    }
    if (clean.includes('pengelasan')) {
      const m = masterMapel.find(x => x.kode === 'LAS' || x.nama.toLowerCase().includes('las'));
      if (m) return m.id;
    }
    if (clean.includes('koding')) {
      const m = masterMapel.find(x => x.kode === 'AI' || x.nama.toLowerCase().includes('koding'));
      if (m) return m.id;
    }
    if (clean.includes('microsoft office')) {
      const m = masterMapel.find(x => x.kode === 'MSO' || x.nama.toLowerCase().includes('office'));
      if (m) return m.id;
    }
    if (clean.includes('perbankan')) {
      const m = masterMapel.find(x => x.kode === 'LPS' || x.nama.toLowerCase().includes('perbankan'));
      if (m) return m.id;
    }

    return undefined;
  };

  const getSubjectKKTP = (name: string, masterId?: string): number => {
    if (masterId) {
      const found = masterMapel.find(m => m.id === masterId);
      if (found?.kktp) return found.kktp;
    }
    const clean = name.toLowerCase().trim();
    const found = masterMapel.find(m => m.nama.toLowerCase().trim() === clean);
    return found?.kktp || 75; // Nilai standar KKTP (Kriteria Ketercapaian Tujuan Pembelajaran)
  };

  const groups: SubjectGroup[] = [
    {
      groupTitle: 'A. KELOMPOK MATA PELAJARAN UMUM',
      items: umumSubjectNames.map((nama, idx) => {
        const mId = findMasterId(nama);
        return {
          no: idx + 1,
          nama,
          kode: `UMUM-${idx + 1}`,
          kktp: getSubjectKKTP(nama, mId),
          matchedMapelId: mId,
        };
      }),
    },
    {
      groupTitle: 'B. KELOMPOK MATA PELAJARAN KEJURUAN',
      items: kejuruanSubjectNames.map((nama, idx) => {
        const mId = findMasterId(nama);
        return {
          no: idx + 1,
          nama,
          kode: `KEJ-${idx + 1}`,
          kktp: getSubjectKKTP(nama, mId),
          matchedMapelId: mId,
        };
      }),
    },
    {
      groupTitle: 'C. MATA PELAJARAN MULOK',
      items: mulokSubjectNames.map((nama, idx) => {
        const mId = findMasterId(nama);
        return {
          no: idx + 1,
          nama,
          kode: `MULOK-${idx + 1}`,
          kktp: getSubjectKKTP(nama, mId),
          matchedMapelId: mId,
        };
      }),
    },
  ];

  return groups;
}

/**
 * Mencari nilai murid secara cerdas dan sinkron antara input nilai guru dan cetak rapor
 */
export function findStudentScore(
  nilaiSiswa: NilaiSiswa[],
  siswaId: string,
  _rombelId: string,
  item: GroupedSubjectItem,
  allMapel: MataPelajaran[]
): NilaiSiswa | undefined {
  const studentScores = nilaiSiswa.filter(n => n.siswaId === siswaId);
  if (studentScores.length === 0) return undefined;

  // 1. Cek langsung kecocokan matchedMapelId
  if (item.matchedMapelId) {
    const direct = studentScores.find(n => n.mapelId === item.matchedMapelId);
    if (direct) return direct;
  }

  const cleanItemName = item.nama.toLowerCase().trim();

  // 2. Pencocokan cerdas berdasarkan nama mapel atau alias kurikulum
  for (const score of studentScores) {
    const m = allMapel.find(x => x.id === score.mapelId);
    if (!m) continue;
    const cleanMasterName = m.nama.toLowerCase().trim();

    // Kecocokan nama persis
    if (cleanMasterName === cleanItemName) return score;

    // Kecocokan Pendidikan Agama
    if (cleanItemName.includes('agama') && (cleanMasterName.includes('agama') || m.kode === 'PABP')) {
      return score;
    }

    // Kecocokan Konsentrasi Keahlian
    if ((cleanItemName.includes('konsentrasi') || cleanItemName === 'konsentrasi keahlian') &&
        (cleanMasterName.includes('konsentrasi') || m.kode.startsWith('KK') || score.mapelId.startsWith('mapel-kk'))) {
      return score;
    }

    // Kecocokan Dasar-dasar Program Keahlian (DDPK)
    if ((cleanItemName.includes('dasar') || cleanItemName.includes('ddpk')) &&
        (cleanMasterName.includes('dasar') || m.kode === 'DDPK' || score.mapelId === 'mapel-ddpk')) {
      return score;
    }

    // Kecocokan PKK / Kewirausahaan
    if ((cleanItemName.includes('kewirausahaan') || cleanItemName.includes('kreativitas')) &&
        (cleanMasterName.includes('kreatif') || cleanMasterName.includes('kewirausahaan') || m.kode === 'PKK' || score.mapelId === 'mapel-pkk')) {
      return score;
    }

    // Kecocokan AI / Koding
    if ((cleanItemName.includes('koding') || cleanItemName.includes('kecerdasan artifisial')) &&
        (cleanMasterName.includes('koding') || cleanMasterName.includes('kecerdasan') || m.kode === 'AI' || score.mapelId === 'mapel-ai')) {
      return score;
    }

    // Kecocokan Pengelasan
    if (cleanItemName.includes('pengelasan') && (cleanMasterName.includes('las') || m.kode === 'LAS' || score.mapelId === 'mapel-las')) {
      return score;
    }

    // Kecocokan Microsoft Office
    if (cleanItemName.includes('office') && (cleanMasterName.includes('office') || m.kode === 'MSO' || score.mapelId === 'mapel-mso')) {
      return score;
    }

    // Kecocokan Layanan Perbankan Syariah
    if (cleanItemName.includes('perbankan') && (cleanMasterName.includes('perbankan') || m.kode === 'LPS' || score.mapelId === 'mapel-lps')) {
      return score;
    }

    // Kecocokan substring
    if (cleanItemName.includes(cleanMasterName) || cleanMasterName.includes(cleanItemName)) {
      return score;
    }
  }

  return undefined;
}
