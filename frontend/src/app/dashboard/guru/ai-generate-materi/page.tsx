"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import { api } from "@/lib/api";
import {
  generalSubjects,
  specializationGroups,
  understandingLevels,
  type Phase,
  type PhaseFClassLevel,
  type SpecializationKey,
  type SubjectCategory,
} from "@/lib/academicOptions";
import { useMemo, useState } from "react";

interface GenerateResponse {
  outputs: Record<string, { title: string; summary: string; finalQuiz: string; chapters: Array<{ title: string; quiz: string }> }>;
}

export default function AIGenerateMateriPage() {
  const [phase, setPhase] = useState<Phase>("E");
  const [classLevel, setClassLevel] = useState<PhaseFClassLevel>("XI");
  const [category, setCategory] = useState<SubjectCategory>("umum");
  const [specialization, setSpecialization] = useState<SpecializationKey | "">("");
  const [subject, setSubject] = useState("Biologi");
  const [customSubject, setCustomSubject] = useState("");
  const [referenceMaterial, setReferenceMaterial] = useState("");
  const [fileName, setFileName] = useState("");
  const [babQuizCount, setBabQuizCount] = useState(10);
  const [finalQuizCount, setFinalQuizCount] = useState(20);
  const [generated, setGenerated] = useState<GenerateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const selectedGroup = specializationGroups.find((group) => group.key === specialization);
  const subjectOptions = category === "umum" ? generalSubjects : selectedGroup?.subjects ?? [];
  const finalSubject = subject === "__custom" ? customSubject.trim() : subject;

  const phaseLabel = useMemo(() => (phase === "E" ? "Fase E - Kelas X" : `Fase F - Kelas ${classLevel}`), [classLevel, phase]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalSubject) {
      setMessage("Mata pelajaran wajib dipilih atau diisi.");
      return;
    }

    setLoading(true);
    setMessage("");
    const result = await api.post<GenerateResponse>("/edupath/generate", {
      phase,
      classLevel: phase === "E" ? "X" : classLevel,
      category,
      specialization: category === "peminatan" ? specialization : null,
      subjectName: finalSubject,
      referenceMaterial,
      babQuizCount,
      finalQuizCount,
    });

    if (result.success && result.data) {
      setGenerated(result.data);
      setMessage("Materi berhasil digenerate dan siap ditinjau sebelum dibagikan ke kelas.");
    } else {
      setGenerated(null);
      setMessage(result.message || "Gagal generate materi. Silakan coba lagi.");
    }
    setLoading(false);
  };

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-blue-600">AI Generator</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">Generate Materi</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            Buat 3 output materi berdasarkan level pemahaman siswa: Tidak Paham, Kurang Paham, dan Paham.
          </p>
        </header>

        <div className="grid gap-5 xl:grid-cols-[1fr_430px]">
          <form onSubmit={handleGenerate} className="space-y-5">
            <div className="space-y-4 rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-black text-slate-700">Fase</span>
                  <select
                    value={phase}
                    onChange={(e) => {
                      const nextPhase = e.target.value as Phase;
                      setPhase(nextPhase);
                      setCategory("umum");
                      setSpecialization("");
                      setSubject("");
                    }}
                    className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="E">Fase E - Kelas X</option>
                    <option value="F">Fase F - Kelas XI/XII</option>
                  </select>
                </label>
                {phase === "F" && (
                  <label className="block">
                    <span className="text-sm font-black text-slate-700">Kelas</span>
                    <select
                      value={classLevel}
                      onChange={(e) => setClassLevel(e.target.value as PhaseFClassLevel)}
                      className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="XI">Kelas XI</option>
                      <option value="XII">Kelas XII</option>
                    </select>
                  </label>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-black text-slate-700">Kategori</span>
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value as SubjectCategory);
                      setSpecialization("");
                      setSubject("");
                      setCustomSubject("");
                    }}
                    className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="umum">Umum</option>
                    {phase === "F" && <option value="peminatan">Peminatan</option>}
                  </select>
                </label>
                {category === "peminatan" && (
                  <label className="block">
                    <span className="text-sm font-black text-slate-700">Kelompok Peminatan</span>
                    <select
                      value={specialization}
                      onChange={(e) => {
                        setSpecialization(e.target.value as SpecializationKey);
                        setSubject("");
                      }}
                      className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="">Pilih kelompok</option>
                      {specializationGroups.map((group) => (
                        <option key={group.key} value={group.key}>{group.label}</option>
                      ))}
                    </select>
                  </label>
                )}
              </div>

              <label className="block">
                <span className="text-sm font-black text-slate-700">Mata Pelajaran</span>
                <select
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    if (e.target.value !== "__custom") setCustomSubject("");
                  }}
                  disabled={category === "peminatan" && !specialization}
                  className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:opacity-50"
                >
                  <option value="">Pilih mata pelajaran</option>
                  {subjectOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                  <option value="__custom">Tambah / isi sendiri</option>
                </select>
              </label>

              {subject === "__custom" && (
                <label className="block">
                  <span className="text-sm font-black text-slate-700">Isi Mata Pelajaran</span>
                  <input
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    placeholder="Nama mata pelajaran"
                  />
                </label>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-black text-slate-700">Jumlah Soal Kuis per Bab</span>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={babQuizCount}
                    onChange={(e) => setBabQuizCount(Number(e.target.value))}
                    className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-black text-slate-700">Jumlah Soal Kuis Akhir</span>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={finalQuizCount}
                    onChange={(e) => setFinalQuizCount(Number(e.target.value))}
                    className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-black text-slate-700">Upload File Materi Acuan</span>
                <input
                  type="file"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
                {fileName && <p className="mt-2 text-xs font-bold text-slate-500">File dipilih: {fileName}</p>}
              </label>

              <label className="block">
                <span className="text-sm font-black text-slate-700">Materi Acuan</span>
                <textarea
                  value={referenceMaterial}
                  onChange={(e) => setReferenceMaterial(e.target.value)}
                  placeholder="Tulis atau tempel materi acuan. Jika buku kurang dari 4 bab, AI akan melengkapi struktur minimal Bab 1-4."
                  rows={8}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <button
                type="submit"
                disabled={loading || !finalSubject}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 text-sm font-black text-white shadow-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Memproses..." : "Generate dengan AI"}
              </button>
            </div>
          </form>

          <div className="space-y-5">
            <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
              <p className="text-xs font-black uppercase text-emerald-600">{phaseLabel}</p>
              <h3 className="mt-1 text-2xl font-black text-slate-950">{finalSubject || "Mata Pelajaran"}</h3>
              <p className="text-sm font-bold text-slate-500">Hasil Generate AI</p>

              {message && <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs font-bold text-amber-800">{message}</p>}

              {!generated ? (
                <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <p className="text-4xl font-black text-slate-300">AI</p>
                  <p className="mt-3 text-sm font-bold text-slate-500">Isi form dan klik Generate</p>
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  {understandingLevels.map((level) => {
                    const output = generated.outputs[level.value];
                    return (
                      <div key={level.value} className="rounded-lg border border-slate-200 bg-white p-4">
                        <p className="text-sm font-black text-slate-950">{level.label}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{output?.summary}</p>
                        <div className="mt-3 space-y-2">
                          {output?.chapters?.map((chapter) => (
                            <div key={chapter.title} className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600">
                              {chapter.title} - {chapter.quiz}
                            </div>
                          ))}
                          <div className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-black text-blue-700">
                            Rangkuman Materi - {output?.finalQuiz}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
