import { SchoolProfile, Jurusan, Guru, Rombel, Siswa, MataPelajaran, Pembelajaran, TujuanPembelajaran, NilaiSiswa, Kehadiran, NilaiPKL, NilaiUKK, Ekstrakurikuler, AnggotaEkskul } from '../types';

export const defaultSchoolProfile: SchoolProfile = {
  npsn: '10814674',
  namaSekolah: 'SMKN 1 LABUHAN MARINGGAI',
  jenjang: 'SMK',
  alamat: 'Jl. Raya Karang Anyar, Desa Karang Anyar',
  desa: 'Karang Anyar',
  kecamatan: 'Labuhan Maringgai',
  kabupaten: 'Kabupaten Lampung Timur',
  provinsi: 'Lampung',
  kodePos: '34198',
  kepalaSekolah: 'Drs. H. Suwito, M.M.',
  nipKepalaSekolah: '196805121994031008',
  hariEfektifSemester: 110,
  tahunAjaranAktif: '2024/2025',
  semesterAktif: '1 (Ganjil)',
  domainUrl: 'https://raporone.hsgserver.my.id',
};

export const defaultJurusan: Jurusan[] = [
  {
    id: 'jur-tsm',
    kode: 'TSM',
    nama: 'Teknik Sepeda Motor',
    bidangKeahlian: 'Teknologi Manufaktur dan Rekayasa',
    programKeahlian: 'Teknik Otomotif',
  },
  {
    id: 'jur-dkv',
    kode: 'DKV',
    nama: 'Desain Komunikasi Visual',
    bidangKeahlian: 'Seni dan Ekonomi Kreatif',
    programKeahlian: 'Desain Komunikasi Visual',
  },
  {
    id: 'jur-pbs',
    kode: 'PBS',
    nama: 'Perbankan Syariah',
    bidangKeahlian: 'Bisnis dan Manajemen',
    programKeahlian: 'Keuangan dan Perbankan',
  },
  {
    id: 'jur-akl',
    kode: 'AKL',
    nama: 'Akuntansi dan Keuangan Lembaga',
    bidangKeahlian: 'Bisnis dan Manajemen',
    programKeahlian: 'Akuntansi dan Keuangan',
  },
];

export const defaultGuru: Guru[] = [
  {
    id: 'guru-1',
    nip: '197508102005011005',
    nuptk: '4537753655200022',
    nama: 'Bambang Irawan',
    gelarDepan: '',
    gelarBelakang: 'S.T., M.Pd.',
    jenisKelamin: 'L',
    email: 'bambang.irawan@smkn1labmar.sch.id',
    noHp: '081272345678',
  },
  {
    id: 'guru-2',
    nip: '198203152010012015',
    nuptk: '6748760662210083',
    nama: 'Siti Rahmawati',
    gelarDepan: '',
    gelarBelakang: 'S.Kom., M.T.',
    jenisKelamin: 'P',
    email: 'siti.rahmawati@smkn1labmar.sch.id',
    noHp: '081373456789',
  },
  {
    id: 'guru-3',
    nip: '198811202014022003',
    nuptk: '8956766667230112',
    nama: 'Dewi Lestari',
    gelarDepan: '',
    gelarBelakang: 'S.E., Ak.',
    jenisKelamin: 'P',
    email: 'dewi.lestari@smkn1labmar.sch.id',
    noHp: '081368112233',
  },
  {
    id: 'guru-4',
    nip: '197904052008011012',
    nuptk: '3456757659200043',
    nama: 'Agus Setiawan',
    gelarDepan: 'Drs.',
    gelarBelakang: 'M.Hum.',
    jenisKelamin: 'L',
    email: 'agus.setiawan@smkn1labmar.sch.id',
    noHp: '085269887766',
  },
];

