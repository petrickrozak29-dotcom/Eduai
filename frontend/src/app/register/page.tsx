"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LogoMark } from "@/components/ui/LogoMark";
import { useState, type FormEvent, type SVGProps } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") === "guru" ? "GURU" : "SISWA";
  const [role, setRole] = useState<"SISWA" | "GURU">(initialRole);

  const handleRoleSwitch = (newRole: "SISWA" | "GURU") => {
    setRole(newRole);
    router.replace(`/register${newRole === "GURU" ? "?role=guru" : ""}`);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <LogoMark />
            <span className="text-lg font-bold text-slate-900">
              EduPath <span className="text-red-600">AI</span>
            </span>
          </Link>
          <Link href="/login" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Sudah punya akun?</Link>
        </div>
      </header>

      <section className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-[520px]">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 text-center">
              <h1 className="text-xl font-bold text-slate-900">Daftar Akun</h1>
              <p className="mt-1 text-sm text-slate-500">
                {role === "SISWA" ? "Daftar sebagai siswa" : "Daftar sebagai guru"}
              </p>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1">
              <button onClick={() => handleRoleSwitch("SISWA")}
                className={`rounded-md py-2.5 text-sm font-semibold transition ${role === "SISWA" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                Siswa
              </button>
              <button onClick={() => handleRoleSwitch("GURU")}
                className={`rounded-md py-2.5 text-sm font-semibold transition ${role === "GURU" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                Guru
              </button>
            </div>

            {role === "SISWA" ? <SiswaForm /> : <GuruForm />}
          </div>
          <p className="mt-6 text-center text-xs text-slate-400">&copy; 2026 EduPath AI. All rights reserved.</p>
        </div>
      </section>
    </main>
  );
}

function SiswaForm() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", nis: "", kelas: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) {
      setError("Nama, email, dan password wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      const result = await register({ ...form, role: "SISWA" });
      if (result.success) {
        router.push("/dashboard/siswa");
      } else {
        setError(result.message || "Registrasi gagal.");
      }
    } catch {
      setError("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
        <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
          placeholder="Nama sesuai dokumen sekolah" required
          className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
            placeholder="siswa@sekolah.sch.id" required
            className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">NIS</label>
          <input type="text" value={form.nis} onChange={(e) => setForm({...form, nis: e.target.value})}
            placeholder="Nomor Induk Siswa"
            className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Kelas</label>
        <select value={form.kelas} onChange={(e) => setForm({...form, kelas: e.target.value})}
          className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20">
          <option value="">Pilih kelas</option>
          {["X-1","X-2","X-3","X-4","X-5","XI-1","XI-2","XI-3","XI-4","XI-5","XII-1","XII-2","XII-3","XII-4","XII-5"].map(k => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Password</label>
        <div className="relative mt-1.5">
          <input type={showPassword ? "text" : "password"} value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            placeholder="Minimal 6 karakter" required minLength={6}
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 pr-11 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {error && <div className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">{error}</div>}
      <button type="submit" disabled={loading}
        className="h-11 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50">
        {loading ? "Memproses..." : "Daftar sebagai Siswa"}
      </button>
    </form>
  );
}

function GuruForm() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", email: "", password: "", nip: "",
    tempatLahir: "", tanggalLahir: "", jenisKelamin: "",
    agama: "", alamat: "", noHP: "",
    pendidikanTerakhir: "", perguruanTinggi: "", programStudi: "",
    tahunLulus: "", nuptk: "", statusKepegawaian: "",
    instansi: "", mataPelajaran: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.nip) {
      setError("Nama, email, password, dan NIP wajib diisi.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }
    setLoading(true);
    try {
      const result = await register({
        ...form,
        nip: form.nip,
        role: "GURU",
      });
      if (result.success) {
        router.push("/dashboard/guru");
      } else {
        setError(result.message || "Registrasi gagal.");
      }
    } catch {
      setError("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
      <div>
        <label className="block text-sm font-medium text-slate-700">Nama Lengkap <span className="text-red-500">*</span></label>
        <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
          placeholder="Sesuai ijazah/Surat Tugas" required
          className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">NIP <span className="text-red-500">*</span></label>
          <input type="text" value={form.nip} onChange={(e) => setForm({...form, nip: e.target.value})}
            placeholder="NIP/Nomor identitas" required
            className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">NUPTK</label>
          <input type="text" value={form.nuptk} onChange={(e) => setForm({...form, nuptk: e.target.value})}
            placeholder="Nomor NUPTK"
            className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Email <span className="text-red-500">*</span></label>
        <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
          placeholder="guru@sekolah.sch.id" required
          className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Tempat Lahir</label>
          <input type="text" value={form.tempatLahir} onChange={(e) => setForm({...form, tempatLahir: e.target.value})}
            placeholder="Kota lahir"
            className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Tanggal Lahir</label>
          <input type="date" value={form.tanggalLahir} onChange={(e) => setForm({...form, tanggalLahir: e.target.value})}
            className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Jenis Kelamin</label>
          <select value={form.jenisKelamin} onChange={(e) => setForm({...form, jenisKelamin: e.target.value})}
            className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none">
            <option value="">Pilih</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Agama</label>
          <select value={form.agama} onChange={(e) => setForm({...form, agama: e.target.value})}
            className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none">
            <option value="">Pilih</option>
            {["Islam","Kristen","Katolik","Hindu","Buddha","Khonghucu"].map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Alamat</label>
        <textarea value={form.alamat} onChange={(e) => setForm({...form, alamat: e.target.value})}
          placeholder="Alamat lengkap"
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none" rows={2} />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">No. HP</label>
        <input type="text" value={form.noHP} onChange={(e) => setForm({...form, noHP: e.target.value})}
          placeholder="08xxxxxxx"
          className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none" />
      </div>
      <div className="border-t border-slate-200 pt-4">
        <p className="text-sm font-semibold text-slate-800 mb-3">Data Pendidikan (PDDIKTI)</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Pendidikan Terakhir</label>
            <select value={form.pendidikanTerakhir} onChange={(e) => setForm({...form, pendidikanTerakhir: e.target.value})}
              className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none">
              <option value="">Pilih</option>
              <option value="D3">D3</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Perguruan Tinggi</label>
            <input type="text" value={form.perguruanTinggi} onChange={(e) => setForm({...form, perguruanTinggi: e.target.value})}
              placeholder="Nama PT"
              className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Program Studi</label>
            <input type="text" value={form.programStudi} onChange={(e) => setForm({...form, programStudi: e.target.value})}
              placeholder="Prodi"
              className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Tahun Lulus</label>
            <input type="number" value={form.tahunLulus} onChange={(e) => setForm({...form, tahunLulus: e.target.value})}
              placeholder="2020" min={1990} max={2030}
              className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Status Kepegawaian</label>
          <select value={form.statusKepegawaian} onChange={(e) => setForm({...form, statusKepegawaian: e.target.value})}
            className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none">
            <option value="">Pilih</option>
            <option value="PNS">PNS</option>
            <option value="PPPK">PPPK</option>
            <option value="GTY">Guru Tetap Yayasan</option>
            <option value="Honorer">Honorer</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Instansi/Sekolah</label>
          <input type="text" value={form.instansi} onChange={(e) => setForm({...form, instansi: e.target.value})}
            placeholder="Nama sekolah"
            className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Mata Pelajaran</label>
        <input type="text" value={form.mataPelajaran} onChange={(e) => setForm({...form, mataPelajaran: e.target.value})}
          placeholder="Mata pelajaran yang diampu"
          className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Password <span className="text-red-500">*</span></label>
        <div className="relative mt-1.5">
          <input type={showPassword ? "text" : "password"} value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            placeholder="Minimal 6 karakter" required minLength={6}
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 pr-11 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {error && <div className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">{error}</div>}
      <button type="submit" disabled={loading}
        className="h-11 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50">
        {loading ? "Memproses..." : "Daftar sebagai Guru"}
      </button>
    </form>
  );
}

function EyeIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" /><circle cx="12" cy="12" r="3" /></svg>;
}
function EyeOffIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24" /><path d="M1 1l22 22" /></svg>;
}
