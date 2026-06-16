// Dummy API service for EduPath AI - simulates backend interactions
// Replace with real API calls when backend is ready

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface ApiOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

async function request<T>(endpoint: string, options: ApiOptions = {}): Promise<{ success: boolean; data: T; message?: string }> {
  const token = typeof window !== "undefined" ? localStorage.getItem("edupath_token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: options.method || "GET",
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    return await res.json();
  } catch {
    // Fallback: simulate dummy data when backend is not available
    return simulateRequest<T>(endpoint, options);
  }
}

// Simulated responses for demo mode
const dummyData: Record<string, unknown> = {
  subjects: [
    { id: "s1", name: "Matematika", description: "Aljabar, Geometri, Fungsi", kelas: "X", imageUrl: null },
    { id: "s2", name: "Biologi", description: "Sistem Pernapasan, Ekosistem, Genetika", kelas: "X", imageUrl: null },
    { id: "s3", name: "Fisika", description: "Gerak, Gaya, Energi", kelas: "X", imageUrl: null },
    { id: "s4", name: "Kimia", description: "Struktur Atom, Ikatan Kimia", kelas: "X", imageUrl: null },
    { id: "s5", name: "Bahasa Indonesia", description: "Teks Narasi, Puisi, Artikel", kelas: "X", imageUrl: null },
    { id: "s6", name: "Bahasa Inggris", description: "Grammar, Reading, Writing", kelas: "X", imageUrl: null },
    { id: "s7", name: "Sejarah", description: "Kerajaan, Kolonialisme, Kemerdekaan", kelas: "X", imageUrl: null },
    { id: "s8", name: "Ekonomi", description: "Permintaan, Penawaran, Pasar", kelas: "X", imageUrl: null },
  ],
  siswaDashboard: {
    xp: 1250,
    streak: 7,
    learningIndex: 88,
    quizzesDone: 12,
    badges: ["Pelajar Aktif", "Kuis Perfect", "Streak 7 Hari"],
    recentActivity: [
      { type: "materi", title: "Sistem Pernapasan - Visual", progress: 75, subject: "Biologi" },
      { type: "quiz", title: "Fungsi Kuadrat", score: 82, subject: "Matematika" },
      { type: "materi", title: "Gerak Lurus - Kinestetik", progress: 45, subject: "Fisika" },
    ],
    learningPaths: [
      { id: "lp1", subject: "Matematika", bab: "Fungsi Kuadrat", progress: 82, status: "aktif" },
      { id: "lp2", subject: "Biologi", bab: "Sistem Pernapasan", progress: 75, status: "aktif" },
      { id: "lp3", subject: "Fisika", bab: "Gerak Lurus", progress: 45, status: "aktif" },
      { id: "lp4", subject: "Kimia", bab: "Struktur Atom", progress: 100, status: "selesai" },
    ],
    recommendations: [
      "Ulang materi visual Bab 2",
      "Selesaikan latihan soal cerita",
      "Ikuti forum diskusi kelas X IPA",
    ],
  },
  guruDashboard: {
    activeClasses: 8,
    totalMaterials: 24,
    needReview: 6,
    published: 18,
    recentClasses: [
      { id: "c1", name: "X IPA 1", subject: "Biologi", students: 32, avgIndex: 76, status: "aktif" },
      { id: "c2", name: "X IPA 2", subject: "Matematika", students: 30, avgIndex: 82, status: "aktif" },
      { id: "c3", name: "XI IPA 1", subject: "Fisika", students: 28, avgIndex: 79, status: "review" },
    ],
  },
  developerDashboard: {
    totalTeachers: 128,
    totalStudents: 2400,
    aiUsage: 18000,
    uptime: 99.8,
    avgLearningIndex: 81,
    dailyActive: 2100,
  },
};

