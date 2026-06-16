"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { SVGProps } from "react";

const outputs = [
  { title: "Materi Visual", text: "Infografik, peta konsep, diagram, dan contoh visual.", color: "bg-red-50 text-red-600 border-red-100" },
  { title: "Materi Auditori", text: "Naskah penjelasan, analogi, dan rangkuman audio-ready.", color: "bg-yellow-50 text-yellow-700 border-yellow-100" },
  { title: "Materi Kinestetik", text: "Aktivitas praktik, eksperimen, dan simulasi kelas.", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
];

const pathSteps = [
  "Pilih Mata Pelajaran",
  "Pretest",
  "Profil Belajar",
  "Materi Adaptif",
  "Kuis Per Bab",
  "Kuis Akhir",
  "Learning Index",
];

export default function EduPathAIPage() {
  return (
    <main className="edupath-shell min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <WorkspaceBackdrop />

      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark />
          <span className="text-xl font-black text-slate-950">
            EduPath <span className="text-red-600">AI</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/" className="rounded-lg border border-white/70 bg-white/75 px-4 py-2 text-sm font-black text-slate-700 shadow-sm backdrop-blur">
            Home
          </Link>
          <Link href="/login" className="rounded-lg bg-red-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-red-600/20">
            Login
          </Link>
        </div>
      </div>

      <section className="relative z-10 mx-auto max-w-7xl pb-14 pt-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-4xl">
          <p className="text-sm font-black uppercase text-blue-600">EduPath AI Feature</p>
          <h1 className="mt-3 text-5xl font-black leading-tight text-slate-950 sm:text-6xl">
            AI workspace untuk membuat jalur belajar adaptif.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
            Halaman ini menampilkan fondasi fitur utama EduPath AI: generator materi untuk guru,
            learning path untuk siswa, AI assistant, dan Learning Index.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-lg border border-white/70 bg-white/75 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.11)] backdrop-blur-2xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase text-red-600">Guru Workspace</p>
                <h2 className="mt-1 text-3xl font-black text-slate-950">Generate Materi Adaptif</h2>
              </div>
              <button className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20">
                Generate AI
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Field label="Fase" value="Fase E - Kelas X" />
              <Field label="Mata Pelajaran" value="Matematika" />
            </div>

            <div className="mt-3 rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-xs font-black uppercase text-slate-500">Materi Acuan</p>
              <p className="mt-3 min-h-28 rounded-lg bg-slate-50 p-4 text-sm leading-7 text-slate-600">
                Fungsi kuadrat, grafik parabola, titik puncak, akar-akar persamaan, dan penerapan
                dalam masalah sehari-hari.
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {outputs.map((item) => (
                <article key={item.title} className={`rounded-lg border p-4 ${item.color}`}>
                  <SparkIcon className="mb-4 h-6 w-6" />
                  <h3 className="font-black">{item.title}</h3>
                  <p className="mt-2 text-xs leading-6">{item.text}</p>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="rounded-lg border border-white/70 bg-slate-950 p-5 text-white shadow-[0_30px_90px_rgba(15,23,42,0.24)]"
          >
            <p className="text-xs font-black uppercase text-yellow-300">AI Assistant</p>
            <h2 className="mt-1 text-3xl font-black">Tanya materi, upload dokumen, buat latihan.</h2>

            <div className="mt-5 space-y-3">
              <div className="rounded-lg bg-white/[0.08] p-4">
                <p className="text-sm font-bold text-slate-300">Siswa</p>
                <p className="mt-1 text-sm leading-6">Jelaskan fungsi kuadrat dengan contoh yang mudah.</p>
              </div>
              <div className="rounded-lg bg-blue-500 p-4">
                <p className="text-sm font-bold text-blue-100">EduPath AI</p>
                <p className="mt-1 text-sm leading-6">
                  Bayangkan parabola seperti lintasan bola. Kita bisa membaca titik puncak, arah buka,
                  dan akar untuk memahami pola nilainya.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {["Upload PDF", "Upload PPT", "Upload Modul", "Upload Gambar"].map((item) => (
                <button key={item} className="rounded-lg border border-white/10 bg-white/[0.08] px-3 py-3 text-sm font-black text-white">
                  {item}
                </button>
              ))}
            </div>
          </motion.aside>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="rounded-lg border border-white/70 bg-white/75 p-5 shadow-[0_25px_75px_rgba(15,23,42,0.08)] backdrop-blur-2xl"
          >
            <p className="text-xs font-black uppercase text-emerald-600">Siswa Flow</p>
            <h2 className="mt-1 text-3xl font-black text-slate-950">Learning Path Adaptif</h2>
            <div className="mt-6 space-y-3">
              {pathSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-sm font-black text-red-600 shadow-sm">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-black text-slate-950">{step}</p>
                    <div className="mt-2 h-2 overflow-hidden rounded-sm bg-slate-200">
                      <div
                        className="h-full rounded-sm bg-gradient-to-r from-red-500 via-yellow-400 to-emerald-500"
                        style={{ width: `${Math.min(100, 22 + index * 12)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="rounded-lg border border-white/70 bg-white/75 p-5 shadow-[0_25px_75px_rgba(15,23,42,0.08)] backdrop-blur-2xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase text-blue-600">Learning Index</p>
                <h2 className="mt-1 text-3xl font-black text-slate-950">Analytics yang bisa ditindaklanjuti</h2>
              </div>
              <div className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-black text-white">Skor 88</div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-gradient-to-br from-blue-500 to-emerald-400 p-5 text-white">
                <p className="font-black">Kekuatan Siswa</p>
                <ul className="mt-4 space-y-3 text-sm font-semibold text-white/90">
                  <li>Konsep dasar kuat</li>
                  <li>Konsisten mengerjakan kuis</li>
                  <li>Cepat memahami visual</li>
                </ul>
              </div>
              <div className="rounded-lg bg-gradient-to-br from-red-500 to-yellow-400 p-5 text-white">
                <p className="font-black">Area Perbaikan</p>
                <ul className="mt-4 space-y-3 text-sm font-semibold text-white/90">
                  <li>Latihan soal cerita</li>
                  <li>Ulang materi bab 2</li>
                  <li>Diskusi konsep akar</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-sm font-black text-slate-950">Rekomendasi Belajar Berikutnya</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Selesaikan latihan adaptif 15 menit, baca ulang materi visual, lalu ambil kuis akhir
                untuk meningkatkan Learning Index.
              </p>
            </div>
          </motion.section>
        </div>
      </section>
    </main>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-xs font-black uppercase text-slate-500">{label}</p>
      <p className="mt-2 font-black text-slate-950">{value}</p>
    </div>
  );
}

function WorkspaceBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <span className="learning-band learning-band-one" />
      <span className="learning-band learning-band-two" />
      <span className="learning-band learning-band-three" />
      <span className="grid-sheen" />
      {Array.from({ length: 14 }).map((_, index) => (
        <span key={index} className={`learning-particle particle-${index + 1}`} />
      ))}
    </div>
  );
}

function LogoMark() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-[0_14px_35px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70">
      <svg viewBox="0 0 44 44" aria-hidden="true" className="h-9 w-9">
        <path d="M8 11.5c4.6.7 8 2.6 10.2 5.7v16.2C15.9 30.7 12.5 29 8 28.3V11.5Z" fill="#EF4444" />
        <path d="M36 11.5c-4.6.7-8 2.6-10.2 5.7v16.2c2.3-2.7 5.7-4.4 10.2-5.1V11.5Z" fill="#22C55E" />
        <path d="M20 10.3c.9-2.3 2.4-4.1 4.5-5.3 1.9 1.4 3 3.2 3.3 5.3-1.9.7-3.4 1.9-4.7 3.7A12.4 12.4 0 0 0 20 10.3Z" fill="#3B82F6" />
        <path d="M18.2 17.2c-2.2-3.1-5.6-5-10.2-5.7v3.8c3.7.7 6.5 2.3 8.2 4.7l2 2.7v-5.5Z" fill="#FACC15" opacity=".9" />
      </svg>
    </div>
  );
}

function SparkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
      <path d="M19 16l.8 2.7L22 19.5l-2.2.8L19 23l-.8-2.7-2.2-.8 2.2-.8L19 16Z" />
    </svg>
  );
}
