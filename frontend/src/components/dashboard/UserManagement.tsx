"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { api, type ApiUser } from "@/lib/api";

type Role = "SISWA" | "GURU" | "DEVELOPER";

interface Props {
  role: Role;
  title: string;
  description: string;
  identityLabel: string;
  emptyLabel: string;
}

interface UserForm {
  id?: string;
  name: string;
  email: string;
  password: string;
  identity: string;
  kelas: string;
  mataPelajaran: string;
}

const emptyForm: UserForm = {
  name: "",
  email: "",
  password: "",
  identity: "",
  kelas: "",
  mataPelajaran: "",
};

function formatDate(value?: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(value));
}

export default function UserManagement({ role, title, description, identityLabel, emptyLabel }: Props) {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<UserForm>(emptyForm);
  const [message, setMessage] = useState("");

  const columns = useMemo(() => {
    const base = ["Nama", identityLabel, "Email"];
    if (role === "SISWA") base.push("Kelas");
    if (role === "GURU") base.push("Mapel");
    return [...base, "Status", "Terdaftar", "Aksi"];
  }, [identityLabel, role]);

  const loadUsers = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    const result = await api.get<ApiUser[]>("/developer/users");
    if (result.success && Array.isArray(result.data)) {
      setUsers(result.data.filter((user) => user.role === role));
      setMessage("");
    } else if (!silent) {
      setMessage(result.message || "Gagal memuat akun");
    }
    setLoading(false);
  }, [role]);

  useEffect(() => {
    loadUsers();
    const timer = window.setInterval(() => loadUsers(true), 5000);
    return () => window.clearInterval(timer);
  }, [loadUsers]);

  const openCreate = () => {
    setForm(emptyForm);
    setFormOpen(true);
    setMessage("");
  };

  const openEdit = (user: ApiUser) => {
    setForm({
      id: user.id,
      name: user.name,
      email: user.email,
      password: "",
      identity: role === "GURU" ? user.nip || "" : role === "SISWA" ? user.nis || "" : "",
      kelas: user.kelas || user.student?.kelas || "",
      mataPelajaran: user.teacher?.mataPelajaran || "",
    });
    setFormOpen(true);
    setMessage("");
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    const payload = {
      role,
      name: form.name,
      email: form.email,
      ...(form.password && { password: form.password }),
      ...(role === "GURU" && { nip: form.identity, mataPelajaran: form.mataPelajaran }),
      ...(role === "SISWA" && { nis: form.identity, kelas: form.kelas }),
    };
    const result = form.id
      ? await api.put<ApiUser>(`/developer/users/${form.id}`, payload)
      : await api.post<ApiUser>("/developer/users", { ...payload, password: form.password || "edupath123" });

    setSaving(false);
    if (result.success) {
      setFormOpen(false);
      setForm(emptyForm);
      setMessage(form.id ? "Akun berhasil diperbarui" : "Akun berhasil ditambahkan");
      loadUsers(true);
    } else {
      setMessage(result.message || "Gagal menyimpan akun");
    }
  };

  const deleteUser = async (user: ApiUser) => {
    if (!window.confirm(`Hapus akun ${user.name}?`)) return;
    const result = await api.delete<null>(`/developer/users/${user.id}`);
    setMessage(result.success ? "Akun berhasil dihapus" : result.message || "Gagal menghapus akun");
    loadUsers(true);
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">{title}</h1>
            <p className="mt-1 text-sm font-bold text-slate-500">{description}</p>
          </div>
          <button onClick={openCreate} className="rounded-xl border-2 border-black bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Tambah Akun
          </button>
        </div>

        {message && <p className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600">{message}</p>}

        {formOpen && (
          <div className="rounded-xl border-2 border-black bg-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-lg font-black text-slate-900">{form.id ? "Edit Akun" : "Tambah Akun"}</h2>
            <form onSubmit={submitForm} className="mt-4 grid gap-4 lg:grid-cols-2">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Nama" className="rounded-lg border-2 border-black px-4 py-3 text-sm font-bold outline-none" />
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required type="email" placeholder="Email" className="rounded-lg border-2 border-black px-4 py-3 text-sm font-bold outline-none" />
              <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required={!form.id} type="password" placeholder={form.id ? "Password baru opsional" : "Password"} className="rounded-lg border-2 border-black px-4 py-3 text-sm font-bold outline-none" />
              {role !== "DEVELOPER" && (
                <input value={form.identity} onChange={(e) => setForm({ ...form, identity: e.target.value })} placeholder={identityLabel} className="rounded-lg border-2 border-black px-4 py-3 text-sm font-bold outline-none" />
              )}
              {role === "SISWA" && (
                <input value={form.kelas} onChange={(e) => setForm({ ...form, kelas: e.target.value })} placeholder="Kelas" className="rounded-lg border-2 border-black px-4 py-3 text-sm font-bold outline-none" />
              )}
              {role === "GURU" && (
                <input value={form.mataPelajaran} onChange={(e) => setForm({ ...form, mataPelajaran: e.target.value })} placeholder="Mata pelajaran" className="rounded-lg border-2 border-black px-4 py-3 text-sm font-bold outline-none" />
              )}
              <div className="flex gap-3 lg:col-span-2">
                <button type="button" onClick={() => setFormOpen(false)} className="rounded-lg border-2 border-black px-5 py-3 text-sm font-black text-slate-700">Batal</button>
                <button disabled={saving} className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-black text-white disabled:opacity-60">{saving ? "Menyimpan..." : "Simpan"}</button>
              </div>
            </form>
          </div>
        )}

        <div className="overflow-hidden rounded-xl border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-black bg-slate-100">
                  {columns.map((col) => <th key={col} className="px-4 py-3 font-black text-slate-700">{col}</th>)}
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100">
                    <td className="px-4 py-4 font-bold text-slate-950">{user.name}</td>
                    <td className="px-4 py-4 text-slate-600">{role === "GURU" ? user.nip || "-" : role === "SISWA" ? user.nis || "-" : "Developer"}</td>
                    <td className="px-4 py-4 text-slate-600">{user.email}</td>
                    {role === "SISWA" && <td className="px-4 py-4 text-slate-600">{user.kelas || user.student?.kelas || "-"}</td>}
                    {role === "GURU" && <td className="px-4 py-4 text-slate-600">{user.teacher?.mataPelajaran || "-"}</td>}
                    <td className="px-4 py-4"><span className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">Aktif</span></td>
                    <td className="px-4 py-4 text-slate-600">{formatDate(user.createdAt)}</td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(user)} className="rounded bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-600 hover:bg-blue-100">Edit</button>
                        <button onClick={() => deleteUser(user)} className="rounded bg-red-50 px-3 py-1.5 text-xs font-black text-red-600 hover:bg-red-100">Hapus</button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={columns.length} className="px-4 py-16 text-center font-bold text-slate-400">
                      {loading ? "Memuat data akun" : emptyLabel}
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