export const defaultRombel: Rombel[] = [
  // Kelas XII
  {
    id: 'rombel-xii-tsm-1',
    kode: 'XII TSM',
    nama: 'XII TSM',
    tingkat: 12,
    fase: 'Fase F',
    jurusanId: 'jur-tsm',
    waliKelasId: 'guru-1',
    tahunAjaran: '2024/2025',
  },
  {
    id: 'rombel-xii-dkv-1',
    kode: 'XII DKV',
    nama: 'XII DKV',
    tingkat: 12,
    fase: 'Fase F',
    jurusanId: 'jur-dkv',
    waliKelasId: 'guru-2',
    tahunAjaran: '2024/2025',
  },
  {
    id: 'rombel-xii-pbs-1',
    kode: 'XII PBS',
    nama: 'XII PBS',
    tingkat: 12,
    fase: 'Fase F',
    jurusanId: 'jur-pbs',
    waliKelasId: 'guru-3',
    tahunAjaran: '2024/2025',
  },

  // Kelas XI
  {
    id: 'rombel-xi-tsm-1',
    kode: 'XI TSM',
    nama: 'XI TSM',
    tingkat: 11,
    fase: 'Fase F',
    jurusanId: 'jur-tsm',
    waliKelasId: 'guru-1',
    tahunAjaran: '2024/2025',
  },
  {
    id: 'rombel-xi-dkv-1',
    kode: 'XI DKV',
    nama: 'XI DKV',
    tingkat: 11,
    fase: 'Fase F',
    jurusanId: 'jur-dkv',
    waliKelasId: 'guru-2',
    tahunAjaran: '2024/2025',
  },
  {
    id: 'rombel-xi-pbs-1',
    kode: 'XI PBS',
    nama: 'XI PBS',
    tingkat: 11,
    fase: 'Fase F',
    jurusanId: 'jur-pbs',
    waliKelasId: 'guru-3',
    tahunAjaran: '2024/2025',
  },

  // Kelas X
  {
    id: 'rombel-x-tsm-1',
    kode: 'X TSM',
    nama: 'X TSM',
    tingkat: 10,
    fase: 'Fase E',
    jurusanId: 'jur-tsm',
    waliKelasId: 'guru-4',
    tahunAjaran: '2024/2025',
  },
  {
    id: 'rombel-x-dkv-1',
    kode: 'X DKV',
    nama: 'X DKV',
    tingkat: 10,
    fase: 'Fase E',
    jurusanId: 'jur-dkv',
    waliKelasId: 'guru-2',
    tahunAjaran: '2024/2025',
  },
  {
    id: 'rombel-x-pbs-1',
    kode: 'X PBS',
    nama: 'X PBS',
    tingkat: 10,
    fase: 'Fase E',
    jurusanId: 'jur-pbs',
    waliKelasId: 'guru-3',
    tahunAjaran: '2024/2025',
  },
];

