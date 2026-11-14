import * as XLSX from 'xlsx';
import { Siswa, Guru, Rombel, MataPelajaran, TujuanPembelajaran, UserAccount } from '../types';

export interface ValidationIssue {
  row: number;
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ParsedImportResult<T> {
  data: T[];
  issues: ValidationIssue[];
  totalRows: number;
  validRows: number;
}

// 1. Download Template Siswa
export function downloadTemplateSiswa() {
  const wsData = [
    ['NIS', 'NISN', 'Nama Lengkap', 'Jenis Kelamin (L/P)', 'Tempat Lahir', 'Tanggal Lahir (YYYY-MM-DD)', 'Agama', 'Kode Rombel', 'Nama Ayah', 'Nama Ibu', 'Alamat Lengkap', 'No HP Ortu'],
    ['241101', '0067823901', 'Ahmad Fauzi Rahman', 'L', 'Labuhan Maringgai', '2007-04-12', 'Islam', 'XI-TSM-1', 'Slamet Riyadi', 'Sri Wahyuni', 'Desa Karang Anyar RT 02/01', '085273112233'],
    ['241102', '0068412983', 'Budi Santoso', 'L', 'Margasari', '2007-06-25', 'Islam', 'XI-TSM-1', 'Wahyudi', 'Siti Aminah', 'Desa Margasari', '085382445566'],
    ['242101', '0078921345', 'Adelia Putri Kirana', 'P', 'Labuhan Maringgai', '2007-05-19', 'Islam', 'XI-DKV-1', 'Haryanto', 'Lestari', 'Desa Karang Anyar', '082281992200'],
  ];

  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Data Siswa');
  XLSX.writeFile(wb, 'Format_Import_Siswa_eRaporOne.xlsx');
}

// 2. Download Template Guru
export function downloadTemplateGuru() {
  const wsData = [
    ['NIP (Kosongkan jika Honorer)', 'NUPTK', 'Nama Lengkap (Tanpa Gelar)', 'Gelar Depan', 'Gelar Belakang', 'Jenis Kelamin (L/P)', 'Email Aktif', 'No Handphone/WA'],
    ['197508102005011005', '4537753655200022', 'Bambang Irawan', '', 'S.T., M.Pd.', 'L', 'bambang.irawan@smkn1labmar.sch.id', '081272345678'],
    ['198203152010012015', '6748760662210083', 'Siti Rahmawati', '', 'S.Kom., M.T.', 'P', 'siti.rahmawati@smkn1labmar.sch.id', '081373456789'],
    ['', '8956766667230112', 'Dewi Lestari', '', 'S.E., Ak.', 'P', 'dewi.lestari@smkn1labmar.sch.id', '081368112233'],
  ];

  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Data Guru');
  XLSX.writeFile(wb, 'Format_Import_Guru_eRaporOne.xlsx');
}

// 3. Download Template Nilai per Rombel/Mapel
export function downloadTemplateNilai(
  rombel: Rombel,
  mapel: MataPelajaran,
  siswaList: Siswa[],
  tpList: TujuanPembelajaran[]
) {
  const headers = ['No', 'NISN', 'Nama Siswa'];
  tpList.forEach((tp) => {
    headers.push(`${tp.kodeTp} (${tp.deskripsi.slice(0, 25)}...)`);
  });
  headers.push('Nilai SAS (Akhir Semester)');
  headers.push('Deskripsi Khusus Guru (Opsional)');

  const rows: any[][] = [headers];

  siswaList.forEach((siswa, index) => {
    const row = [index + 1, siswa.nisn, siswa.nama];
    // Fill empty cells for TPs
    tpList.forEach(() => row.push(80)); // default placeholder
    row.push(80); // SAS default
    row.push(''); // custom description
    rows.push(row);
  });

  const ws = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  const sheetName = `Nilai_${rombel.kode}_${mapel.kode}`.substring(0, 31);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `Format_Nilai_${rombel.kode}_${mapel.kode}.xlsx`);
}

