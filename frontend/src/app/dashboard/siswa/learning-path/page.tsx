"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DashboardShell from "@/components/layout/DashboardShell";
import { api, type ApiClassEnrollment } from "@/lib/api";

function levelLabel(level?: string | null) {
  if (level === "TIDAK_PAHAM") return "Tidak Paham";
  if (level === "KURANG_PAHAM") return "Kurang Paham";
  if (level === "PAHAM") return "Paham";
  return "Belum pretest";
}

function levelTone(level?: string | null) {
  if (level === "TIDAK_PAHAM") return "bg-red-50 text-red-700 border-red-200";
  if (level === "KURANG_PAHAM") return "bg-yellow-50 text-yellow-700 border-yellow-200";
  if (level === "PAHAM") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  return "bg-slate-50 text-slate-600 border-slate-200";
}

export default function KelasSayaPage() {
  const [classCode, setClassCode] = useState("");
  const [joinedClasses, setJoinedClasses] = useState<ApiClassEnrollment[]>([]);
  const [pretestScores, setPretestScores] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    api.get<ApiClassEnrollment[]>("/classes/student-classes").then((result) => {
      if (!active) return;
      if (result.success && Array.isArray(result.data)) {
        setJoinedClasses(result.data);
        setMessage("");
      } else {
        setJoinedClasses([]);
        setMessage(result.message || "Data kelas belum tersedia dari server.");
      }
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = classCode.trim().toUpperCase();
    if (!code) return;

    const result = await api.post<ApiClassEnrollment>("/classes/join", { classCode: code });
    if (result.success && result.data) {
      setJoinedClasses((current) => [result.data, ...current]);
      setClassCode("");
      setMessage("Berhasil bergabung. Kerjakan pretest untuk menentukan materi adaptif.");
    } else {
      setMessage(result.message || "Kode kelas tidak ditemukan.");
    }
  };

  const handlePretest = async (kelasId: string) => {
    const score = Number(pretestScores[kelasId] ?? 0);
    const result = await api.post<ApiClassEnrollment>(`/classes/${kelasId}/pretest`, { score });
    if (result.success && result.data) {
      setJoinedClasses((current) => current.map((item) => (item.kelas.id === kelasId ? result.data : item)));
      setMessage(`Pretest tersimpan. Level kamu: ${levelLabel(result.data.pretestLevel)}.`);
    } else {
      setMessage(result.message || "Gagal menyimpan pretest.");
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-slate-950">Kelas Saya</h1>
          <p className="mt-1 text-sm font-bold text-slate-500">Gabung kelas dengan kode rahasia dari guru.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl border-2 border-slate-200 bg-white p-6 shadow-lg"
        >
          <h2 className="mb-4 text-lg font-black text-slate-950">Gabung Kelas Baru</h2>
          <form onSubmit={handleJoin} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value.toUpperCase())}
              placeholder="Masukkan kode kelas"
              className="h-12 flex-1 rounded-lg border-2 border-slate-200 px-4 font-bold text-slate-950 placeholder:text-slate-400 focus:border-slate-950 focus:outline-none"
            />
            <button
              type="submit"
              className="h-12 rounded-lg border-2 border-slate-950 bg-slate-950 px-6 font-black text-white shadow-lg transition hover:bg-slate-800"
            >
              Gabung
            </button>
          </form>
        </motion.div>

        <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-800">
          {loading ? "Memuat kelas dari server..." : message || "Semua data kelas, materi, pretest, quiz, dan progress akan mengikuti API real-time."}
        </p>

        {!loading && joinedClasses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="rounded-xl border-2 border-slate-200 bg-white p-8 text-center shadow-lg"
          >
            <p className="text-5xl font-black text-slate-300">0</p>
            <p className="mt-3 text-lg font-black text-slate-950">Belum bergabung ke kelas</p>
            <p className="mt-1 text-sm font-bold text-slate-500">Masukkan kode kelas dari guru untuk mulai belajar.</p>
          </motion.div>
        )}

        <div className="space-y-5">
          {joinedClasses.map((enrollment) => {
            const kelas = enrollment.kelas;
            return (
              <motion.article
                key={enrollment.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border-2 border-slate-200 bg-white p-6 shadow-lg"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase text-red-600">
                      Fase {kelas.phase} - Kelas {kelas.classLevel || "-"}
                    </p>
                    <h2 className="mt-1 text-xl font-black text-slate-950">{kelas.name}</h2>
                    <p className="text-sm font-bold text-slate-500">
                      {kelas.subject?.name || "Mata pelajaran"} - {kelas.teacher?.user?.name || "Guru"}
                    </p>
                  </div>
                  <span className={`rounded-lg border px-3 py-2 text-xs font-black ${levelTone(enrollment.pretestLevel)}`}>
                    {levelLabel(enrollment.pretestLevel)}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[280px_1fr]">
                  <section className="rounded-lg border-2 border-slate-100 bg-slate-50 p-4">
                    <h3 className="font-black text-slate-950">Pretest</h3>
                    <p className="mt-1 text-xs font-bold text-slate-500">
                      Nilai di bawah 40: Tidak Paham, 40-79: Kurang Paham, 80 ke atas: Paham.
                    </p>
                    <div className="mt-3 flex gap-2">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={pretestScores[kelas.id] ?? enrollment.pretestScore ?? ""}
                        onChange={(e) => setPretestScores((current) => ({ ...current, [kelas.id]: e.target.value }))}
                        className="h-11 w-24 rounded-lg border border-slate-200 px-3 text-sm font-black outline-none focus:border-red-500"
                        placeholder="0-100"
                      />
                      <button
                        onClick={() => void handlePretest(kelas.id)}
                        className="h-11 rounded-lg bg-red-600 px-4 text-sm font-black text-white shadow hover:bg-red-700"
                      >
                        Simpan
                      </button>
                    </div>
                  </section>

                  <section className="grid gap-3 md:grid-cols-3">
                    <Info title="Mata Pelajaran Umum" value={kelas.category === "umum" ? kelas.subject?.name || "-" : "Menunggu data kelas"} />
                    <Info title="Mata Pelajaran Peminatan" value={kelas.category === "peminatan" ? kelas.subject?.name || "-" : "Tidak dipilih"} />
                    <Info title="Learning Stages" value={enrollment.pretestLevel ? "Materi adaptif, kuis bab, kuis akhir" : "Mulai dari pretest"} />
                  </section>
                </div>

                <div className="mt-5 rounded-lg border border-slate-200">
                  <div className="border-b border-slate-200 px-4 py-3">
                    <p className="font-black text-slate-950">Materi dan Kuis Terkait</p>
                  </div>
                  {kelas.materials && kelas.materials.length > 0 ? (
                    <div className="divide-y divide-slate-200">
                      {kelas.materials.map((item) => (
                        <div key={item.id} className="px-4 py-3">
                          <p className="font-bold text-slate-950">{item.material?.title}</p>
                          <p className="text-xs font-bold text-slate-500">Level: {levelLabel(item.material?.level)}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="px-4 py-6 text-sm font-bold text-slate-500">
                      Materi adaptif akan muncul setelah guru publish hasil AI generate untuk kelas ini.
                    </p>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-xs font-black uppercase text-slate-500">{title}</p>
      <p className="mt-2 text-sm font-black text-slate-950">{value}</p>
    </div>
  );
}