function simulateRequest<T>(endpoint: string, options: ApiOptions): Promise<{ success: boolean; data: T; message?: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (endpoint.includes("/auth/login")) {
        const body = options.body as { email?: string; password?: string };
        if (body?.email === "edupathai@gmail.com" && body?.password === "magelangeduai45#") {
          resolve({
            success: true,
            data: {
              user: {
                id: "dev-1",
                email: "edupathai@gmail.com",
                name: "Developer EduPath",
                role: "DEVELOPER",
                avatar: null,
              },
              token: "simulated-jwt-token-developer",
            } as T,
          });
          return;
        }
        // Demo: any login works for siswa/guru
        const isGuru = body?.email?.includes("guru");
        resolve({
          success: true,
          data: {
            user: {
              id: isGuru ? "guru-1" : "siswa-1",
              email: body?.email || "siswa@demo.com",
              name: isGuru ? "Budi Guru" : "Ani Siswa",
              role: isGuru ? "GURU" : "SISWA",
              avatar: null,
              student: isGuru ? null : { id: "s-1", nis: "12345", kelas: "X IPA 1" },
              teacher: isGuru ? { id: "t-1", nip: "67890", mataPelajaran: "Biologi" } : null,
            },
            token: "simulated-jwt-token",
          } as T,
        });
        return;
      }

      if (endpoint.includes("/auth/register")) {
        resolve({
          success: true,
          data: { user: { id: "new-user" }, token: "simulated-jwt-token" } as T,
          message: "Registrasi berhasil",
        });
        return;
      }

      if (endpoint.includes("/auth/me")) {
        resolve({
          success: true,
          data: dummyData.siswaDashboard as T,
        });
        return;
      }

  // Route-based dummy responses
  if (endpoint.includes("/students/dashboard")) {
    resolve({ success: true, data: dummyData.siswaDashboard as T });
    return;
  }
  if (endpoint.includes("/teachers/dashboard")) {
    resolve({ success: true, data: dummyData.guruDashboard as T });
    return;
  }
  if (endpoint.includes("/developer/dashboard")) {
    resolve({ success: true, data: dummyData.developerDashboard as T });
    return;
  }
  if (endpoint.includes("/subjects")) {
    resolve({ success: true, data: dummyData.subjects as T });
    return;
  }
  if (endpoint.includes("/edupath/learning-path")) {
    const sd = dummyData.siswaDashboard as { learningPaths?: Array<{subject: string; bab: string; progress: number; status: string; id: string}> };
    const paths = sd?.learningPaths || [];
    resolve({
      success: true,
      data: {
        studentId: "s-1",
        profile: {
          learningStyle: "visual",
          cognitiveLevel: "sedang",
          learningIndex: 88,
          pretestScore: 75,
          recommendations: ["Mulai dari materi adaptif pertama", "Kerjakan kuis per bab", "Gunakan AI Assistant"],
        },
        subjects: paths.map((lp: { subject: string; bab: string; progress: number; status: string; id: string }) => ({
          id: lp.id,
          name: lp.subject,
          bab: lp.bab,
          progress: lp.progress,
          status: lp.status,
          chapters: [
            { id: "ch1", title: "Pretest", order: 1, materials: [], quizzes: [] },
            { id: "ch2", title: "Materi Visual", order: 2, materials: [], quizzes: [] },
            { id: "ch3", title: "Materi Auditori", order: 3, materials: [], quizzes: [] },
            { id: "ch4", title: "Materi Kinestetik", order: 4, materials: [], quizzes: [] },
            { id: "ch5", title: "Kuis Bab", order: 5, materials: [], quizzes: [] },
          ],
        })),
        recentResults: [],
        flow: ["Pilih Mata Pelajaran", "Pretest", "Profil Belajar", "Materi Adaptif", "Kuis Per Bab", "Kuis Akhir", "Learning Index"],
      } as T,
    });
    return;
  }
  if (endpoint.includes("/edupath/generate")) {
    resolve({ success: true, data: { id: "gen-1", message: "Paket pembelajaran berhasil digenerate" } as T });
    return;
  }
  if (endpoint.includes("/edupath/pretest-profile")) {
    resolve({ success: true, data: { learningIndex: 82, learningStyle: "visual" } as T });
    return;
  }
  if (endpoint.includes("/edupath/assistant")) {
    resolve({
      success: true,
      data: {
        mode: "chat",
        answer: "EduPath AI: Berdasarkan pertanyaanmu, konsep inti yang perlu dipahami adalah...",
        flashcards: [
          { front: "Konsep inti", back: "Ide utama yang harus dipahami sebelum latihan." },
          { front: "Latihan adaptif", back: "Soal disesuaikan dengan profil belajar siswa." },
        ],
      } as T,
    });
    return;
  }
  if (endpoint.includes("/students") && options.method === "GET" && !endpoint.includes("dashboard")) {
    resolve({ success: true, data: getMockStudents() as T });
    return;
  }
  if (endpoint.includes("/teachers") && options.method === "GET" && !endpoint.includes("dashboard")) {
    resolve({ success: true, data: getMockTeachers() as T });
    return;
  }
  if (endpoint.includes("/materials")) {
    resolve({ success: true, data: getMockMaterials() as T });
    return;
  }
  if (endpoint.includes("/quizzes")) {
    resolve({ success: true, data: getMockQuizzes() as T });
    return;
  }
  if (endpoint.includes("/events")) {
    resolve({ success: true, data: getMockEvents() as T });
    return;
  }
  if (endpoint.includes("/results")) {
    resolve({ success: true, data: [] as T });
    return;
  }

  resolve({ success: true, data: {} as T });
    }, 300);
  });
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) => request<T>(endpoint, { method: "POST", body }),
  put: <T>(endpoint: string, body: unknown) => request<T>(endpoint, { method: "PUT", body }),
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: "DELETE" }),
};

