"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { api, type ApiEvent } from "@/lib/api";

const emptyForm = { id: "", title: "", description: "", date: "", type: "academic", penyelenggara: "", link: "" };

function toDateInput(value: string) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

export default function EventBoard({ compact = false }: { compact?: boolean }) {
  const { user } = useAuth();
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [formOpen, setFormOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const canCreate = user?.role === "GURU" || user?.role === "DEVELOPER";

  const loadEvents = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    const result = await api.get<ApiEvent[]>("/events");
    if (result.success && Array.isArray(result.data)) setEvents(result.data);
    if (!result.success && !silent) setMessage(result.message || "Gagal memuat event");
    setLoading(false);
  }, []);

  useEffect(() => {
    loadEvents();
    const timer = window.setInterval(() => loadEvents(true), 5000);
    return () => window.clearInterval(timer);
  }, [loadEvents]);

  const canEdit = (event: ApiEvent) => user?.role === "DEVELOPER" || event.user?.id === user?.id;

  const openCreate = () => {
    setForm(emptyForm);
    setFormOpen(true);
    setMessage("");
  };

  const openEdit = (event: ApiEvent) => {
    setForm({
      id: event.id,
      title: event.title,
      description: event.description || "",
      date: toDateInput(event.date),
      type: event.type || event.category || "academic",
      penyelenggara: event.penyelenggara || "",
      link: event.link || "",
    });
    setFormOpen(true);
    setMessage("");
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      date: form.date,
      type: form.type,
      category: form.type,
      penyelenggara: form.penyelenggara,
      link: form.link,
    };
    const result = form.id ? await api.put<ApiEvent>(`/events/${form.id}`, payload) : await api.post<ApiEvent>("/events", payload);
    setMessage(result.success ? (form.id ? "Event berhasil diperbarui" : "Event berhasil ditambahkan") : result.message || "Gagal menyimpan event");
    if (result.success) {
      setFormOpen(false);
      setForm(emptyForm);
      loadEvents(true);
    }
  };

  const deleteEvent = async (event: ApiEvent) => {
    if (!window.confirm(`Hapus event ${event.title}?`)) return;
    const result = await api.delete<null>(`/events/${event.id}`);
    setMessage(result.success ? "Event berhasil dihapus" : result.message || "Gagal menghapus event");
    loadEvents(true);
  };

  return (
    <section className={compact ? "space-y-4" : "space-y-5"}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className={compact ? "text-lg font-black text-slate-900" : "text-4xl font-black text-slate-950"}>Event</h2>
          <p className="mt-1 text-sm font-bold text-slate-500">Event real-time yang terhubung ke siswa, guru, dan developer.</p>
        </div>
        {canCreate && <button onClick={openCreate} className="rounded-lg bg-orange-600 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-orange-700">Tambah Event</button>}
      </div>

      {message && <p className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600">{message}</p>}

      {formOpen && (
        <div className="rounded-lg border border-white/70 bg-white p-5 shadow">
          <h3 className="text-lg font-black text-slate-950">{form.id ? "Edit Event" : "Tambah Event"}</h3>
          <form onSubmit={submitForm} className="mt-4 grid gap-3 lg:grid-cols-2">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="Nama event" className="h-12 rounded-lg border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-orange-500" />
            <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required type="date" className="h-12 rounded-lg border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-orange-500" />
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="h-12 rounded-lg border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-orange-500">
              <option value="academic">Akademik</option>
              <option value="extracurricular">Ekstrakurikuler</option>
              <option value="competition">Kompetisi</option>
            </select>
            <input value={form.penyelenggara} onChange={(e) => setForm({ ...form, penyelenggara: e.target.value })} placeholder="Penyelenggara" className="h-12 rounded-lg border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-orange-500" />
            <input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="Link" className="h-12 rounded-lg border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-orange-500 lg:col-span-2" />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Deskripsi" className="min-h-24 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-orange-500 lg:col-span-2" />
            <div className="flex gap-3 lg:col-span-2">
              <button type="button" onClick={() => setFormOpen(false)} className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-black text-slate-700">Batal</button>
              <button className="rounded-lg bg-orange-600 px-5 py-3 text-sm font-black text-white">Simpan</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {events.length > 0 ? events.map((event) => (
          <article key={event.id} className="rounded-lg border border-white/70 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-black text-slate-950">{event.title}</p>
                <p className="text-xs font-bold text-slate-500">{new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(event.date))}</p>
              </div>
              <span className="rounded-lg bg-orange-100 px-3 py-1 text-xs font-black text-orange-700">{event.type || event.category || "event"}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{event.description || "Tidak ada deskripsi"}</p>
            <p className="mt-3 text-xs font-bold text-slate-400">{event.user?.name ? `Oleh ${event.user.name}` : "Terhubung real-time"}</p>
            {canEdit(event) && (
              <div className="mt-4 flex gap-2">
                <button onClick={() => openEdit(event)} className="rounded bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-600 hover:bg-blue-100">Edit</button>
                <button onClick={() => deleteEvent(event)} className="rounded bg-red-50 px-3 py-1.5 text-xs font-black text-red-600 hover:bg-red-100">Hapus</button>
              </div>
            )}
          </article>
        )) : (
          <div className="rounded-lg border border-white/70 bg-white p-8 text-center font-bold text-slate-400 md:col-span-2 xl:col-span-3">
            {loading ? "Memuat event" : "Belum ada event"}
          </div>
        )}
      </div>
    </section>
  );
}
