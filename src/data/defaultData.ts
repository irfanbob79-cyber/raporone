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

  // Kelas X (Sesuai Struktur Resmi SMKN 1 Labuhan Maringgai)
  {
    id: 'rombel-x-akl-1',
    kode: 'X-AKL-1',
    nama: 'X Akuntansi dan Keuangan Lembaga 1',
    tingkat: 10,
    fase: 'Fase E',
    jurusanId: 'jur-akl',
    waliKelasId: 'guru-3',
    tahunAjaran: '2024/2025',
  },
  {
    id: 'rombel-x-pbs-1',
    kode: 'X-AKL-2',
    nama: 'X Akuntansi dan Keuangan Lembaga 2',
    tingkat: 10,
    fase: 'Fase E',
    jurusanId: 'jur-pbs',
    waliKelasId: 'guru-3',
    tahunAjaran: '2024/2025',
  },
  {
    id: 'rombel-x-dkv-1',
    kode: 'X-DKV-1',
    nama: 'X DKV 1',
    tingkat: 10,
    fase: 'Fase E',
    jurusanId: 'jur-dkv',
    waliKelasId: 'guru-2',
    tahunAjaran: '2024/2025',
  },
  {
    id: 'rombel-x-dkv-2',
    kode: 'X-DKV-2',
    nama: 'X DKV 2',
    tingkat: 10,
    fase: 'Fase E',
    jurusanId: 'jur-dkv',
    waliKelasId: 'guru-2',
    tahunAjaran: '2024/2025',
  },
  {
    id: 'rombel-x-dkv-3',
    kode: 'X-DKV-3',
    nama: 'X DKV 3',
    tingkat: 10,
    fase: 'Fase E',
    jurusanId: 'jur-dkv',
    waliKelasId: 'guru-2',
    tahunAjaran: '2024/2025',
  },
  {
    id: 'rombel-x-tsm-1',
    kode: 'X-TO-1',
    nama: 'X Teknik Otomotif 1',
    tingkat: 10,
    fase: 'Fase E',
    jurusanId: 'jur-tsm',
    waliKelasId: 'guru-4',
    tahunAjaran: '2024/2025',
  },
  {
    id: 'rombel-x-to-2',
    kode: 'X-TO-2',
    nama: 'X Teknik Otomotif 2',
    tingkat: 10,
    fase: 'Fase E',
    jurusanId: 'jur-tsm',
    waliKelasId: 'guru-4',
    tahunAjaran: '2024/2025',
  },
  {
    id: 'rombel-x-to-3',
    kode: 'X-TO-3',
    nama: 'X Teknik Otomotif 3',
    tingkat: 10,
    fase: 'Fase E',
    jurusanId: 'jur-tsm',
    waliKelasId: 'guru-4',
    tahunAjaran: '2024/2025',
  },
];

