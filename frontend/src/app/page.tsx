"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { SVGProps } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09 },
  },
};

const navItems = [
  { label: "Beranda", href: "#home" },
  { label: "Fitur", href: "#features" },
  { label: "Cara Kerja", href: "#workflow" },
  { label: "Untuk Guru", href: "#teacher" },
  { label: "Untuk Siswa", href: "#student" },
  { label: "Tentang Kami", href: "#about" },
];

const heroPills = [
  "Adaptive Learning",
  "AI Generated Content",
  "Personalized Path",
  "Learning Index",
  "AI Assistant",
  "Kurikulum Merdeka",
];

const workflowSteps = [
  { title: "Guru", text: "Input materi acuan", tone: "bg-red-100 text-red-600", icon: UserIcon },
  { title: "AI Generate", text: "Model materi disesuaikan dengan kurikulum", tone: "bg-yellow-100 text-yellow-700", icon: SparkIcon },
  { title: "Review", text: "Publikasi materi & kuis", tone: "bg-emerald-100 text-emerald-600", icon: CheckIcon },
  { title: "Siswa", text: "Pretest & profil belajar", tone: "bg-blue-100 text-blue-600", icon: GraduationIcon },
  { title: "Materi Adaptif", text: "Sesuai Level Pemahaman Siswa", tone: "bg-indigo-100 text-indigo-600", icon: BookIcon },
  { title: "Kuis", text: "Per bab & akhir", tone: "bg-violet-100 text-violet-600", icon: ClipboardIcon },
  { title: "Learning Index", text: "Progress & analytics", tone: "bg-green-100 text-green-600", icon: ChartIcon },
];

const features = [
  {
    title: "EduPath AI",
    text: "Sistem pembelajaran adaptif yang menyusun materi sesuai hasil pretest, minat, dan profil belajar siswa.",
    color: "from-blue-500 to-cyan-400",
    icon: BrainIcon,
  },
  {
    title: "AI Assistant",
    text: "Asisten belajar untuk bertanya, merangkum materi, membuat flashcard, dan latihan soal otomatis.",
    color: "from-emerald-500 to-teal-400",
    icon: BotIcon,
  },
  {
    title: "Learning Index",
    text: "Analitik real-time untuk memantau kekuatan, area perbaikan, dan rekomendasi belajar berikutnya.",
    color: "from-yellow-400 to-orange-400",
    icon: ChartIcon,
  },
  {
    title: "Forum Diskusi",
    text: "Kolaborasi guru dan siswa dalam ruang diskusi yang tertata, aman, dan terhubung dengan materi.",
    color: "from-indigo-500 to-blue-500",
    icon: MessageIcon,
  },
  {
    title: "Event Akademik",
    text: "Webinar, kompetisi, dan workshop untuk memperkaya pengalaman belajar siswa SMA.",
    color: "from-red-500 to-rose-500",
    icon: TrophyIcon,
  },
];

const dashboardCards = [
  {
    role: "Guru",
    title: "AI Teaching Workspace",
    text: "Generate materi acuan, review hasil AI, publish modul, dan pantau performa kelas.",
    stats: ["Fase E/F", "3 Level Pemahaman", "Kuis otomatis"],
    accent: "border-emerald-200 bg-emerald-50/80",
    href: "/login",
  },
  {
    role: "Siswa",
    title: "Gamified Learning Hub",
    text: "Pretest, materi adaptif, XP, streak, badge, kuis, forum, dan Learning Index personal.",
    stats: ["Learning Path", "Kuis Adaptif", "Progress Real-time"],
    accent: "border-red-200 bg-red-50/80",
    href: "/login",
  },
];

