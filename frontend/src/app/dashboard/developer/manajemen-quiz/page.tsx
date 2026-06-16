"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { getMockQuizzes } from "@/lib/api";
import { useState } from "react";

type Quiz = ReturnType<typeof getMockQuizzes>[number];

export default function ManajemenQuizPage() {
  const [quizzes, setQuizzes] = useState(getMockQuizzes());
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState<"add" | "edit" | null>(null);
  const [editItem, setEditItem] = useState<Quiz | null>(null);
  const [form, setForm] = useState({ title: "", subject: "Biologi", type: "bab", questions: 10, status: "draft" });

  const filtered = quizzes.filter((q) => q.title.toLowerCase().includes(search.toLowerCase()) || q.subject.includes(search));

  const handleSave = () => {
    if (showModal === "add") {
      setQuizzes([...quizzes, { id: `q-${Date.now()}`, ...form }]);
    } else if (editItem) {
      setQuizzes(quizzes.map((q) => q.id === editItem.id ? { ...q, ...form } : q));
    }
    setShowModal(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus quiz ini?")) setQuizzes(quizzes.filter((q) => q.id !== id));
  };

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase text-yellow-600">Developer</p>
              <h2 className="mt-2 text-4xl font-black text-slate-950">Manajemen Quiz 📝</h2>
              <p className="mt-2 text-base text-slate-600">Kelola bank soal dan kuis.</p>
            </div>
            <button onClick={() => { setEditItem(null); setForm({ title: "", subject: "Biologi", type: "bab", questions: 10, status: "draft" }); setShowModal("add"); }} className="inline-flex h-12 items-center gap-2 rounded-lg bg-yellow-500 px-5 text-sm font-black text-white shadow-lg hover:bg-yellow-600">
              + Tambah Quiz
            </button>
          </div>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari quiz..." className="mt-5 h-12 w-full max-w-md rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100" />
        </header>

        <div className="rounded-lg border border-white/70 bg-white/72 shadow backdrop-blur-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-xs font-black uppercase text-slate-500">
                  <th className="px-5 py-4">Judul</th><th className="px-5 py-4">Mapel</th><th className="px-5 py-4">Tipe</th><th className="px-5 py-4">Soal</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((q) => (
                  <tr key={q.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="px-5 py-4 font-bold text-slate-950">{q.title}</td>
                    <td className="px-5 py-4">{q.subject}</td>
                    <td className="px-5 py-4"><span className="rounded bg-slate-100 px-2 py-1 text-xs font-bold">{q.type}</span></td>
                    <td className="px-5 py-4">{q.questions}</td>
                    <td className="px-5 py-4"><span className={`rounded-lg px-3 py-1 text-xs font-black ${q.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}`}>{q.status}</span></td>
                    <td className="px-5 py-4"><div className="flex gap-2">
                      <button onClick={() => { setEditItem(q); setForm({ title: q.title, subject: q.subject, type: q.type, questions: q.questions, status: q.status }); setShowModal("edit"); }} className="rounded bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-600 hover:bg-blue-100">Edit</button>
                      <button onClick={() => handleDelete(q.id)} className="rounded bg-red-50 px-3 py-1.5 text-xs font-black text-red-600 hover:bg-red-100">Hapus</button>
                    </div></td>
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
            <h3 className="text-2xl font-black text-slate-950">{showModal === "add" ? "Tambah Quiz" : "Edit Quiz"}</h3>
            <form className="mt-5 space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <label className="block"><span className="text-sm font-black text-slate-700">Judul</span><input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100" /></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="text-sm font-black text-slate-700">Mapel</span><select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100">
                  {["Biologi", "Matematika", "Fisika", "Kimia", "B. Indonesia", "B. Inggris", "Sejarah", "Ekonomi"].map(s => <option key={s} value={s}>{s}</option>)}
                </select></label>
                <label className="block"><span className="text-sm font-black text-slate-700">Tipe</span><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100">
                  {[{v:"pretest",l:"Pretest"},{v:"bab",l:"Per Bab"},{v:"final",l:"Akhir"}].map(t => <option key={t.v} value={t.v}>{t.l}</option>)}
                </select></label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="text-sm font-black text-slate-700">Jumlah Soal</span><input type="number" value={form.questions} onChange={(e) => setForm({ ...form, questions: parseInt(e.target.value) })} className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100" /></label>
                <label className="block"><span className="text-sm font-black text-slate-700">Status</span><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100">
                  {[{v:"draft",l:"Draft"},{v:"review",l:"Review"},{v:"published",l:"Published"}].map(s => <option key={s.v} value={s.v}>{s.l}</option>)}
                </select></label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(null)} className="flex-1 rounded-lg border border-slate-300 py-3 text-sm font-black text-slate-700">Batal</button>
                <button type="submit" className="flex-1 rounded-lg bg-yellow-500 py-3 text-sm font-black text-white shadow-lg hover:bg-yellow-600">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
