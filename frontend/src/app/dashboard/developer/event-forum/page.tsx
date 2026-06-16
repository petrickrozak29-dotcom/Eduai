"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { getMockEvents } from "@/lib/api";
import { useState } from "react";

interface ForumPost {
  id: string;
  title: string;
  author: string;
  replies: number;
  createdAt: string;
  status: string;
}

export default function EventForumPage() {
  const events = getMockEvents();
  const [activeTab, setActiveTab] = useState<"event" | "forum">("event");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", desc: "", date: "", type: "academic" });

  const forums: ForumPost[] = [
    { id: "f1", title: "Diskusi Sistem Pernapasan", author: "Budi Guru", replies: 12, createdAt: "2 hari lalu", status: "aktif" },
    { id: "f2", title: "Tanya jawab Fungsi Kuadrat", author: "Siti Aisyah", replies: 8, createdAt: "3 hari lalu", status: "aktif" },
    { id: "f3", title: "Tugas Fisika Gerak Lurus", author: "Ahmad Rizal", replies: 5, createdAt: "5 hari lalu", status: "aktif" },
  ];

  const handleSave = () => {
    setShowModal(false);
  };

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase text-indigo-600">Developer</p>
              <h2 className="mt-2 text-4xl font-black text-slate-950">Event & Forum 🎯</h2>
              <p className="mt-2 text-base text-slate-600">Kelola event akademik dan forum diskusi.</p>
            </div>
            <button onClick={() => { setForm({ title: "", desc: "", date: "", type: "academic" }); setShowModal(true); }}
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-indigo-600 px-5 text-sm font-black text-white shadow-lg hover:bg-indigo-700">
              + Tambah Event
            </button>
          </div>
          <div className="mt-5 flex gap-2 rounded-lg bg-white/70 p-1 border border-white/70 w-fit">
            <button onClick={() => setActiveTab("event")}
              className={`rounded-lg px-5 py-3 text-sm font-black transition ${activeTab === "event" ? "bg-slate-950 text-white shadow-lg" : "text-slate-600 hover:text-slate-950"}`}>
              Event
            </button>
            <button onClick={() => setActiveTab("forum")}
              className={`rounded-lg px-5 py-3 text-sm font-black transition ${activeTab === "forum" ? "bg-slate-950 text-white shadow-lg" : "text-slate-600 hover:text-slate-950"}`}>
              Forum
            </button>
          </div>
        </header>

        {activeTab === "event" && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {events.map((e) => (
              <div key={e.id} className="rounded-lg border border-white/70 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-black text-slate-950">{e.title}</p>
                    <p className="text-xs font-bold text-slate-500">{e.date}</p>
                  </div>
                  <span className="rounded-lg bg-indigo-100 px-3 py-1 text-xs font-black text-indigo-700">{e.type}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{e.desc}</p>
                <div className="mt-4 flex gap-2">
                  <button className="rounded bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-600 hover:bg-blue-100">Edit</button>
                  <button className="rounded bg-red-50 px-3 py-1.5 text-xs font-black text-red-600 hover:bg-red-100">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "forum" && (
          <div className="rounded-lg border border-white/70 bg-white/72 shadow backdrop-blur-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50 text-xs font-black uppercase text-slate-500">
                    <th className="px-5 py-4">Judul</th><th className="px-5 py-4">Penulis</th>
                    <th className="px-5 py-4">Balasan</th><th className="px-5 py-4">Dibuat</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {forums.map((f) => (
                    <tr key={f.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="px-5 py-4 font-bold text-slate-950">{f.title}</td>
                      <td className="px-5 py-4 text-slate-600">{f.author}</td>
                      <td className="px-5 py-4">{f.replies}</td>
                      <td className="px-5 py-4 text-slate-600">{f.createdAt}</td>
                      <td className="px-5 py-4"><span className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">{f.status}</span></td>
                      <td className="px-5 py-4"><button className="rounded bg-red-50 px-3 py-1.5 text-xs font-black text-red-600 hover:bg-red-100">Hapus</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-black text-slate-950">Tambah Event</h3>
            <form className="mt-5 space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <label className="block"><span className="text-sm font-black text-slate-700">Judul</span>
                <input type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" /></label>
              <label className="block"><span className="text-sm font-black text-slate-700">Deskripsi</span>
                <textarea value={form.desc} onChange={(e) => setForm({...form, desc: e.target.value})} className="mt-2 h-24 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" /></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="text-sm font-black text-slate-700">Tanggal</span>
                  <input type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" /></label>
                <label className="block"><span className="text-sm font-black text-slate-700">Tipe</span>
                  <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})} className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100">
                    <option value="academic">Akademik</option><option value="extracurricular">Ekstrakurikuler</option>
                  </select></label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 rounded-lg border border-slate-300 py-3 text-sm font-black text-slate-700">Batal</button>
                <button type="submit" className="flex-1 rounded-lg bg-indigo-600 py-3 text-sm font-black text-white shadow-lg hover:bg-indigo-700">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