export const defaultSiswa: Siswa[] = [
  {
    "id": "siswa-xii-1",
    "nis": "231101",
    "nisn": "0057812901",
    "nama": "Ahmad Fauzi Rahman",
    "jenisKelamin": "L",
    "tempatLahir": "Labuhan Maringgai",
    "tanggalLahir": "2006-04-12",
    "agama": "Islam",
    "rombelId": "rombel-xii-tsm-1",
    "namaAyah": "Slamet Riyadi",
    "namaIbu": "Sri Wahyuni",
    "alamat": "Desa Karang Anyar, Labuhan Maringgai"
  },
  {
    "id": "siswa-xii-2",
    "nis": "231102",
    "nisn": "0058412983",
    "nama": "Budi Santoso",
    "jenisKelamin": "L",
    "tempatLahir": "Margasari",
    "tanggalLahir": "2006-06-25",
    "agama": "Islam",
    "rombelId": "rombel-xii-tsm-1",
    "namaAyah": "Wahyudi",
    "namaIbu": "Siti Aminah",
    "alamat": "Desa Margasari, Labuhan Maringgai"
  },
  {
    "id": "siswa-xii-3",
    "nis": "231103",
    "nisn": "0051239841",
    "nama": "Dimas Pratama",
    "jenisKelamin": "L",
    "tempatLahir": "Srigading",
    "tanggalLahir": "2006-09-18",
    "agama": "Islam",
    "rombelId": "rombel-xii-tsm-1",
    "namaAyah": "Suprapto",
    "namaIbu": "Rohani",
    "alamat": "Desa Srigading, Labuhan Maringgai"
  },
  {
    "id": "siswa-xii-dkv-1",
    "nis": "232101",
    "nisn": "0056123478",
    "nama": "Nabila Syakieb",
    "jenisKelamin": "P",
    "tempatLahir": "Labuhan Maringgai",
    "tanggalLahir": "2006-03-20",
    "agama": "Islam",
    "rombelId": "rombel-xii-dkv-1",
    "namaAyah": "Lukman",
    "namaIbu": "Halimah",
    "alamat": "Margasari, Labuhan Maringgai"
  },
  {
    "id": "siswa-xii-dkv-2",
    "nis": "232102",
    "nisn": "0056123479",
    "nama": "Rendy Saputra",
    "jenisKelamin": "L",
    "tempatLahir": "Mataram Baru",
    "tanggalLahir": "2006-08-14",
    "agama": "Islam",
    "rombelId": "rombel-xii-dkv-1",
    "namaAyah": "Bambang",
    "namaIbu": "Yuliana",
    "alamat": "Mataram Baru, Lampung Timur"
  },
  {
    "id": "siswa-xii-pbs-1",
    "nis": "233101",
    "nisn": "0057234589",
    "nama": "Zaskia Nurul Aini",
    "jenisKelamin": "P",
    "tempatLahir": "Labuhan Maringgai",
    "tanggalLahir": "2006-07-09",
    "agama": "Islam",
    "rombelId": "rombel-xii-pbs-1",
    "namaAyah": "Hasan Basri",
    "namaIbu": "Maimunah",
    "alamat": "Karya Makmur, Labuhan Maringgai"
  },
  {
    "id": "siswa-xii-pbs-2",
    "nis": "233102",
    "nisn": "0057234590",
    "nama": "Taufik Hidayat",
    "jenisKelamin": "L",
    "tempatLahir": "Karang Anyar",
    "tanggalLahir": "2006-11-23",
    "agama": "Islam",
    "rombelId": "rombel-xii-pbs-1",
    "namaAyah": "Samsuri",
    "namaIbu": "Karyati",
    "alamat": "Karang Anyar, Labuhan Maringgai"
  },
  {
    "id": "siswa-xi-1",
    "nis": "241101",
    "nisn": "0067823901",
    "nama": "Danu Kusuma",
    "jenisKelamin": "L",
    "tempatLahir": "Mataram Baru",
    "tanggalLahir": "2007-02-14",
    "agama": "Islam",
    "rombelId": "rombel-xi-tsm-1",
    "namaAyah": "Tugiman",
    "namaIbu": "Sumarni",
    "alamat": "Mataram Baru, Lampung Timur"
  },
  {
    "id": "siswa-xi-2",
    "nis": "241102",
    "nisn": "0065567812",
    "nama": "Farhan Hidayat",
    "jenisKelamin": "L",
    "tempatLahir": "Karya Makmur",
    "tanggalLahir": "2007-11-03",
    "agama": "Islam",
    "rombelId": "rombel-xi-tsm-1",
    "namaAyah": "Sukardi",
    "namaIbu": "Nurhayati",
    "alamat": "Desa Karya Makmur, Labuhan Maringgai"
  },
  {
    "id": "siswa-xi-3",
    "nis": "242101",
    "nisn": "0078921345",
    "nama": "Adelia Putri Kirana",
    "jenisKelamin": "P",
    "tempatLahir": "Labuhan Maringgai",
    "tanggalLahir": "2007-05-19",
    "agama": "Islam",
    "rombelId": "rombel-xi-dkv-1",
    "namaAyah": "Haryanto",
    "namaIbu": "Lestari",
    "alamat": "Dusun Sukamaju, Karang Anyar"
  },
  {
    "id": "siswa-xi-dkv-2",
    "nis": "242102",
    "nisn": "0078921346",
    "nama": "Panji Gumilang",
    "jenisKelamin": "L",
    "tempatLahir": "Srigading",
    "tanggalLahir": "2007-10-10",
    "agama": "Islam",
    "rombelId": "rombel-xi-dkv-1",
    "namaAyah": "Jumadi",
    "namaIbu": "Rukmiati",
    "alamat": "Srigading, Labuhan Maringgai"
  },
  {
    "id": "siswa-xi-4",
    "nis": "243101",
    "nisn": "0079012345",
    "nama": "Rizky Ramadhan",
    "jenisKelamin": "L",
    "tempatLahir": "Karang Anyar",
    "tanggalLahir": "2007-08-11",
    "agama": "Islam",
    "rombelId": "rombel-xi-pbs-1",
    "namaAyah": "Mansyur",
    "namaIbu": "Rukmini",
    "alamat": "Karang Anyar, Labuhan Maringgai"
  },
  {
    "id": "siswa-xi-pbs-2",
    "nis": "243102",
    "nisn": "0079012346",
    "nama": "Qori Nur Azizah",
    "jenisKelamin": "P",
    "tempatLahir": "Labuhan Maringgai",
    "tanggalLahir": "2007-12-05",
    "agama": "Islam",
    "rombelId": "rombel-xi-pbs-1",
    "namaAyah": "Ikhsan",
    "namaIbu": "Fatmawati",
    "alamat": "Karang Anyar, Labuhan Maringgai"
  },
  {
    "id": "siswa-x-akl-1",
    "nis": "254101",
    "nisn": "0081012341",
    "nama": "Anisa Rahmawati",
    "jenisKelamin": "P",
    "tempatLahir": "Labuhan Maringgai",
    "tanggalLahir": "2008-02-17",
    "agama": "Islam",
    "rombelId": "rombel-x-akl-1",
    "namaAyah": "Riyanto",
    "namaIbu": "Wartini",
    "alamat": "Karang Anyar, Labuhan Maringgai"
  },
  {
    "id": "siswa-x-akl-2",
    "nis": "254102",
    "nisn": "0081012342",
    "nama": "Bagas Triyono",
    "jenisKelamin": "L",
    "tempatLahir": "Margasari",
    "tanggalLahir": "2008-06-08",
    "agama": "Islam",
    "rombelId": "rombel-x-akl-1",
    "namaAyah": "Triyono",
    "namaIbu": "Suryani",
    "alamat": "Margasari, Labuhan Maringgai"
  },
  {
    "id": "siswa-x-pbs-1",
    "nis": "254201",
    "nisn": "0082012341",
    "nama": "Citra Wulandari",
    "jenisKelamin": "P",
    "tempatLahir": "Mataram Baru",
    "tanggalLahir": "2008-03-24",
    "agama": "Islam",
    "rombelId": "rombel-x-pbs-1",
    "namaAyah": "Hendra",
    "namaIbu": "Novita",
    "alamat": "Mataram Baru, Lampung Timur"
  },
  {
    "id": "siswa-x-pbs-2",
    "nis": "254202",
    "nisn": "0082012342",
    "nama": "Dedi Kurniawan",
    "jenisKelamin": "L",
    "tempatLahir": "Labuhan Maringgai",
    "tanggalLahir": "2008-09-12",
    "agama": "Islam",
    "rombelId": "rombel-x-pbs-1",
    "namaAyah": "Kurnia",
    "namaIbu": "Sulastri",
    "alamat": "Karang Anyar, Labuhan Maringgai"
  },
  {
    "id": "siswa-x-dkv1-1",
    "nis": "252101",
    "nisn": "0083012341",
    "nama": "Eka Pratama",
    "jenisKelamin": "L",
    "tempatLahir": "Labuhan Maringgai",
    "tanggalLahir": "2008-04-19",
    "agama": "Islam",
    "rombelId": "rombel-x-dkv-1",
    "namaAyah": "Pratama",
    "namaIbu": "Sri Rezeki",
    "alamat": "Karang Anyar, Labuhan Maringgai"
  },
  {
    "id": "siswa-x-dkv1-2",
    "nis": "252102",
    "nisn": "0083012342",
    "nama": "Fani Oktaviani",
    "jenisKelamin": "P",
    "tempatLahir": "Srigading",
    "tanggalLahir": "2008-10-03",
    "agama": "Islam",
    "rombelId": "rombel-x-dkv-1",
    "namaAyah": "Kuswanto",
    "namaIbu": "Laila",
    "alamat": "Srigading, Labuhan Maringgai"
  },
  {
    "id": "siswa-x-dkv2-1",
    "nis": "252201",
    "nisn": "0084012341",
    "nama": "Gilang Ramadhan",
    "jenisKelamin": "L",
    "tempatLahir": "Labuhan Maringgai",
    "tanggalLahir": "2008-09-28",
    "agama": "Islam",
    "rombelId": "rombel-x-dkv-2",
    "namaAyah": "Suwandi",
    "namaIbu": "Kastini",
    "alamat": "Karang Anyar, Labuhan Maringgai"
  },
  {
    "id": "siswa-x-dkv2-2",
    "nis": "252202",
    "nisn": "0084012342",
    "nama": "Hani Safitri",
    "jenisKelamin": "P",
    "tempatLahir": "Margasari",
    "tanggalLahir": "2008-01-30",
    "agama": "Islam",
    "rombelId": "rombel-x-dkv-2",
    "namaAyah": "Sapto",
    "namaIbu": "Rohana",
    "alamat": "Margasari, Labuhan Maringgai"
  },
  {
    "id": "siswa-x-dkv3-1",
    "nis": "252301",
    "nisn": "0085012341",
    "nama": "Ilham Maulana",
    "jenisKelamin": "L",
    "tempatLahir": "Labuhan Maringgai",
    "tanggalLahir": "2008-05-14",
    "agama": "Islam",
    "rombelId": "rombel-x-dkv-3",
    "namaAyah": "Mustofa",
    "namaIbu": "Sumiatun",
    "alamat": "Karya Makmur, Labuhan Maringgai"
  },
  {
    "id": "siswa-x-dkv3-2",
    "nis": "252302",
    "nisn": "0085012342",
    "nama": "Julia Permata",
    "jenisKelamin": "P",
    "tempatLahir": "Karang Anyar",
    "tanggalLahir": "2008-07-22",
    "agama": "Islam",
    "rombelId": "rombel-x-dkv-3",
    "namaAyah": "Jumari",
    "namaIbu": "Mulyati",
    "alamat": "Karang Anyar, Labuhan Maringgai"
  },
  {
    "id": "siswa-x-to1-1",
    "nis": "251101",
    "nisn": "0086012341",
    "nama": "Bagus Setiawan",
    "jenisKelamin": "L",
    "tempatLahir": "Labuhan Maringgai",
    "tanggalLahir": "2008-01-15",
    "agama": "Islam",
    "rombelId": "rombel-x-tsm-1",
    "namaAyah": "Gunawan",
    "namaIbu": "Endang",
    "alamat": "Desa Karang Anyar, Labuhan Maringgai"
  },
  {
    "id": "siswa-x-to1-2",
    "nis": "251102",
    "nisn": "0086012342",
    "nama": "Kiki Andriansyah",
    "jenisKelamin": "L",
    "tempatLahir": "Mataram Baru",
    "tanggalLahir": "2008-08-09",
    "agama": "Islam",
    "rombelId": "rombel-x-tsm-1",
    "namaAyah": "Sobirin",
    "namaIbu": "Warsi",
    "alamat": "Mataram Baru, Lampung Timur"
  },
  {
    "id": "siswa-x-to2-1",
    "nis": "251201",
    "nisn": "0087012341",
    "nama": "Lukman Hakim",
    "jenisKelamin": "L",
    "tempatLahir": "Margasari",
    "tanggalLahir": "2008-03-11",
    "agama": "Islam",
    "rombelId": "rombel-x-to-2",
    "namaAyah": "Syukur",
    "namaIbu": "Sunarti",
    "alamat": "Margasari, Labuhan Maringgai"
  },
  {
    "id": "siswa-x-to2-2",
    "nis": "251202",
    "nisn": "0087012342",
    "nama": "M. Farel Alamsyah",
    "jenisKelamin": "L",
    "tempatLahir": "Karang Anyar",
    "tanggalLahir": "2008-11-19",
    "agama": "Islam",
    "rombelId": "rombel-x-to-2",
    "namaAyah": "Alam",
    "namaIbu": "Dianawati",
    "alamat": "Karang Anyar, Labuhan Maringgai"
  },
  {
    "id": "siswa-x-to3-1",
    "nis": "251301",
    "nisn": "0088012341",
    "nama": "Naufal Ariq",
    "jenisKelamin": "L",
    "tempatLahir": "Labuhan Maringgai",
    "tanggalLahir": "2008-04-05",
    "agama": "Islam",
    "rombelId": "rombel-x-to-3",
    "namaAyah": "Harun",
    "namaIbu": "Salbiah",
    "alamat": "Karang Anyar, Labuhan Maringgai"
  },
  {
    "id": "siswa-x-to3-2",
    "nis": "251302",
    "nisn": "0088012342",
    "nama": "Okta Viansyah",
    "jenisKelamin": "L",
    "tempatLahir": "Srigading",
    "tanggalLahir": "2008-10-18",
    "agama": "Islam",
    "rombelId": "rombel-x-to-3",
    "namaAyah": "Rifai",
    "namaIbu": "Hartini",
    "alamat": "Srigading, Labuhan Maringgai"
  }
];

