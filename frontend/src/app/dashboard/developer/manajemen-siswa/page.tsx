"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { getMockStudents } from "@/lib/api";
import { useState } from "react";

type Student = ReturnType<typeof getMockStudents>[number];

export default function ManajemenSiswaPage() {
  const [students, setStudents] = useState(getMockStudents());
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState<"add" | "edit" | null>(null);
  const [editItem, setEditItem] = useState<Student | null>(null);
  const [form, setForm] = useState({ name: "", nis: "", email: "", kelas: "X IPA 1" });

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.nis.includes(search) || s.email.includes(search)
  );

  const openEdit = (s: Student) => {
    setEditItem(s);
    setForm({ name: s.name, nis: s.nis, email: s.email, kelas: s.kelas });
    setShowModal("edit");
  };

  const handleSave = () => {
    if (showModal === "add") {
      setStudents([...students, { id: `s-${Date.now()}`, ...form, xp: 0, learningIndex: 0, streak: 0 }]);
    } else if (editItem) {
      setStudents(students.map((s) => s.id === editItem.id ? { ...s, ...form } : s));
    }
    setShowModal(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus siswa ini?")) setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase text-emerald-600">Developer</p>
              <h2 className="mt-2 text-4xl font-black text-slate-950">Manajemen Siswa 👩‍🎓</h2>
              <p className="mt-2 text-base text-slate-600">Tambah, edit, hapus data siswa.</p>
            </div>
            <button onClick={() => { setEditItem(null); setForm({ name: "", nis: "", email: "", kelas: "X IPA 1" }); setShowModal("add"); }} className="inline-flex h-12 items-center gap-2 rounded-lg bg-emerald-600 px-5 text-sm font-black text-white shadow-lg hover:bg-emerald-700">
              + Tambah Siswa
            </button>
          </div>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari siswa..." className="mt-5 h-12 w-full max-w-md rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
        </header>

        <div className="rounded-lg border border-white/70 bg-white/72 shadow backdrop-blur-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-xs font-black uppercase text-slate-500">
                  <th className="px-5 py-4">Nama</th>
                  <th className="px-5 py-4">NIS</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Kelas</th>
                  <th className="px-5 py-4">XP</th>
                  <th className="px-5 py-4">Learning Index</th>
                  <th className="px-5 py-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="px-5 py-4 font-bold text-slate-950">{s.name}</td>
                    <td className="px-5 py-4 text-slate-600">{s.nis}</td>
                    <td className="px-5 py-4 text-slate-600">{s.email}</td>
                    <td className="px-5 py-4">{s.kelas}</td>
                    <td className="px-5 py-4 font-bold">{s.xp}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 overflow-hidden rounded-sm bg-slate-100">
                          <div className="h-full rounded-sm bg-gradient-to-r from-emerald-500 to-blue-500" style={{ width: `${s.learningIndex}%` }} />
                        </div>
                        <span className="text-xs font-black">{s.learningIndex}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(s)} className="rounded bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-600 hover:bg-blue-100">Edit</button>
                        <button onClick={() => handleDelete(s.id)} className="rounded bg-red-50 px-3 py-1.5 text-xs font-black text-red-600 hover:bg-red-100">Hapus</button>
                      </div>
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
            <h3 className="text-2xl font-black text-slate-950">{showModal === "add" ? "Tambah Siswa" : "Edit Siswa"}</h3>
            <form className="mt-5 space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="text-sm font-black text-slate-700">Nama</span><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" /></label>
                <label className="block"><span className="text-sm font-black text-slate-700">NIS</span><input type="text" value={form.nis} onChange={(e) => setForm({ ...form, nis: e.target.value })} required className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" /></label>
              </div>
              <label className="block"><span className="text-sm font-black text-slate-700">Email</span><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" /></label>
              <label className="block"><span className="text-sm font-black text-slate-700">Kelas</span><select value={form.kelas} onChange={(e) => setForm({ ...form, kelas: e.target.value })} className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100">
                {["X IPA 1", "X IPA 2", "X IPS 1", "X IPS 2", "XI IPA 1", "XI IPA 2", "XI IPS 1", "XI IPS 2", "XII IPA 1", "XII IPA 2", "XII IPS 1", "XII IPS 2"].map(k => <option key={k} value={k}>{k}</option>)}
              </select></label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(null)} className="flex-1 rounded-lg border border-slate-300 py-3 text-sm font-black text-slate-700">Batal</button>
                <button type="submit" className="flex-1 rounded-lg bg-emerald-600 py-3 text-sm font-black text-white shadow-lg hover:bg-emerald-700">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