export const defaultSiswa: Siswa[] = [
  // Siswa Kelas XII (Ada Nilai PKL)
  {
    id: 'siswa-xii-1',
    nis: '231101',
    nisn: '0057812901',
    nama: 'Ahmad Fauzi Rahman',
    jenisKelamin: 'L',
    tempatLahir: 'Labuhan Maringgai',
    tanggalLahir: '2006-04-12',
    agama: 'Islam',
    rombelId: 'rombel-xii-tsm-1',
    namaAyah: 'Slamet Riyadi',
    namaIbu: 'Sri Wahyuni',
    alamat: 'Desa Karang Anyar RT 02/01, Labuhan Maringgai',
    noHpOrtu: '085273112233',
  },
  {
    id: 'siswa-xii-2',
    nis: '231102',
    nisn: '0058412983',
    nama: 'Budi Santoso',
    jenisKelamin: 'L',
    tempatLahir: 'Margasari',
    tanggalLahir: '2006-06-25',
    agama: 'Islam',
    rombelId: 'rombel-xii-tsm-1',
    namaAyah: 'Wahyudi',
    namaIbu: 'Siti Aminah',
    alamat: 'Desa Margasari, Labuhan Maringgai',
    noHpOrtu: '085382445566',
  },
  {
    id: 'siswa-xii-3',
    nis: '231103',
    nisn: '0051239841',
    nama: 'Dimas Pratama',
    jenisKelamin: 'L',
    tempatLahir: 'Srigading',
    tanggalLahir: '2006-09-18',
    agama: 'Islam',
    rombelId: 'rombel-xii-tsm-1',
    namaAyah: 'Suprapto',
    namaIbu: 'Rohani',
    alamat: 'Desa Srigading RT 04/02, Labuhan Maringgai',
    noHpOrtu: '082177889900',
  },

  // Siswa Kelas XI (Tanpa PKL)
  {
    id: 'siswa-xi-1',
    nis: '241101',
    nisn: '0067823901',
    nama: 'Danu Kusuma',
    jenisKelamin: 'L',
    tempatLahir: 'Mataram Baru',
    tanggalLahir: '2007-02-14',
    agama: 'Islam',
    rombelId: 'rombel-xi-tsm-1',
    namaAyah: 'Tugiman',
    namaIbu: 'Sumarni',
    alamat: 'Kec. Mataram Baru, Lampung Timur',
    noHpOrtu: '081273998811',
  },
  {
    id: 'siswa-xi-2',
    nis: '241102',
    nisn: '0065567812',
    nama: 'Farhan Hidayat',
    jenisKelamin: 'L',
    tempatLahir: 'Karya Makmur',
    tanggalLahir: '2007-11-03',
    agama: 'Islam',
    rombelId: 'rombel-xi-tsm-1',
    namaAyah: 'Sukardi',
    namaIbu: 'Nurhayati',
    alamat: 'Desa Karya Makmur, Labuhan Maringgai',
    noHpOrtu: '081369772244',
  },
  {
    id: 'siswa-xi-3',
    nis: '242101',
    nisn: '0078921345',
    nama: 'Adelia Putri Kirana',
    jenisKelamin: 'P',
    tempatLahir: 'Labuhan Maringgai',
    tanggalLahir: '2007-05-19',
    agama: 'Islam',
    rombelId: 'rombel-xi-dkv-1',
    namaAyah: 'Haryanto',
    namaIbu: 'Lestari',
    alamat: 'Dusun Sukamaju, Desa Karang Anyar',
    noHpOrtu: '082281992200',
  },
  {
    id: 'siswa-xi-4',
    nis: '243101',
    nisn: '0079012345',
    nama: 'Rizky Ramadhan',
    jenisKelamin: 'L',
    tempatLahir: 'Karang Anyar',
    tanggalLahir: '2007-08-11',
    agama: 'Islam',
    rombelId: 'rombel-xi-pbs-1',
    namaAyah: 'Mansyur',
    namaIbu: 'Rukmini',
    alamat: 'Karang Anyar, Labuhan Maringgai',
    noHpOrtu: '081277112244',
  },
  {
    id: 'siswa-x-1',
    nis: '251101',
    nisn: '0089123456',
    nama: 'Bagus Setiawan',
    jenisKelamin: 'L',
    tempatLahir: 'Labuhan Maringgai',
    tanggalLahir: '2008-01-15',
    agama: 'Islam',
    rombelId: 'rombel-x-tsm-1',
    namaAyah: 'Gunawan',
    namaIbu: 'Endang',
    alamat: 'Desa Karang Anyar, Labuhan Maringgai',
    noHpOrtu: '081399887711',
  },
  {
    id: 'siswa-xii-dkv-1',
    nis: '232101',
    nisn: '0056123478',
    nama: 'Nabila Syakieb',
    jenisKelamin: 'P',
    tempatLahir: 'Labuhan Maringgai',
    tanggalLahir: '2006-03-20',
    agama: 'Islam',
    rombelId: 'rombel-xii-dkv-1',
    namaAyah: 'Lukman',
    namaIbu: 'Halimah',
    alamat: 'Margasari, Labuhan Maringgai',
    noHpOrtu: '081266554433',
  },
  {
    id: 'siswa-xii-pbs-1',
    nis: '233101',
    nisn: '0057234589',
    nama: 'Zaskia Nurul Aini',
    jenisKelamin: 'P',
    tempatLahir: 'Labuhan Maringgai',
    tanggalLahir: '2006-07-09',
    agama: 'Islam',
    rombelId: 'rombel-xii-pbs-1',
    namaAyah: 'Hasan Basri',
    namaIbu: 'Maimunah',
    alamat: 'Karya Makmur, Labuhan Maringgai',
    noHpOrtu: '081388776655',
  },
];