// 4. Parse Excel Siswa
export async function parseExcelSiswa(
  file: File,
  existingRombel: Rombel[]
): Promise<ParsedImportResult<Omit<Siswa, 'id'>>> {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const jsonRows = XLSX.utils.sheet_to_json<any>(worksheet, { header: 1 });

  const issues: ValidationIssue[] = [];
  const parsedSiswa: Omit<Siswa, 'id'>[] = [];

  if (jsonRows.length <= 1) {
    issues.push({
      row: 1,
      field: 'File',
      message: 'File Excel kosong atau tidak memiliki data.',
      severity: 'error'
    });
    return { data: [], issues, totalRows: 0, validRows: 0 };
  }

  // Iterate rows (skip header row 0)
  for (let i = 1; i < jsonRows.length; i++) {
    const row = jsonRows[i];
    const rowNum = i + 1;

    // Check if entire row is empty
    if (!row || row.length === 0 || !row[2]) continue;

    const nis = String(row[0] || '').trim();
    const nisn = String(row[1] || '').trim();
    const nama = String(row[2] || '').trim();
    let jk = String(row[3] || '').trim().toUpperCase();
    const tempatLahir = String(row[4] || '-').trim();
    const tanggalLahir = String(row[5] || '2007-01-01').trim();
    const agama = String(row[6] || 'Islam').trim();
    const kodeRombel = String(row[7] || '').trim();
    const namaAyah = String(row[8] || '-').trim();
    const namaIbu = String(row[9] || '-').trim();
    const alamat = String(row[10] || '-').trim();
    const noHpOrtu = String(row[11] || '').trim();

    // Validation
    let hasError = false;

    if (!nama) {
      issues.push({ row: rowNum, field: 'Nama Lengkap', message: 'Nama siswa wajib diisi', severity: 'error' });
      hasError = true;
    }

    if (!nisn) {
      issues.push({ row: rowNum, field: 'NISN', message: 'NISN wajib diisi (10 digit)', severity: 'warning' });
    }

    if (jk !== 'L' && jk !== 'P') {
      jk = 'L'; // fallback
      issues.push({ row: rowNum, field: 'Jenis Kelamin', message: 'Jenis kelamin tidak valid, diubah ke L', severity: 'warning' });
    }

    // Match rombel
    let matchedRombelId = '';
    const matchedRombel = existingRombel.find(
      r => r.kode.toLowerCase() === kodeRombel.toLowerCase() || r.nama.toLowerCase().includes(kodeRombel.toLowerCase())
    );

    if (matchedRombel) {
      matchedRombelId = matchedRombel.id;
    } else if (existingRombel.length > 0) {
      matchedRombelId = existingRombel[0].id;
      issues.push({
        row: rowNum,
        field: 'Kode Rombel',
        message: `Rombel "${kodeRombel}" tidak ditemukan. Dialihkan ke "${existingRombel[0].nama}".`,
        severity: 'warning'
      });
    }

    if (!hasError) {
      parsedSiswa.push({
        nis: nis || `NIS-${Math.floor(100000 + Math.random() * 900000)}`,
        nisn: nisn || `00${Math.floor(10000000 + Math.random() * 90000000)}`,
        nama,
        jenisKelamin: jk as 'L' | 'P',
        tempatLahir,
        tanggalLahir,
        agama,
        rombelId: matchedRombelId,
        namaAyah,
        namaIbu,
        alamat,
        noHpOrtu
      });
    }
  }

  return {
    data: parsedSiswa,
    issues,
    totalRows: jsonRows.length - 1,
    validRows: parsedSiswa.length
  };
}

// 5. Parse Excel Guru
export async function parseExcelGuru(file: File): Promise<ParsedImportResult<Omit<Guru, 'id'>>> {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const jsonRows = XLSX.utils.sheet_to_json<any>(worksheet, { header: 1 });

  const issues: ValidationIssue[] = [];
  const parsedGuru: Omit<Guru, 'id'>[] = [];

  for (let i = 1; i < jsonRows.length; i++) {
    const row = jsonRows[i];
    const rowNum = i + 1;
    if (!row || !row[2]) continue;

    const nip = String(row[0] || '').trim();
    const nuptk = String(row[1] || '').trim();
    const nama = String(row[2] || '').trim();
    const gelarDepan = String(row[3] || '').trim();
    const gelarBelakang = String(row[4] || '').trim();
    let jk = String(row[5] || 'L').trim().toUpperCase();
    const email = String(row[6] || '').trim();
    const noHp = String(row[7] || '').trim();

    if (!nama) {
      issues.push({ row: rowNum, field: 'Nama Lengkap', message: 'Nama guru wajib diisi', severity: 'error' });
      continue;
    }

    if (jk !== 'L' && jk !== 'P') jk = 'L';

    parsedGuru.push({
      nip,
      nuptk,
      nama,
      gelarDepan,
      gelarBelakang,
      jenisKelamin: jk as 'L' | 'P',
      email: email || `${nama.toLowerCase().replace(/[^a-z0-9]/g, '')}@sekolah.id`,
      noHp: noHp || '-'
    });
  }

  return {
    data: parsedGuru,
    issues,
    totalRows: jsonRows.length - 1,
    validRows: parsedGuru.length
  };
}

