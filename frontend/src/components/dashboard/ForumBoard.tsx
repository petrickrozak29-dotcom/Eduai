"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { api, type ApiForum } from "@/lib/api";

const emptyForm = { id: "", title: "", content: "" };

export default function ForumBoard({ compact = false }: { compact?: boolean }) {
  const { user } = useAuth();
  const [forums, setForums] = useState<ApiForum[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [formOpen, setFormOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadForums = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    const result = await api.get<ApiForum[]>("/forum");
    if (result.success && Array.isArray(result.data)) setForums(result.data);
    if (!result.success && !silent) setMessage(result.message || "Gagal memuat forum");
    setLoading(false);
  }, []);

  useEffect(() => {
    loadForums();
    const timer = window.setInterval(() => loadForums(true), 5000);
    return () => window.clearInterval(timer);
  }, [loadForums]);

  const canEdit = (forum: ApiForum) => user?.role === "DEVELOPER" || forum.user?.id === user?.id;

  const openCreate = () => {
    setForm(emptyForm);
    setFormOpen(true);
    setMessage("");
  };

  const openEdit = (forum: ApiForum) => {
    setForm({ id: forum.id, title: forum.title, content: forum.content });
    setFormOpen(true);
    setMessage("");
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = { title: form.title, content: form.content };
    const result = form.id ? await api.put<ApiForum>(`/forum/${form.id}`, payload) : await api.post<ApiForum>("/forum", payload);
    setMessage(result.success ? (form.id ? "Forum berhasil diperbarui" : "Forum berhasil dibuat") : result.message || "Gagal menyimpan forum");
    if (result.success) {
      setFormOpen(false);
      setForm(emptyForm);
      loadForums(true);
    }
  };

  const deleteForum = async (forum: ApiForum) => {
    if (!window.confirm(`Hapus forum ${forum.title}?`)) return;
    const result = await api.delete<null>(`/forum/${forum.id}`);
    setMessage(result.success ? "Forum berhasil dihapus" : result.message || "Gagal menghapus forum");
    loadForums(true);
  };

  return (
    <section className={compact ? "space-y-4" : "space-y-5"}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className={compact ? "text-lg font-black text-slate-900" : "text-4xl font-black text-slate-950"}>Forum Diskusi</h2>
          <p className="mt-1 text-sm font-bold text-slate-500">Diskusi real-time lintas siswa, guru, dan developer.</p>
        </div>
        <button onClick={openCreate} className="rounded-lg bg-sky-600 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-sky-700">Buat Diskusi</button>
      </div>

      {message && <p className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600">{message}</p>}

      {formOpen && (
        <div className="rounded-lg border border-white/70 bg-white p-5 shadow">
          <h3 className="text-lg font-black text-slate-950">{form.id ? "Edit Diskusi" : "Buat Diskusi"}</h3>
          <form onSubmit={submitForm} className="mt-4 space-y-3">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="Judul diskusi" className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-sky-500" />
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required placeholder="Isi diskusi" className="min-h-24 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-sky-500" />
            <div className="flex gap-3">
              <button type="button" onClick={() => setFormOpen(false)} className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-black text-slate-700">Batal</button>
              <button className="rounded-lg bg-sky-600 px-5 py-3 text-sm font-black text-white">Simpan</button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-white/70 bg-white/80 shadow backdrop-blur-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-black uppercase text-slate-500">
                <th className="px-5 py-4">Topik</th>
                <th className="px-5 py-4">Pembuat</th>
                <th className="px-5 py-4">Balasan</th>
                <th className="px-5 py-4">Aktivitas</th>
                <th className="px-5 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {forums.length > 0 ? forums.map((forum) => (
                <tr key={forum.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-5 py-4">
                    <p className="font-bold text-slate-950">{forum.title}</p>
                    <p className="mt-1 line-clamp-1 text-xs font-semibold text-slate-500">{forum.content}</p>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{forum.user?.name || "-"}</td>
                  <td className="px-5 py-4 text-slate-600">{forum._count?.replies ?? 0}</td>
                  <td className="px-5 py-4 text-slate-600">{forum.updatedAt ? new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(forum.updatedAt)) : "-"}</td>
                  <td className="px-5 py-4">
                    {canEdit(forum) ? (
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(forum)} className="rounded bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-600 hover:bg-blue-100">Edit</button>
                        <button onClick={() => deleteForum(forum)} className="rounded bg-red-50 px-3 py-1.5 text-xs font-black text-red-600 hover:bg-red-100">Hapus</button>
                      </div>
                    ) : <span className="text-xs font-bold text-slate-400">Terhubung</span>}
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="px-5 py-12 text-center font-bold text-slate-400">{loading ? "Memuat forum" : "Belum ada diskusi"}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