export const defaultMataPelajaran: MataPelajaran[] = [
  // KELOMPOK UMUM
  { id: 'mapel-pabp', kode: 'PABP', nama: 'Pendidikan Agama Islam dan Budi Pekerti', kelompok: 'Kelompok Umum', kktp: 75, jenjang: ['SD', 'SMP', 'SMA', 'SMK'] },
  { id: 'mapel-pp', kode: 'PPKN', nama: 'Pendidikan Pancasila', kelompok: 'Kelompok Umum', kktp: 75, jenjang: ['SD', 'SMP', 'SMA', 'SMK'] },
  { id: 'mapel-indo', kode: 'BINDO', nama: 'Bahasa Indonesia', kelompok: 'Kelompok Umum', kktp: 75, jenjang: ['SD', 'SMP', 'SMA', 'SMK'] },
  { id: 'mapel-pjok', kode: 'PJOK', nama: 'Pendidikan Jasmani, Olahraga dan Kesehatan', kelompok: 'Kelompok Umum', kktp: 75, jenjang: ['SD', 'SMP', 'SMA', 'SMK'] },
  { id: 'mapel-sej', kode: 'SEJ', nama: 'Sejarah', kelompok: 'Kelompok Umum', kktp: 75, jenjang: ['SMA', 'SMK'] },
  { id: 'mapel-seni', kode: 'SENI', nama: 'Seni Budaya', kelompok: 'Kelompok Umum', kktp: 75, jenjang: ['SD', 'SMP', 'SMA', 'SMK'] },

  // KELOMPOK KEJURUAN
  { id: 'mapel-mat', kode: 'MTK', nama: 'Matematika', kelompok: 'Kejuruan: Konsentrasi Keahlian', kktp: 75, jenjang: ['SD', 'SMP', 'SMA', 'SMK'] },
  { id: 'mapel-inggris', kode: 'BING', nama: 'Bahasa Inggris', kelompok: 'Kejuruan: Konsentrasi Keahlian', kktp: 75, jenjang: ['SMP', 'SMA', 'SMK'] },
  { id: 'mapel-inf', kode: 'INF', nama: 'Informatika', kelompok: 'Kejuruan: Dasar Program Keahlian', kktp: 75, jenjang: ['SMP', 'SMA', 'SMK'] },
  { id: 'mapel-pipas', kode: 'PIPAS', nama: 'Projek Ilmu Pengetahuan Alam dan Sosial', kelompok: 'Kejuruan: Dasar Program Keahlian', kktp: 75, jenjang: ['SMK'] },
  { id: 'mapel-ddpk', kode: 'DDPK', nama: 'Dasar-dasar Program Keahlian', kelompok: 'Kejuruan: Dasar Program Keahlian', kktp: 75, jenjang: ['SMK'] },
  { id: 'mapel-ai', kode: 'AI', nama: 'Koding dan Kecerdasan Artifisial', kelompok: 'Mata Pelajaran Pilihan', kktp: 75, jenjang: ['SMK'] },
  { id: 'mapel-kk', kode: 'KK', nama: 'Konsentrasi Keahlian', kelompok: 'Kejuruan: Konsentrasi Keahlian', kktp: 75, jenjang: ['SMK'] },
  { id: 'mapel-kk-tsm', kode: 'KK-TSM', nama: 'Konsentrasi Keahlian Teknik Sepeda Motor', kelompok: 'Kejuruan: Konsentrasi Keahlian', kktp: 75, jenjang: ['SMK'] },
  { id: 'mapel-kk-dkv', kode: 'KK-DKV', nama: 'Konsentrasi Keahlian Desain Komunikasi Visual', kelompok: 'Kejuruan: Konsentrasi Keahlian', kktp: 75, jenjang: ['SMK'] },
  { id: 'mapel-pkk', kode: 'PKK', nama: 'Kreativitas, Inovasi dan Kewirausahaan', kelompok: 'Projek Kreatif dan Kewirausahaan (PKK)', kktp: 75, jenjang: ['SMK'] },
  { id: 'mapel-las', kode: 'LAS', nama: 'Pengelasan', kelompok: 'Mata Pelajaran Pilihan', kktp: 75, jenjang: ['SMK'] },
  { id: 'mapel-mso', kode: 'MSO', nama: 'Microsoft Office', kelompok: 'Mata Pelajaran Pilihan', kktp: 75, jenjang: ['SMK'] },
  { id: 'mapel-lps', kode: 'LPS', nama: 'Layanan Perbankan Syariah', kelompok: 'Mata Pelajaran Pilihan', kktp: 75, jenjang: ['SMK'] },

  // MULOK
  { id: 'mapel-pak', kode: 'PAK', nama: 'PAK', kelompok: 'Muatan Lokal', kktp: 75, jenjang: ['SD', 'SMP', 'SMA', 'SMK'] },
  { id: 'mapel-lampung', kode: 'BLAMPUNG', nama: 'Bahasa Lampung', kelompok: 'Muatan Lokal', kktp: 75, jenjang: ['SD', 'SMP', 'SMA', 'SMK'] }
];

export const defaultPembelajaran: Pembelajaran[] = [
  {
    "id": "pem-1",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-kk-tsm",
    "guruId": "guru-1"
  },
  {
    "id": "pem-2",
    "rombelId": "rombel-xi-tsm-1",
    "mapelId": "mapel-kk-tsm",
    "guruId": "guru-1"
  },
  {
    "id": "pem-3",
    "rombelId": "rombel-xi-dkv-1",
    "mapelId": "mapel-kk-dkv",
    "guruId": "guru-2"
  },
  {
    "id": "pem-4",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-indo",
    "guruId": "guru-4"
  },
  {
    "id": "pem-5",
    "rombelId": "rombel-x-tsm-1",
    "mapelId": "mapel-indo",
    "guruId": "guru-4"
  },
  {
    "id": "pem-6",
    "rombelId": "rombel-x-akl-1",
    "mapelId": "mapel-mat",
    "guruId": "guru-3"
  },
  {
    "id": "pem-7",
    "rombelId": "rombel-x-pbs-1",
    "mapelId": "mapel-mat",
    "guruId": "guru-3"
  },
  {
    "id": "pem-8",
    "rombelId": "rombel-x-dkv-1",
    "mapelId": "mapel-ai",
    "guruId": "guru-2"
  },
  {
    "id": "pem-9",
    "rombelId": "rombel-x-dkv-2",
    "mapelId": "mapel-ai",
    "guruId": "guru-2"
  },
  {
    "id": "pem-10",
    "rombelId": "rombel-x-dkv-3",
    "mapelId": "mapel-ai",
    "guruId": "guru-2"
  },
  {
    "id": "pem-11",
    "rombelId": "rombel-x-to-2",
    "mapelId": "mapel-indo",
    "guruId": "guru-4"
  },
  {
    "id": "pem-12",
    "rombelId": "rombel-x-to-3",
    "mapelId": "mapel-indo",
    "guruId": "guru-4"
  },
  {
    "id": "pem-13",
    "rombelId": "rombel-xi-pbs-1",
    "mapelId": "mapel-mat",
    "guruId": "guru-3"
  },
  {
    "id": "pem-14",
    "rombelId": "rombel-xii-dkv-1",
    "mapelId": "mapel-kk-dkv",
    "guruId": "guru-2"
  },
  {
    "id": "pem-15",
    "rombelId": "rombel-xii-pbs-1",
    "mapelId": "mapel-lps",
    "guruId": "guru-3"
  }
];

export const defaultTujuanPembelajaran: TujuanPembelajaran[] = [
  { id: 'tp-tsm-1', rombelId: 'rombel-xii-tsm-1', mapelId: 'mapel-kk-tsm', semester: '1 (Ganjil)', kodeTp: 'TP 1', deskripsi: 'mendiagnosis dan memperbaiki gangguan sistem injeksi bahan bakar (EFI/PGM-FI)' },
  { id: 'tp-tsm-2', rombelId: 'rombel-xii-tsm-1', mapelId: 'mapel-kk-tsm', semester: '1 (Ganjil)', kodeTp: 'TP 2', deskripsi: 'melakukan overhaul mesin dan penggantian komponen kepala silinder' },
  { id: 'tp-tsm-3', rombelId: 'rombel-xii-tsm-1', mapelId: 'mapel-kk-tsm', semester: '1 (Ganjil)', kodeTp: 'TP 3', deskripsi: 'menganalisis dan menyetel sistem transmisi otomatis (CVT)' },
  { id: 'tp-tsm-4', rombelId: 'rombel-xii-tsm-1', mapelId: 'mapel-kk-tsm', semester: '1 (Ganjil)', kodeTp: 'TP 4', deskripsi: 'merawat dan memperbaiki sistem kelistrikan bodi serta instrumen dashboard' }
];

