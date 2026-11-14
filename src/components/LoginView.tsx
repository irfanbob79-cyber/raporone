import React, { useState } from 'react';
import { useApp, UserSession } from '../context/AppContext';
import { Shield, UserCheck, Lock, User, ArrowRight, CheckCircle2, Sparkles, School, GraduationCap, BookOpen } from 'lucide-react';

export const LoginView: React.FC = () => {
  const { login, loginAsDemo, guru, rombel, ekskul, schoolProfile, userAccounts } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const getRoleLabel = (idOrGuruId: string, defaultLabel: string) => {
    const acc = userAccounts?.find(u => 
      u.id === idOrGuruId || 
      u.guruId === idOrGuruId || 
      u.username === idOrGuruId || 
      (idOrGuruId === 'admin' && u.role === 'admin')
    );
    if (!acc) return defaultLabel;
    if (acc.role === 'admin') return 'Role: Administrator (Akses Penuh)';
    if (acc.role === 'kepala_sekolah') return 'Role: Kepala Sekolah (Supervisi Penuh)';
    if (acc.role === 'waka_kurikulum') return 'Role: Waka Kurikulum (Supervisi Akademik)';
    if (acc.role === 'wali_kelas') {
      const r = acc.rombelWaliId ? rombel.find(item => item.id === acc.rombelWaliId) : undefined;
      return `Role: Wali Kelas (${r?.nama || 'Rombel'})`;
    }
    return 'Role: Guru Mapel (Hanya Input Mapel)';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = login(username, password);
    if (!success) {
      setErrorMsg('Username atau password tidak sesuai. Coba username: admin (pass: admin123) atau gunakan Kartu Demo di bawah.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full z-10 space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-1">
            <School className="w-3.5 h-3.5" />
            <span>{schoolProfile.namaSekolah}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            eRapor<span className="text-blue-500">One</span> Kurikulum Merdeka
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Sistem Informasi Pengelolaan & Cetak Rapor Terpadu Berbasis Peran (RBAC)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Kolom Kiri: Form Login Manual */}
          <div className="lg:col-span-5 bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/80 shadow-2xl space-y-4">
            <div className="space-y-1 border-b border-slate-700 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-400" />
                Masuk ke Akun Anda
              </h3>
              <p className="text-xs text-slate-400">
                Gunakan kredensial NIP Guru atau Akun Admin
              </p>
            </div>

            {errorMsg && (
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs p-3 rounded-xl">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Username / NIP / Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Contoh: admin atau 197508102005011005"
                    className="w-full bg-slate-900/80 border border-slate-700 text-white rounded-xl pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password..."
                    className="w-full bg-slate-900/80 border border-slate-700 text-white rounded-xl pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  *Default password admin: <code>admin123</code> (guru: kosongkan atau sembarang)
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Kolom Kanan: Pilihan Akses Cepat / Demo Berdasarkan Peran */}
          <div className="lg:col-span-7 space-y-3">
            <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-700/50">
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block mb-1">
                ⚡ Akses Cepat (Sesuai Hak Peran RBAC)
              </span>
              <p className="text-xs text-slate-400">
                Pilih profil di bawah untuk langsung menguji tampilan role:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[440px] overflow-y-auto pr-1">
              {/* 1. ADMIN */}
              <button
                onClick={() => loginAsDemo('admin')}
                className="bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 hover:border-purple-500/50 p-3 rounded-2xl text-left transition-all group flex flex-col justify-between space-y-2 cursor-pointer shadow-sm hover:shadow-purple-500/10"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-bold">
                    {getRoleLabel('admin', 'Role: Administrator')}
                  </span>
                  <Shield className="w-4 h-4 text-purple-400 group-hover:scale-110 transition" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs group-hover:text-purple-400 transition">
                    Administrator Sekolah
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Akses penuh: Kelola akun & role, data master, semua nilai rombel, dan cetak rapor se-sekolah.
                  </p>
                </div>
              </button>

              {/* 2. KEPALA SEKOLAH */}
              <button
                onClick={() => loginAsDemo('user-kepsek')}
                className="bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 hover:border-rose-500/50 p-3 rounded-2xl text-left transition-all group flex flex-col justify-between space-y-2 cursor-pointer shadow-sm hover:shadow-rose-500/10"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold">
                    {getRoleLabel('user-kepsek', 'Role: Kepala Sekolah')}
                  </span>
                  <GraduationCap className="w-4 h-4 text-rose-400 group-hover:scale-110 transition" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs group-hover:text-rose-400 transition">
                    Drs. H. Suwito, M.M.
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Kepala Sekolah • Monitoring menyeluruh semua kelas, absensi, ekskul, PKL, UKK, & cetak rapor.
                  </p>
                </div>
              </button>

              {/* 3. WAKA KURIKULUM */}
              <button
                onClick={() => loginAsDemo('user-wakur')}
                className="bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 hover:border-indigo-500/50 p-3 rounded-2xl text-left transition-all group flex flex-col justify-between space-y-2 cursor-pointer shadow-sm hover:shadow-indigo-500/10"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold">
                    {getRoleLabel('user-wakur', 'Role: Waka Kurikulum')}
                  </span>
                  <BookOpen className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs group-hover:text-indigo-400 transition">
                    Endang Wahyuni, S.Pd., M.Pd.
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Waka Kurikulum • Supervisi akademik, ketercapaian TP, progres guru se-sekolah, & legger nilai.
                  </p>
                </div>
              </button>

              {/* 4. BAMBANG IRAWAN (Wali Kelas XII TSM & Pembina Otomotif) */}
              <button
                onClick={() => loginAsDemo('guru-1')}
                className="bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 hover:border-amber-500/50 p-3 rounded-2xl text-left transition-all group flex flex-col justify-between space-y-2 cursor-pointer shadow-sm hover:shadow-amber-500/10"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold">
                    {getRoleLabel('guru-1', 'Wali Kelas XII & Pembina')}
                  </span>
                  <UserCheck className="w-4 h-4 text-amber-400 group-hover:scale-110 transition" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs group-hover:text-amber-400 transition">
                    Bambang Irawan, S.T., M.Pd.
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Guru Otomotif • Wali Kelas XII TSM (Cetak Rapor & PKL) • Pembina Klub Otomotif.
                  </p>
                </div>
              </button>

              {/* 5. SITI RAHMAWATI (Wali Kelas XI DKV & Pembina DKV) */}
              <button
                onClick={() => loginAsDemo('guru-2')}
                className="bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 hover:border-blue-500/50 p-3 rounded-2xl text-left transition-all group flex flex-col justify-between space-y-2 cursor-pointer shadow-sm hover:shadow-blue-500/10"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold">
                    {getRoleLabel('guru-2', 'Wali Kelas XI & Pembina')}
                  </span>
                  <UserCheck className="w-4 h-4 text-blue-400 group-hover:scale-110 transition" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs group-hover:text-blue-400 transition">
                    Siti Rahmawati, S.Kom., M.T.
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Guru DKV • Wali Kelas XI DKV (Cetak Rapor) • Pembina Desain Kreatif.
                  </p>
                </div>
              </button>

              {/* 6. AGUS SETIAWAN (Guru Mapel Murni - Terbatas Mapel Ampuan) */}
              <button
                onClick={() => loginAsDemo('guru-4')}
                className="bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 hover:border-emerald-500/50 p-3 rounded-2xl text-left transition-all group flex flex-col justify-between space-y-2 cursor-pointer shadow-sm hover:shadow-emerald-500/10"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                    {getRoleLabel('guru-4', 'Role: Guru Mapel (Hanya Input Mapel)')}
                  </span>
                  <UserCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs group-hover:text-emerald-400 transition">
                    Agus Setiawan, Drs., M.Hum.
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Guru Bhs Indonesia • Hak akses ketat: Hanya melihat & input nilai mapel ampuan saja.
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-slate-500">
          eRaporOne SMKN 1 Labuhan Maringgai • Berbasis Kurikulum Merdeka Terintegrasi
        </div>
      </div>
    </div>
  );
};
