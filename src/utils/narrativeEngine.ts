import { TujuanPembelajaran, Siswa, Rombel, MataPelajaran, Jurusan, SchoolLevel } from '../types';

export interface NarrativeContext {
  siswa: Siswa;
  rombel: Rombel;
  mapel: MataPelajaran;
  jurusan?: Jurusan;
  jenjang: SchoolLevel;
  tujuanPembelajaranList: TujuanPembelajaran[];
  nilaiAkhir?: number; // SATU JENIS NILAI YANG DI-INPUT GURU (0 - 100)
  tpTercapaiIds?: string[]; // Daftar ID TP yang dipilih / diceklis murid (bisa 1 atau lebih)
  tpStatus?: Record<string, 'tercapai' | 'tidak_tercapai'>; // Status capaian per TP
  nilaiTp?: Record<string, number>; // Fallback kompatibilitas data lama
  style?: 'personal' | 'ringkas';
}

export function generateDeskripsiCapaian(ctx: NarrativeContext): string {
  const {
    siswa,
    rombel,
    mapel,
    jurusan,
    jenjang,
    tujuanPembelajaranList,
    nilaiAkhir = 80,
    tpTercapaiIds,
    tpStatus = {},
    nilaiTp,
    style = 'personal'
  } = ctx;

  const contextClass = jenjang === 'SMK' && jurusan 
    ? `${rombel.nama} - ${jurusan.nama}` 
    : rombel.nama;

  const prefix = style === 'personal'
    ? `Ananda ${siswa.nama} (Kelas ${contextClass})`
    : `Murid`;

  if (tujuanPembelajaranList.length === 0) {
    if (nilaiAkhir >= (mapel.kktp || 75)) {
      return `${prefix} telah menuntaskan seluruh capaian pembelajaran pada mata pelajaran ${mapel.nama} dengan baik.`;
    }
    return `${prefix} perlu bimbingan dan peningkatan belajar dalam capaian pembelajaran mata pelajaran ${mapel.nama}.`;
  }

  // Tentukan daftar TP yang tercapai (achieved) dan yang belum tercapai (unachieved)
  let achievedTps: TujuanPembelajaran[] = [];
  let unachievedTps: TujuanPembelajaran[] = [];

  if (Array.isArray(tpTercapaiIds) && tpTercapaiIds.length > 0) {
    // Mode Utama: Berdasarkan checklist TP yang dipilih oleh guru beserta status combo box-nya
    const selectedTps = tujuanPembelajaranList.filter(t => tpTercapaiIds.includes(t.id));
    selectedTps.forEach(t => {
      const status = tpStatus[t.id] ?? 'tercapai';
      if (status === 'tidak_tercapai') {
        unachievedTps.push(t);
      } else {
        achievedTps.push(t);
      }
    });
  } else if (nilaiTp && Object.keys(nilaiTp).length > 0) {
    // Mode Fallback: Berdasarkan skor nilaiTp lama (kktp default 75)
    achievedTps = tujuanPembelajaranList.filter(t => (nilaiTp[t.id] ?? 0) >= (mapel.kktp || 75));
    unachievedTps = tujuanPembelajaranList.filter(t => (nilaiTp[t.id] ?? 0) < (mapel.kktp || 75));
  }

  const cleanTpDesc = (desc: string) => {
    let clean = desc.trim();
    clean = clean.charAt(0).toLowerCase() + clean.slice(1);
    if (clean.endsWith('.')) clean = clean.slice(0, -1);
    return clean;
  };

  const formatTpList = (list: TujuanPembelajaran[]) => {
    if (list.length === 0) return '';
    if (list.length === 1) return cleanTpDesc(list[0].deskripsi);
    if (list.length === 2) return `${cleanTpDesc(list[0].deskripsi)} dan ${cleanTpDesc(list[1].deskripsi)}`;
    const allExceptLast = list.slice(0, -1).map(t => cleanTpDesc(t.deskripsi)).join(', ');
    return `${allExceptLast}, serta ${cleanTpDesc(list[list.length - 1].deskripsi)}`;
  };

  // KONDISI 1: ADA KOMBINASI TP TERCAPAI DAN TP TIDAK TERCAPAI
  if (achievedTps.length > 0 && unachievedTps.length > 0) {
    const achievedText = formatTpList(achievedTps);
    const unachievedText = formatTpList(unachievedTps);
    return `${prefix} menunjukkan penguasaan yang baik dalam ${achievedText}, namun perlu peningkatan belajar dalam ${unachievedText} pada mata pelajaran ${mapel.nama}.`;
  }

  // KONDISI 2: HANYA ADA TP TERCAPAI
  if (achievedTps.length > 0) {
    const achievedText = formatTpList(achievedTps);
    if (nilaiAkhir >= 85) {
      return `${prefix} menunjukkan penguasaan yang sangat baik dalam ${achievedText} pada mata pelajaran ${mapel.nama}.`;
    }
    return `${prefix} menunjukkan penguasaan yang baik dalam ${achievedText} pada mata pelajaran ${mapel.nama}.`;
  }

  // KONDISI 3: HANYA ADA TP TIDAK TERCAPAI
  if (unachievedTps.length > 0) {
    const unachievedText = formatTpList(unachievedTps);
    if (nilaiAkhir >= 65) {
      return `${prefix} perlu bimbingan dan peningkatan belajar dalam ${unachievedText} pada mata pelajaran ${mapel.nama}.`;
    }
    return `${prefix} perlu bimbingan intensif dan dorongan belajar dalam menguasai kompetensi ${unachievedText} pada mata pelajaran ${mapel.nama}.`;
  }

  // FALLBACK JIKA GURU BELUM MENCEKLIS TP:
  const threshold = mapel.kktp || 75;
  const isLulus = nilaiAkhir >= threshold;
  const defaultTp = tujuanPembelajaranList.slice(0, 1);

  if (isLulus) {
    if (defaultTp.length > 0) {
      return `${prefix} menunjukkan penguasaan yang baik dalam ${formatTpList(defaultTp)} pada mata pelajaran ${mapel.nama}.`;
    }
    return `${prefix} telah menuntaskan seluruh capaian pembelajaran pada mata pelajaran ${mapel.nama} dengan baik.`;
  } else {
    if (defaultTp.length > 0) {
      return `${prefix} perlu bimbingan dan peningkatan belajar dalam ${formatTpList(defaultTp)} pada mata pelajaran ${mapel.nama}.`;
    }
    return `${prefix} perlu bimbingan dan peningkatan belajar dalam capaian pembelajaran mata pelajaran ${mapel.nama}.`;
  }
}