export const defaultNilaiSiswa: NilaiSiswa[] = [
  {
    "id": "nilai-siswa-xii-1-pabp",
    "siswaId": "siswa-xii-1",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-1-pp",
    "siswaId": "siswa-xii-1",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 82,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-1-indo",
    "siswaId": "siswa-xii-1",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 84
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-1-mat",
    "siswaId": "siswa-xii-1",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 80
    },
    "nilaiSAS": 82,
    "nilaiAkhir": 81,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-1-inggris",
    "siswaId": "siswa-xii-1",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 83
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-1-kejuruan",
    "siswaId": "siswa-xii-1",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-1-pak",
    "siswaId": "siswa-xii-1",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-1-lampung",
    "siswaId": "siswa-xii-1",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-2-pabp",
    "siswaId": "siswa-xii-2",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-2-pp",
    "siswaId": "siswa-xii-2",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 83
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-2-indo",
    "siswaId": "siswa-xii-2",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-2-mat",
    "siswaId": "siswa-xii-2",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 81
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 82,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-2-inggris",
    "siswaId": "siswa-xii-2",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 84
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-2-kejuruan",
    "siswaId": "siswa-xii-2",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 89,
    "nilaiAkhir": 88,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-2-pak",
    "siswaId": "siswa-xii-2",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-2-lampung",
    "siswaId": "siswa-xii-2",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-3-pabp",
    "siswaId": "siswa-xii-3",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-3-pp",
    "siswaId": "siswa-xii-3",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 84
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-3-indo",
    "siswaId": "siswa-xii-3",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-3-mat",
    "siswaId": "siswa-xii-3",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-3-inggris",
    "siswaId": "siswa-xii-3",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-3-kejuruan",
    "siswaId": "siswa-xii-3",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 88
    },
    "nilaiSAS": 90,
    "nilaiAkhir": 89,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-3-pak",
    "siswaId": "siswa-xii-3",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-3-lampung",
    "siswaId": "siswa-xii-3",
    "rombelId": "rombel-xii-tsm-1",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-dkv-1-pabp",
    "siswaId": "siswa-xii-dkv-1",
    "rombelId": "rombel-xii-dkv-1",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 88
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 88,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-dkv-1-pp",
    "siswaId": "siswa-xii-dkv-1",
    "rombelId": "rombel-xii-dkv-1",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-dkv-1-indo",
    "siswaId": "siswa-xii-dkv-1",
    "rombelId": "rombel-xii-dkv-1",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-dkv-1-mat",
    "siswaId": "siswa-xii-dkv-1",
    "rombelId": "rombel-xii-dkv-1",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 83
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-dkv-1-inggris",
    "siswaId": "siswa-xii-dkv-1",
    "rombelId": "rombel-xii-dkv-1",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-dkv-1-kejuruan",
    "siswaId": "siswa-xii-dkv-1",
    "rombelId": "rombel-xii-dkv-1",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 89
    },
    "nilaiSAS": 91,
    "nilaiAkhir": 90,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-dkv-1-pak",
    "siswaId": "siswa-xii-dkv-1",
    "rombelId": "rombel-xii-dkv-1",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-dkv-1-lampung",
    "siswaId": "siswa-xii-dkv-1",
    "rombelId": "rombel-xii-dkv-1",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-dkv-2-pabp",
    "siswaId": "siswa-xii-dkv-2",
    "rombelId": "rombel-xii-dkv-1",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 89
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 89,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-dkv-2-pp",
    "siswaId": "siswa-xii-dkv-2",
    "rombelId": "rombel-xii-dkv-1",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-dkv-2-indo",
    "siswaId": "siswa-xii-dkv-2",
    "rombelId": "rombel-xii-dkv-1",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 88
    },
    "nilaiSAS": 89,
    "nilaiAkhir": 88,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-dkv-2-mat",
    "siswaId": "siswa-xii-dkv-2",
    "rombelId": "rombel-xii-dkv-1",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 84
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-dkv-2-inggris",
    "siswaId": "siswa-xii-dkv-2",
    "rombelId": "rombel-xii-dkv-1",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-dkv-2-kejuruan",
    "siswaId": "siswa-xii-dkv-2",
    "rombelId": "rombel-xii-dkv-1",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 90
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-dkv-2-pak",
    "siswaId": "siswa-xii-dkv-2",
    "rombelId": "rombel-xii-dkv-1",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-dkv-2-lampung",
    "siswaId": "siswa-xii-dkv-2",
    "rombelId": "rombel-xii-dkv-1",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-pbs-1-pabp",
    "siswaId": "siswa-xii-pbs-1",
    "rombelId": "rombel-xii-pbs-1",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 90
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-pbs-1-pp",
    "siswaId": "siswa-xii-pbs-1",
    "rombelId": "rombel-xii-pbs-1",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 82,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-pbs-1-indo",
    "siswaId": "siswa-xii-pbs-1",
    "rombelId": "rombel-xii-pbs-1",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 84
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-pbs-1-mat",
    "siswaId": "siswa-xii-pbs-1",
    "rombelId": "rombel-xii-pbs-1",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-pbs-1-inggris",
    "siswaId": "siswa-xii-pbs-1",
    "rombelId": "rombel-xii-pbs-1",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 88
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-pbs-1-kejuruan",
    "siswaId": "siswa-xii-pbs-1",
    "rombelId": "rombel-xii-pbs-1",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 89,
    "nilaiAkhir": 88,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-pbs-1-pak",
    "siswaId": "siswa-xii-pbs-1",
    "rombelId": "rombel-xii-pbs-1",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-pbs-1-lampung",
    "siswaId": "siswa-xii-pbs-1",
    "rombelId": "rombel-xii-pbs-1",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-pbs-2-pabp",
    "siswaId": "siswa-xii-pbs-2",
    "rombelId": "rombel-xii-pbs-1",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-pbs-2-pp",
    "siswaId": "siswa-xii-pbs-2",
    "rombelId": "rombel-xii-pbs-1",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-pbs-2-indo",
    "siswaId": "siswa-xii-pbs-2",
    "rombelId": "rombel-xii-pbs-1",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-pbs-2-mat",
    "siswaId": "siswa-xii-pbs-2",
    "rombelId": "rombel-xii-pbs-1",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 82,
    "nilaiAkhir": 81,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-pbs-2-inggris",
    "siswaId": "siswa-xii-pbs-2",
    "rombelId": "rombel-xii-pbs-1",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 83
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-pbs-2-kejuruan",
    "siswaId": "siswa-xii-pbs-2",
    "rombelId": "rombel-xii-pbs-1",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 90,
    "nilaiAkhir": 89,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-pbs-2-pak",
    "siswaId": "siswa-xii-pbs-2",
    "rombelId": "rombel-xii-pbs-1",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xii-pbs-2-lampung",
    "siswaId": "siswa-xii-pbs-2",
    "rombelId": "rombel-xii-pbs-1",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-1-pabp",
    "siswaId": "siswa-xi-1",
    "rombelId": "rombel-xi-tsm-1",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-1-pp",
    "siswaId": "siswa-xi-1",
    "rombelId": "rombel-xi-tsm-1",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 83
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-1-indo",
    "siswaId": "siswa-xi-1",
    "rombelId": "rombel-xi-tsm-1",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-1-mat",
    "siswaId": "siswa-xi-1",
    "rombelId": "rombel-xi-tsm-1",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 82,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-1-inggris",
    "siswaId": "siswa-xi-1",
    "rombelId": "rombel-xi-tsm-1",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 84
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-1-kejuruan",
    "siswaId": "siswa-xi-1",
    "rombelId": "rombel-xi-tsm-1",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 88
    },
    "nilaiSAS": 91,
    "nilaiAkhir": 90,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-1-pak",
    "siswaId": "siswa-xi-1",
    "rombelId": "rombel-xi-tsm-1",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-1-lampung",
    "siswaId": "siswa-xi-1",
    "rombelId": "rombel-xi-tsm-1",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-2-pabp",
    "siswaId": "siswa-xi-2",
    "rombelId": "rombel-xi-tsm-1",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 88,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-2-pp",
    "siswaId": "siswa-xi-2",
    "rombelId": "rombel-xi-tsm-1",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 84
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-2-indo",
    "siswaId": "siswa-xi-2",
    "rombelId": "rombel-xi-tsm-1",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-2-mat",
    "siswaId": "siswa-xi-2",
    "rombelId": "rombel-xi-tsm-1",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 80
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-2-inggris",
    "siswaId": "siswa-xi-2",
    "rombelId": "rombel-xi-tsm-1",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-2-kejuruan",
    "siswaId": "siswa-xi-2",
    "rombelId": "rombel-xi-tsm-1",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 89
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-2-pak",
    "siswaId": "siswa-xi-2",
    "rombelId": "rombel-xi-tsm-1",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-2-lampung",
    "siswaId": "siswa-xi-2",
    "rombelId": "rombel-xi-tsm-1",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-3-pabp",
    "siswaId": "siswa-xi-3",
    "rombelId": "rombel-xi-dkv-1",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 88
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 89,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-3-pp",
    "siswaId": "siswa-xi-3",
    "rombelId": "rombel-xi-dkv-1",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-3-indo",
    "siswaId": "siswa-xi-3",
    "rombelId": "rombel-xi-dkv-1",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 88
    },
    "nilaiSAS": 89,
    "nilaiAkhir": 88,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-3-mat",
    "siswaId": "siswa-xi-3",
    "rombelId": "rombel-xi-dkv-1",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 81
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-3-inggris",
    "siswaId": "siswa-xi-3",
    "rombelId": "rombel-xi-dkv-1",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-3-kejuruan",
    "siswaId": "siswa-xi-3",
    "rombelId": "rombel-xi-dkv-1",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 90
    },
    "nilaiSAS": 89,
    "nilaiAkhir": 88,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-3-pak",
    "siswaId": "siswa-xi-3",
    "rombelId": "rombel-xi-dkv-1",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-3-lampung",
    "siswaId": "siswa-xi-3",
    "rombelId": "rombel-xi-dkv-1",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-dkv-2-pabp",
    "siswaId": "siswa-xi-dkv-2",
    "rombelId": "rombel-xi-dkv-1",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 89
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-dkv-2-pp",
    "siswaId": "siswa-xi-dkv-2",
    "rombelId": "rombel-xi-dkv-1",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 82,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-dkv-2-indo",
    "siswaId": "siswa-xi-dkv-2",
    "rombelId": "rombel-xi-dkv-1",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 84
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-dkv-2-mat",
    "siswaId": "siswa-xi-dkv-2",
    "rombelId": "rombel-xi-dkv-1",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-dkv-2-inggris",
    "siswaId": "siswa-xi-dkv-2",
    "rombelId": "rombel-xi-dkv-1",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-dkv-2-kejuruan",
    "siswaId": "siswa-xi-dkv-2",
    "rombelId": "rombel-xi-dkv-1",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 90,
    "nilaiAkhir": 89,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-dkv-2-pak",
    "siswaId": "siswa-xi-dkv-2",
    "rombelId": "rombel-xi-dkv-1",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-dkv-2-lampung",
    "siswaId": "siswa-xi-dkv-2",
    "rombelId": "rombel-xi-dkv-1",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-4-pabp",
    "siswaId": "siswa-xi-4",
    "rombelId": "rombel-xi-pbs-1",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 90
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-4-pp",
    "siswaId": "siswa-xi-4",
    "rombelId": "rombel-xi-pbs-1",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-4-indo",
    "siswaId": "siswa-xi-4",
    "rombelId": "rombel-xi-pbs-1",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-4-mat",
    "siswaId": "siswa-xi-4",
    "rombelId": "rombel-xi-pbs-1",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 83
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-4-inggris",
    "siswaId": "siswa-xi-4",
    "rombelId": "rombel-xi-pbs-1",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 88
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-4-kejuruan",
    "siswaId": "siswa-xi-4",
    "rombelId": "rombel-xi-pbs-1",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 91,
    "nilaiAkhir": 90,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-4-pak",
    "siswaId": "siswa-xi-4",
    "rombelId": "rombel-xi-pbs-1",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-4-lampung",
    "siswaId": "siswa-xi-4",
    "rombelId": "rombel-xi-pbs-1",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-pbs-2-pabp",
    "siswaId": "siswa-xi-pbs-2",
    "rombelId": "rombel-xi-pbs-1",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-pbs-2-pp",
    "siswaId": "siswa-xi-pbs-2",
    "rombelId": "rombel-xi-pbs-1",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-pbs-2-indo",
    "siswaId": "siswa-xi-pbs-2",
    "rombelId": "rombel-xi-pbs-1",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-pbs-2-mat",
    "siswaId": "siswa-xi-pbs-2",
    "rombelId": "rombel-xi-pbs-1",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 84
    },
    "nilaiSAS": 82,
    "nilaiAkhir": 81,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-pbs-2-inggris",
    "siswaId": "siswa-xi-pbs-2",
    "rombelId": "rombel-xi-pbs-1",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 83
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-pbs-2-kejuruan",
    "siswaId": "siswa-xi-pbs-2",
    "rombelId": "rombel-xi-pbs-1",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 88
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-pbs-2-pak",
    "siswaId": "siswa-xi-pbs-2",
    "rombelId": "rombel-xi-pbs-1",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-xi-pbs-2-lampung",
    "siswaId": "siswa-xi-pbs-2",
    "rombelId": "rombel-xi-pbs-1",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-akl-1-pabp",
    "siswaId": "siswa-x-akl-1",
    "rombelId": "rombel-x-akl-1",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 88,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-akl-1-pp",
    "siswaId": "siswa-x-akl-1",
    "rombelId": "rombel-x-akl-1",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 83
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-akl-1-indo",
    "siswaId": "siswa-x-akl-1",
    "rombelId": "rombel-x-akl-1",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-akl-1-mat",
    "siswaId": "siswa-x-akl-1",
    "rombelId": "rombel-x-akl-1",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 82,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-akl-1-inggris",
    "siswaId": "siswa-x-akl-1",
    "rombelId": "rombel-x-akl-1",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 84
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-akl-1-kejuruan",
    "siswaId": "siswa-x-akl-1",
    "rombelId": "rombel-x-akl-1",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 89
    },
    "nilaiSAS": 89,
    "nilaiAkhir": 88,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-akl-1-pak",
    "siswaId": "siswa-x-akl-1",
    "rombelId": "rombel-x-akl-1",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-akl-1-lampung",
    "siswaId": "siswa-x-akl-1",
    "rombelId": "rombel-x-akl-1",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-akl-2-pabp",
    "siswaId": "siswa-x-akl-2",
    "rombelId": "rombel-x-akl-1",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 89,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-akl-2-pp",
    "siswaId": "siswa-x-akl-2",
    "rombelId": "rombel-x-akl-1",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 84
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-akl-2-indo",
    "siswaId": "siswa-x-akl-2",
    "rombelId": "rombel-x-akl-1",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 88
    },
    "nilaiSAS": 89,
    "nilaiAkhir": 88,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-akl-2-mat",
    "siswaId": "siswa-x-akl-2",
    "rombelId": "rombel-x-akl-1",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-akl-2-inggris",
    "siswaId": "siswa-x-akl-2",
    "rombelId": "rombel-x-akl-1",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-akl-2-kejuruan",
    "siswaId": "siswa-x-akl-2",
    "rombelId": "rombel-x-akl-1",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 90
    },
    "nilaiSAS": 90,
    "nilaiAkhir": 89,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-akl-2-pak",
    "siswaId": "siswa-x-akl-2",
    "rombelId": "rombel-x-akl-1",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-akl-2-lampung",
    "siswaId": "siswa-x-akl-2",
    "rombelId": "rombel-x-akl-1",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-pbs-1-pabp",
    "siswaId": "siswa-x-pbs-1",
    "rombelId": "rombel-x-pbs-1",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 88
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-pbs-1-pp",
    "siswaId": "siswa-x-pbs-1",
    "rombelId": "rombel-x-pbs-1",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 82,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-pbs-1-indo",
    "siswaId": "siswa-x-pbs-1",
    "rombelId": "rombel-x-pbs-1",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 84
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-pbs-1-mat",
    "siswaId": "siswa-x-pbs-1",
    "rombelId": "rombel-x-pbs-1",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-pbs-1-inggris",
    "siswaId": "siswa-x-pbs-1",
    "rombelId": "rombel-x-pbs-1",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-pbs-1-kejuruan",
    "siswaId": "siswa-x-pbs-1",
    "rombelId": "rombel-x-pbs-1",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 91,
    "nilaiAkhir": 90,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-pbs-1-pak",
    "siswaId": "siswa-x-pbs-1",
    "rombelId": "rombel-x-pbs-1",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-pbs-1-lampung",
    "siswaId": "siswa-x-pbs-1",
    "rombelId": "rombel-x-pbs-1",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-pbs-2-pabp",
    "siswaId": "siswa-x-pbs-2",
    "rombelId": "rombel-x-pbs-1",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 89
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-pbs-2-pp",
    "siswaId": "siswa-x-pbs-2",
    "rombelId": "rombel-x-pbs-1",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-pbs-2-indo",
    "siswaId": "siswa-x-pbs-2",
    "rombelId": "rombel-x-pbs-1",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-pbs-2-mat",
    "siswaId": "siswa-x-pbs-2",
    "rombelId": "rombel-x-pbs-1",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 80
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-pbs-2-inggris",
    "siswaId": "siswa-x-pbs-2",
    "rombelId": "rombel-x-pbs-1",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-pbs-2-kejuruan",
    "siswaId": "siswa-x-pbs-2",
    "rombelId": "rombel-x-pbs-1",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-pbs-2-pak",
    "siswaId": "siswa-x-pbs-2",
    "rombelId": "rombel-x-pbs-1",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-pbs-2-lampung",
    "siswaId": "siswa-x-pbs-2",
    "rombelId": "rombel-x-pbs-1",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv1-1-pabp",
    "siswaId": "siswa-x-dkv1-1",
    "rombelId": "rombel-x-dkv-1",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 90
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv1-1-pp",
    "siswaId": "siswa-x-dkv1-1",
    "rombelId": "rombel-x-dkv-1",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv1-1-indo",
    "siswaId": "siswa-x-dkv1-1",
    "rombelId": "rombel-x-dkv-1",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv1-1-mat",
    "siswaId": "siswa-x-dkv1-1",
    "rombelId": "rombel-x-dkv-1",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 81
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv1-1-inggris",
    "siswaId": "siswa-x-dkv1-1",
    "rombelId": "rombel-x-dkv-1",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 88
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv1-1-kejuruan",
    "siswaId": "siswa-x-dkv1-1",
    "rombelId": "rombel-x-dkv-1",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 88
    },
    "nilaiSAS": 89,
    "nilaiAkhir": 88,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv1-1-pak",
    "siswaId": "siswa-x-dkv1-1",
    "rombelId": "rombel-x-dkv-1",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv1-1-lampung",
    "siswaId": "siswa-x-dkv1-1",
    "rombelId": "rombel-x-dkv-1",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv1-2-pabp",
    "siswaId": "siswa-x-dkv1-2",
    "rombelId": "rombel-x-dkv-1",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 88,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv1-2-pp",
    "siswaId": "siswa-x-dkv1-2",
    "rombelId": "rombel-x-dkv-1",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv1-2-indo",
    "siswaId": "siswa-x-dkv1-2",
    "rombelId": "rombel-x-dkv-1",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv1-2-mat",
    "siswaId": "siswa-x-dkv1-2",
    "rombelId": "rombel-x-dkv-1",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 82,
    "nilaiAkhir": 81,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv1-2-inggris",
    "siswaId": "siswa-x-dkv1-2",
    "rombelId": "rombel-x-dkv-1",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 83
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv1-2-kejuruan",
    "siswaId": "siswa-x-dkv1-2",
    "rombelId": "rombel-x-dkv-1",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 89
    },
    "nilaiSAS": 90,
    "nilaiAkhir": 89,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv1-2-pak",
    "siswaId": "siswa-x-dkv1-2",
    "rombelId": "rombel-x-dkv-1",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv1-2-lampung",
    "siswaId": "siswa-x-dkv1-2",
    "rombelId": "rombel-x-dkv-1",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv2-1-pabp",
    "siswaId": "siswa-x-dkv2-1",
    "rombelId": "rombel-x-dkv-2",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 89,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv2-1-pp",
    "siswaId": "siswa-x-dkv2-1",
    "rombelId": "rombel-x-dkv-2",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 83
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv2-1-indo",
    "siswaId": "siswa-x-dkv2-1",
    "rombelId": "rombel-x-dkv-2",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 88
    },
    "nilaiSAS": 89,
    "nilaiAkhir": 88,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv2-1-mat",
    "siswaId": "siswa-x-dkv2-1",
    "rombelId": "rombel-x-dkv-2",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 83
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 82,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv2-1-inggris",
    "siswaId": "siswa-x-dkv2-1",
    "rombelId": "rombel-x-dkv-2",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 84
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv2-1-kejuruan",
    "siswaId": "siswa-x-dkv2-1",
    "rombelId": "rombel-x-dkv-2",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 90
    },
    "nilaiSAS": 91,
    "nilaiAkhir": 90,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv2-1-pak",
    "siswaId": "siswa-x-dkv2-1",
    "rombelId": "rombel-x-dkv-2",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv2-1-lampung",
    "siswaId": "siswa-x-dkv2-1",
    "rombelId": "rombel-x-dkv-2",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv2-2-pabp",
    "siswaId": "siswa-x-dkv2-2",
    "rombelId": "rombel-x-dkv-2",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv2-2-pp",
    "siswaId": "siswa-x-dkv2-2",
    "rombelId": "rombel-x-dkv-2",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 84
    },
    "nilaiSAS": 82,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv2-2-indo",
    "siswaId": "siswa-x-dkv2-2",
    "rombelId": "rombel-x-dkv-2",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 84
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv2-2-mat",
    "siswaId": "siswa-x-dkv2-2",
    "rombelId": "rombel-x-dkv-2",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 84
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv2-2-inggris",
    "siswaId": "siswa-x-dkv2-2",
    "rombelId": "rombel-x-dkv-2",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv2-2-kejuruan",
    "siswaId": "siswa-x-dkv2-2",
    "rombelId": "rombel-x-dkv-2",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv2-2-pak",
    "siswaId": "siswa-x-dkv2-2",
    "rombelId": "rombel-x-dkv-2",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv2-2-lampung",
    "siswaId": "siswa-x-dkv2-2",
    "rombelId": "rombel-x-dkv-2",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv3-1-pabp",
    "siswaId": "siswa-x-dkv3-1",
    "rombelId": "rombel-x-dkv-3",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 88
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv3-1-pp",
    "siswaId": "siswa-x-dkv3-1",
    "rombelId": "rombel-x-dkv-3",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv3-1-indo",
    "siswaId": "siswa-x-dkv3-1",
    "rombelId": "rombel-x-dkv-3",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv3-1-mat",
    "siswaId": "siswa-x-dkv3-1",
    "rombelId": "rombel-x-dkv-3",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv3-1-inggris",
    "siswaId": "siswa-x-dkv3-1",
    "rombelId": "rombel-x-dkv-3",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv3-1-kejuruan",
    "siswaId": "siswa-x-dkv3-1",
    "rombelId": "rombel-x-dkv-3",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 89,
    "nilaiAkhir": 88,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv3-1-pak",
    "siswaId": "siswa-x-dkv3-1",
    "rombelId": "rombel-x-dkv-3",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv3-1-lampung",
    "siswaId": "siswa-x-dkv3-1",
    "rombelId": "rombel-x-dkv-3",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv3-2-pabp",
    "siswaId": "siswa-x-dkv3-2",
    "rombelId": "rombel-x-dkv-3",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 89
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv3-2-pp",
    "siswaId": "siswa-x-dkv3-2",
    "rombelId": "rombel-x-dkv-3",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv3-2-indo",
    "siswaId": "siswa-x-dkv3-2",
    "rombelId": "rombel-x-dkv-3",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv3-2-mat",
    "siswaId": "siswa-x-dkv3-2",
    "rombelId": "rombel-x-dkv-3",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv3-2-inggris",
    "siswaId": "siswa-x-dkv3-2",
    "rombelId": "rombel-x-dkv-3",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv3-2-kejuruan",
    "siswaId": "siswa-x-dkv3-2",
    "rombelId": "rombel-x-dkv-3",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 88
    },
    "nilaiSAS": 90,
    "nilaiAkhir": 89,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv3-2-pak",
    "siswaId": "siswa-x-dkv3-2",
    "rombelId": "rombel-x-dkv-3",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-dkv3-2-lampung",
    "siswaId": "siswa-x-dkv3-2",
    "rombelId": "rombel-x-dkv-3",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to1-1-pabp",
    "siswaId": "siswa-x-to1-1",
    "rombelId": "rombel-x-tsm-1",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 90
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 88,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to1-1-pp",
    "siswaId": "siswa-x-to1-1",
    "rombelId": "rombel-x-tsm-1",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to1-1-indo",
    "siswaId": "siswa-x-to1-1",
    "rombelId": "rombel-x-tsm-1",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to1-1-mat",
    "siswaId": "siswa-x-to1-1",
    "rombelId": "rombel-x-tsm-1",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to1-1-inggris",
    "siswaId": "siswa-x-to1-1",
    "rombelId": "rombel-x-tsm-1",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 88
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to1-1-kejuruan",
    "siswaId": "siswa-x-to1-1",
    "rombelId": "rombel-x-tsm-1",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 89
    },
    "nilaiSAS": 91,
    "nilaiAkhir": 90,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to1-1-pak",
    "siswaId": "siswa-x-to1-1",
    "rombelId": "rombel-x-tsm-1",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to1-1-lampung",
    "siswaId": "siswa-x-to1-1",
    "rombelId": "rombel-x-tsm-1",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to1-2-pabp",
    "siswaId": "siswa-x-to1-2",
    "rombelId": "rombel-x-tsm-1",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 89,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to1-2-pp",
    "siswaId": "siswa-x-to1-2",
    "rombelId": "rombel-x-tsm-1",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to1-2-indo",
    "siswaId": "siswa-x-to1-2",
    "rombelId": "rombel-x-tsm-1",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 88
    },
    "nilaiSAS": 89,
    "nilaiAkhir": 88,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to1-2-mat",
    "siswaId": "siswa-x-to1-2",
    "rombelId": "rombel-x-tsm-1",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 80
    },
    "nilaiSAS": 82,
    "nilaiAkhir": 81,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to1-2-inggris",
    "siswaId": "siswa-x-to1-2",
    "rombelId": "rombel-x-tsm-1",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 83
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to1-2-kejuruan",
    "siswaId": "siswa-x-to1-2",
    "rombelId": "rombel-x-tsm-1",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 90
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to1-2-pak",
    "siswaId": "siswa-x-to1-2",
    "rombelId": "rombel-x-tsm-1",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to1-2-lampung",
    "siswaId": "siswa-x-to1-2",
    "rombelId": "rombel-x-tsm-1",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to2-1-pabp",
    "siswaId": "siswa-x-to2-1",
    "rombelId": "rombel-x-to-2",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to2-1-pp",
    "siswaId": "siswa-x-to2-1",
    "rombelId": "rombel-x-to-2",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 83
    },
    "nilaiSAS": 82,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to2-1-indo",
    "siswaId": "siswa-x-to2-1",
    "rombelId": "rombel-x-to-2",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 84
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to2-1-mat",
    "siswaId": "siswa-x-to2-1",
    "rombelId": "rombel-x-to-2",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 81
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 82,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to2-1-inggris",
    "siswaId": "siswa-x-to2-1",
    "rombelId": "rombel-x-to-2",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 84
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to2-1-kejuruan",
    "siswaId": "siswa-x-to2-1",
    "rombelId": "rombel-x-to-2",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 89,
    "nilaiAkhir": 88,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to2-1-pak",
    "siswaId": "siswa-x-to2-1",
    "rombelId": "rombel-x-to-2",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to2-1-lampung",
    "siswaId": "siswa-x-to2-1",
    "rombelId": "rombel-x-to-2",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to2-2-pabp",
    "siswaId": "siswa-x-to2-2",
    "rombelId": "rombel-x-to-2",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to2-2-pp",
    "siswaId": "siswa-x-to2-2",
    "rombelId": "rombel-x-to-2",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 84
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to2-2-indo",
    "siswaId": "siswa-x-to2-2",
    "rombelId": "rombel-x-to-2",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to2-2-mat",
    "siswaId": "siswa-x-to2-2",
    "rombelId": "rombel-x-to-2",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to2-2-inggris",
    "siswaId": "siswa-x-to2-2",
    "rombelId": "rombel-x-to-2",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to2-2-kejuruan",
    "siswaId": "siswa-x-to2-2",
    "rombelId": "rombel-x-to-2",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 90,
    "nilaiAkhir": 89,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to2-2-pak",
    "siswaId": "siswa-x-to2-2",
    "rombelId": "rombel-x-to-2",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to2-2-lampung",
    "siswaId": "siswa-x-to2-2",
    "rombelId": "rombel-x-to-2",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to3-1-pabp",
    "siswaId": "siswa-x-to3-1",
    "rombelId": "rombel-x-to-3",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 88
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to3-1-pp",
    "siswaId": "siswa-x-to3-1",
    "rombelId": "rombel-x-to-3",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 84,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to3-1-indo",
    "siswaId": "siswa-x-to3-1",
    "rombelId": "rombel-x-to-3",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to3-1-mat",
    "siswaId": "siswa-x-to3-1",
    "rombelId": "rombel-x-to-3",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 83
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 84,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to3-1-inggris",
    "siswaId": "siswa-x-to3-1",
    "rombelId": "rombel-x-to-3",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to3-1-kejuruan",
    "siswaId": "siswa-x-to3-1",
    "rombelId": "rombel-x-to-3",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 88
    },
    "nilaiSAS": 91,
    "nilaiAkhir": 90,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to3-1-pak",
    "siswaId": "siswa-x-to3-1",
    "rombelId": "rombel-x-to-3",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to3-1-lampung",
    "siswaId": "siswa-x-to3-1",
    "rombelId": "rombel-x-to-3",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to3-2-pabp",
    "siswaId": "siswa-x-to3-2",
    "rombelId": "rombel-x-to-3",
    "mapelId": "mapel-pabp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 89
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 88,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang sangat baik dalam memahami ajaran agama dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to3-2-pp",
    "siswaId": "siswa-x-to3-2",
    "rombelId": "rombel-x-to-3",
    "mapelId": "mapel-pp",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 86
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid menunjukkan pemahaman yang baik tentang nilai-nilai luhur Pancasila dan norma kehidupan berbangsa dan bernegara.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to3-2-indo",
    "siswaId": "siswa-x-to3-2",
    "rombelId": "rombel-x-to-3",
    "mapelId": "mapel-indo",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan kemampuan yang baik dalam menganalisis struktur teks laporan dan menyusun gagasan secara kritis dan runtut.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to3-2-mat",
    "siswaId": "siswa-x-to3-2",
    "rombelId": "rombel-x-to-3",
    "mapelId": "mapel-mat",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 84
    },
    "nilaiSAS": 86,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan penguasaan yang baik dalam menyelesaikan persoalan matematis dan logika terapan di bidang kejuruan.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to3-2-inggris",
    "siswaId": "siswa-x-to3-2",
    "rombelId": "rombel-x-to-3",
    "mapelId": "mapel-inggris",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 87
    },
    "nilaiSAS": 87,
    "nilaiAkhir": 86,
    "deskripsiCapaian": "Murid terampil mengidentifikasi informasi penting dalam teks prosedur dan komunikasi kerja berbahasa Inggris sederhana.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to3-2-kejuruan",
    "siswaId": "siswa-x-to3-2",
    "rombelId": "rombel-x-to-3",
    "mapelId": "mapel-kk",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 89
    },
    "nilaiSAS": 88,
    "nilaiAkhir": 87,
    "deskripsiCapaian": "Murid menunjukkan kompetensi praktik kejuruan yang terampil, teliti, dan mematuhi prosedur keselamatan kerja (K3).",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to3-2-pak",
    "siswaId": "siswa-x-to3-2",
    "rombelId": "rombel-x-to-3",
    "mapelId": "mapel-pak",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 85
    },
    "nilaiSAS": 85,
    "nilaiAkhir": 85,
    "deskripsiCapaian": "Murid menunjukkan sikap integritas dan pemahaman yang baik tentang nilai-nilai anti korupsi dalam lingkungan sekolah.",
    "deskripsiIsCustom": false
  },
  {
    "id": "nilai-siswa-x-to3-2-lampung",
    "siswaId": "siswa-x-to3-2",
    "rombelId": "rombel-x-to-3",
    "mapelId": "mapel-lampung",
    "semester": "1 (Ganjil)",
    "nilaiTp": {
      "tp-1": 82
    },
    "nilaiSAS": 83,
    "nilaiAkhir": 83,
    "deskripsiCapaian": "Murid mengenal kosa kata bahasa Lampung dan menghargai warisan budaya kearifan lokal daerah Lampung.",
    "deskripsiIsCustom": false
  }
];

