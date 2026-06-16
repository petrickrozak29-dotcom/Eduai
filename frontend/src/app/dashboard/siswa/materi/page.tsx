"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { getMockMaterials } from "@/lib/api";
import { useState } from "react";

export default function MateriSiswaPage() {
  const [tab, setTab] = useState<"semua" | "visual" | "auditori" | "kinestetik">("semua");
  const materials = getMockMaterials();
  const filtered = tab === "semua" ? materials : materials.filter((m) => m.type === tab);

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-red-600">Siswa</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950">Materi Belajar 📖</h2>
          <p className="mt-2 text-base text-slate-600">Materi adaptif sesuai gaya belajarmu.</p>
          <div className="mt-4 flex gap-2">
            {(["semua","visual","auditori","kinestetik"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`rounded-lg px-4 py-2 text-sm font-black transition ${tab === t ? "bg-red-600 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"}`}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
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
                <span className={`rounded-lg px-3 py-1 text-xs font-black ${m.status === "published" ? "bg-emerald-100 text-emerald-700" : m.status === "review" ? "bg-yellow-100 text-yellow-700" : "bg-slate-100 text-slate-600"}`}>{m.status}</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">{m.type}</span>
              </div>
              <button className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-xs font-black text-white shadow-lg hover:bg-red-700">Mulai Belajar</button>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
