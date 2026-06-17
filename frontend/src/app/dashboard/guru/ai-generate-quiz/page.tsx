"use client";

import DashboardShell from "@/components/layout/DashboardShell";
import {
  generalSubjects,
  specializationGroups,
  type Phase,
  type PhaseFClassLevel,
  type SpecializationKey,
  type SubjectCategory,
} from "@/lib/academicOptions";
import { useState } from "react";

export default function AIGenerateQuizPage() {
  const [phase, setPhase] = useState<Phase>("E");
  const [classLevel, setClassLevel] = useState<PhaseFClassLevel>("XI");
  const [category, setCategory] = useState<SubjectCategory>("umum");
  const [specialization, setSpecialization] = useState<SpecializationKey | "">("");
  const [subject, setSubject] = useState("Biologi");
  const [customSubject, setCustomSubject] = useState("");
  const [questionCount, setQuestionCount] = useState(20);
  const [fileName, setFileName] = useState("");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedGroup = specializationGroups.find((group) => group.key === specialization);
  const subjectOptions = category === "umum" ? generalSubjects : selectedGroup?.subjects ?? [];
  const finalSubject = subject === "__custom" ? customSubject.trim() : subject;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 900);
  };

  return (
    <DashboardShell>
      <div className="space-y-5">
        <header className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-emerald-600">AI Generator</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">Generate Quiz</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            Generate quiz pretest biasa dari file atau materi acuan, terpisah dari fitur AI Generate Materi.
          </p>
        </header>

        <div className="grid gap-5 xl:grid-cols-[1fr_400px]">
          <form onSubmit={handleGenerate} className="space-y-5">
            <div className="space-y-4 rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-black text-slate-700">Fase</span>
                  <select
                    value={phase}
                    onChange={(e) => {
                      setPhase(e.target.value as Phase);
                      setCategory("umum");
                      setSpecialization("");
                    }}
                    className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
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
                      className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
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
                    }}
                    className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
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
                      onChange={(e) => setSpecialization(e.target.value as SpecializationKey)}
                      className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                    >
                      <option value="">Pilih kelompok</option>
                      {specializationGroups.map((group) => <option key={group.key} value={group.key}>{group.label}</option>)}
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
                  className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 disabled:opacity-50"
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
                    className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                    placeholder="Nama mata pelajaran"
                  />
                </label>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-black text-slate-700">Jumlah Soal</span>
                  <input
                    type="number"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    min={5}
                    max={100}
                    className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-black text-slate-700">Upload File Acuan</span>
                  <input
                    type="file"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !finalSubject}
                className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-emerald-600 px-6 text-sm font-black text-white shadow-lg hover:bg-emerald-700 disabled:opacity-50"
              >
                {loading ? "Menyusun soal..." : "Generate Quiz"}
              </button>
            </div>
          </form>

          <div className="space-y-5">
            <div className="rounded-lg border border-white/70 bg-white/72 p-5 shadow backdrop-blur-2xl">
              <h3 className="text-lg font-black text-slate-950">Hasil Generate</h3>
              <p className="mt-1 text-sm font-bold text-slate-500">{finalSubject || "Pilih mata pelajaran"} {fileName ? `- ${fileName}` : ""}</p>
              {!generated ? (
                <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <p className="text-4xl font-black text-slate-300">0</p>
                  <p className="mt-3 text-sm font-bold text-slate-500">Isi form dan klik Generate</p>
                </div>
              ) : (
                <div className="mt-5 space-y-3">
                  {[
                    "Soal pretest konsep dasar",
                    "Soal pemahaman penerapan",
                    "Soal analisis berdasarkan materi acuan",
                  ].map((item, index) => (
                    <div key={item} className="rounded-lg border border-slate-200 bg-white p-4">
                      <p className="text-sm font-black text-slate-950">{index + 1}. {item}</p>
                      <p className="mt-1 text-xs font-bold text-emerald-600">Jawaban dan pembahasan akan disimpan saat API quiz final aktif.</p>
                    </div>
                  ))}
                  <p className="text-center text-xs font-bold text-slate-500">Total rencana: {questionCount} soal, siap dikirim ke kelas setelah integrasi publish.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