function LogoMark() {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-[0_14px_35px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70">
      <svg viewBox="0 0 44 44" aria-hidden="true" className="h-9 w-9">
        <path d="M8 11.5c4.6.7 8 2.6 10.2 5.7v16.2C15.9 30.7 12.5 29 8 28.3V11.5Z" fill="#EF4444" />
        <path d="M36 11.5c-4.6.7-8 2.6-10.2 5.7v16.2c2.3-2.7 5.7-4.4 10.2-5.1V11.5Z" fill="#22C55E" />
        <path d="M20 10.3c.9-2.3 2.4-4.1 4.5-5.3 1.9 1.4 3 3.2 3.3 5.3-1.9.7-3.4 1.9-4.7 3.7A12.4 12.4 0 0 0 20 10.3Z" fill="#3B82F6" />
        <path d="M18.2 17.2c-2.2-3.1-5.6-5-10.2-5.7v3.8c3.7.7 6.5 2.3 8.2 4.7l2 2.7v-5.5Z" fill="#FACC15" opacity=".9" />
      </svg>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/65 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-5 px-4 sm:px-6 lg:px-8">
        <Link href="#home" className="flex items-center gap-3" aria-label="EduPath AI beranda">
          <LogoMark />
          <span className="text-xl font-black text-slate-950">
            EduPath <span className="text-red-600">AI</span>
          </span>
        </Link>
        <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label="Navigasi utama">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="relative text-sm font-bold text-slate-700 transition hover:text-red-600">{item.label}</Link>
          ))}
        </nav>
        <Link href="/login" className="ml-auto inline-flex h-11 items-center justify-center rounded-lg bg-red-600 px-5 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(239,68,68,0.25)] transition hover:-translate-y-0.5 hover:bg-red-700 lg:ml-4">
          Login
        </Link>
      </div>
    </header>
  );
}

function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <span className="learning-band learning-band-one" />
      <span className="learning-band learning-band-two" />
      <span className="learning-band learning-band-three" />
      <span className="grid-sheen" />
      {Array.from({ length: 18 }).map((_, index) => (
        <span key={index} className={`learning-particle particle-${index + 1}`} />
      ))}
    </div>
  );
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative min-h-[520px] lg:min-h-[610px]"
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-5 top-3 z-20 hidden rounded-lg bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-2xl shadow-slate-900/25 md:block"
      >
        AI Tutor Live
      </motion.div>

      <div className="absolute inset-x-2 bottom-0 top-16 rounded-lg border border-white/70 bg-white/50 p-4 shadow-[0_30px_80px_rgba(37,99,235,0.18)] backdrop-blur-2xl sm:p-6">
        <div className="rounded-lg border border-blue-200/80 bg-gradient-to-br from-white via-blue-50 to-emerald-50 pt-12 p-5 shadow-inner">
          <div className="mb-7 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase text-blue-600">Adaptive Class Studio</p>
              <h3 className="mt-1 text-xl font-black text-slate-950">Hi, Selamat Belajar!</h3>
            </div>
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-sm bg-red-500" />
              <span className="h-3 w-3 rounded-sm bg-yellow-400" />
              <span className="h-3 w-3 rounded-sm bg-green-500" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Materi Adaptif", "Sesuai Level Pemahaman", "bg-red-500"],
              ["Kuis Per Bab", "Monitor pemahaman", "bg-yellow-400"],
              ["Learning Index", "Pantau perkembangan", "bg-emerald-500"],
            ].map(([title, text, color]) => (
              <motion.div
                key={title}
                whileHover={{ y: -6 }}
                className={`${color} rounded-lg p-4 text-white shadow-xl shadow-slate-900/10`}
              >
                <p className="text-sm font-black">{title}</p>
                <p className="mt-1 text-xs font-semibold text-white/85">{text}</p>
                <div className="mt-5 h-12 rounded-lg bg-white/25 p-2">
                  <div className="h-full rounded-md bg-white/70" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 rounded-lg border border-white/80 bg-white/80 p-4 shadow-lg">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-black text-slate-900">Progress Belajar</p>
              <p className="text-sm font-black text-red-600">75%</p>
            </div>
            <div className="h-3 overflow-hidden rounded-sm bg-slate-200">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1, delay: 0.65 }}
                className="h-full rounded-sm bg-gradient-to-r from-red-500 via-yellow-400 to-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-6 hidden items-end gap-4 md:flex">
          <StudentAvatar color="bg-red-500" shirt="bg-red-500" />
          <div className="mb-4 rounded-lg bg-white/90 px-4 py-3 text-sm font-black text-slate-900 shadow-lg">Pretest selesai</div>
        </div>

        <div className="absolute bottom-3 right-6 hidden items-end gap-4 md:flex">
          <div className="mb-8 rounded-lg bg-white/90 px-4 py-3 text-sm font-black text-slate-900 shadow-lg">Ayo Belajar</div>
          <StudentAvatar color="bg-yellow-400" shirt="bg-yellow-400" flip />
        </div>
      </div>
    </motion.div>
  );
}

