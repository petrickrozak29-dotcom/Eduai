"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { api, type ApiUser } from "@/lib/api";

const columns = ["Nama", "NIP", "Email", "Mapel", "Status"];

export default function ManajemenGuruPage() {
  const [teachers, setTeachers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api.get<ApiUser[]>("/developer/users").then((result) => {
      if (!active) return;
      setTeachers(result.success && Array.isArray(result.data) ? result.data.filter((user) => user.role === "GURU") : []);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Manajemen Guru</h1>
          <p className="mt-1 text-sm font-bold text-slate-500">Kelola seluruh data guru di platform EduPath AI</p>
        </div>

        <div className="overflow-hidden rounded-xl border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-black bg-slate-100">
                  {columns.map((col) => (
                    <th key={col} className="px-4 py-3 font-black text-slate-700">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teachers.length > 0 ? (
                  teachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b border-slate-100">
                      <td className="px-4 py-4 font-bold text-slate-950">{teacher.name}</td>
                      <td className="px-4 py-4 text-slate-600">{teacher.nip || "-"}</td>
                      <td className="px-4 py-4 text-slate-600">{teacher.email}</td>
                      <td className="px-4 py-4 text-slate-600">{teacher.teacher?.mataPelajaran || "-"}</td>
                      <td className="px-4 py-4">
                        <span className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">Aktif</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="px-4 py-16 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-10 w-10 text-slate-300">
                          <circle cx="12" cy="8" r="5" />
                          <path d="M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2" />
                        </svg>
                        <p className="font-bold text-slate-400">{loading ? "Memuat data guru" : "Belum ada data guru"}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
