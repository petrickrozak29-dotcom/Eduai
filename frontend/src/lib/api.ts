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
  teacher?: { mataPelajaran?: string | null } | null;
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