export const defaultKehadiran: Kehadiran[] = [
  {
    "id": "keh-siswa-xii-1",
    "siswaId": "siswa-xii-1",
    "rombelId": "rombel-xii-tsm-1",
    "semester": "1 (Ganjil)",
    "sakit": 1,
    "izin": 1,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Ahmad Fauzi Rahman menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-xii-2",
    "siswaId": "siswa-xii-2",
    "rombelId": "rombel-xii-tsm-1",
    "semester": "1 (Ganjil)",
    "sakit": 0,
    "izin": 0,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Budi Santoso menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-xii-3",
    "siswaId": "siswa-xii-3",
    "rombelId": "rombel-xii-tsm-1",
    "semester": "1 (Ganjil)",
    "sakit": 0,
    "izin": 0,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Dimas Pratama menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-xii-dkv-1",
    "siswaId": "siswa-xii-dkv-1",
    "rombelId": "rombel-xii-dkv-1",
    "semester": "1 (Ganjil)",
    "sakit": 1,
    "izin": 0,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Nabila Syakieb menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-xii-dkv-2",
    "siswaId": "siswa-xii-dkv-2",
    "rombelId": "rombel-xii-dkv-1",
    "semester": "1 (Ganjil)",
    "sakit": 0,
    "izin": 1,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Rendy Saputra menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-xii-pbs-1",
    "siswaId": "siswa-xii-pbs-1",
    "rombelId": "rombel-xii-pbs-1",
    "semester": "1 (Ganjil)",
    "sakit": 0,
    "izin": 0,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Zaskia Nurul Aini menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-xii-pbs-2",
    "siswaId": "siswa-xii-pbs-2",
    "rombelId": "rombel-xii-pbs-1",
    "semester": "1 (Ganjil)",
    "sakit": 1,
    "izin": 0,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Taufik Hidayat menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-xi-1",
    "siswaId": "siswa-xi-1",
    "rombelId": "rombel-xi-tsm-1",
    "semester": "1 (Ganjil)",
    "sakit": 0,
    "izin": 0,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Danu Kusuma menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-xi-2",
    "siswaId": "siswa-xi-2",
    "rombelId": "rombel-xi-tsm-1",
    "semester": "1 (Ganjil)",
    "sakit": 0,
    "izin": 1,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Farhan Hidayat menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-xi-3",
    "siswaId": "siswa-xi-3",
    "rombelId": "rombel-xi-dkv-1",
    "semester": "1 (Ganjil)",
    "sakit": 1,
    "izin": 0,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Adelia Putri Kirana menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-xi-dkv-2",
    "siswaId": "siswa-xi-dkv-2",
    "rombelId": "rombel-xi-dkv-1",
    "semester": "1 (Ganjil)",
    "sakit": 0,
    "izin": 0,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Panji Gumilang menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-xi-4",
    "siswaId": "siswa-xi-4",
    "rombelId": "rombel-xi-pbs-1",
    "semester": "1 (Ganjil)",
    "sakit": 0,
    "izin": 0,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Rizky Ramadhan menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-xi-pbs-2",
    "siswaId": "siswa-xi-pbs-2",
    "rombelId": "rombel-xi-pbs-1",
    "semester": "1 (Ganjil)",
    "sakit": 1,
    "izin": 1,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Qori Nur Azizah menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-x-akl-1",
    "siswaId": "siswa-x-akl-1",
    "rombelId": "rombel-x-akl-1",
    "semester": "1 (Ganjil)",
    "sakit": 0,
    "izin": 0,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Anisa Rahmawati menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-x-akl-2",
    "siswaId": "siswa-x-akl-2",
    "rombelId": "rombel-x-akl-1",
    "semester": "1 (Ganjil)",
    "sakit": 0,
    "izin": 0,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Bagas Triyono menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-x-pbs-1",
    "siswaId": "siswa-x-pbs-1",
    "rombelId": "rombel-x-pbs-1",
    "semester": "1 (Ganjil)",
    "sakit": 1,
    "izin": 0,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Citra Wulandari menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-x-pbs-2",
    "siswaId": "siswa-x-pbs-2",
    "rombelId": "rombel-x-pbs-1",
    "semester": "1 (Ganjil)",
    "sakit": 0,
    "izin": 1,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Dedi Kurniawan menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-x-dkv1-1",
    "siswaId": "siswa-x-dkv1-1",
    "rombelId": "rombel-x-dkv-1",
    "semester": "1 (Ganjil)",
    "sakit": 0,
    "izin": 0,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Eka Pratama menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-x-dkv1-2",
    "siswaId": "siswa-x-dkv1-2",
    "rombelId": "rombel-x-dkv-1",
    "semester": "1 (Ganjil)",
    "sakit": 1,
    "izin": 0,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Fani Oktaviani menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-x-dkv2-1",
    "siswaId": "siswa-x-dkv2-1",
    "rombelId": "rombel-x-dkv-2",
    "semester": "1 (Ganjil)",
    "sakit": 0,
    "izin": 0,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Gilang Ramadhan menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-x-dkv2-2",
    "siswaId": "siswa-x-dkv2-2",
    "rombelId": "rombel-x-dkv-2",
    "semester": "1 (Ganjil)",
    "sakit": 0,
    "izin": 1,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Hani Safitri menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-x-dkv3-1",
    "siswaId": "siswa-x-dkv3-1",
    "rombelId": "rombel-x-dkv-3",
    "semester": "1 (Ganjil)",
    "sakit": 1,
    "izin": 0,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Ilham Maulana menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-x-dkv3-2",
    "siswaId": "siswa-x-dkv3-2",
    "rombelId": "rombel-x-dkv-3",
    "semester": "1 (Ganjil)",
    "sakit": 0,
    "izin": 0,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Julia Permata menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-x-to1-1",
    "siswaId": "siswa-x-to1-1",
    "rombelId": "rombel-x-tsm-1",
    "semester": "1 (Ganjil)",
    "sakit": 0,
    "izin": 0,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Bagus Setiawan menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-x-to1-2",
    "siswaId": "siswa-x-to1-2",
    "rombelId": "rombel-x-tsm-1",
    "semester": "1 (Ganjil)",
    "sakit": 1,
    "izin": 1,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Kiki Andriansyah menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-x-to2-1",
    "siswaId": "siswa-x-to2-1",
    "rombelId": "rombel-x-to-2",
    "semester": "1 (Ganjil)",
    "sakit": 0,
    "izin": 0,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Lukman Hakim menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-x-to2-2",
    "siswaId": "siswa-x-to2-2",
    "rombelId": "rombel-x-to-2",
    "semester": "1 (Ganjil)",
    "sakit": 0,
    "izin": 0,
    "alfa": 0,
    "catatanWaliKelas": "Ananda M. Farel Alamsyah menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-x-to3-1",
    "siswaId": "siswa-x-to3-1",
    "rombelId": "rombel-x-to-3",
    "semester": "1 (Ganjil)",
    "sakit": 1,
    "izin": 0,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Naufal Ariq menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  },
  {
    "id": "keh-siswa-x-to3-2",
    "siswaId": "siswa-x-to3-2",
    "rombelId": "rombel-x-to-3",
    "semester": "1 (Ganjil)",
    "sakit": 0,
    "izin": 1,
    "alfa": 0,
    "catatanWaliKelas": "Ananda Okta Viansyah menunjukkan kedisiplinan dan semangat belajar yang sangat baik di semester ini. Tingkatkan prestasi dan terus pertahankan ketekunan belajar."
  }
];

