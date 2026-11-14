import { TujuanPembelajaran, Siswa, Rombel, MataPelajaran, Jurusan, SchoolLevel } from '../types';

export interface NarrativeContext {
  siswa: Siswa;
  rombel: Rombel;
  mapel: MataPelajaran;
  jurusan?: Jurusan;
  jenjang: SchoolLevel;
  tujuanPembelajaranList: TujuanPembelajaran[];
  nilaiTp: Record<string, number>;
  style?: 'personal' | 'ringkas';
}

export function generateDeskripsiCapaian(ctx: NarrativeContext): string {
  const { siswa, rombel, mapel, jurusan, jenjang, tujuanPembelajaranList, nilaiTp, style = 'personal' } = ctx;

  const validEntries = Object.entries(nilaiTp).filter(([_, score]) => typeof score === 'number' && !isNaN(score));
  
  if (validEntries.length === 0 || tujuanPembelajaranList.length === 0) {
    return 'Belum ada data capaian tujuan pembelajaran.';
  }

  const tpWithScores = validEntries.map(([tpId, score]) => {
    const tp = tujuanPembelajaranList.find(t => t.id === tpId);
    return {
      tpId,
      score,
      deskripsi: tp ? tp.deskripsi.trim() : 'kompetensi materi'
    };
  });

  tpWithScores.sort((a, b) => b.score - a.score);

  const highest = tpWithScores[0];
  const lowest = tpWithScores[tpWithScores.length - 1];

  const cleanTpDesc = (desc: string) => {
    let clean = desc.charAt(0).toLowerCase() + desc.slice(1);
    if (clean.endsWith('.')) clean = clean.slice(0, -1);
    return clean;
  };

  const highestDesc = cleanTpDesc(highest.deskripsi);
  const lowestDesc = cleanTpDesc(lowest.deskripsi);

  const contextClass = jenjang === 'SMK' && jurusan 
    ? `${rombel.nama} - ${jurusan.nama}` 
    : rombel.nama;

  const prefix = style === 'personal'
    ? `Ananda ${siswa.nama} (Kelas ${contextClass})`
    : `Murid`;

  if (highest.score >= 85 && lowest.score >= 82) {
    if (tpWithScores.length === 1) {
      return `${prefix} menunjukkan penguasaan yang sangat istimewa dalam ${highestDesc} pada mata pelajaran ${mapel.nama}.`;
    }
    return `${prefix} menunjukkan penguasaan yang sangat baik dalam ${highestDesc} serta penguasaan yang optimal dalam ${lowestDesc} pada mata pelajaran ${mapel.nama}.`;
  }

  if (highest.score >= 78 && lowest.score < 75) {
    return `${prefix} menunjukkan penguasaan yang sangat baik dalam ${highestDesc} pada mata pelajaran ${mapel.nama}. Perlu peningkatan dan pendampingan lebih lanjut dalam ${lowestDesc}.`;
  }

  if (highest.score >= 80 && lowest.score >= 75) {
    if (highest.score - lowest.score <= 5) {
      return `${prefix} menunjukkan capaian belajar yang stabil dan baik pada seluruh tujuan pembelajaran mata pelajaran ${mapel.nama}, terutama dalam ${highestDesc}.`;
    }
    return `${prefix} menunjukkan penguasaan yang baik dalam ${highestDesc} pada mata pelajaran ${mapel.nama}, serta cukup terampil dalam ${lowestDesc}.`;
  }

  if (highest.score < 75 && lowest.score < 70) {
    return `${prefix} perlu bimbingan dan dorongan belajar yang lebih intensif dalam menguasai kompetensi mata pelajaran ${mapel.nama}, khususnya terkait ${lowestDesc}.`;
  }

  return `${prefix} menunjukkan penguasaan yang cukup baik dalam ${highestDesc} pada mata pelajaran ${mapel.nama}. Perlu latihan tambahan dalam ${lowestDesc}.`;
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
