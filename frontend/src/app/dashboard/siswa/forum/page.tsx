"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { useState } from "react";

export default function ForumSiswaPage() {
  const [threads] = useState([
    { id: "f1", title: "Diskusi Sistem Pernapasan", author: "Budi Guru", replies: 12, date: "2 hari lalu" },
    { id: "f2", title: "Tanya jawab Fungsi Kuadrat", author: "Siti Aisyah", replies: 8, date: "3 hari lalu" },
    { id: "f3", title: "Tugas Fisika Gerak Lurus", author: "Ahmad Rizal", replies: 5, date: "5 hari lalu" },
    { id: "f4", title: "Tips Belajar Kimia Struktur Atom", author: "Citra Dewi", replies: 15, date: "1 hari lalu" },
    { id: "f5", title: "Diskusi Bahasa Inggris Grammar", author: "Eka Wijaya", replies: 3, date: "6 hari lalu" },
    { id: "f6", title: "Tanya jawab Sejarah Kemerdekaan", author: "Dimas Pratama", replies: 7, date: "4 hari lalu" },
  ]);

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase text-indigo-600">Siswa</p>
              <h2 className="mt-2 text-4xl font-black text-slate-950">Forum Diskusi 💬</h2>
              <p className="mt-2 text-base text-slate-600">Tanya jawab dan diskusi bareng teman & guru.</p>
            </div>
            <button className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-indigo-700">+ Buat Thread</button>
          </div>
        </header>

        <div className="space-y-3">
          {threads.map((t) => (
            <div key={t.id} className="flex items-center justify-between rounded-lg border border-white/70 bg-white p-5 shadow-sm transition hover:shadow-md cursor-pointer">
              <div className="flex-1">
                <p className="font-black text-slate-950">{t.title}</p>
                <div className="mt-1 flex items-center gap-3 text-xs font-bold text-slate-500">
                  <span>✍️ {t.author}</span>
                  <span>🕐 {t.date}</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-slate-950">{t.replies}</p>
                <p className="text-xs font-bold text-slate-500">balasan</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