// 6. Export Legger Nilai to Excel
export function exportLeggerExcel(
  rombel: Rombel,
  siswaList: Siswa[],
  mapelList: MataPelajaran[],
  nilaiList: { [siswaId: string]: { [mapelId: string]: number } },
  kehadiranList: { [siswaId: string]: { sakit: number; izin: number; alfa: number } }
) {
  const headers = ['No', 'NISN', 'Nama Siswa', 'L/P'];
  mapelList.forEach(m => headers.push(m.kode));
  headers.push('Rata-rata', 'Sakit', 'Izin', 'Alfa', 'Total Absen');

  const rows: any[][] = [
    [`LEGER NILAI HASIL BELAJAR - ${rombel.nama.toUpperCase()}`],
    [`Semester: 1 (Ganjil) | Tahun Ajaran: 2024/2025`],
    [],
    headers
  ];

  siswaList.forEach((siswa, index) => {
    const row: any[] = [index + 1, siswa.nisn, siswa.nama, siswa.jenisKelamin];
    let sumScore = 0;
    let countScore = 0;

    mapelList.forEach(m => {
      const score = nilaiList[siswa.id]?.[m.id] || 0;
      row.push(score > 0 ? score : '-');
      if (score > 0) {
        sumScore += score;
        countScore++;
      }
    });

    const avg = countScore > 0 ? Math.round(sumScore / countScore) : 0;
    row.push(avg);

    const keh = kehadiranList[siswa.id] || { sakit: 0, izin: 0, alfa: 0 };
    row.push(keh.sakit, keh.izin, keh.alfa, keh.sakit + keh.izin + keh.alfa);
    rows.push(row);
  });

  const ws = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, `Leger_${rombel.kode}`);
  XLSX.writeFile(wb, `Leger_Nilai_${rombel.kode}.xlsx`);
}

// 7. Export Daftar Akun Pengguna & Kredensial Login
export function exportAccountsExcel(
  accounts: UserAccount[],
  schoolName: string,
  rombelList: Rombel[] = [],
  ekskulList: { id: string; nama: string }[] = []
) {
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator Sistem';
      case 'kepala_sekolah': return 'Kepala Sekolah';
      case 'waka_kurikulum': return 'Waka Kurikulum';
      case 'wali_kelas': return 'Wali Kelas';
      case 'guru': return 'Guru Mata Pelajaran';
      default: return role;
    }
  };

  const headers = [
    'No',
    'Nama Pengguna',
    'Peran (Role)',
    'Username / NIP Login',
    'Password Login',
    'Tugas Wali Kelas',
    'Tugas Pembina Ekskul',
    'Keterangan Hak Akses',
    'Tautan Portal Login'
  ];

  const rows: any[][] = [
    [`DAFTAR AKUN PENGGUNA & KREDENSIAL LOGIN - ${schoolName.toUpperCase()}`],
    [`Aplikasi: eRaporOne Kurikulum Merdeka | Tanggal Unduh: ${new Date().toLocaleDateString('id-ID')}`],
    [`Website Resmi: https://raporone.hsgserver.my.id/`],
    [],
    headers
  ];

  accounts.forEach((acc, index) => {
    const waliRombel = acc.rombelWaliId ? rombelList.find(r => r.id === acc.rombelWaliId) : undefined;
    const pembina = acc.ekskulId ? ekskulList.find(e => e.id === acc.ekskulId) : undefined;
    const pass = acc.password || (acc.role === 'admin' ? 'admin123' : 'guru123');

    rows.push([
      index + 1,
      acc.nama,
      getRoleDisplayName(acc.role),
      acc.username,
      pass,
      waliRombel?.nama || '-',
      pembina?.nama || '-',
      acc.keterangan || '-',
      'https://raporone.hsgserver.my.id/'
    ]);
  });

  const ws = XLSX.utils.aoa_to_sheet(rows);

  // Set column widths
  ws['!cols'] = [
    { wch: 6 },
    { wch: 32 },
    { wch: 24 },
    { wch: 25 },
    { wch: 18 },
    { wch: 22 },
    { wch: 22 },
    { wch: 40 },
    { wch: 35 }
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Daftar Akun Pengguna');
  XLSX.writeFile(wb, `Daftar_Akun_Login_eRaporOne_${schoolName.replace(/[^a-zA-Z0-9]/g, '_')}.xlsx`);
}
