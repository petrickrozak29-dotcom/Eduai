"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { useState } from "react";

interface DevUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActive: string;
}

export default function ManajemenDeveloperPage() {
  const [developers, setDevelopers] = useState<DevUser[]>([
    { id: "d1", name: "Developer EduPath", email: "edupathai@gmail.com", role: "Super Admin", lastActive: "Online" },
    { id: "d2", name: "Teknisi AI", email: "teknis@edupath.ai", role: "Developer", lastActive: "2 jam lalu" },
  ]);
  const [showModal, setShowModal] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleDelete = (id: string) => {
    if (confirm("Hapus developer ini?")) setDevelopers(developers.filter((d) => d.id !== id));
  };

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase text-slate-600">Developer</p>
              <h2 className="mt-2 text-4xl font-black text-slate-950">Manajemen Developer 🔧</h2>
              <p className="mt-2 text-base text-slate-600">Kelola akses developer platform.</p>
            </div>
            <button onClick={() => { setForm({ name: "", email: "", password: "" }); setShowModal("add"); }} className="inline-flex h-12 items-center gap-2 rounded-lg bg-slate-800 px-5 text-sm font-black text-white shadow-lg hover:bg-slate-900">
              + Tambah Developer
            </button>
          </div>
        </header>

        <div className="rounded-lg border border-white/70 bg-white/72 shadow backdrop-blur-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-xs font-black uppercase text-slate-500">
                  <th className="px-5 py-4">Nama</th><th className="px-5 py-4">Email</th><th className="px-5 py-4">Role</th><th className="px-5 py-4">Terakhir Aktif</th><th className="px-5 py-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {developers.map((d) => (
                  <tr key={d.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="px-5 py-4 font-bold text-slate-950">{d.name}</td>
                    <td className="px-5 py-4 text-slate-600">{d.email}</td>
                    <td className="px-5 py-4"><span className="rounded bg-slate-100 px-2 py-1 text-xs font-bold">{d.role}</span></td>
                    <td className="px-5 py-4 text-slate-600">{d.lastActive}</td>
                    <td className="px-5 py-4">
                      <button onClick={() => handleDelete(d.id)} className="rounded bg-red-50 px-3 py-1.5 text-xs font-black text-red-600 hover:bg-red-100">Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={() => setShowModal(null)}>
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-black text-slate-950">Tambah Developer</h3>
            <form className="mt-5 space-y-4" onSubmit={(e) => { e.preventDefault(); setDevelopers([...developers, { id: `d-${Date.now()}`, ...form, role: "Developer", lastActive: "Baru" }]); setShowModal(null); }}>
              <label className="block"><span className="text-sm font-black text-slate-700">Nama</span><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100" /></label>
              <label className="block"><span className="text-sm font-black text-slate-700">Email</span><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100" /></label>
              <label className="block"><span className="text-sm font-black text-slate-700">Password</span><input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100" /></label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(null)} className="flex-1 rounded-lg border border-slate-300 py-3 text-sm font-black text-slate-700">Batal</button>
                <button type="submit" className="flex-1 rounded-lg bg-slate-800 py-3 text-sm font-black text-white shadow-lg hover:bg-slate-900">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
