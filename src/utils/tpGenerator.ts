import { MataPelajaran, Rombel, Jurusan } from '../types';

export interface GeneratedTPOption {
  kodeTp: string;
  deskripsi: string;
  elemen: string;
  semesterTarget: '1 (Ganjil)' | '2 (Genap)' | 'Semua';
}

// MATRIX CAPAIAN PEMBELAJARAN (CP) & BANK TUJUAN PEMBELAJARAN RESMI BSKAP KURIKULUM MERDEKA
export const CP_KNOWLEDGE_BASE: Record<string, GeneratedTPOption[]> = {
  // 1. TEKNIK SEPEDA MOTOR (TSM) - FASE F (KELAS XI & XII)
  'KK-TSM': [
    // Ganjil
    {
      kodeTp: 'TP 1',
      deskripsi: 'mendiagnosis dan memperbaiki gangguan sistem injeksi bahan bakar elektronik (EFI/PGM-FI)',
      elemen: 'Perawatan Engine & Sistem Bahan Bakar',
      semesterTarget: '1 (Ganjil)'
    },
    {
      kodeTp: 'TP 2',
      deskripsi: 'melakukan overhaul engine, pemeriksaan celah katup, dan penggantian komponen kepala silinder',
      elemen: 'Perawatan Engine Sepeda Motor',
      semesterTarget: '1 (Ganjil)'
    },
    {
      kodeTp: 'TP 3',
      deskripsi: 'menganalisis kerusakan dan menyetel komponen sistem transmisi otomatis (CVT) dan kopling sentrifugal',
      elemen: 'Sistem Pemindah Tenaga',
      semesterTarget: '1 (Ganjil)'
    },
    {
      kodeTp: 'TP 4',
      deskripsi: 'merawat dan memperbaiki sistem pendinginan radiator serta pelumasan mesin sepeda motor',
      elemen: 'Perawatan Engine Sepeda Motor',
      semesterTarget: '1 (Ganjil)'
    },
    // Genap
    {
      kodeTp: 'TP 1',
      deskripsi: 'mendiagnosis dan memperbaiki gangguan sistem kelistrikan bodi, instrumen panel, dan lampu penerangan',
      elemen: 'Sistem Kelistrikan Sepeda Motor',
      semesterTarget: '2 (Genap)'
    },
    {
      kodeTp: 'TP 2',
      deskripsi: 'merawat dan menyetel sistem sasis, suspensi teleskopik/monoshock, serta sistem kemudi sepeda motor',
      elemen: 'Perawatan Sasis Sepeda Motor',
      semesterTarget: '2 (Genap)'
    },
    {
      kodeTp: 'TP 3',
      deskripsi: 'memperbaiki gangguan sistem rem hidrolik (cakram) dan sistem rem anti-lock braking system (ABS)',
      elemen: 'Perawatan Sasis Sepeda Motor',
      semesterTarget: '2 (Genap)'
    },
    {
      kodeTp: 'TP 4',
      deskripsi: 'melakukan pengujian performa akhir engine dan emisi gas buang sepeda motor sesuai standar industri',
      elemen: 'Teknologi & Uji Performa Otomotif',
      semesterTarget: '2 (Genap)'
    }
  ],

  // 2. DESAIN KOMUNIKASI VISUAL (DKV) - FASE F
  'KK-DKV': [
    // Ganjil
    {
      kodeTp: 'TP 1',
      deskripsi: 'merancang identitas visual (logo, palet warna, tipografi) sesuai prinsip dasar estetika dan brief klien',
      elemen: 'Prinsip Dasar Desain & Branding',
      semesterTarget: '1 (Ganjil)'
    },
    {
      kodeTp: 'TP 2',
      deskripsi: 'mengoperasikan perangkat lunak grafis berbasis vektor dan raster untuk pembuatan aset promosi visual',
      elemen: 'Perangkat Lunak Desain Grafis',
      semesterTarget: '1 (Ganjil)'
    },
    {
      kodeTp: 'TP 3',
      deskripsi: 'membuat karya ilustrasi digital manual dan komersial dengan penekanan proporsi dan karakter visual',
      elemen: 'Ilustrasi Desain Grafis',
      semesterTarget: '1 (Ganjil)'
    },
    {
      kodeTp: 'TP 4',
      deskripsi: 'merancang tata letak (layout) media cetak publikasi seperti brosur, poster, dan katalog produk',
      elemen: 'Tata Letak Publikasi Desain',
      semesterTarget: '1 (Ganjil)'
    },
    // Genap
    {
      kodeTp: 'TP 1',
      deskripsi: 'menerapkan teknik fotografi studio, pencahayaan (lighting), dan komposisi visual untuk pemotretan produk',
      elemen: 'Fotografi & Videografi Komersial',
      semesterTarget: '2 (Genap)'
    },
    {
      kodeTp: 'TP 2',
      deskripsi: 'memproduksi video iklan pendek (motion visual) mulai dari storyboard hingga proses video editing',
      elemen: 'Media Interaktif & Audio Visual',
      semesterTarget: '2 (Genap)'
    },
    {
      kodeTp: 'TP 3',
      deskripsi: 'merancang desain kemasan produk (packaging design) dengan memperhatikan jaring-jaring cetak dan ergonomi',
      elemen: 'Desain Kemasan & Produksi Cetak',
      semesterTarget: '2 (Genap)'
    },
    {
      kodeTp: 'TP 4',
      deskripsi: 'menyusun portofolio karya kreatif digital profesional untuk presentasi ke mitra industri DUDI',
      elemen: 'Portofolio & Proyek Kreatif',
      semesterTarget: '2 (Genap)'
    }
  ],

  // 3. AKUNTANSI DAN KEUANGAN LEMBAGA (AKL)
  'AKL': [
    // Ganjil
    {
      kodeTp: 'TP 1',
      deskripsi: 'menganalisis bukti transaksi dan memproses entri jurnal khusus pada siklus akuntansi perusahaan dagang',
      elemen: 'Praktikum Akuntansi Perusahaan',
      semesterTarget: '1 (Ganjil)'
    },
    {
      kodeTp: 'TP 2',
      deskripsi: 'memposting jurnal ke buku besar dan menyusun neraca saldo penyesuaian (worksheet)',
      elemen: 'Praktikum Akuntansi Perusahaan',
      semesterTarget: '1 (Ganjil)'
    },
    {
      kodeTp: 'TP 3',
      deskripsi: 'mengoperasikan aplikasi komputer akuntansi untuk pencatatan data akun, persediaan, dan piutang usaha',
      elemen: 'Komputer Akuntansi',
      semesterTarget: '1 (Ganjil)'
    },
    {
      kodeTp: 'TP 4',
      deskripsi: 'mengelola administrasi dana kas kecil dengan metode dana tetap (imprest fund) dan fluktuasi',
      elemen: 'Pengelolaan Kas & Perbankan',
      semesterTarget: '1 (Ganjil)'
    },
    // Genap
    {
      kodeTp: 'TP 1',
      deskripsi: 'menyusun laporan keuangan komprehensif (Laba Rugi, Perubahan Ekuitas, Neraca, dan Arus Kas)',
      elemen: 'Pelaporan Keuangan Perusahaan',
      semesterTarget: '2 (Genap)'
    },
    {
      kodeTp: 'TP 2',
      deskripsi: 'menghitung dan membuat surat pemberitahuan (SPT) masa pajak penghasilan (PPh) dan PPN',
      elemen: 'Administrasi Perpajakan',
      semesterTarget: '2 (Genap)'
    },
    {
      kodeTp: 'TP 3',
      deskripsi: 'melakukan pencatatan siklus akuntansi biaya dan penentuan harga pokok produksi (HPP) perusahaan manufaktur',
      elemen: 'Akuntansi Manufaktur',
      semesterTarget: '2 (Genap)'
    },
    {
      kodeTp: 'TP 4',
      deskripsi: 'membuat rekonsiliasi laporan bank dan menganalisis selisih saldo kas perusahaan dengan bank',
      elemen: 'Akuntansi Keuangan & Perbankan',
      semesterTarget: '2 (Genap)'
    }
  ],

  // 4. BAHASA INDONESIA
  'BINDO': [
    // Ganjil
    {
      kodeTp: 'TP 1',
      deskripsi: 'mengevaluasi gagasan dan pesan tersurat/tersirat dari teks laporan hasil observasi kritis',
      elemen: 'Menyimak & Membaca Kritis',
      semesterTarget: '1 (Ganjil)'
    },
    {
      kodeTp: 'TP 2',
      deskripsi: 'menulis teks eksposisi dan negosiasi secara logis, runtut, dan santun berbasis data faktual',
      elemen: 'Menulis Teks Faktual',
      semesterTarget: '1 (Ganjil)'
    },
    {
      kodeTp: 'TP 3',
      deskripsi: 'menganalisis struktur dan kaidah kebahasaan teks cerita pendek serta nilai kehidupan di dalamnya',
      elemen: 'Kajian Sastra & Kebahasaan',
      semesterTarget: '1 (Ganjil)'
    },
    // Genap
    {
      kodeTp: 'TP 1',
      deskripsi: 'mempresentasikan gagasan orisinal dalam forum diskusi dan debat dengan intonasi serta argumen yang meyakinkan',
      elemen: 'Berbicara & Mempresentasikan',
      semesterTarget: '2 (Genap)'
    },
    {
      kodeTp: 'TP 2',
      deskripsi: 'menulis proposal kegiatan dan karya tulis ilmiah sederhana sesuai format penulisan akademik baku',
      elemen: 'Menulis Karya Ilmiah',
      semesterTarget: '2 (Genap)'
    },
    {
      kodeTp: 'TP 3',
      deskripsi: 'mengevaluasi dan mengapresiasi teks drama serta menyusun naskah monolog pendek',
      elemen: 'Apresiasi Sastra & Drama',
      semesterTarget: '2 (Genap)'
    }
  ],

  // 5. MATEMATIKA
  'MTK': [
    // Ganjil
    {
      kodeTp: 'TP 1',
      deskripsi: 'menerapkan konsep bilangan berpangkat (eksponen), bentuk akar, dan logaritma dalam pemecahan masalah nyata',
      elemen: 'Bilangan & Aljabar',
      semesterTarget: '1 (Ganjil)'
    },
    {
      kodeTp: 'TP 2',
      deskripsi: 'menganalisis pola barisan dan deret aritmetika serta geometri untuk menghitung pertumbuhan dan bunga majemuk',
      elemen: 'Aljabar & Barisan Deret',
      semesterTarget: '1 (Ganjil)'
    },
    {
      kodeTp: 'TP 3',
      deskripsi: 'menyelesaikan sistem persamaan dan pertidaksamaan linear dua variabel dalam konteks masalah kontekstual',
      elemen: 'Aljabar & Pemodelan',
      semesterTarget: '1 (Ganjil)'
    },
    // Genap
    {
      kodeTp: 'TP 1',
      deskripsi: 'menentukan perbandingan trigonometri pada segitiga siku-siku dan memecahkan masalah jarak/sudut elevasi',
      elemen: 'Geometri & Trigonometri',
      semesterTarget: '2 (Genap)'
    },
    {
      kodeTp: 'TP 2',
      deskripsi: 'menganalisis ukuran pemusatan (mean, median, modus) dan ukuran penyebaran pada penyajian data berkelompok',
      elemen: 'Statistika & Analisis Data',
      semesterTarget: '2 (Genap)'
    },
    {
      kodeTp: 'TP 3',
      deskripsi: 'menghitung peluang kejadian majemuk (saling lepas dan saling bebas) dalam kehidupan sehari-hari',
      elemen: 'Peluang & Ketidakpastian',
      semesterTarget: '2 (Genap)'
    }
  ],

  // 6. BAHASA INGGRIS
  'BING': [
    // Ganjil
    {
      kodeTp: 'TP 1',
      deskripsi: 'mengidentifikasi ide utama dan informasi rinci dari teks recount dan descriptive lisan maupun tulis',
      elemen: 'Listening & Reading Comprehension',
      semesterTarget: '1 (Ganjil)'
    },
    {
      kodeTp: 'TP 2',
      deskripsi: 'melakukan percakapan transaksional untuk memberikan pendapat, menyetujui, dan menolak usulan secara sopan',
      elemen: 'Speaking & Interaction',
      semesterTarget: '1 (Ganjil)'
    },
    // Genap
    {
      kodeTp: 'TP 1',
      deskripsi: 'menulis surat lamaran pekerjaan (application letter) dan daftar riwayat hidup (curriculum vitae) formal',
      elemen: 'Writing Professional Documents',
      semesterTarget: '2 (Genap)'
    },
    {
      kodeTp: 'TP 2',
      deskripsi: 'menganalisis argumen dalam teks analytical exposition dan menyampaikan opini logis secara tertulis',
      elemen: 'Critical Reading & Writing',
      semesterTarget: '2 (Genap)'
    }
  ],

  // 7. PENDIDIKAN PANCASILA (PPKN)
  'PPKN': [
    {
      kodeTp: 'TP 1',
      deskripsi: 'menganalisis kedudukan Pancasila sebagai dasar negara, pandangan hidup, dan ideologi terbuka bangsa',
      elemen: 'Pancasila & Karakter Bangsa',
      semesterTarget: '1 (Ganjil)'
    },
    {
      kodeTp: 'TP 2',
      deskripsi: 'mengevaluasi pelaksanaan hak dan kewajiban asasi manusia yang diatur dalam UUD Negara Republik Indonesia 1945',
      elemen: 'UUD 1945 & Konstitusi',
      semesterTarget: '1 (Ganjil)'
    },
    {
      kodeTp: 'TP 3',
      deskripsi: 'mempromosikan nilai toleransi, kerukunan antarsuku/agama, dan integrasi nasional di lingkungan sekolah',
      elemen: 'Bhinneka Tunggal Ika & NKRI',
      semesterTarget: '2 (Genap)'
    }
  ],

  // 8. PROJEK KREATIF & KEWIRAUSAHAAN (PKK)
  'PKK': [
    {
      kodeTp: 'TP 1',
      deskripsi: 'mengidentifikasi peluang usaha berbasis potensi keahlian kejuruan dan menganalisis kebutuhan pasar',
      elemen: 'Peluang Usaha & Ide Bisnis',
      semesterTarget: '1 (Ganjil)'
    },
    {
      kodeTp: 'TP 2',
      deskripsi: 'merancang purwarupa (prototype) produk barang/jasa kejuruan beserta perhitungan Harga Pokok Produksi (HPP)',
      elemen: 'Desain Produk & Analisis Biaya',
      semesterTarget: '1 (Ganjil)'
    },
    {
      kodeTp: 'TP 3',
      deskripsi: 'merencanakan dan menerapkan strategi pemasaran produk digital (digital marketing) dan penjualan langsung',
      elemen: 'Pemasaran & Penjualan',
      semesterTarget: '2 (Genap)'
    },
    {
      kodeTp: 'TP 4',
      deskripsi: 'membuat laporan keuangan sederhana hasil penjualan dan mengevaluasi kelayakan pengembangan usaha mandiri',
      elemen: 'Laporan Keuangan & Evaluasi Bisnis',
      semesterTarget: '2 (Genap)'
    }
  ]
};

