"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function PengaturanSiswaPage() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    kelas: "",
    photo: "",
    notifications: true,
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
          <p className="text-sm font-black uppercase text-slate-600">Siswa</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950">Pengaturan</h2>
          <p className="mt-2 text-base text-slate-600">Atur identitas akun dan foto profil.</p>
        </header>

        <form onSubmit={handleSave} className="space-y-5 rounded-lg border border-white/70 bg-white/72 p-6 shadow backdrop-blur-2xl">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-black text-slate-700">Nama</span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
              />
            </label>
            <label className="block">
              <span className="text-sm font-black text-slate-700">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
              />
            </label>
            <label className="block">
              <span className="text-sm font-black text-slate-700">Kelas</span>
              <input
                type="text"
                value={form.kelas}
                onChange={(e) => setForm({ ...form, kelas: e.target.value })}
                placeholder="Akan mengikuti kelas yang kamu ikuti"
                className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
              />
            </label>
            <label className="block">
              <span className="text-sm font-black text-slate-700">Foto Profil</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setForm({ ...form, photo: e.target.files?.[0]?.name || "" })}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
              />
              {form.photo && <p className="mt-2 text-xs font-bold text-slate-500">File dipilih: {form.photo}</p>}
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4">
              <input
                type="checkbox"
                checked={form.notifications}
                onChange={(e) => setForm({ ...form, notifications: e.target.checked })}
                className="h-5 w-5 rounded border-slate-300 text-red-600 focus:ring-red-500"
              />
              <div>
                <p className="text-sm font-black text-slate-700">Notifikasi</p>
                <p className="text-xs font-semibold text-slate-500">Pengumuman tugas, forum kelas, dan event</p>
              </div>
            </label>
          </div>
          <div className="flex items-center gap-4">
            <button type="submit" className="h-12 rounded-lg bg-red-600 px-6 text-sm font-black text-white shadow-lg hover:bg-red-700">
              Simpan
            </button>
            {saved && <span className="text-sm font-black text-emerald-600">Tersimpan</span>}
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}
