"use client";

import { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { getMockMaterials } from "@/lib/api";

const subjects = ["Matematika", "Bahasa Indonesia", "Bahasa Inggris", "IPA", "IPS", "Pendidikan Agama", "PKN", "Informatika"];

export default function GuruMateri() {
  const [materials] = useState(getMockMaterials());
  const [filter, setFilter] = useState("Semua");

  const filtered = filter === "Semua" ? materials : materials.filter((m) => m.subject === filter);

  return (
    <DashboardShell>
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Penyimpanan Materi</h1>
            <p className="mt-1 text-sm font-bold text-slate-500">
              Kelola dan simpan materi pembelajaran
            </p>
          </div>
          <button className="rounded-xl border-2 border-black bg-emerald-500 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-emerald-600">
            + Upload File
          </button>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("Semua")}
            className={`rounded-lg border-2 border-black px-4 py-2 text-sm font-bold shadow-md transition ${
              filter === "Semua" ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            Semua
          </button>
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-lg border-2 border-black px-4 py-2 text-sm font-bold shadow-md transition ${
                filter === s ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border-2 border-black bg-blue-100 p-12 text-center shadow-xl">
            <p className="text-5xl">📁</p>
            <p className="mt-4 text-xl font-black text-slate-800">Belum ada materi</p>
            <p className="mt-2 text-sm font-bold text-slate-500">
              Upload file materi untuk memulai
            </p>
            <button className="mt-6 rounded-xl border-2 border-black bg-emerald-500 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-emerald-600">
              + Upload File
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m) => (
              <div
                key={m.id}
                className="rounded-xl border-2 border-black bg-white p-5 shadow-xl"
              >
                <p className="text-lg font-black text-slate-900">{m.title}</p>
                <p className="mt-1 text-sm font-bold text-slate-500">{m.subject}</p>
                <p className="mt-2 text-xs font-semibold text-slate-400">{m.chapters}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
