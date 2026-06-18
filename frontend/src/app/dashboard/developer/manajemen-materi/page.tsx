"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { api, type ApiMaterial, type ApiSubject } from "@/lib/api";

const emptyForm = { id: "", title: "", subjectId: "", content: "", contentType: "text", isPublished: false };

export default function ManajemenMateriPage() {
  const [materials, setMaterials] = useState<ApiMaterial[]>([]);
  const [subjects, setSubjects] = useState<ApiSubject[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [formOpen, setFormOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    const [materialResult, subjectResult] = await Promise.all([
      api.get<ApiMaterial[]>("/materials"),
      api.get<ApiSubject[]>("/subjects"),
    ]);
    if (materialResult.success && Array.isArray(materialResult.data)) setMaterials(materialResult.data);
    if (subjectResult.success && Array.isArray(subjectResult.data)) setSubjects(subjectResult.data);
    if (!materialResult.success && !silent) setMessage(materialResult.message || "Gagal memuat materi");
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
    const timer = window.setInterval(() => loadData(true), 5000);
    return () => window.clearInterval(timer);
  }, [loadData]);

  const filtered = useMemo(() => {
    const needle = query.toLowerCase();
    return materials.filter((item) => item.title.toLowerCase().includes(needle) || item.subject?.name.toLowerCase().includes(needle));
  }, [materials, query]);

  const openCreate = () => {
    setForm({ ...emptyForm, subjectId: subjects[0]?.id || "" });
    setFormOpen(true);
    setMessage("");
  };

  const openEdit = (material: ApiMaterial) => {
    setForm({
      id: material.id,
      title: material.title,
      subjectId: material.subjectId || material.subject?.id || "",
      content: material.content || "",
      contentType: material.contentType || "text",
      isPublished: Boolean(material.isPublished),
    });
    setFormOpen(true);
    setMessage("");
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.subjectId) {
      setMessage("Mapel wajib dipilih sebelum menyimpan materi");
      return;
    }
    const payload = {
      title: form.title,
      subjectId: form.subjectId,
      content: form.content,
      contentType: form.contentType,
      isPublished: form.isPublished,
    };
    const result = form.id
      ? await api.put<ApiMaterial>(`/materials/${form.id}`, payload)
      : await api.post<ApiMaterial>("/materials", payload);
    setMessage(result.success ? (form.id ? "Materi berhasil diperbarui" : "Materi berhasil ditambahkan") : result.message || "Gagal menyimpan materi");
    if (result.success) {
      setFormOpen(false);
      setForm(emptyForm);
      loadData(true);
    }
  };

  const deleteMaterial = async (material: ApiMaterial) => {
    if (!window.confirm(`Hapus materi ${material.title}?`)) return;
    const result = await api.delete<null>(`/materials/${material.id}`);
    setMessage(result.success ? "Materi berhasil dihapus" : result.message || "Gagal menghapus materi");
    loadData(true);
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Manajemen Materi</h1>
            <p className="mt-1 text-sm font-bold text-slate-500">Tambah, edit, hapus, dan pantau materi dari semua guru.</p>
          </div>
          <button onClick={openCreate} className="rounded-xl border-2 border-black bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Tambah Materi</button>
        </div>

        <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Cari materi atau mapel..." className="w-full rounded-xl border-2 border-black px-4 py-3 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none sm:max-w-sm" />
        {message && <p className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600">{message}</p>}

        {formOpen && (
          <div className="rounded-xl border-2 border-black bg-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-lg font-black text-slate-900">{form.id ? "Edit Materi" : "Tambah Materi"}</h2>
            <form onSubmit={submitForm} className="mt-4 grid gap-4 lg:grid-cols-2">
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="Judul materi" className="rounded-lg border-2 border-black px-4 py-3 text-sm font-bold outline-none" />
              <select value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })} required className="rounded-lg border-2 border-black px-4 py-3 text-sm font-bold outline-none">
                <option value="">Pilih mapel</option>
                {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
              </select>
              <select value={form.contentType} onChange={(e) => setForm({ ...form, contentType: e.target.value })} className="rounded-lg border-2 border-black px-4 py-3 text-sm font-bold outline-none">
                <option value="text">Text</option>
                <option value="video">Video</option>
                <option value="file">File</option>
              </select>
              <label className="flex items-center gap-3 rounded-lg border-2 border-black px-4 py-3 text-sm font-bold">
                <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
                Published
              </label>
              <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Isi materi" className="min-h-28 rounded-lg border-2 border-black px-4 py-3 text-sm font-bold outline-none lg:col-span-2" />
              <div className="flex gap-3 lg:col-span-2">
                <button type="button" onClick={() => setFormOpen(false)} className="rounded-lg border-2 border-black px-5 py-3 text-sm font-black text-slate-700">Batal</button>
                <button className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-black text-white">Simpan</button>
              </div>
            </form>
          </div>
        )}

        <div className="overflow-hidden rounded-xl border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-black bg-slate-100">
                  {["Judul", "Mapel", "Guru", "Status", "Aksi"].map((col) => <th key={col} className="px-4 py-3 font-black text-slate-700">{col}</th>)}
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? filtered.map((material) => (
                  <tr key={material.id} className="border-b border-slate-100">
                    <td className="px-4 py-4 font-bold text-slate-950">{material.title}</td>
                    <td className="px-4 py-4 text-slate-600">{material.subject?.name || "-"}</td>
                    <td className="px-4 py-4 text-slate-600">{material.subject?.teacher?.user?.name || "-"}</td>
                    <td className="px-4 py-4"><span className={`rounded-lg px-3 py-1 text-xs font-black ${material.isPublished ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{material.isPublished ? "Published" : "Draft"}</span></td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(material)} className="rounded bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-600 hover:bg-blue-100">Edit</button>
                        <button onClick={() => deleteMaterial(material)} className="rounded bg-red-50 px-3 py-1.5 text-xs font-black text-red-600 hover:bg-red-100">Hapus</button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={5} className="px-4 py-16 text-center font-bold text-slate-400">{loading ? "Memuat materi" : "Belum ada materi"}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
