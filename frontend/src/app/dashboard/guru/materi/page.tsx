"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { getMockMaterials } from "@/lib/api";
import { useState } from "react";

export default function GuruMateriPage() {
  const [materials] = useState(getMockMaterials());
  const [filterStatus, setFilterStatus] = useState("Semua");

  const statuses = ["Semua", "published", "draft", "review"];
  const filtered = filterStatus === "Semua" ? materials : materials.filter((m) => m.status === filterStatus);

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase text-rose-600">Materi</p>
              <h2 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">Materi Pembelajaran 📖</h2>
              <p className="mt-2 text-base leading-8 text-slate-600">Kelola semua materi pembelajaran yang telah dibuat dan dipublikasi.</p>
            </div>
            <button className="inline-flex h-12 items-center gap-2 rounded-lg bg-rose-600 px-5 text-sm font-black text-white shadow-lg hover:bg-rose-700">
              + Buat Materi Baru
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {statuses.map((s) => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`rounded-lg px-4 py-2 text-xs font-black transition ${filterStatus === s ? "bg-slate-950 text-white shadow-lg" : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"}`}>
                {s === "Semua" ? "Semua" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
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
                <button className="rounded bg-blue-50 px-4 py-2 text-xs font-black text-blue-600 hover:bg-blue-100">Edit</button>
                <button className="rounded bg-red-50 px-4 py-2 text-xs font-black text-red-600 hover:bg-red-100">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