// GENERATE OTOMATIS CATATAN WALI KELAS
export interface CatatanWaliKelasContext {
  siswa: Siswa;
  rombel: Rombel;
  sakit: number;
  izin: number;
  alfa: number;
  avgNilai?: number;
}

export function generateCatatanWaliKelas(ctx: CatatanWaliKelasContext): string {
  const { siswa, rombel, sakit, izin, alfa, avgNilai = 82 } = ctx;
  const totalAbsen = sakit + izin + alfa;
  const isKelasXII = rombel.tingkat === 12;

  // Case 1: Rajin & Berprestasi tinggi (Nilai >= 85 dan Alfa == 0)
  if (avgNilai >= 85 && alfa === 0) {
    if (isKelasXII) {
      return `Selamat atas pencapaian prestasi akademik dan kehadiran yang sangat membanggakan, Ananda ${siswa.nama}. Terus pertahankan etos kerja, kedisiplinan, dan integritas tinggi saat menghadapi Uji Kompetensi Keahlian (UKK) serta persiapan memasuki dunia kerja/pendidikan tinggi.`;
    }
    return `Ananda ${siswa.nama} menunjukkan motivasi belajar, kedisiplinan, dan prestasi yang sangat memuaskan di semester ini. Pertahankan semangat dan teruslah menjadi teladan positif bagi teman-teman di kelas.`;
  }

  // Case 2: Nilai Baik, Kehadiran Prima (Total Absen <= 2)
  if (avgNilai >= 78 && totalAbsen <= 2) {
    if (isKelasXII) {
      return `Ananda ${siswa.nama} memiliki kemauan belajar dan kedisiplinan yang sangat baik. Asah terus keterampilan kejuruanmu untuk persiapan kelulusan dan masa depan yang cerah.`;
    }
    return `Perkembangan belajar Ananda ${siswa.nama} berjalan dengan sangat baik dan stabil. Tetap konsisten menjaga kedisiplinan dan keaktifan di kelas pada semester mendatang.`;
  }

  // Case 3: Alfa banyak (Alfa >= 3)
  if (alfa >= 3) {
    return `Ananda ${siswa.nama} memiliki potensi belajar yang baik, namun perlu peningkatan serius dalam kedisiplinan kehadiran di sekolah (tercatat ${alfa} hari tanpa keterangan). Diharapkan kerja sama orang tua untuk lebih memotivasi ananda hadir tepat waktu.`;
  }

  // Case 4: Sakit / Izin cukup banyak
  if (sakit + izin >= 5) {
    return `Tetap jaga kesehatan fisik dan pola istirahat agar dapat mengikuti seluruh kegiatan belajar secara optimal. Secara umum perkembangan belajar Ananda ${siswa.nama} sudah cukup baik.`;
  }

  // Default Positive Balanced
  if (isKelasXII) {
    return `Tingkatkan terus fokus dan kesiapan mental menghadapi akhir masa studi SMK. Semoga Ananda ${siswa.nama} sukses meraih kelulusan terbaik dan kompetensi yang diakui industri.`;
  }

  return `Ananda ${siswa.nama} menunjukkan sikap sopan dan kemauan belajar yang baik. Tingkatkan rasa percaya diri serta keaktifan dalam diskusi kelas pada semester berikutnya.`;
}