export const defaultMataPelajaran: MataPelajaran[] = [
  // KELOMPOK UMUM
  {
    id: 'mapel-pabp',
    kode: 'PABP',
    nama: 'Pendidikan Agama Islam dan Budi Pekerti',
    kelompok: 'Kelompok Umum',
    jenjang: ['SD', 'SMP', 'SMA', 'SMK'],
  },
  {
    id: 'mapel-pp',
    kode: 'PPKN',
    nama: 'Pendidikan Pancasila',
    kelompok: 'Kelompok Umum',
    jenjang: ['SD', 'SMP', 'SMA', 'SMK'],
  },
  {
    id: 'mapel-indo',
    kode: 'BINDO',
    nama: 'Bahasa Indonesia',
    kelompok: 'Kelompok Umum',
    jenjang: ['SD', 'SMP', 'SMA', 'SMK'],
  },
  {
    id: 'mapel-pjok',
    kode: 'PJOK',
    nama: 'Pendidikan Jasmani, Olahraga dan Kesehatan',
    kelompok: 'Kelompok Umum',
    jenjang: ['SD', 'SMP', 'SMA', 'SMK'],
  },
  {
    id: 'mapel-sej',
    kode: 'SEJ',
    nama: 'Sejarah',
    kelompok: 'Kelompok Umum',
    jenjang: ['SMA', 'SMK'],
  },
  {
    id: 'mapel-seni',
    kode: 'SENI',
    nama: 'Seni Budaya',
    kelompok: 'Kelompok Umum',
    jenjang: ['SD', 'SMP', 'SMA', 'SMK'],
  },

  // KELOMPOK KEJURUAN
  {
    id: 'mapel-mat',
    kode: 'MTK',
    nama: 'Matematika',
    kelompok: 'Kejuruan: Konsentrasi Keahlian',
    jenjang: ['SD', 'SMP', 'SMA', 'SMK'],
  },
  {
    id: 'mapel-inggris',
    kode: 'BING',
    nama: 'Bahasa Inggris',
    kelompok: 'Kejuruan: Konsentrasi Keahlian',
    jenjang: ['SMP', 'SMA', 'SMK'],
  },
  {
    id: 'mapel-inf',
    kode: 'INF',
    nama: 'Informatika',
    kelompok: 'Kejuruan: Dasar Program Keahlian',
    jenjang: ['SMP', 'SMA', 'SMK'],
  },
  {
    id: 'mapel-pipas',
    kode: 'PIPAS',
    nama: 'Projek Ilmu Pengetahuan Alam dan Sosial',
    kelompok: 'Kejuruan: Dasar Program Keahlian',
    jenjang: ['SMK'],
  },
  {
    id: 'mapel-ddpk',
    kode: 'DDPK',
    nama: 'Dasar-dasar Program Keahlian',
    kelompok: 'Kejuruan: Dasar Program Keahlian',
    jenjang: ['SMK'],
  },
  {
    id: 'mapel-ai',
    kode: 'AI',
    nama: 'Koding dan Kecerdasan Artifisial',
    kelompok: 'Mata Pelajaran Pilihan',
    jenjang: ['SMK'],
  },
  {
    id: 'mapel-kk',
    kode: 'KK',
    nama: 'Konsentrasi Keahlian',
    kelompok: 'Kejuruan: Konsentrasi Keahlian',
    jenjang: ['SMK'],
  },
  {
    id: 'mapel-kk-tsm',
    kode: 'KK-TSM',
    nama: 'Konsentrasi Keahlian Teknik Sepeda Motor',
    kelompok: 'Kejuruan: Konsentrasi Keahlian',
    jenjang: ['SMK'],
  },
  {
    id: 'mapel-kk-dkv',
    kode: 'KK-DKV',
    nama: 'Konsentrasi Keahlian Desain Komunikasi Visual',
    kelompok: 'Kejuruan: Konsentrasi Keahlian',
    jenjang: ['SMK'],
  },
  {
    id: 'mapel-pkk',
    kode: 'PKK',
    nama: 'Kreativitas, Inovasi dan Kewirausahaan',
    kelompok: 'Projek Kreatif dan Kewirausahaan (PKK)',
    jenjang: ['SMK'],
  },
  {
    id: 'mapel-las',
    kode: 'LAS',
    nama: 'Pengelasan',
    kelompok: 'Mata Pelajaran Pilihan',
    jenjang: ['SMK'],
  },
  {
    id: 'mapel-mso',
    kode: 'MSO',
    nama: 'Microsoft Office',
    kelompok: 'Mata Pelajaran Pilihan',
    jenjang: ['SMK'],
  },
  {
    id: 'mapel-lps',
    kode: 'LPS',
    nama: 'Layanan Perbankan Syariah',
    kelompok: 'Mata Pelajaran Pilihan',
    jenjang: ['SMK'],
  },

  // MULOK
  {
    id: 'mapel-pak',
    kode: 'PAK',
    nama: 'PAK',
    kelompok: 'Muatan Lokal',
    jenjang: ['SD', 'SMP', 'SMA', 'SMK'],
  },
  {
    id: 'mapel-lampung',
    kode: 'BLAMPUNG',
    nama: 'Bahasa Lampung',
    kelompok: 'Muatan Lokal',
    jenjang: ['SD', 'SMP', 'SMA', 'SMK'],
  },
];

