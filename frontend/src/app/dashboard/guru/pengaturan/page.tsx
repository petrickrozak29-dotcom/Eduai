"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { useState } from "react";

export default function GuruPengaturanPage() {
  const [form, setForm] = useState({
    name: "Budi Guru",
    email: "guru@demo.com",
    phone: "081234567890",
    mapel: "Biologi",
    notifNewStudent: true,
    notifQuizResult: true,
    notifForum: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-slate-600">Pengaturan</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">Pengaturan Akun ⚙️</h2>
          <p className="mt-2 text-base leading-8 text-slate-600">Kelola profil dan preferensi notifikasi.</p>
        </header>

        <form onSubmit={handleSave} className="rounded-lg border border-white/70 bg-white/72 p-6 shadow backdrop-blur-2xl space-y-5">
          <div>
            <p className="text-xs font-black uppercase text-blue-600 mb-4">Profil Guru</p>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-black text-slate-700">Nama Lengkap</span>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100" />
              </label>
              <label className="block">
                <span className="text-sm font-black text-slate-700">Email</span>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100" />
              </label>
              <label className="block">
                <span className="text-sm font-black text-slate-700">No. Telepon</span>
                <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100" />
              </label>
              <label className="block">
                <span className="text-sm font-black text-slate-700">Mata Pelajaran</span>
                <select value={form.mapel} onChange={(e) => setForm({ ...form, mapel: e.target.value })}
                  className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100">
                  <option>Biologi</option><option>Matematika</option><option>Fisika</option>
                  <option>Kimia</option><option>Bahasa Indonesia</option><option>Bahasa Inggris</option>
                  <option>Sejarah</option><option>Ekonomi</option>
                </select>
              </label>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-5">
            <p className="text-xs font-black uppercase text-emerald-600 mb-4">Notifikasi</p>
            <div className="space-y-3">
              {[
                { label: "Siswa baru mendaftar ke kelas", key: "notifNewStudent" as const },
                { label: "Hasil kuis siswa tersedia", key: "notifQuizResult" as const },
                { label: "Aktivitas forum diskusi", key: "notifForum" as const },
              ].map((item) => (
                <label key={item.key} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 cursor-pointer">
                  <input type="checkbox" checked={form[item.key]} onChange={(e) => setForm({ ...form, [item.key]: e.target.checked })}
                    className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                  <span className="text-sm font-bold text-slate-700">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button type="submit" className="inline-flex h-12 items-center gap-2 rounded-lg bg-slate-800 px-6 text-sm font-black text-white shadow-lg hover:bg-slate-900">
              Simpan Perubahan
            </button>
            {saved && <span className="text-sm font-black text-emerald-600">✓ Tersimpan!</span>}
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}