// Mock data helpers
export function getMockStudents() {
  return [
    { id: "s1", name: "Ani Putri", nis: "12345", kelas: "X IPA 1", email: "ani@demo.com", xp: 1250, learningIndex: 88, streak: 7 },
    { id: "s2", name: "Budi Santoso", nis: "12346", kelas: "X IPA 1", email: "budi@demo.com", xp: 980, learningIndex: 72, streak: 4 },
    { id: "s3", name: "Citra Dewi", nis: "12347", kelas: "X IPA 1", email: "citra@demo.com", xp: 1520, learningIndex: 94, streak: 12 },
    { id: "s4", name: "Dimas Pratama", nis: "12348", kelas: "X IPA 2", email: "dimas@demo.com", xp: 720, learningIndex: 65, streak: 2 },
    { id: "s5", name: "Eka Wijaya", nis: "12349", kelas: "X IPA 2", email: "eka@demo.com", xp: 1100, learningIndex: 81, streak: 6 },
    { id: "s6", name: "Fani Rahma", nis: "12350", kelas: "XI IPA 1", email: "fani@demo.com", xp: 2000, learningIndex: 96, streak: 30 },
  ];
}

export function getMockTeachers() {
  return [
    { id: "t1", name: "Budi Guru", nip: "19800101", mataPelajaran: "Biologi", email: "budi.guru@demo.com", kelasCount: 4, studentsCount: 120 },
    { id: "t2", name: "Siti Aisyah", nip: "19800102", mataPelajaran: "Matematika", email: "siti@demo.com", kelasCount: 3, studentsCount: 90 },
    { id: "t3", name: "Ahmad Rizal", nip: "19800103", mataPelajaran: "Fisika", email: "ahmad@demo.com", kelasCount: 3, studentsCount: 85 },
  ];
}

export function getMockClasses() {
  return [
    { id: "c1", name: "X IPA 1", subject: "Biologi", teacher: "Budi Guru", students: 32, avgIndex: 76, status: "aktif" },
    { id: "c2", name: "X IPA 2", subject: "Matematika", teacher: "Siti Aisyah", students: 30, avgIndex: 82, status: "aktif" },
    { id: "c3", name: "XI IPA 1", subject: "Fisika", teacher: "Ahmad Rizal", students: 28, avgIndex: 79, status: "review" },
    { id: "c4", name: "XI IPA 2", subject: "Biologi", teacher: "Budi Guru", students: 29, avgIndex: 84, status: "aktif" },
  ];
}

