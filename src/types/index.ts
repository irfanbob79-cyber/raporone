export type SchoolLevel = 'SD' | 'SMP' | 'SMA' | 'SMK';

export type UserRole = 
  | 'admin' 
  | 'guru' 
  | 'wali_kelas' 
  | 'waka_kurikulum' 
  | 'kaprog' 
  | 'kepala_sekolah' 
  | 'siswa';

export interface SchoolProfile {
  npsn: string;
  namaSekolah: string;
  jenjang: SchoolLevel;
  alamat: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kodePos: string;
  kepalaSekolah: string;
  nipKepalaSekolah: string;
  hariEfektifSemester: number;
  tahunAjaranAktif: string;
  semesterAktif: '1 (Ganjil)' | '2 (Genap)';
  domainUrl?: string;
}

export interface Jurusan {
  id: string;
  kode: string;
  nama: string;
  bidangKeahlian: string;
  programKeahlian: string;
}

export interface Guru {
  id: string;
  nip: string;
  nuptk: string;
  nama: string;
  gelarDepan?: string;
  gelarBelakang?: string;
  jenisKelamin: 'L' | 'P';
  email: string;
  noHp: string;
}

export interface Rombel {
  id: string;
  kode: string;
  nama: string;
  tingkat: number; // 1-6 SD, 7-9 SMP, 10-12 SMA/SMK
  fase: 'Fase A' | 'Fase B' | 'Fase C' | 'Fase D' | 'Fase E' | 'Fase F';
  jurusanId?: string; // Khusus SMK
  waliKelasId: string;
  tahunAjaran: string;
}

export interface Siswa {
  id: string;
  nis: string;
  nisn: string;
  nama: string;
  jenisKelamin: 'L' | 'P';
  tempatLahir: string;
  tanggalLahir: string;
  agama: string;
  rombelId: string;
  namaAyah: string;
  namaIbu: string;
  alamat: string;
  noHpOrtu?: string;
}

export type KelompokMapel = 
  | 'Kelompok Umum' 
  | 'Kejuruan: Dasar Program Keahlian' 
  | 'Kejuruan: Konsentrasi Keahlian' 
  | 'Projek Kreatif dan Kewirausahaan (PKK)' 
  | 'Praktik Kerja Lapangan (PKL)' 
  | 'Mata Pelajaran Pilihan' 
  | 'Muatan Lokal';

export interface MataPelajaran {
  id: string;
  kode: string;
  nama: string;
  kelompok: KelompokMapel;
  kktp?: number; // Kriteria Ketercapaian Tujuan Pembelajaran (KKTP / KKM)
  jenjang: SchoolLevel[];
}

export interface Pembelajaran {
  id: string;
  rombelId: string;
  mapelId: string;
  guruId: string;
}

export interface TujuanPembelajaran {
  id: string;
  rombelId: string;
  mapelId: string;
  semester: string;
  kodeTp: string; // e.g. "TP 1"
  deskripsi: string; // e.g. "Menganalisis rangkaian kelistrikan sistem injeksi"
}

export interface NilaiSiswa {
  id: string;
  siswaId: string;
  rombelId: string;
  mapelId: string;
  semester: string;
  nilaiTp: Record<string, number>; // { [tpId]: score }
  nilaiSAS: number; // Sumatif Akhir Semester
  nilaiAkhir: number;
  deskripsiCapaian: string;
  deskripsiIsCustom: boolean;
}

export interface Kehadiran {
  id: string;
  siswaId: string;
  rombelId: string;
  semester: string;
  sakit: number;
  izin: number;
  alfa: number;
  catatanWaliKelas?: string;
  ekskul?: { nama: string; predikat: string; keterangan: string }[];
}

export interface Ekstrakurikuler {
  id: string;
  nama: string;
  kategori: 'Wajib' | 'Pilihan';
  pembinaGuruId?: string;
  deskripsi?: string;
}

export interface AnggotaEkskul {
  id: string;
  ekskulId: string;
  siswaId: string;
  semester: string;
  predikat: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Kurang';
  keterangan: string;
}

export interface NilaiPKL {
  id: string;
  siswaId: string;
  rombelId: string;
  mitraDudi: string;
  lokasi: string;
  durasiBulan: number;
  nilaiSoftSkills: number;
  nilaiHardSkills: number;
  nilaiKemandirian: number;
  nilaiAkhir: number;
  predikat?: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Kurang';
  catatanDudi: string;
  kehadiranSakit: number;
  kehadiranIzin: number;
  kehadiranAlfa: number;
}

export interface NilaiUKK {
  id: string;
  siswaId: string;
  rombelId: string;
  namaSkema: string;
  nilaiTeori: number;
  nilaiPraktik: number;
  nilaiAkhir: number;
  statusKompeten: 'Belum Kompeten' | 'Cukup Kompeten' | 'Kompeten' | 'Sangat Kompeten';
  nomorSertifikat?: string;
}

export interface UserAccount {
  id: string;
  username: string;
  nama: string;
  role: 'admin' | 'guru' | 'wali_kelas';
  guruId?: string;
  rombelWaliId?: string;
  isPembinaEkskul?: boolean;
  ekskulId?: string;
  keterangan?: string;
}