function StudentAvatar({ color, shirt, flip = false }: { color: string; shirt: string; flip?: boolean }) {
  return (
    <div className={`relative h-36 w-28 ${flip ? "-scale-x-100" : ""}`}>
      <div className="absolute left-6 top-0 h-16 w-16 rounded-full bg-slate-900" />
      <div className="absolute left-8 top-6 h-14 w-14 rounded-full bg-[#ffd8b5]" />
      <div className="absolute left-4 top-20 h-20 w-20 rounded-t-full rounded-b-lg bg-slate-900/10" />
      <div className={`absolute left-2 top-20 h-24 w-24 rounded-t-full rounded-b-lg ${shirt}`} />
      <div className="absolute left-10 top-14 h-2 w-2 rounded-full bg-slate-950" />
      <div className="absolute left-16 top-14 h-2 w-2 rounded-full bg-slate-950" />
      <div className="absolute left-12 top-20 h-2 w-5 rounded-full border-b-2 border-slate-950" />
      <div className={`absolute -right-1 top-24 h-10 w-4 rotate-[-28deg] rounded-full ${color}`} />
      <div className="absolute -right-4 top-20 h-7 w-7 rounded-full bg-[#ffd8b5]" />
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative z-10 px-4 pb-10 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50/80 px-4 py-2 text-sm font-black text-red-700 shadow-sm">
            <SparkIcon className="h-4 w-4" />
            Transformasi Pembelajaran SMA Berbasis AI
          </motion.div>
          <motion.h1 variants={fadeUp} transition={{ duration: 0.55 }}
            className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] text-slate-950 sm:text-6xl lg:text-7xl xl:text-8xl">
            EduPath <span className="text-red-600">AI</span>
          </motion.h1>
          <motion.p variants={fadeUp} transition={{ duration: 0.55 }}
            className="mt-6 max-w-2xl text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
            Belajar Sesuai <span className="text-red-600">Potensimu</span>, Berkembang Bersama{" "}
            <span className="text-red-600">AI</span>.
          </motion.p>
          <motion.p variants={fadeUp} transition={{ duration: 0.55 }}
            className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Platform pembelajaran adaptif berbasis Artificial Intelligence yang membantu siswa SMA
            belajar sesuai kemampuan dan level pemahamannya.
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.55 }} className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/login"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-red-600 px-6 text-base font-black text-white shadow-[0_18px_45px_rgba(239,68,68,0.28)] transition hover:-translate-y-1 hover:bg-red-700">
              <RocketIcon className="h-5 w-5" />
              Mulai Belajar
            </Link>
            <Link href="/edupath-ai"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white/85 px-6 text-base font-black text-slate-950 shadow-[0_15px_35px_rgba(15,23,42,0.08)] backdrop-blur transition hover:-translate-y-1 hover:border-red-200">
              <PlayIcon className="h-5 w-5 text-red-600" />
              Pelajari EduPath AI
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} transition={{ duration: 0.55 }} className="mt-8 flex flex-wrap gap-2">
            {heroPills.map((pill) => (
              <span key={pill}
                className="rounded-lg border border-white/70 bg-white/70 px-3 py-2 text-xs font-extrabold text-slate-600 shadow-sm backdrop-blur">
                {pill}
              </span>
            ))}
          </motion.div>
        </motion.div>
        <HeroVisual />
      </div>
    </section>
  );
}

