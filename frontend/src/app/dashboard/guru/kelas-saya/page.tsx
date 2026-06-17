"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { api, type ApiClass } from "@/lib/api";
import {
  generalSubjects,
  getSpecializationByKey,
  specializationGroups,
  type Phase,
  type PhaseFClassLevel,
  type SpecializationKey,
  type SubjectCategory,
} from "@/lib/academicOptions";

function generateKodeKelas(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i += 1) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function levelLabel(level?: string | null) {
  if (level === "TIDAK_PAHAM") return "Tidak Paham";
  if (level === "KURANG_PAHAM") return "Kurang Paham";
  if (level === "PAHAM") return "Paham";
  return "Belum pretest";
}

export default function KelasSayaPage() {
  const [kelasList, setKelasList] = useState<ApiClass[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ApiClass | null>(null);
  const [fase, setFase] = useState<Phase>("E");
  const [faseFKelas, setFaseFKelas] = useState<PhaseFClassLevel>("XI");
  const [kategori, setKategori] = useState<SubjectCategory>("umum");
  const [peminatan, setPeminatan] = useState<SpecializationKey | "">("");
  const [mapel, setMapel] = useState("");
  const [customMapel, setCustomMapel] = useState("");
  const [namaKelas, setNamaKelas] = useState("");
  const [kodeKelas, setKodeKelas] = useState(generateKodeKelas());
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const selectedSpecialization = peminatan ? getSpecializationByKey(peminatan) : undefined;
  const availableMapel = kategori === "umum" ? generalSubjects : selectedSpecialization?.subjects ?? [];
  const finalSubject = mapel === "__custom" ? customMapel.trim() : mapel;

  const emptyText = useMemo(() => {
    if (message) return message;
    return "Menunggu data kelas dari API real-time. Buat kelas baru untuk memulai.";
  }, [message]);

  useEffect(() => {
    let active = true;
    api.get<ApiClass[]>("/classes/my-classes").then((result) => {
      if (!active) return;
      if (result.success && Array.isArray(result.data)) {
        setKelasList(result.data);
        setMessage("");
      } else {
        setKelasList([]);
        setMessage(result.message || "Data kelas belum tersedia dari server.");
      }
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const handleFaseChange = (newFase: Phase) => {
    setFase(newFase);
    setKategori("umum");
    setPeminatan("");
    setMapel("");
    setCustomMapel("");
  };

  const resetForm = () => {
    setNamaKelas("");
    setKodeKelas(generateKodeKelas());
    setFase("E");
    setFaseFKelas("XI");
    setKategori("umum");
    setPeminatan("");
    setMapel("");
    setCustomMapel("");
    setDescription("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalSubject) {
      setMessage("Mata pelajaran wajib dipilih atau diisi.");
      return;
    }

    setSaving(true);
    const payload = {
      name: namaKelas,
      phase: fase,
      classLevel: fase === "E" ? "X" : faseFKelas,
      category: kategori,
      specialization: kategori === "peminatan" ? peminatan : null,
      subjectName: finalSubject,
      classCode: kodeKelas,
      description,
    };

    const result = await api.post<ApiClass>("/classes", payload);
    if (result.success && result.data) {
      setKelasList((current) => [result.data, ...current]);
      resetForm();
      setShowModal(false);
      setMessage("Kelas berhasil dibuat dan siap dipakai siswa dengan kode rahasia.");
    } else {
      setMessage(result.message || "Gagal membuat kelas. Periksa koneksi server.");
    }
    setSaving(false);
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Kelas Saya</h1>
            <p className="mt-1 text-sm font-bold text-slate-500">
              Buat kelas, atur fase, mata pelajaran, dan kode rahasia untuk siswa.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-xl border-2 border-black bg-emerald-500 px-6 py-3 font-bold text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition hover:bg-emerald-600"
          >
            + Buat Kelas Baru
          </button>
        </div>

        <p className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm font-bold text-amber-800 shadow-sm">
          {loading ? "Memuat kelas dari server..." : emptyText}
        </p>

        {!loading && kelasList.length === 0 ? (
          <div className="rounded-xl border-2 border-black bg-white p-12 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-5xl font-black text-slate-300">0</p>
            <h2 className="mt-4 text-2xl font-black text-slate-900">Belum Ada Kelas</h2>
            <p className="mt-2 text-sm font-bold text-slate-500">
              Data sengaja kosong sampai kelas dibuat dan tersimpan ke API.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-6 rounded-xl border-2 border-black bg-slate-900 px-8 py-3 font-bold text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition hover:bg-slate-800"
            >
              + Buat Kelas Baru
            </button>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {kelasList.map((kelas) => (
              <article key={kelas.id} className="rounded-xl border-2 border-black bg-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase text-emerald-600">
                      Fase {kelas.phase} - Kelas {kelas.classLevel || (kelas.phase === "E" ? "X" : "XI/XII")}
                    </p>
                    <h2 className="mt-1 text-xl font-black text-slate-950">{kelas.name}</h2>
                    <p className="mt-1 text-sm font-bold text-slate-500">{kelas.subject?.name || "Mata pelajaran belum tersimpan"}</p>
                  </div>
                  <div className="rounded-lg border-2 border-black bg-slate-950 px-4 py-2 text-center text-white">
                    <p className="text-[10px] font-black uppercase text-white/60">Kode</p>
                    <p className="text-lg font-black tracking-widest">{kelas.classCode}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs font-bold text-slate-500">Siswa</p>
                    <p className="text-lg font-black text-slate-950">{kelas._count?.enrollments ?? kelas.enrollments?.length ?? 0}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs font-bold text-slate-500">Materi</p>
                    <p className="text-lg font-black text-slate-950">{kelas._count?.materials ?? kelas.materials?.length ?? 0}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs font-bold text-slate-500">Kategori</p>
                    <p className="text-sm font-black capitalize text-slate-950">{kelas.category}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedClass(kelas)}
                  className="mt-4 w-full rounded-lg border-2 border-black bg-white px-4 py-3 text-sm font-black text-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition hover:bg-slate-50"
                >
                  Lihat Detail Kelas
                </button>
              </article>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-xl border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-black text-slate-900">Buat Kelas Baru</h3>
            <form onSubmit={handleSubmit} className="mt-5 space-y-5">
              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">Nama Kelas</label>
                <input
                  type="text"
                  value={namaKelas}
                  onChange={(e) => setNamaKelas(e.target.value)}
                  placeholder="Contoh: Biologi Fase E 2026"
                  required
                  className="w-full rounded-lg border-2 border-black p-3 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">Fase</label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {(["E", "F"] as Phase[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleFaseChange(item)}
                      className={`rounded-lg border-2 border-black px-4 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition ${
                        fase === item ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      Fase {item} {item === "E" ? "(Kelas X)" : "(Kelas XI/XII)"}
                    </button>
                  ))}
                </div>
              </div>

              {fase === "F" && (
                <div>
                  <label className="mb-1 block text-sm font-bold text-slate-700">Pilih Kelas</label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {(["XI", "XII"] as PhaseFClassLevel[]).map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setFaseFKelas(item)}
                        className={`rounded-lg border-2 border-black px-4 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition ${
                          faseFKelas === item ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        Kelas {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">Kategori Mata Pelajaran</label>
                <div className="grid gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      setKategori("umum");
                      setPeminatan("");
                      setMapel("");
                      setCustomMapel("");
                    }}
                    className={`rounded-lg border-2 border-black px-4 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition ${
                      kategori === "umum" ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    Umum
                  </button>
                  {fase === "F" && (
                    <button
                      type="button"
                      onClick={() => {
                        setKategori("peminatan");
                        setMapel("");
                        setCustomMapel("");
                      }}
                      className={`rounded-lg border-2 border-black px-4 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition ${
                        kategori === "peminatan" ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      Peminatan
                    </button>
                  )}
                </div>
              </div>

              {kategori === "peminatan" && (
                <div>
                  <label className="mb-1 block text-sm font-bold text-slate-700">Kelompok Peminatan</label>
                  <select
                    value={peminatan}
                    onChange={(e) => {
                      setPeminatan(e.target.value as SpecializationKey);
                      setMapel("");
                      setCustomMapel("");
                    }}
                    required
                    className="w-full rounded-lg border-2 border-black p-3 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none"
                  >
                    <option value="">Pilih kelompok peminatan</option>
                    {specializationGroups.map((group) => (
                      <option key={group.key} value={group.key}>
                        {group.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">Mata Pelajaran</label>
                <select
                  value={mapel}
                  onChange={(e) => {
                    setMapel(e.target.value);
                    if (e.target.value !== "__custom") setCustomMapel("");
                  }}
                  disabled={kategori === "peminatan" && !peminatan}
                  required
                  className="w-full rounded-lg border-2 border-black p-3 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none disabled:opacity-50"
                >
                  <option value="">{kategori === "peminatan" && !peminatan ? "Pilih kelompok peminatan dulu" : "Pilih mata pelajaran"}</option>
                  {availableMapel.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                  <option value="__custom">Tambah / isi sendiri</option>
                </select>
              </div>

              {mapel === "__custom" && (
                <div>
                  <label className="mb-1 block text-sm font-bold text-slate-700">Isi Mata Pelajaran</label>
                  <input
                    type="text"
                    value={customMapel}
                    onChange={(e) => setCustomMapel(e.target.value)}
                    placeholder="Tulis mata pelajaran atau pengembangan sekolah"
                    required
                    className="w-full rounded-lg border-2 border-black p-3 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none"
                  />
                </div>
              )}

              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">Deskripsi Singkat</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Opsional: target kelas, tahun ajaran, atau catatan untuk siswa"
                  className="w-full rounded-lg border-2 border-black p-3 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-slate-700">Kode Kelas Rahasia</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={kodeKelas}
                    onChange={(e) => setKodeKelas(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8))}
                    required
                    minLength={5}
                    className="flex-1 rounded-lg border-2 border-black bg-slate-50 p-3 text-lg font-black tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setKodeKelas(generateKodeKelas())}
                    className="rounded-lg border-2 border-black bg-slate-200 px-4 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition hover:bg-slate-300"
                  >
                    Acak
                  </button>
                </div>
                <p className="mt-1 text-xs font-bold text-slate-500">Bagikan kode ini ke siswa agar mereka bisa masuk kelas tanpa bentrok.</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowModal(false);
                  }}
                  className="flex-1 rounded-lg border-2 border-black bg-white px-4 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-lg border-2 border-black bg-emerald-500 px-4 py-3 font-bold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition hover:bg-emerald-600 disabled:opacity-60"
                >
                  {saving ? "Menyimpan..." : "Simpan Kelas"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedClass && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm"
          onClick={() => setSelectedClass(null)}
        >
          <div className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase text-emerald-600">Detail Kelas</p>
                <h3 className="mt-1 text-2xl font-black text-slate-950">{selectedClass.name}</h3>
                <p className="mt-1 text-sm font-bold text-slate-500">{selectedClass.subject?.name}</p>
              </div>
              <button onClick={() => setSelectedClass(null)} className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-black text-slate-700">
                Tutup
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              <Info label="Kode" value={selectedClass.classCode} />
              <Info label="Fase" value={`Fase ${selectedClass.phase}`} />
              <Info label="Kelas" value={selectedClass.classLevel || "-"} />
              <Info label="Kategori" value={selectedClass.category} />
            </div>

            <div className="mt-5 rounded-lg border border-slate-200">
              <div className="border-b border-slate-200 px-4 py-3">
                <p className="font-black text-slate-950">Siswa Terdaftar</p>
              </div>
              {selectedClass.enrollments && selectedClass.enrollments.length > 0 ? (
                <div className="divide-y divide-slate-200">
                  {selectedClass.enrollments.map((enrollment) => (
                    <div key={enrollment.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                      <div>
                        <p className="font-black text-slate-950">{enrollment.student?.user?.name || "Siswa"}</p>
                        <p className="text-xs font-bold text-slate-500">{enrollment.student?.user?.email}</p>
                      </div>
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
                        {levelLabel(enrollment.pretestLevel)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="px-4 py-6 text-sm font-bold text-slate-500">Belum ada siswa yang bergabung dengan kode kelas ini.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <p className="text-xs font-bold text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-black text-slate-950">{value}</p>
    </div>
  );
}
