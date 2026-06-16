"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { useState } from "react";

export default function PengaturanPlatformPage() {
  const [form, setForm] = useState({
    platformName: "EduPath AI",
    description: "Platform pembelajaran adaptif berbasis AI untuk SMA",
    maintenanceMode: false,
    allowRegistration: true,
    maxStudentsPerClass: 36,
    defaultLanguage: "id",
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
          <p className="text-sm font-black uppercase text-slate-600">Developer</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950">Pengaturan Platform ⚙️</h2>
          <p className="mt-2 text-base text-slate-600">Konfigurasi umum platform EduPath AI.</p>
        </header>

        <form onSubmit={handleSave} className="rounded-lg border border-white/70 bg-white/72 p-6 shadow backdrop-blur-2xl space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-black text-slate-700">Nama Platform</span>
              <input type="text" value={form.platformName} onChange={(e) => setForm({...form, platformName: e.target.value})}
                className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100" />
            </label>
            <label className="block">
              <span className="text-sm font-black text-slate-700">Bahasa Default</span>
              <select value={form.defaultLanguage} onChange={(e) => setForm({...form, defaultLanguage: e.target.value})}
                className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100">
                <option value="id">Bahasa Indonesia</option><option value="en">English</option>
              </select>
            </label>
            <label className="block md:col-span-2">
              <span className="text-sm font-black text-slate-700">Deskripsi Platform</span>
              <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})}
                className="mt-2 h-20 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100" />
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4">
              <input type="checkbox" checked={form.maintenanceMode} onChange={(e) => setForm({...form, maintenanceMode: e.target.checked})}
                className="h-5 w-5 rounded border-slate-300 text-slate-800 focus:ring-slate-500" />
              <div><p className="text-sm font-black text-slate-700">Mode Maintenance</p><p className="text-xs font-semibold text-slate-500">Nonaktifkan akses pengguna sementara</p></div>
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4">
              <input type="checkbox" checked={form.allowRegistration} onChange={(e) => setForm({...form, allowRegistration: e.target.checked})}
                className="h-5 w-5 rounded border-slate-300 text-slate-800 focus:ring-slate-500" />
              <div><p className="text-sm font-black text-slate-700">Izinkan Registrasi</p><p className="text-xs font-semibold text-slate-500">Siswa baru dapat mendaftar mandiri</p></div>
            </label>
            <label className="block">
              <span className="text-sm font-black text-slate-700">Max Siswa per Kelas</span>
              <input type="number" value={form.maxStudentsPerClass} onChange={(e) => setForm({...form, maxStudentsPerClass: parseInt(e.target.value)})}
                className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100" />
            </label>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button type="submit" className="inline-flex h-12 items-center gap-2 rounded-lg bg-slate-800 px-6 text-sm font-black text-white shadow-lg hover:bg-slate-900">
              Simpan Pengaturan
            </button>
            {saved && <span className="text-sm font-black text-emerald-600">✓ Tersimpan!</span>}
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}