export const defaultNilaiPKL: NilaiPKL[] = [
  {
    "id": "pkl-1",
    "siswaId": "siswa-xii-1",
    "rombelId": "rombel-xii-tsm-1",
    "mitraDudi": "AHASS Daya Motor Labuhan Maringgai",
    "lokasi": "Jl. Lintas Timur, Labuhan Maringgai",
    "durasiBulan": 6,
    "nilaiSoftSkills": 90,
    "nilaiHardSkills": 88,
    "nilaiKemandirian": 87,
    "nilaiAkhir": 88,
    "predikat": "Sangat Baik",
    "catatanDudi": "Sangat disiplin, cepat memahami instruksi mekanik senior, dan ramah saat melayani konsumen bengkel.",
    "kehadiranSakit": 1,
    "kehadiranIzin": 1,
    "kehadiranAlfa": 0
  },
  {
    "id": "pkl-2",
    "siswaId": "siswa-xii-2",
    "rombelId": "rombel-xii-tsm-1",
    "mitraDudi": "AHASS Daya Motor Labuhan Maringgai",
    "lokasi": "Jl. Lintas Timur, Labuhan Maringgai",
    "durasiBulan": 6,
    "nilaiSoftSkills": 85,
    "nilaiHardSkills": 86,
    "nilaiKemandirian": 84,
    "nilaiAkhir": 85,
    "predikat": "Baik",
    "catatanDudi": "Menunjukkan keterampilan servis CVT yang baik dan rajin menjaga kebersihan stall kerja bengkel.",
    "kehadiranSakit": 0,
    "kehadiranIzin": 2,
    "kehadiranAlfa": 1
  },
  {
    "id": "pkl-3",
    "siswaId": "siswa-xii-3",
    "rombelId": "rombel-xii-tsm-1",
    "mitraDudi": "Bengkel Mobil & Motor Mitra Mandiri",
    "lokasi": "Karang Anyar, Labuhan Maringgai",
    "durasiBulan": 6,
    "nilaiSoftSkills": 86,
    "nilaiHardSkills": 87,
    "nilaiKemandirian": 85,
    "nilaiAkhir": 86,
    "predikat": "Sangat Baik",
    "catatanDudi": "Mampu beradaptasi dengan tim kerja bengkel dan teliti dalam perawatan berkala sepeda motor.",
    "kehadiranSakit": 1,
    "kehadiranIzin": 0,
    "kehadiranAlfa": 0
  },
  {
    "id": "pkl-4",
    "siswaId": "siswa-xii-dkv-1",
    "rombelId": "rombel-xii-dkv-1",
    "mitraDudi": "Labuhan Media Creative Studio",
    "lokasi": "Jl. Lintas Pantai Timur, Labuhan Maringgai",
    "durasiBulan": 6,
    "nilaiSoftSkills": 92,
    "nilaiHardSkills": 90,
    "nilaiKemandirian": 89,
    "nilaiAkhir": 90,
    "predikat": "Sangat Baik",
    "catatanDudi": "Sangat kreatif dalam produksi konten visual promosi digital dan tepat waktu menyelesaikan target desain.",
    "kehadiranSakit": 0,
    "kehadiranIzin": 1,
    "kehadiranAlfa": 0
  },
  {
    "id": "pkl-5",
    "siswaId": "siswa-xii-dkv-2",
    "rombelId": "rombel-xii-dkv-1",
    "mitraDudi": "Percetakan & Desain Sinar Lampung",
    "lokasi": "Mataram Baru, Lampung Timur",
    "durasiBulan": 6,
    "nilaiSoftSkills": 84,
    "nilaiHardSkills": 86,
    "nilaiKemandirian": 85,
    "nilaiAkhir": 85,
    "predikat": "Baik",
    "catatanDudi": "Terampil mengoperasikan software grafis dan bertanggung jawab dalam proses prepress percetakan.",
    "kehadiranSakit": 1,
    "kehadiranIzin": 0,
    "kehadiranAlfa": 0
  },
  {
    "id": "pkl-6",
    "siswaId": "siswa-xii-pbs-1",
    "rombelId": "rombel-xii-pbs-1",
    "mitraDudi": "BPRS Kotabumi Kantor Kas Labuhan Maringgai",
    "lokasi": "Jl. Raya Labuhan Maringgai",
    "durasiBulan": 6,
    "nilaiSoftSkills": 90,
    "nilaiHardSkills": 89,
    "nilaiKemandirian": 88,
    "nilaiAkhir": 89,
    "predikat": "Sangat Baik",
    "catatanDudi": "Teliti dalam pembukuan transaksi syariah dan sangat santun saat berinteraksi dengan nasabah bank.",
    "kehadiranSakit": 0,
    "kehadiranIzin": 0,
    "kehadiranAlfa": 0
  },
  {
    "id": "pkl-7",
    "siswaId": "siswa-xii-pbs-2",
    "rombelId": "rombel-xii-pbs-1",
    "mitraDudi": "BMT Mitra Umat Mandiri",
    "lokasi": "Desa Karang Anyar, Labuhan Maringgai",
    "durasiBulan": 6,
    "nilaiSoftSkills": 86,
    "nilaiHardSkills": 87,
    "nilaiKemandirian": 85,
    "nilaiAkhir": 86,
    "predikat": "Sangat Baik",
    "catatanDudi": "Memahami alur pembiayaan syariah dan disiplin mengarsipkan dokumen nasabah dengan rapi.",
    "kehadiranSakit": 1,
    "kehadiranIzin": 1,
    "kehadiranAlfa": 0
  }
];

