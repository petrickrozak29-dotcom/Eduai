"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { getMockMaterials } from "@/lib/api";
import { useState } from "react";

type Material = ReturnType<typeof getMockMaterials>[number];

export default function ManajemenMateriPage() {
  const [materials, setMaterials] = useState(getMockMaterials());
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState<"add" | "edit" | null>(null);
  const [editItem, setEditItem] = useState<Material | null>(null);
  const [form, setForm] = useState({ title: "", subject: "Biologi", type: "visual", status: "draft" });

  const filtered = materials.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase()) || m.subject.includes(search)
  );

  const handleSave = () => {
    if (showModal === "add") {
      setMaterials([...materials, { id: `m-${Date.now()}`, ...form, chapters: "Bab 1" }]);
    } else if (editItem) {
      setMaterials(materials.map((m) => m.id === editItem.id ? { ...m, ...form } : m));
    }
    setShowModal(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus materi ini?")) setMaterials(materials.filter((m) => m.id !== id));
  };

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase text-rose-600">Developer</p>
              <h2 className="mt-2 text-4xl font-black text-slate-950">Manajemen Materi 📖</h2>
              <p className="mt-2 text-base text-slate-600">Kelola semua materi pembelajaran di platform.</p>
            </div>
            <button onClick={() => { setEditItem(null); setForm({ title: "", subject: "Biologi", type: "visual", status: "draft" }); setShowModal("add"); }} className="inline-flex h-12 items-center gap-2 rounded-lg bg-rose-600 px-5 text-sm font-black text-white shadow-lg hover:bg-rose-700">
              + Tambah Materi
            </button>
          </div>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari materi..." className="mt-5 h-12 w-full max-w-md rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100" />
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((m) => (
            <div key={m.id} className="rounded-lg border border-white/70 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-black text-slate-950">{m.title}</p>
                  <p className="text-sm font-bold text-slate-500">{m.subject} • {m.chapters}</p>
                </div>
                <span className={`rounded-lg px-3 py-1 text-xs font-black ${
                  m.status === "published" ? "bg-emerald-100 text-emerald-700" : m.status === "review" ? "bg-yellow-100 text-yellow-700" : "bg-slate-100 text-slate-600"
                }`}>{m.status}</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">{m.type}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={() => { setEditItem(m); setForm({ title: m.title, subject: m.subject, type: m.type, status: m.status }); setShowModal("edit"); }} className="rounded bg-blue-50 px-4 py-2 text-xs font-black text-blue-600 hover:bg-blue-100">Edit</button>
                <button onClick={() => handleDelete(m.id)} className="rounded bg-red-50 px-4 py-2 text-xs font-black text-red-600 hover:bg-red-100">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={() => setShowModal(null)}>
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-black text-slate-950">{showModal === "add" ? "Tambah Materi" : "Edit Materi"}</h3>
            <form className="mt-5 space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <label className="block"><span className="text-sm font-black text-slate-700">Judul</span><input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100" /></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="text-sm font-black text-slate-700">Mata Pelajaran</span><select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100">
                  {["Biologi", "Matematika", "Fisika", "Kimia", "Bahasa Indonesia", "Bahasa Inggris", "Sejarah", "Ekonomi"].map(s => <option key={s} value={s}>{s}</option>)}
                </select></label>
                <label className="block"><span className="text-sm font-black text-slate-700">Tipe</span><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100">
                  {[{v:"visual",l:"Visual"},{v:"auditori",l:"Auditori"},{v:"kinestetik",l:"Kinestetik"}].map(t => <option key={t.v} value={t.v}>{t.l}</option>)}
                </select></label>
              </div>
              <label className="block"><span className="text-sm font-black text-slate-700">Status</span><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100">
                {[{v:"draft",l:"Draft"},{v:"review",l:"Review"},{v:"published",l:"Published"}].map(s => <option key={s.v} value={s.v}>{s.l}</option>)}
              </select></label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(null)} className="flex-1 rounded-lg border border-slate-300 py-3 text-sm font-black text-slate-700">Batal</button>
                <button type="submit" className="flex-1 rounded-lg bg-rose-600 py-3 text-sm font-black text-white shadow-lg hover:bg-rose-700">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