// Mapping Guru Mengajar Kelas Mana & Mapel Apa
export const defaultPembelajaran: Pembelajaran[] = [
  {
    id: 'pem-1',
    rombelId: 'rombel-xii-tsm-1',
    mapelId: 'mapel-kk-tsm',
    guruId: 'guru-1', // Bambang Irawan mengajar TSM di XII-TSM-1
  },
  {
    id: 'pem-2',
    rombelId: 'rombel-xi-tsm-1',
    mapelId: 'mapel-kk-tsm',
    guruId: 'guru-1', // Bambang Irawan mengajar TSM di XI-TSM-1
  },
  {
    id: 'pem-3',
    rombelId: 'rombel-xi-dkv-1',
    mapelId: 'mapel-kk-dkv',
    guruId: 'guru-2', // Siti Rahmawati mengajar DKV di XI-DKV-1
  },
  {
    id: 'pem-4',
    rombelId: 'rombel-xii-tsm-1',
    mapelId: 'mapel-indo',
    guruId: 'guru-4', // Agus Setiawan mengajar BINDO di XII-TSM-1
  },
  {
    id: 'pem-5',
    rombelId: 'rombel-x-tsm-1',
    mapelId: 'mapel-indo',
    guruId: 'guru-4', // Agus Setiawan mengajar BINDO di X TSM
  },
];

export const defaultTujuanPembelajaran: TujuanPembelajaran[] = [
  {
    id: 'tp-tsm-1',
    rombelId: 'rombel-xii-tsm-1',
    mapelId: 'mapel-kk-tsm',
    semester: '1 (Ganjil)',
    kodeTp: 'TP 1',
    deskripsi: 'mendiagnosis dan memperbaiki gangguan sistem injeksi bahan bakar (EFI/PGM-FI)',
  },
  {
    id: 'tp-tsm-2',
    rombelId: 'rombel-xii-tsm-1',
    mapelId: 'mapel-kk-tsm',
    semester: '1 (Ganjil)',
    kodeTp: 'TP 2',
    deskripsi: 'melakukan overhaul mesin dan penggantian komponen kepala silinder',
  },
  {
    id: 'tp-tsm-3',
    rombelId: 'rombel-xii-tsm-1',
    mapelId: 'mapel-kk-tsm',
    semester: '1 (Ganjil)',
    kodeTp: 'TP 3',
    deskripsi: 'menganalisis dan menyetel sistem transmisi otomatis (CVT)',
  },
  {
    id: 'tp-tsm-4',
    rombelId: 'rombel-xii-tsm-1',
    mapelId: 'mapel-kk-tsm',
    semester: '1 (Ganjil)',
    kodeTp: 'TP 4',
    deskripsi: 'merawat dan memperbaiki sistem kelistrikan bodi serta instrumen dashboard',
  },
];