export const defaultNilaiUKK: NilaiUKK[] = [
  {
    "id": "ukk-1",
    "siswaId": "siswa-xii-1",
    "rombelId": "rombel-xii-tsm-1",
    "namaSkema": "Perawatan Berkala Sepeda Motor Injeksi (KKNI Level II)",
    "nilaiTeori": 86,
    "nilaiPraktik": 90,
    "nilaiAkhir": 89,
    "statusKompeten": "Kompeten",
    "nomorSertifikat": "UKK-TSM-2024-001"
  },
  {
    "id": "ukk-2",
    "siswaId": "siswa-xii-2",
    "rombelId": "rombel-xii-tsm-1",
    "namaSkema": "Perawatan Berkala Sepeda Motor Injeksi (KKNI Level II)",
    "nilaiTeori": 84,
    "nilaiPraktik": 86,
    "nilaiAkhir": 85,
    "statusKompeten": "Kompeten",
    "nomorSertifikat": "UKK-TSM-2024-002"
  },
  {
    "id": "ukk-3",
    "siswaId": "siswa-xii-3",
    "rombelId": "rombel-xii-tsm-1",
    "namaSkema": "Perawatan Berkala Sepeda Motor Injeksi (KKNI Level II)",
    "nilaiTeori": 82,
    "nilaiPraktik": 88,
    "nilaiAkhir": 86,
    "statusKompeten": "Kompeten",
    "nomorSertifikat": "UKK-TSM-2024-003"
  },
  {
    "id": "ukk-4",
    "siswaId": "siswa-xii-dkv-1",
    "rombelId": "rombel-xii-dkv-1",
    "namaSkema": "Desain Grafis & Konten Multimedia (KKNI Level II)",
    "nilaiTeori": 90,
    "nilaiPraktik": 92,
    "nilaiAkhir": 91,
    "statusKompeten": "Sangat Kompeten",
    "nomorSertifikat": "UKK-DKV-2024-001"
  },
  {
    "id": "ukk-5",
    "siswaId": "siswa-xii-dkv-2",
    "rombelId": "rombel-xii-dkv-1",
    "namaSkema": "Desain Grafis & Konten Multimedia (KKNI Level II)",
    "nilaiTeori": 84,
    "nilaiPraktik": 86,
    "nilaiAkhir": 85,
    "statusKompeten": "Kompeten",
    "nomorSertifikat": "UKK-DKV-2024-002"
  },
  {
    "id": "ukk-6",
    "siswaId": "siswa-xii-pbs-1",
    "rombelId": "rombel-xii-pbs-1",
    "namaSkema": "Layanan Transaksi Perbankan Syariah (KKNI Level II)",
    "nilaiTeori": 88,
    "nilaiPraktik": 90,
    "nilaiAkhir": 89,
    "statusKompeten": "Kompeten",
    "nomorSertifikat": "UKK-PBS-2024-001"
  },
  {
    "id": "ukk-7",
    "siswaId": "siswa-xii-pbs-2",
    "rombelId": "rombel-xii-pbs-1",
    "namaSkema": "Layanan Transaksi Perbankan Syariah (KKNI Level II)",
    "nilaiTeori": 85,
    "nilaiPraktik": 87,
    "nilaiAkhir": 86,
    "statusKompeten": "Kompeten",
    "nomorSertifikat": "UKK-PBS-2024-002"
  }
];

