"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { useState } from "react";

export default function GuruForumPage() {
  const [forums] = useState([
    { id: "f1", title: "Diskusi Sistem Pernapasan", author: "Budi Guru", replies: 12, createdAt: "2 hari lalu", status: "aktif" },
    { id: "f2", title: "Tanya jawab Fungsi Kuadrat", author: "Siti Aisyah", replies: 8, createdAt: "3 hari lalu", status: "aktif" },
    { id: "f3", title: "Tugas Fisika Gerak Lurus", author: "Ahmad Rizal", replies: 5, createdAt: "5 hari lalu", status: "aktif" },
    { id: "f4", title: "Diskusi Struktur Atom", author: "Dewi Sartika", replies: 3, createdAt: "1 minggu lalu", status: "ditutup" },
  ]);

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase text-sky-600">Forum</p>
              <h2 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">Forum Diskusi 💬</h2>
              <p className="mt-2 text-base leading-8 text-slate-600">Kelola forum diskusi untuk tanya jawab dan kolaborasi siswa.</p>
            </div>
            <button className="inline-flex h-12 items-center gap-2 rounded-lg bg-sky-600 px-5 text-sm font-black text-white shadow-lg hover:bg-sky-700">
              + Buat Diskusi
            </button>
          </div>

          <div className="mt-5">
            <input type="text" placeholder="Cari diskusi..." className="h-12 w-full max-w-md rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100" />
          </div>
        </header>

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
                    <td className="px-5 py-4">
                      <span className={`rounded-lg px-3 py-1 text-xs font-black ${f.status === "aktif" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{f.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button className="rounded bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-600 hover:bg-blue-100">Buka</button>
                        <button className="rounded bg-red-50 px-3 py-1.5 text-xs font-black text-red-600 hover:bg-red-100">Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