export const defaultNilaiSiswa: NilaiSiswa[] = [
  {
    id: 'nilai-1',
    siswaId: 'siswa-xii-1',
    rombelId: 'rombel-xii-tsm-1',
    mapelId: 'mapel-kk-tsm',
    semester: '1 (Ganjil)',
    nilaiTp: {
      'tp-tsm-1': 92,
      'tp-tsm-2': 86,
      'tp-tsm-3': 75,
      'tp-tsm-4': 88,
    },
    nilaiSAS: 85,
    nilaiAkhir: 85,
    deskripsiCapaian: 'Ananda Ahmad Fauzi Rahman (Kelas XII Teknik Sepeda Motor 1 - Teknik Sepeda Motor) menunjukkan penguasaan yang sangat baik dalam mendiagnosis dan memperbaiki gangguan sistem injeksi bahan bakar (EFI/PGM-FI) pada mata pelajaran Konsentrasi Keahlian Teknik Sepeda Motor. Perlu peningkatan dan pendampingan lebih lanjut dalam menganalisis dan menyetel sistem transmisi otomatis (CVT).',
    deskripsiIsCustom: false,
  },
  {
    id: 'nilai-2',
    siswaId: 'siswa-xii-2',
    rombelId: 'rombel-xii-tsm-1',
    mapelId: 'mapel-kk-tsm',
    semester: '1 (Ganjil)',
    nilaiTp: {
      'tp-tsm-1': 74,
      'tp-tsm-2': 88,
      'tp-tsm-3': 90,
      'tp-tsm-4': 82,
    },
    nilaiSAS: 84,
    nilaiAkhir: 84,
    deskripsiCapaian: 'Ananda Budi Santoso (Kelas XII Teknik Sepeda Motor 1 - Teknik Sepeda Motor) menunjukkan penguasaan yang sangat baik dalam menganalisis dan menyetel sistem transmisi otomatis (CVT) pada mata pelajaran Konsentrasi Keahlian Teknik Sepeda Motor. Perlu bimbingan dalam mendiagnosis dan memperbaiki gangguan sistem injeksi bahan bakar (EFI/PGM-FI).',
    deskripsiIsCustom: false,
  },
  {
    id: 'nilai-3',
    siswaId: 'siswa-xii-3',
    rombelId: 'rombel-xii-tsm-1',
    mapelId: 'mapel-kk-tsm',
    semester: '1 (Ganjil)',
    nilaiTp: {
      'tp-tsm-1': 80,
      'tp-tsm-2': 82,
      'tp-tsm-3': 85,
      'tp-tsm-4': 80,
    },
    nilaiSAS: 82,
    nilaiAkhir: 82,
    deskripsiCapaian: 'Ananda Dimas Pratama (Kelas XII Teknik Sepeda Motor 1 - Teknik Sepeda Motor) menunjukkan capaian merata yang baik dalam seluruh tujuan pembelajaran pada mata pelajaran Konsentrasi Keahlian Teknik Sepeda Motor.',
    deskripsiIsCustom: false,
  },
];