// HELPER: GENERATE TP BERDASARKAN MAPEL, JURUSAN, DAN SEMESTER
export function generateRecommendedTP(
  mapel: MataPelajaran,
  rombel: Rombel,
  jurusan: Jurusan | undefined,
  semester: '1 (Ganjil)' | '2 (Genap)' | string,
  customTopic?: string,
  limitCount: number = 4
): GeneratedTPOption[] {
  const mapelKode = mapel.kode.toUpperCase();
  const semesterStr = semester.includes('1') || semester.toLowerCase().includes('ganjil')
    ? '1 (Ganjil)'
    : '2 (Genap)';

  // 1. Cari kecocokan kode mapel di database CP
  let matchedList: GeneratedTPOption[] = [];

  if (CP_KNOWLEDGE_BASE[mapelKode]) {
    matchedList = CP_KNOWLEDGE_BASE[mapelKode];
  } else if (mapelKode.includes('TSM') && CP_KNOWLEDGE_BASE['KK-TSM']) {
    matchedList = CP_KNOWLEDGE_BASE['KK-TSM'];
  } else if (mapelKode.includes('DKV') && CP_KNOWLEDGE_BASE['KK-DKV']) {
    matchedList = CP_KNOWLEDGE_BASE['KK-DKV'];
  } else if ((mapelKode.includes('AKL') || mapelKode.includes('AKUN')) && CP_KNOWLEDGE_BASE['AKL']) {
    matchedList = CP_KNOWLEDGE_BASE['AKL'];
  } else if (mapelKode.includes('INDO') && CP_KNOWLEDGE_BASE['BINDO']) {
    matchedList = CP_KNOWLEDGE_BASE['BINDO'];
  } else if (mapelKode.includes('MAT') || mapelKode.includes('MTK')) {
    matchedList = CP_KNOWLEDGE_BASE['MTK'];
  } else if (mapelKode.includes('ING') && CP_KNOWLEDGE_BASE['BING']) {
    matchedList = CP_KNOWLEDGE_BASE['BING'];
  } else if (mapelKode.includes('PKK')) {
    matchedList = CP_KNOWLEDGE_BASE['PKK'];
  } else if (mapelKode.includes('PPKN') || mapelKode.includes('PANCASILA')) {
    matchedList = CP_KNOWLEDGE_BASE['PPKN'];
  }

  // 2. Filter berdasarkan Semester (Ganjil vs Genap)
  let semesterFiltered = matchedList.filter(
    tp => tp.semesterTarget === semesterStr || tp.semesterTarget === 'Semua'
  );

  // Jika hasil filter semester sedikit, tambahkan dari semester lainnya
  if (semesterFiltered.length === 0 && matchedList.length > 0) {
    semesterFiltered = matchedList;
  }

  // 3. Jika ada Custom Topic dari Guru / AI Prompt
  if (customTopic && customTopic.trim()) {
    const topic = customTopic.trim().toLowerCase();
    const customTPs: GeneratedTPOption[] = [
      {
        kodeTp: 'TP 1',
        deskripsi: `menganalisis dan memahami konsep dasar serta prinsip kerja pada materi ${topic}`,
        elemen: 'Pemahaman Konsep & Teori',
        semesterTarget: semesterStr as any
      },
      {
        kodeTp: 'TP 2',
        deskripsi: `mendiagnosis, mempraktikkan, dan mengatasi permasalahan terkait ${topic} sesuai prosedur operasional standar`,
        elemen: 'Keterampilan Praktik Kejuruan',
        semesterTarget: semesterStr as any
      },
      {
        kodeTp: 'TP 3',
        deskripsi: `mengevaluasi hasil pengujian, perawatan berkala, dan membuat laporan kerja mandiri pada materi ${topic}`,
        elemen: 'Evaluasi & Refleksi Belajar',
        semesterTarget: semesterStr as any
      }
    ];
    return customTPs.slice(0, limitCount);
  }

  // 4. Jika mapel umum yang belum terdaftar di matrix
  if (semesterFiltered.length === 0) {
    const jurInfo = jurusan ? ` pada program keahlian ${jurusan.nama}` : '';
    return [
      {
        kodeTp: 'TP 1',
        deskripsi: `memahami dan menganalisis konsep-konsep esensial mata pelajaran ${mapel.nama} pada ${semesterStr}${jurInfo}`,
        elemen: 'Penguasaan Konsep Dasar',
        semesterTarget: semesterStr as any
      },
      {
        kodeTp: 'TP 2',
        deskripsi: `menerapkan keterampilan berpikir kritis dan pemecahan masalah nyata pada materi mata pelajaran ${mapel.nama}`,
        elemen: 'Penerapan & Keterampilan Praktik',
        semesterTarget: semesterStr as any
      },
      {
        kodeTp: 'TP 3',
        deskripsi: `mengevaluasi capaian pembelajaran dan menyusun laporan portofolio tugas mandiri mata pelajaran ${mapel.nama}`,
        elemen: 'Evaluasi & Portofolio',
        semesterTarget: semesterStr as any
      }
    ].slice(0, limitCount);
  }

  // Re-index kode TP agar urut TP 1, TP 2, dst
  return semesterFiltered.slice(0, limitCount).map((item, idx) => ({
    ...item,
    kodeTp: `TP ${idx + 1}`
  }));
}
