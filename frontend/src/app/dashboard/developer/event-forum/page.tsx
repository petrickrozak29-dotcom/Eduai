"use client";

import DashboardShell from "@/components/layout/DashboardShell";

const eventColumns = ["Judul", "Tanggal", "Tipe", "Deskripsi"];
const forumColumns = ["Topik", "Pembuat", "Balasan", "Terakhir Aktif"];

export default function EventForumPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Event & Forum</h1>
          <p className="mt-1 text-sm font-bold text-slate-500">
            Kelola seluruh event dan forum diskusi
          </p>
        </div>

        <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-4 text-lg font-black text-slate-900">Events</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-black bg-slate-100">
                  {eventColumns.map((col) => (
                    <th key={col} className="px-4 py-3 font-black text-slate-700">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={eventColumns.length} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-10 w-10 text-slate-300">
                        <path d="M8 21h8M12 17v4" />
                        <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
                        <path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3" />
                      </svg>
                      <p className="font-bold text-slate-400">Belum ada event</p>
                      <p className="text-xs font-semibold text-slate-400">
                        Event akan muncul setelah dibuat oleh guru atau siswa
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-4 text-lg font-black text-slate-900">Forum Diskusi</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-black bg-slate-100">
                  {forumColumns.map((col) => (
                    <th key={col} className="px-4 py-3 font-black text-slate-700">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={forumColumns.length} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-10 w-10 text-slate-300">
                        <path d="M21 12a7 7 0 0 1-7 7H8l-5 3 2-5a7 7 0 1 1 16-5Z" />
                        <path d="M8 11h8M8 15h5" />
                      </svg>
                      <p className="font-bold text-slate-400">Belum ada diskusi</p>
                      <p className="text-xs font-semibold text-slate-400">
                        Forum diskusi akan terisi saat guru atau siswa memulai topik
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}