export const defaultKehadiran: Kehadiran[] = [
  {
    id: 'keh-1',
    siswaId: 'siswa-xii-1',
    rombelId: 'rombel-xii-tsm-1',
    semester: '1 (Ganjil)',
    sakit: 2,
    izin: 1,
    alfa: 0,
    catatanWaliKelas: 'Ahmad Fauzi Rahman memiliki kedisiplinan dan keterampilan kerja praktik yang sangat memuaskan. Pertahankan semangat belajar untuk menghadapi Uji Kompetensi Keahlian.',
    ekskul: [
      { nama: 'Pramuka Wajib', predikat: 'Sangat Baik', keterangan: 'Aktif dalam kegiatan kepramukaan.' },
      { nama: 'Otomotif Club (SMK)', predikat: 'Sangat Baik', keterangan: 'Terampil dan rajin dalam kegiatan servis mandiri sekolah.' }
    ]
  },
  {
    id: 'keh-2',
    siswaId: 'siswa-xii-2',
    rombelId: 'rombel-xii-tsm-1',
    semester: '1 (Ganjil)',
    sakit: 0,
    izin: 2,
    alfa: 1,
    catatanWaliKelas: 'Budi Santoso menunjukkan kemajuan belajar yang baik. Tingkatkan kehadiran di kelas teori kejuruan agar kompetensi semakin matang.',
    ekskul: [
      { nama: 'Pramuka Wajib', predikat: 'Baik', keterangan: 'Tertib mengikuti latihan.' }
    ]
  },
  {
    id: 'keh-3',
    siswaId: 'siswa-xii-3',
    rombelId: 'rombel-xii-tsm-1',
    semester: '1 (Ganjil)',
    sakit: 1,
    izin: 0,
    alfa: 0,
    catatanWaliKelas: 'Dimas Pratama memiliki etos belajar yang stabil dan tekun dalam praktik bengkel. Selamat atas prestasimu di semester ini.',
    ekskul: [
      { nama: 'Pramuka Wajib', predikat: 'Baik', keterangan: 'Mengikuti kepramukaan.' },
      { nama: 'Futsal', predikat: 'Sangat Baik', keterangan: 'Pemain tim futsal sekolah.' }
    ]
  },
];

// PKL Khusus Kelas XII
export const defaultNilaiPKL: NilaiPKL[] = [
  {
    id: 'pkl-1',
    siswaId: 'siswa-xii-1',
    rombelId: 'rombel-xii-tsm-1',
    mitraDudi: 'AHASS Daya Motor Labuhan Maringgai',
    lokasi: 'Jl. Lintas Timur, Labuhan Maringgai',
    durasiBulan: 6,
    nilaiSoftSkills: 90,
    nilaiHardSkills: 88,
    nilaiKemandirian: 87,
    nilaiAkhir: 88,
    predikat: 'Sangat Baik',
    catatanDudi: 'Sangat disiplin, cepat memahami instruksi mekanik senior, dan ramah saat melayani konsumen bengkel.',
    kehadiranSakit: 1,
    kehadiranIzin: 1,
    kehadiranAlfa: 0,
  },
  {
    id: 'pkl-2',
    siswaId: 'siswa-xii-2',
    rombelId: 'rombel-xii-tsm-1',
    mitraDudi: 'AHASS Daya Motor Labuhan Maringgai',
    lokasi: 'Jl. Lintas Timur, Labuhan Maringgai',
    durasiBulan: 6,
    nilaiSoftSkills: 85,
    nilaiHardSkills: 86,
    nilaiKemandirian: 84,
    nilaiAkhir: 85,
    predikat: 'Baik',
    catatanDudi: 'Menunjukkan keterampilan servis CVT yang baik dan rajin menjaga kebersihan stall kerja bengkel.',
    kehadiranSakit: 0,
    kehadiranIzin: 2,
    kehadiranAlfa: 1,
  },
  {
    id: 'pkl-3',
    siswaId: 'siswa-xii-3',
    rombelId: 'rombel-xii-tsm-1',
    mitraDudi: 'Bengkel Mobil & Motor Mitra Mandiri',
    lokasi: 'Karang Anyar, Labuhan Maringgai',
    durasiBulan: 6,
    nilaiSoftSkills: 86,
    nilaiHardSkills: 87,
    nilaiKemandirian: 85,
    nilaiAkhir: 86,
    predikat: 'Sangat Baik',
    catatanDudi: 'Mampu beradaptasi dengan tim kerja bengkel dan teliti dalam perawatan berkala sepeda motor.',
    kehadiranSakit: 1,
    kehadiranIzin: 0,
    kehadiranAlfa: 0,
  }
];

