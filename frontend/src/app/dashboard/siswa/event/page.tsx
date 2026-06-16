"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { useState } from "react";

export default function EventSiswaPage() {
  const [events] = useState([
    { id: "e1", title: "Webinar: AI untuk SMA", date: "2026-07-15", type: "Akademik", desc: "Pengenalan AI dalam pembelajaran" },
    { id: "e2", title: "Kompetisi Sains Nasional", date: "2026-08-20", type: "Akademik", desc: "Kompetisi sains tingkat nasional" },
    { id: "e3", title: "Workshop Robotik", date: "2026-09-10", type: "Ekstrakurikuler", desc: "Workshop robotik untuk pemula" },
    { id: "e4", title: "Seminar Karir STEM", date: "2026-06-01", type: "Akademik", desc: "Seminar karir di bidang STEM" },
  ]);

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-rose-600">Siswa</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950">Event & Kegiatan 🎯</h2>
          <p className="mt-2 text-base text-slate-600">Ikuti event seru untuk pengembangan dirimu.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {events.map((e) => (
            <div key={e.id} className="rounded-lg border border-white/70 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-black text-slate-950">{e.title}</p>
                  <p className="text-sm font-bold text-slate-500">{e.date}</p>
                </div>
                <span className="rounded-lg bg-rose-100 px-3 py-1 text-xs font-black text-rose-700">{e.type}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{e.desc}</p>
              <button className="mt-4 rounded-lg bg-rose-600 px-4 py-2 text-xs font-black text-white shadow-lg hover:bg-rose-700">Daftar</button>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
