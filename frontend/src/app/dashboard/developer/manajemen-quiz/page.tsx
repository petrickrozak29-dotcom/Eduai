"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { api, type ApiQuiz, type ApiSubject } from "@/lib/api";

const emptyForm = { id: "", title: "", subjectId: "", type: "bab" };

export default function ManajemenQuizPage() {
  const [quizzes, setQuizzes] = useState<ApiQuiz[]>([]);
  const [subjects, setSubjects] = useState<ApiSubject[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [formOpen, setFormOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    const [quizResult, subjectResult] = await Promise.all([
      api.get<ApiQuiz[]>("/quizzes"),
      api.get<ApiSubject[]>("/subjects"),
    ]);
    if (quizResult.success && Array.isArray(quizResult.data)) setQuizzes(quizResult.data);
    if (subjectResult.success && Array.isArray(subjectResult.data)) setSubjects(subjectResult.data);
    if (!quizResult.success && !silent) setMessage(quizResult.message || "Gagal memuat quiz");
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
    const timer = window.setInterval(() => loadData(true), 5000);
    return () => window.clearInterval(timer);
  }, [loadData]);

  const filtered = useMemo(() => {
    const needle = query.toLowerCase();
    return quizzes.filter((quiz) => quiz.title.toLowerCase().includes(needle) || quiz.subject?.name.toLowerCase().includes(needle));
  }, [quizzes, query]);

  const openCreate = () => {
    setForm({ ...emptyForm, subjectId: subjects[0]?.id || "" });
    setFormOpen(true);
    setMessage("");
  };

  const openEdit = (quiz: ApiQuiz) => {
    setForm({ id: quiz.id, title: quiz.title, subjectId: quiz.subjectId || quiz.subject?.id || "", type: quiz.type || "bab" });
    setFormOpen(true);
    setMessage("");
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.subjectId) {
      setMessage("Mapel wajib dipilih sebelum menyimpan quiz");
      return;
    }
    const payload = { title: form.title, subjectId: form.subjectId, type: form.type };
    const result = form.id
      ? await api.put<ApiQuiz>(`/quizzes/${form.id}`, payload)
      : await api.post<ApiQuiz>("/quizzes", payload);
    setMessage(result.success ? (form.id ? "Quiz berhasil diperbarui" : "Quiz berhasil ditambahkan") : result.message || "Gagal menyimpan quiz");
    if (result.success) {
      setFormOpen(false);
      setForm(emptyForm);
      loadData(true);
    }
  };

  const deleteQuiz = async (quiz: ApiQuiz) => {
    if (!window.confirm(`Hapus quiz ${quiz.title}?`)) return;
    const result = await api.delete<null>(`/quizzes/${quiz.id}`);
    setMessage(result.success ? "Quiz berhasil dihapus" : result.message || "Gagal menghapus quiz");
    loadData(true);
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Manajemen Quiz</h1>
            <p className="mt-1 text-sm font-bold text-slate-500">Tambah, edit, hapus, dan pantau quiz dari semua guru.</p>
          </div>
          <button onClick={openCreate} className="rounded-xl border-2 border-black bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Tambah Quiz</button>
        </div>

        <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Cari quiz atau mapel..." className="w-full rounded-xl border-2 border-black px-4 py-3 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none sm:max-w-sm" />
        {message && <p className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600">{message}</p>}

        {formOpen && (
          <div className="rounded-xl border-2 border-black bg-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-lg font-black text-slate-900">{form.id ? "Edit Quiz" : "Tambah Quiz"}</h2>
            <form onSubmit={submitForm} className="mt-4 grid gap-4 lg:grid-cols-2">
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="Judul quiz" className="rounded-lg border-2 border-black px-4 py-3 text-sm font-bold outline-none" />
              <select value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })} required className="rounded-lg border-2 border-black px-4 py-3 text-sm font-bold outline-none">
                <option value="">Pilih mapel</option>
                {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
              </select>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="rounded-lg border-2 border-black px-4 py-3 text-sm font-bold outline-none">
                <option value="bab">Bab</option>
                <option value="final">Final</option>
                <option value="pretest">Pretest</option>
              </select>
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
                  {["Judul", "Mapel", "Guru", "Soal", "Tipe", "Aksi"].map((col) => <th key={col} className="px-4 py-3 font-black text-slate-700">{col}</th>)}
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? filtered.map((quiz) => (
                  <tr key={quiz.id} className="border-b border-slate-100">
                    <td className="px-4 py-4 font-bold text-slate-950">{quiz.title}</td>
                    <td className="px-4 py-4 text-slate-600">{quiz.subject?.name || "-"}</td>
                    <td className="px-4 py-4 text-slate-600">{quiz.subject?.teacher?.user?.name || "-"}</td>
                    <td className="px-4 py-4 text-slate-600">{quiz._count?.questions ?? quiz.questions?.length ?? 0}</td>
                    <td className="px-4 py-4"><span className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-black text-blue-700">{quiz.type || "bab"}</span></td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(quiz)} className="rounded bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-600 hover:bg-blue-100">Edit</button>
                        <button onClick={() => deleteQuiz(quiz)} className="rounded bg-red-50 px-3 py-1.5 text-xs font-black text-red-600 hover:bg-red-100">Hapus</button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={6} className="px-4 py-16 text-center font-bold text-slate-400">{loading ? "Memuat quiz" : "Belum ada quiz"}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
