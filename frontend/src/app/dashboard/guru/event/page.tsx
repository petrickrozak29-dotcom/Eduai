"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { getMockEvents } from "@/lib/api";
import { useState } from "react";

export default function GuruEventPage() {
  const [events] = useState(getMockEvents());
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "academic",
    desc: "",
    organizer: "",
    date: "",
    photo: "",
    link: "",
  });

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase text-orange-600">Event</p>
              <h2 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">Event</h2>
              <p className="mt-2 text-base leading-8 text-slate-600">Kelola event akademik dan ekstrakurikuler.</p>
            </div>
            <button onClick={() => setShowModal(true)} className="inline-flex h-12 items-center gap-2 rounded-lg bg-orange-600 px-5 text-sm font-black text-white shadow-lg hover:bg-orange-700">
              + Tambah Event
            </button>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {events.map((e) => (
            <div key={e.id} className="rounded-lg border border-white/70 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-black text-slate-950">{e.title}</p>
                  <p className="text-xs font-bold text-slate-500">{e.date}</p>
                </div>
                <span className="rounded-lg bg-orange-100 px-3 py-1 text-xs font-black text-orange-700">{e.type}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{e.desc}</p>
              <div className="mt-4 flex gap-2">
                <button className="rounded bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-600 hover:bg-blue-100">Edit</button>
                <button className="rounded bg-red-50 px-3 py-1.5 text-xs font-black text-red-600 hover:bg-red-100">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-black text-slate-950">Tambah Event</h3>
            <form className="mt-5 space-y-4" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
              <label className="block"><span className="text-sm font-black text-slate-700">Nama Event</span>
                <input type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100" /></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="text-sm font-black text-slate-700">Kategori</span>
                  <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100">
                    <option value="academic">Akademik</option><option value="extracurricular">Ekstrakurikuler</option></select></label>
                <label className="block"><span className="text-sm font-black text-slate-700">Penyelenggara</span>
                  <input type="text" value={form.organizer} onChange={(e) => setForm({...form, organizer: e.target.value})} className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100" /></label>
              </div>
              <label className="block"><span className="text-sm font-black text-slate-700">Deskripsi</span>
                <textarea value={form.desc} onChange={(e) => setForm({...form, desc: e.target.value})} className="mt-2 h-24 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100" /></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="text-sm font-black text-slate-700">Tanggal</span>
                  <input type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100" /></label>
                <label className="block"><span className="text-sm font-black text-slate-700">Foto</span>
                  <input type="file" onChange={(e) => setForm({...form, photo: e.target.files?.[0]?.name || ""})} className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100" /></label>
              </div>
              <label className="block"><span className="text-sm font-black text-slate-700">Link / Sumber</span>
                <input type="url" value={form.link} onChange={(e) => setForm({...form, link: e.target.value})} placeholder="https://..." className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100" /></label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 rounded-lg border border-slate-300 py-3 text-sm font-black text-slate-700">Batal</button>
                <button type="submit" className="flex-1 rounded-lg bg-orange-600 py-3 text-sm font-black text-white shadow-lg hover:bg-orange-700">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