export const defaultNilaiUKK: NilaiUKK[] = [
  {
    id: 'ukk-1',
    siswaId: 'siswa-xii-1',
    rombelId: 'rombel-xii-tsm-1',
    namaSkema: 'Perawatan Berkala Sepeda Motor Injeksi (KKNI Level II)',
    nilaiTeori: 86,
    nilaiPraktik: 90,
    nilaiAkhir: 89,
    statusKompeten: 'Kompeten',
    nomorSertifikat: 'UKK-TSM-2024-001',
  },
  {
    id: 'ukk-2',
    siswaId: 'siswa-xii-2',
    rombelId: 'rombel-xii-tsm-1',
    namaSkema: 'Perawatan Berkala Sepeda Motor Injeksi (KKNI Level II)',
    nilaiTeori: 84,
    nilaiPraktik: 86,
    nilaiAkhir: 85,
    statusKompeten: 'Kompeten',
    nomorSertifikat: 'UKK-TSM-2024-002',
  },
  {
    id: 'ukk-3',
    siswaId: 'siswa-xii-3',
    rombelId: 'rombel-xii-tsm-1',
    namaSkema: 'Perawatan Berkala Sepeda Motor Injeksi (KKNI Level II)',
    nilaiTeori: 82,
    nilaiPraktik: 88,
    nilaiAkhir: 86,
    statusKompeten: 'Kompeten',
    nomorSertifikat: 'UKK-TSM-2024-003',
  }
];

export const defaultEkstrakurikuler: Ekstrakurikuler[] = [
  {
    id: 'eks-pramuka',
    nama: 'Pramuka (Wajib)',
    kategori: 'Wajib',
    pembinaGuruId: 'guru-4',
    deskripsi: 'Kegiatan kepanduan, kepemimpinan, dan kedisiplinan dasar.'
  },
  {
    id: 'eks-otomotif',
    nama: 'Otomotif Club (SMK)',
    kategori: 'Pilihan',
    pembinaGuruId: 'guru-1',
    deskripsi: 'Pengembangan keterampilan modifikasi, tune up, dan servis mandiri.'
  },
  {
    id: 'eks-futsal',
    nama: 'Futsal & Olahraga',
    kategori: 'Pilihan',
    pembinaGuruId: 'guru-4',
    deskripsi: 'Pelatihan fisik, taktik olahraga beregu, dan turnamen antarsekolah.'
  },
  {
    id: 'eks-dkv',
    nama: 'Desain & Fotografi Kreatif',
    kategori: 'Pilihan',
    pembinaGuruId: 'guru-2',
    deskripsi: 'Eksplorasi teknik pemotretan, videografi, dan editing konten digital.'
  },
  {
    id: 'eks-pmr',
    nama: 'PMR (Palang Merah Remaja)',
    kategori: 'Pilihan',
    pembinaGuruId: 'guru-3',
    deskripsi: 'Pertolongan pertama pada kecelakaan dan bakti sosial kesehatan sekolah.'
  }
];

export const defaultAnggotaEkskul: AnggotaEkskul[] = [
  {
    id: 'ang-1',
    ekskulId: 'eks-pramuka',
    siswaId: 'siswa-xii-1',
    semester: '1 (Ganjil)',
    predikat: 'Sangat Baik',
    keterangan: 'Aktif, disiplin, dan bertanggung jawab sebagai pradana dalam perkemahan.'
  },
  {
    id: 'ang-2',
    ekskulId: 'eks-otomotif',
    siswaId: 'siswa-xii-1',
    semester: '1 (Ganjil)',
    predikat: 'Sangat Baik',
    keterangan: 'Menunjukkan keterampilan servis motor yang terampil dan teliti.'
  },
  {
    id: 'ang-3',
    ekskulId: 'eks-pramuka',
    siswaId: 'siswa-xii-2',
    semester: '1 (Ganjil)',
    predikat: 'Baik',
    keterangan: 'Mengikuti latihan rutin pramuka dengan tertib dan mematuhi tata tertib.'
  },
  {
    id: 'ang-4',
    ekskulId: 'eks-futsal',
    siswaId: 'siswa-xii-3',
    semester: '1 (Ganjil)',
    predikat: 'Sangat Baik',
    keterangan: 'Menjadi pemain inti tim futsal sekolah dan menjunjung tinggi sportivitas.'
  },
  {
    id: 'ang-5',
    ekskulId: 'eks-pramuka',
    siswaId: 'siswa-xii-3',
    semester: '1 (Ganjil)',
    predikat: 'Baik',
    keterangan: 'Aktif dalam kegiatan baris-berbaris dan penjelajahan alam.'
  }
];