function Workflow() {
  return (
    <section id="workflow" className="relative z-10 px-4 py-10 sm:px-6 lg:px-8">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }}
        className="mx-auto max-w-7xl rounded-lg border border-white/70 bg-white/[0.62] p-5 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[270px_1fr]">
          <div>
            <p className="text-sm font-black uppercase text-red-600">Cara Kerja</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Alur EduPath <span className="text-red-600">AI</span></h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Guru, siswa, dan Artificial Intelligence bergerak dalam satu ekosistem pembelajaran adaptif yang mudah dipantau.
            </p>
            <Link href="/edupath-ai"
              className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg border border-red-200 bg-white px-4 text-sm font-black text-red-600 transition hover:-translate-y-0.5 hover:bg-red-50">
              Lihat Selengkapnya <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-7">
            {workflowSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={step.title} className="relative">
                  <motion.div whileHover={{ y: -5 }} className="flex h-full flex-col items-center text-center">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-lg ${step.tone}`}>
                      <StepIcon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-3 text-sm font-black text-slate-950">{step.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-600">{step.text}</p>
                  </motion.div>
                  {index < workflowSteps.length - 1 && (
                    <ArrowRightIcon className="absolute right-[-18px] top-6 hidden h-5 w-5 text-slate-400 xl:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="relative z-10 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase text-blue-600">Fitur Unggulan</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">Satu Platform untuk Belajar Adaptif</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Dibuat untuk siswa SMA yang butuh pengalaman belajar cepat, personal, dan tetap terasa menyenangkan.
          </p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {features.map((feature) => {
            const FeatureIcon = feature.icon;
            return (
              <motion.article key={feature.title} variants={fadeUp} transition={{ duration: 0.45 }} whileHover={{ y: -7 }}
                className="group rounded-lg border border-white/70 bg-white/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition">
                <div className={`mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                  <FeatureIcon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-black text-slate-950">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{feature.text}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function EduPathWorkspace() {
  return (
    <section id="teacher" className="relative z-10 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }}
          className="rounded-lg border border-white/70 bg-slate-950 p-6 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)]">
          <p className="text-sm font-black uppercase text-yellow-300">Untuk Guru</p>
          <h2 className="mt-2 text-4xl font-black">AI Workspace untuk Membuat Materi</h2>
          <p className="mt-4 leading-8 text-slate-300">
            Guru cukup memilih fase, mata pelajaran, dan memasukkan materi acuan. EduPath AI
            menyusun materi untuk 3 level pemahaman siswa, bab pembelajaran, dan kuis yang bisa direview sebelum publish.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {["Fase E / F", "3 Level Pemahaman", "Bab + Kuis Terintegrasi", "Materi Adaptif"].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/[0.08] p-4">
                <CheckIcon className="mb-3 h-5 w-5 text-green-300" />
                <p className="font-black">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55, delay: 0.1 }}
          className="rounded-lg border border-white/70 bg-white/75 p-5 shadow-[0_25px_80px_rgba(37,99,235,0.12)] backdrop-blur-2xl">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase text-blue-600">EduPath AI Generator</p>
              <h3 className="text-2xl font-black text-slate-950">Generate Materi Acuan</h3>
            </div>
            <button className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20">Generate AI</button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-xs font-black uppercase text-slate-500">Fase</p>
              <p className="mt-2 font-black text-slate-950">Fase E - Kelas X</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-xs font-black uppercase text-slate-500">Mata Pelajaran</p>
              <p className="mt-2 font-black text-slate-950">Biologi</p>
            </div>
          </div>
          <div className="mt-3 rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-xs font-black uppercase text-slate-500">Materi Acuan</p>
            <p className="mt-2 leading-7 text-slate-600">
              Sistem pernapasan manusia, fungsi organ, proses pertukaran gas, dan contoh gangguan pernapasan pada kehidupan sehari-hari.
            </p>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              ["Tidak Paham", "Konsep dasar + visualisasi", "bg-red-50 text-red-600"],
              ["Kurang Paham", "Penjelasan + contoh soal", "bg-yellow-50 text-yellow-700"],
              ["Paham", "Pengayaan + latihan lanjutan", "bg-emerald-50 text-emerald-600"],
            ].map(([title, text, tone]) => (
              <div key={title} className={`rounded-lg border border-white p-4 ${tone}`}>
                <p className="font-black">{title}</p>
                <p className="mt-2 text-xs leading-5">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StudentExperience() {
  return (
    <section id="student" className="relative z-10 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_0.95fr]">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }}
          className="order-2 lg:order-1">
          <div className="rounded-lg border border-white/70 bg-white/[0.72] p-5 shadow-[0_25px_75px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase text-emerald-600">Untuk Siswa</p>
                <h3 className="mt-1 text-2xl font-black text-slate-950">Learning Index Personal</h3>
              </div>
              <div className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-black text-white">1.250 XP</div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-[210px_1fr]">
              <div className="flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-emerald-400 to-yellow-300 p-5">
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-white/[0.92]">
                  <div className="relative h-32 w-32">
                    {["rotate-0", "rotate-[45deg]", "rotate-[90deg]", "rotate-[135deg]"].map((rotation) => (
                      <span key={rotation} className={`absolute left-1/2 top-1/2 h-1 w-28 origin-left rounded-sm bg-slate-200 ${rotation}`} />
                    ))}
                    <div className="absolute inset-5 rounded-full border-4 border-blue-500" />
                    <div className="absolute inset-9 rounded-full border-4 border-emerald-500" />
                    <div className="absolute inset-14 rounded-full bg-red-500" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  ["Pemahaman Konsep", "86%", "from-blue-500 to-cyan-400"],
                  ["Konsistensi Belajar", "92%", "from-emerald-500 to-green-400"],
                  ["Kesiapan Kuis", "74%", "from-red-500 to-yellow-400"],
                ].map(([label, value, color]) => (
                  <div key={label}>
                    <div className="mb-2 flex justify-between text-sm font-black"><span>{label}</span><span>{value}</span></div>
                    <div className="h-3 overflow-hidden rounded-sm bg-slate-200">
                      <div className={`h-full rounded-sm bg-gradient-to-r ${color}`} style={{ width: value }} />
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {["7 Streak", "4 Badge", "12 Kuis"].map((item) => (
                    <div key={item} className="rounded-lg bg-slate-50 p-3 text-center text-sm font-black text-slate-900">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }}
          className="order-1 lg:order-2">
          <p className="text-sm font-black uppercase text-emerald-600">Adaptive learning</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950 sm:text-5xl">Belajar sesuai level pemahamanmu.</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Siswa memulai dari pretest, mendapatkan level pemahaman, lalu mengikuti materi adaptif
            sesuai hasil pretest dengan progress bar, XP, badge, kuis per bab, dan kuis akhir.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function LoginPreview() {
  return (
    <section id="about" className="relative z-10 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }}
          className="rounded-lg border border-white/70 bg-white/70 p-6 shadow-[0_25px_75px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <p className="text-sm font-black uppercase text-red-600">Login</p>
          <h2 className="mt-2 text-4xl font-black text-slate-950">Masuk sesuai peran ke workspace.</h2>
          <p className="mt-4 leading-8 text-slate-600">
            Guru dan Siswa memiliki dashboard masing-masing dengan fokus yang berbeda.
          </p>
          <Link href="/login"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-lg bg-red-600 px-5 text-sm font-black text-white shadow-lg shadow-red-600/20 transition hover:-translate-y-0.5 hover:bg-red-700">
            Buka Halaman Login <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          className="grid gap-4 md:grid-cols-2">
          {dashboardCards.map((card) => (
            <Link key={card.role} href={card.href} className="block">
              <motion.article variants={fadeUp} transition={{ duration: 0.45 }} whileHover={{ y: -6 }}
                className={`h-full rounded-lg border p-5 ${card.accent}`}>
                <p className="text-xs font-black uppercase text-slate-500">{card.role}</p>
                <h3 className="mt-2 text-xl font-black text-slate-950">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{card.text}</p>
                <div className="mt-5 space-y-2">
                  {card.stats.map((stat) => (
                    <div key={stat} className="rounded-lg bg-white/80 px-3 py-2 text-xs font-black text-slate-700">{stat}</div>
                  ))}
                </div>
              </motion.article>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative z-10 px-4 py-16 sm:px-6 lg:px-8">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55 }}
        className="mx-auto max-w-7xl rounded-lg bg-gradient-to-r from-red-600 via-blue-600 to-emerald-500 p-8 text-center text-white shadow-[0_30px_90px_rgba(37,99,235,0.22)] sm:p-12">
        <h2 className="text-4xl font-black sm:text-5xl">Siap memulai pembelajaran yang lebih personal?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/[0.88]">
          EduPath AI menggabungkan Artificial Intelligence, adaptive learning, analytics, dan gamification dalam satu pengalaman belajar modern.
        </p>
        <Link href="/login"
          className="mt-7 inline-flex h-14 items-center justify-center rounded-lg bg-white px-7 text-base font-black text-red-600 shadow-xl transition hover:-translate-y-1">
          Mulai Belajar Sekarang
        </Link>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/60 bg-white/50 px-4 py-8 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm font-semibold text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <LogoMark />
          <span>EduPath AI - Adaptive Learning Platform untuk SMA</span>
        </div>
        <span>2026 EduPath AI. All rights reserved.</span>
      </div>
    </footer>
  );
}

function SparkIcon(props: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" /><path d="M19 16l.8 2.7L22 19.5l-2.2.8L19 23l-.8-2.7-2.2-.8 2.2-.8L19 16Z" /></svg>; }
function BrainIcon(props: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 3a4 4 0 0 0-4 4v1a4 4 0 0 0-2 3.5A4 4 0 0 0 7 15h1v4a3 3 0 0 0 6 0v-4h1a4 4 0 0 0 4-4 4 4 0 0 0-2-3.5V7a4 4 0 0 0-7-2.65A4 4 0 0 0 9 3Z" /><path d="M9 8h.01M15 8h.01M8 14h8M12 14v4" /></svg>; }
function BotIcon(props: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="5" y="8" width="14" height="10" rx="3" /><path d="M12 5v3M8 13h.01M16 13h.01M9 18l-2 3M15 18l2 3" /></svg>; }
function ChartIcon(props: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 19V5" /><path d="M4 19h16" /><path d="M8 16v-5" /><path d="M12 16V8" /><path d="M16 16v-7" /><path d="M8 10l4-3 4 2 4-5" /></svg>; }
function MessageIcon(props: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12a7 7 0 0 1-7 7H8l-5 3 2-5a7 7 0 1 1 16-5Z" /><path d="M8 11h8M8 15h5" /></svg>; }
function TrophyIcon(props: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 21h8M12 17v4" /><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" /><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3" /></svg>; }
function UserIcon(props: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="7" r="4" /></svg>; }
function CheckIcon(props: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 6 9 17l-5-5" /></svg>; }
function GraduationIcon(props: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c3 2 9 2 12 0v-5" /></svg>; }
function BookIcon(props: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v18H7.5A3.5 3.5 0 0 1 4 16.5v-11Z" /><path d="M8 6h8M8 10h8M8 14h5" /></svg>; }
function ClipboardIcon(props: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 4h6l1 2h3v15H5V6h3l1-2Z" /><path d="M9 12l2 2 4-5M9 17h6" /></svg>; }
function ArrowRightIcon(props: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14M13 5l7 7-7 7" /></svg>; }
function RocketIcon(props: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M13 4c3.8.6 6.4 3.2 7 7l-7 7-4-4-4-4 8-6Z" /><path d="M7 14l-3 6 6-3M15 6l3 3" /></svg>; }
function PlayIcon(props: SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M8 5v14l11-7L8 5Z" /></svg>; }

export default function HomePage() {
  return (
    <div className="edupath-shell min-h-screen overflow-x-hidden">
      <BackgroundFX />
      <Header />
      <main>
        <Hero />
        <Workflow />
        <Features />
        <EduPathWorkspace />
        <StudentExperience />
        <LoginPreview />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
