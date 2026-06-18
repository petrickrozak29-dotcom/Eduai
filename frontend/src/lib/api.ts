// API service for EduPath AI - real backend connection
// Falls back to empty responses when backend is unavailable

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
    return { success: false, data: {} as T, message: "Gagal terhubung ke server" };
  }
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) => request<T>(endpoint, { method: "POST", body }),
  put: <T>(endpoint: string, body: unknown) => request<T>(endpoint, { method: "PUT", body }),
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: "DELETE" }),
};

export interface ApiSubject {
  id: string;
  name: string;
  category?: string;
  specialization?: string | null;
}

export interface ApiClass {
  id: string;
  name: string;
  classCode: string;
  phase: "E" | "F";
  classLevel?: string | null;
  specialization?: string | null;
  category: string;
  description?: string | null;
  isActive: boolean;
  subject?: ApiSubject | null;
  teacher?: {
    id: string;
    user?: { name: string; email?: string };
  };
  enrollments?: Array<{
    id: string;
    pretestScore?: number | null;
    pretestLevel?: string | null;
    learningIndex?: number | null;
    student?: { id: string; nis?: string; user?: { name: string; email: string } };
  }>;
  materials?: Array<{ id: string; material?: { id: string; title: string; level?: string | null } }>;
  _count?: {
    enrollments?: number;
    materials?: number;
    forums?: number;
  };
}

export interface ApiClassEnrollment {
  id: string;
  pretestScore?: number | null;
  pretestLevel?: string | null;
  learningIndex?: number | null;
  kelas: ApiClass;
}

export interface ApiUser {
  id: string;
  email: string;
  name: string;
  role: "SISWA" | "GURU" | "DEVELOPER";
  kelas?: string | null;
  nip?: string | null;
  nis?: string | null;
  createdAt?: string;
  teacher?: { id?: string; mataPelajaran?: string | null } | null;
  student?: { id?: string; kelas?: string | null } | null;
  developer?: { id?: string } | null;
}

export interface ApiMaterial {
  id: string;
  title: string;
  content?: string;
  contentType?: string;
  isPublished?: boolean;
  subjectId?: string;
  subject?: { id: string; name: string; kelas?: string | null; teacher?: { user?: { name: string } } | null };
  chapter?: { id: string; title: string; order?: number } | null;
  createdAt?: string;
}

export interface ApiQuiz {
  id: string;
  title: string;
  type?: string;
  subjectId?: string;
  subject?: { id: string; name: string; teacher?: { user?: { name: string } } | null };
  _count?: { questions?: number };
  questions?: Array<{ id?: string; text: string; options?: Record<string, string>; correctAnswer?: string; points?: number }>;
  createdAt?: string;
}

export interface ApiForum {
  id: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  user?: { id: string; name: string; role: string; avatar?: string | null };
  subject?: { id: string; name: string } | null;
  _count?: { replies?: number };
}

export interface ApiEvent {
  id: string;
  title: string;
  description?: string | null;
  date: string;
  type?: string;
  category?: string | null;
  penyelenggara?: string | null;
  photoUrl?: string | null;
  link?: string | null;
  user?: { id: string; name: string; role: string };
}

export interface AnalyticsOverviewData {
  totals: {
    guru: number;
    siswa: number;
    mataPelajaran: number;
    kelas: number;
    materi: number;
    kuis: number;
  };
  aiUsage: {
    generatedMaterials: number;
    generatedQuizzes: number;
    assistantSessions: number;
  };
  learningAnalytics: {
    averageLearningIndex: number;
    recentResults: Array<unknown>;
  };
}

export interface DeveloperDashboardData {
  usersByRole: Array<{ role: "SISWA" | "GURU" | "DEVELOPER"; _count: { role: number } }>;
  totals?: {
    guru: number;
    siswa: number;
    developer: number;
    classes: number;
    subjects: number;
    materials: number;
    quizzes: number;
  };
  platform: {
    totalClasses?: number;
    totalSubjects: number;
    totalMaterials: number;
    totalQuizzes: number;
    uptime: string;
    aiQueue: string;
  };
  monitoring: {
    apiStatus: string;
    aiUsage: number;
    dailyActivity: number;
  };
  recentUsers?: ApiUser[];
  logs?: Array<{
    id: string;
    action: string;
    createdAt: string;
    user?: { name: string; role: string } | null;
  }>;
}

// Student type
export interface MockStudent {
  id: string; name: string; nis: string; kelas: string; email: string;
  xp: number; learningIndex: number; streak: number;
}
export interface MockTeacher {
  id: string; name: string; nip: string; mataPelajaran: string; email: string;
  kelasCount: number; studentsCount: number;
}
export interface MockClass {
  id: string; name: string; subject: string; teacher: string;
  students: number; avgIndex: number; status: string;
}
export interface MockMaterial {
  id: string; title: string; subject: string; type: string;
  status: string; chapters: string;
}
export interface MockQuiz {
  id: string; title: string; subject: string; type: string;
  questions: number; status: string;
}
export interface MockEvent {
  id: string; title: string; date: string; type: string; desc: string;
}
export interface MockLearningPath {
  id: string; subject: string; icon: string; bab: string;
  progress: number; status: string;
  stages: Array<{ name: string; done: boolean; score: number | null }>;
}

// Empty fallback data - semua kosong untuk real-time API integration
export function getMockStudents(): MockStudent[] {
  return [];
}
export function getMockTeachers(): MockTeacher[] {
  return [];
}
export function getMockClasses(): MockClass[] {
  return [];
}
export function getMockMaterials(): MockMaterial[] {
  return [];
}
export function getMockQuizzes(): MockQuiz[] {
  return [];
}
export function getMockEvents(): MockEvent[] {
  return [];
}
export function getMockLearningPaths(): MockLearningPath[] {
  return [];
}
