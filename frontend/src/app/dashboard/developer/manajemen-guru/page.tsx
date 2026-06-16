"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { getMockTeachers } from "@/lib/api";
import { useState } from "react";

type Teacher = ReturnType<typeof getMockTeachers>[number];

export default function ManajemenGuruPage() {
  const [teachers, setTeachers] = useState(getMockTeachers());
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState<"add" | "edit" | null>(null);
  const [editItem, setEditItem] = useState<Teacher | null>(null);
  const [form, setForm] = useState({ name: "", nip: "", email: "", mataPelajaran: "" });

  const filtered = teachers.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) || t.nip.includes(search) || t.email.includes(search)
  );

  const openEdit = (t: Teacher) => {
    setEditItem(t);
    setForm({ name: t.name, nip: t.nip, email: t.email, mataPelajaran: t.mataPelajaran || "" });
    setShowModal("edit");
  };

  const openAdd = () => {
    setEditItem(null);
    setForm({ name: "", nip: "", email: "", mataPelajaran: "" });
    setShowModal("add");
  };

  const handleSave = () => {
    if (showModal === "add") {
      setTeachers([...teachers, { id: `t-${Date.now()}`, ...form, kelasCount: 0, studentsCount: 0 }]);
    } else if (editItem) {
      setTeachers(teachers.map((t) => t.id === editItem.id ? { ...t, ...form } : t));
    }
    setShowModal(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus guru ini?")) setTeachers(teachers.filter((t) => t.id !== id));
  };

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase text-blue-600">Developer</p>
              <h2 className="mt-2 text-4xl font-black text-slate-950">Manajemen Guru 👨‍🏫</h2>
              <p className="mt-2 text-base text-slate-600">Tambah, edit, dan hapus data guru.</p>
            </div>
            <button onClick={openAdd} className="inline-flex h-12 items-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-black text-white shadow-lg hover:bg-blue-700">
              + Tambah Guru
            </button>
          </div>

          <div className="mt-5">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari guru..."
              className="h-12 w-full max-w-md rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </header>

        <div className="rounded-lg border border-white/70 bg-white/72 shadow backdrop-blur-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-xs font-black uppercase text-slate-500">
                  <th className="px-5 py-4">Nama</th>
                  <th className="px-5 py-4">NIP</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Mata Pelajaran</th>
                  <th className="px-5 py-4">Kelas</th>
                  <th className="px-5 py-4">Siswa</th>
                  <th className="px-5 py-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="px-5 py-4 font-bold text-slate-950">{t.name}</td>
                    <td className="px-5 py-4 text-slate-600">{t.nip}</td>
                    <td className="px-5 py-4 text-slate-600">{t.email}</td>
                    <td className="px-5 py-4">{t.mataPelajaran || "-"}</td>
                    <td className="px-5 py-4">{t.kelasCount}</td>
                    <td className="px-5 py-4">{t.studentsCount}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(t)} className="rounded bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-600 hover:bg-blue-100">Edit</button>
                        <button onClick={() => handleDelete(t.id)} className="rounded bg-red-50 px-3 py-1.5 text-xs font-black text-red-600 hover:bg-red-100">Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="py-10 text-center font-bold text-slate-400">Tidak ada data</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={() => setShowModal(null)}>
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-black text-slate-950">{showModal === "add" ? "Tambah Guru" : "Edit Guru"}</h3>
            <form className="mt-5 space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-black text-slate-700">Nama</span>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                </label>
                <label className="block">
                  <span className="text-sm font-black text-slate-700">NIP</span>
                  <input type="text" value={form.nip} onChange={(e) => setForm({ ...form, nip: e.target.value })} required className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-black text-slate-700">Email</span>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
              </label>
              <label className="block">
                <span className="text-sm font-black text-slate-700">Mata Pelajaran</span>
                <select value={form.mataPelajaran} onChange={(e) => setForm({ ...form, mataPelajaran: e.target.value })} className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                  <option value="">Pilih...</option>
                  {["Biologi", "Matematika", "Fisika", "Kimia", "Bahasa Indonesia", "Bahasa Inggris", "Sejarah", "Ekonomi"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(null)} className="flex-1 rounded-lg border border-slate-300 py-3 text-sm font-black text-slate-700">Batal</button>
                <button type="submit" className="flex-1 rounded-lg bg-blue-600 py-3 text-sm font-black text-white shadow-lg hover:bg-blue-700">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
