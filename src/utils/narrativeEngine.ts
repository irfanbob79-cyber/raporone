import { TujuanPembelajaran, Siswa, Rombel, MataPelajaran, Jurusan, SchoolLevel } from '../types';

export interface NarrativeContext {
  siswa: Siswa;
  rombel: Rombel;
  mapel: MataPelajaran;
  jurusan?: Jurusan;
  jenjang: SchoolLevel;
  tujuanPembelajaranList: TujuanPembelajaran[];
  nilaiAkhir?: number; // SATU JENIS NILAI YANG DI-INPUT GURU (0 - 100)
  tpTercapaiIds?: string[]; // Daftar ID TP yang dicapai / diceklis murid
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

  if (Array.isArray(tpTercapaiIds)) {
    // Mode Utama: Berdasarkan checklist TP yang dipilih oleh guru
    achievedTps = tujuanPembelajaranList.filter(t => tpTercapaiIds.includes(t.id));
    unachievedTps = tujuanPembelajaranList.filter(t => !tpTercapaiIds.includes(t.id));
  } else if (nilaiTp && Object.keys(nilaiTp).length > 0) {
    // Mode Fallback: Berdasarkan skor nilaiTp lama (kktp default 75)
    achievedTps = tujuanPembelajaranList.filter(t => (nilaiTp[t.id] ?? 0) >= (mapel.kktp || 75));
    unachievedTps = tujuanPembelajaranList.filter(t => (nilaiTp[t.id] ?? 0) < (mapel.kktp || 75));
  } else {
    // Default jika belum ada data checklist: jika nilai >= kktp anggap semua tercapai
    const threshold = mapel.kktp || 75;
    if (nilaiAkhir >= threshold) {
      achievedTps = [...tujuanPembelajaranList];
      unachievedTps = [];
    } else {
      achievedTps = tujuanPembelajaranList.slice(0, 1);
      unachievedTps = tujuanPembelajaranList.slice(1);
    }
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

  const threshold = mapel.kktp || 75;
  const isLulus = nilaiAkhir >= threshold;

  // KONDISI 1: NILAI SISWA TERCAPAI / TUNTAS (nilaiAkhir >= KKTP)
  // TP yang di-uncheck TIDAK PERLU TAMPIL sama sekali (karena terlalu banyak).
  // Hanya tampilkan TP yang dipilih / diceklis (biasanya 1 TP utama per murid).
  if (isLulus) {
    if (achievedTps.length > 0) {
      const achievedText = formatTpList(achievedTps);
      if (nilaiAkhir >= 85) {
        return `${prefix} menunjukkan penguasaan yang sangat baik dalam ${achievedText} pada mata pelajaran ${mapel.nama}.`;
      }
      return `${prefix} menunjukkan penguasaan yang baik dalam ${achievedText} pada mata pelajaran ${mapel.nama}.`;
    }

    // Jika guru belum mencentang tapi nilai sudah tuntas: gunakan 1 TP pertama
    const defaultTp = tujuanPembelajaranList.slice(0, 1);
    return `${prefix} menunjukkan penguasaan yang baik dalam ${formatTpList(defaultTp)} pada mata pelajaran ${mapel.nama}.`;
  }

  // KONDISI 2: NILAI SISWA KURANG / TIDAK TERCAPAI (nilaiAkhir < KKTP)
  // Di sinilah narasi "perlu bimbingan" ditampilkan.
  // Gunakan tepat 1 TP yang belum tuntas agar narasi tidak terlalu panjang.
  const targetTp = unachievedTps.length > 0 
    ? unachievedTps.slice(0, 1) 
    : (achievedTps.length > 0 ? achievedTps.slice(0, 1) : tujuanPembelajaranList.slice(0, 1));
  const focusText = formatTpList(targetTp);

  if (nilaiAkhir >= 65) {
    return `${prefix} perlu bimbingan dan peningkatan belajar dalam ${focusText} pada mata pelajaran ${mapel.nama}.`;
  }
  return `${prefix} perlu bimbingan intensif dan dorongan belajar dalam menguasai kompetensi ${focusText} pada mata pelajaran ${mapel.nama}.`;
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