export function getMockMaterials() {
  return [
    { id: "m1", title: "Sistem Pernapasan - Visual", subject: "Biologi", type: "visual", status: "published", chapters: "Bab 2" },
    { id: "m2", title: "Sistem Pernapasan - Auditori", subject: "Biologi", type: "auditori", status: "draft", chapters: "Bab 2" },
    { id: "m3", title: "Sistem Pernapasan - Kinestetik", subject: "Biologi", type: "kinestetik", status: "review", chapters: "Bab 2" },
    { id: "m4", title: "Fungsi Kuadrat - Visual", subject: "Matematika", type: "visual", status: "published", chapters: "Bab 3" },
    { id: "m5", title: "Gerak Lurus - Kinestetik", subject: "Fisika", type: "kinestetik", status: "draft", chapters: "Bab 1" },
  ];
}

export function getMockQuizzes() {
  return [
    { id: "q1", title: "Pretest Biologi", subject: "Biologi", type: "pretest", questions: 10, status: "published" },
    { id: "q2", title: "Kuis Bab 2 - Pernapasan", subject: "Biologi", type: "bab", questions: 15, status: "published" },
    { id: "q3", title: "Kuis Akhir - Biologi", subject: "Biologi", type: "final", questions: 25, status: "draft" },
    { id: "q4", title: "Pretest Matematika", subject: "Matematika", type: "pretest", questions: 10, status: "published" },
    { id: "q5", title: "Kuis Bab 3 - Fungsi Kuadrat", subject: "Matematika", type: "bab", questions: 12, status: "review" },
  ];
}

export function getMockEvents() {
  return [
    { id: "e1", title: "Webinar: Belajar AI untuk SMA", date: "2026-07-15", type: "academic", desc: "Pengenalan AI dalam pembelajaran" },
    { id: "e2", title: "Kompetisi Sains Nasional", date: "2026-08-20", type: "academic", desc: "Kompetisi sains tingkat nasional" },
    { id: "e3", title: "Workshop Robotik", date: "2026-09-10", type: "extracurricular", desc: "Workshop robotik untuk pemula" },
  ];
}

export function getMockLearningPaths() {
  return [
    {
      id: "lp1",
      subject: "Biologi",
      icon: "🧬",
      bab: "Sistem Pernapasan",
      progress: 75,
      status: "aktif",
      stages: [
        { name: "Pretest", done: true, score: 70 },
        { name: "Materi Visual", done: true, score: null },
        { name: "Materi Auditori", done: true, score: null },
        { name: "Materi Kinestetik", done: false, score: null },
        { name: "Kuis Bab", done: false, score: null },
      ],
    },
    {
      id: "lp2",
      subject: "Matematika",
      icon: "📐",
      bab: "Fungsi Kuadrat",
      progress: 82,
      status: "aktif",
      stages: [
        { name: "Pretest", done: true, score: 75 },
        { name: "Materi Visual", done: true, score: null },
        { name: "Materi Auditori", done: true, score: null },
        { name: "Materi Kinestetik", done: true, score: null },
        { name: "Kuis Bab", done: false, score: null },
      ],
    },
    {
      id: "lp3",
      subject: "Fisika",
      icon: "⚡",
      bab: "Gerak Lurus",
      progress: 45,
      status: "aktif",
      stages: [
        { name: "Pretest", done: true, score: 65 },
        { name: "Materi Visual", done: true, score: null },
        { name: "Materi Auditori", done: false, score: null },
        { name: "Materi Kinestetik", done: false, score: null },
        { name: "Kuis Bab", done: false, score: null },
      ],
    },
    {
      id: "lp4",
      subject: "Kimia",
      icon: "🧪",
      bab: "Struktur Atom",
      progress: 100,
      status: "selesai",
      stages: [
        { name: "Pretest", done: true, score: 80 },
        { name: "Materi Visual", done: true, score: null },
        { name: "Materi Auditori", done: true, score: null },
        { name: "Materi Kinestetik", done: true, score: null },
        { name: "Kuis Bab", done: true, score: 92 },
      ],
    },
  ];
}
