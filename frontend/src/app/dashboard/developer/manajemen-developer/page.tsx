"use client";

import DashboardShell from "@/components/layout/DashboardShell";

const columns = ["Nama", "Email", "Role", "Status", "Terdaftar"];

export default function ManajemenDeveloperPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Manajemen Developer</h1>
          <p className="mt-1 text-sm font-bold text-slate-500">
            Kelola akses developer platform EduPath AI
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-black bg-slate-100">
                  {columns.map((col) => (
                    <th key={col} className="px-4 py-3 font-black text-slate-700">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={columns.length} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-10 w-10 text-slate-300">
                        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                      </svg>
                      <p className="font-bold text-slate-400">Belum ada data developer</p>
                      <p className="text-xs font-semibold text-slate-400">
                        Data developer akan terisi setelah integrasi API
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