export const defaultEkstrakurikuler: Ekstrakurikuler[] = [
  { id: 'eks-pramuka', nama: 'Pramuka (Wajib)', kategori: 'Wajib', pembinaGuruId: 'guru-4', deskripsi: 'Kegiatan kepanduan, kepemimpinan, dan kedisiplinan dasar.' },
  { id: 'eks-otomotif', nama: 'Otomotif Club (SMK)', kategori: 'Pilihan', pembinaGuruId: 'guru-1', deskripsi: 'Pengembangan keterampilan modifikasi, tune up, dan servis mandiri.' },
  { id: 'eks-futsal', nama: 'Futsal & Olahraga', kategori: 'Pilihan', pembinaGuruId: 'guru-4', deskripsi: 'Pelatihan fisik, taktik olahraga beregu, dan turnamen antarsekolah.' },
  { id: 'eks-dkv', nama: 'Desain & Fotografi Kreatif', kategori: 'Pilihan', pembinaGuruId: 'guru-2', deskripsi: 'Eksplorasi teknik pemotretan, videografi, dan editing konten digital.' },
  { id: 'eks-pmr', nama: 'PMR (Palang Merah Remaja)', kategori: 'Pilihan', pembinaGuruId: 'guru-3', deskripsi: 'Pertolongan pertama pada kecelakaan dan bakti sosial kesehatan sekolah.' }
];

export const defaultAnggotaEkskul: AnggotaEkskul[] = [
  { id: 'ang-1', ekskulId: 'eks-pramuka', siswaId: 'siswa-xii-1', semester: '1 (Ganjil)', predikat: 'Sangat Baik', keterangan: 'Aktif, disiplin, dan bertanggung jawab sebagai pradana dalam perkemahan.' },
  { id: 'ang-2', ekskulId: 'eks-otomotif', siswaId: 'siswa-xii-1', semester: '1 (Ganjil)', predikat: 'Sangat Baik', keterangan: 'Menunjukkan keterampilan servis motor yang terampil dan teliti.' },
  { id: 'ang-3', ekskulId: 'eks-pramuka', siswaId: 'siswa-xii-2', semester: '1 (Ganjil)', predikat: 'Baik', keterangan: 'Mengikuti latihan rutin pramuka dengan tertib dan mematuhi tata tertib.' },
  { id: 'ang-4', ekskulId: 'eks-futsal', siswaId: 'siswa-xii-3', semester: '1 (Ganjil)', predikat: 'Sangat Baik', keterangan: 'Menjadi pemain inti tim futsal sekolah dan menjunjung tinggi sportivitas.' },
  { id: 'ang-5', ekskulId: 'eks-pramuka', siswaId: 'siswa-xii-3', semester: '1 (Ganjil)', predikat: 'Baik', keterangan: 'Aktif dalam kegiatan baris-berbaris dan penjelajahan alam.' }
];
