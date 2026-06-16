import prisma from "../config/database.js";
import { sendError, sendSuccess } from "../utils/response.js";
function buildAdaptiveMaterial(reference, subjectName) {
    const base = reference || `Materi inti ${subjectName}`;
    return {
        visual: `Materi visual: peta konsep, diagram langkah, dan ilustrasi untuk topik "${base}".`,
        auditori: `Materi auditori: naskah penjelasan naratif, analogi sederhana, dan rangkuman lisan untuk "${base}".`,
        kinestetik: `Materi kinestetik: aktivitas praktik, eksperimen mini, dan tantangan belajar aktif untuk "${base}".`,
        summary: `EduPath AI menyusun ${subjectName} menjadi jalur belajar adaptif berbasis pretest dan profil belajar siswa.`,
    };
}
function buildQuestions(subjectName) {
    return [
        {
            text: `Apa konsep utama yang perlu dipahami dari materi ${subjectName}?`,
            options: { A: "Menghafal istilah saja", B: "Memahami konsep dan penerapannya", C: "Mengabaikan contoh", D: "Melewati latihan" },
            correctAnswer: "B",
            points: 10,
        },
        {
            text: "Strategi belajar mana yang paling adaptif?",
            options: { A: "Satu materi untuk semua", B: "Materi sesuai profil belajar", C: "Tanpa evaluasi", D: "Hanya membaca cepat" },
            correctAnswer: "B",
            points: 10,
        },
    ];
}
export const generateLearningPackage = async (req, res) => {
    try {
        const { phase, subjectId, subjectName, referenceMaterial, title } = req.body;
        if (!subjectId && !subjectName) {
            sendError(res, "subjectId atau subjectName wajib diisi", 400);
            return;
        }
        const teacher = req.user
            ? await prisma.teacher.findUnique({ where: { userId: req.user.userId } })
            : null;
        const subject = subjectId
            ? await prisma.subject.findUnique({ where: { id: subjectId } })
            : await prisma.subject.create({
                data: {
                    name: subjectName,
                    description: `Mata pelajaran dibuat dari EduPath AI (${phase || "Fase E/F"})`,
                    kelas: phase || null,
                    teacherId: teacher?.id || null,
                },
            });
        if (!subject) {
            sendError(res, "Mata pelajaran tidak ditemukan", 404);
            return;
        }
        const chapterCount = await prisma.chapter.count({ where: { subjectId: subject.id } });
        const adaptive = buildAdaptiveMaterial(referenceMaterial, subject.name);
        const chapter = await prisma.chapter.create({
            data: {
                subjectId: subject.id,
                title: title || `Bab Adaptif ${chapterCount + 1}`,
                order: chapterCount + 1,
            },
        });
        const material = await prisma.material.create({
            data: {
                subjectId: subject.id,
                chapterId: chapter.id,
                title: title || `Materi Adaptif ${subject.name}`,
                content: adaptive.summary,
                contentType: "adaptive",
                profilA: adaptive.visual,
                profilB: adaptive.auditori,
                profilC: adaptive.kinestetik,
            },
        });
        const quizPerBab = await prisma.quiz.create({
            data: {
                subjectId: subject.id,
                chapterId: chapter.id,
                title: `Kuis Per Bab - ${chapter.title}`,
                type: "bab",
                questions: { create: buildQuestions(subject.name) },
            },
            include: { questions: true },
        });
        const finalQuiz = await prisma.quiz.create({
            data: {
                subjectId: subject.id,
                chapterId: chapter.id,
                title: `Kuis Akhir - ${subject.name}`,
                type: "final",
                questions: { create: buildQuestions(subject.name) },
            },
            include: { questions: true },
        });
        sendSuccess(res, {
            phase,
            subject,
            chapter,
            material,
            outputs: adaptive,
            quizzes: { perBab: quizPerBab, final: finalQuiz },
        }, "Paket EduPath AI berhasil digenerate", 201);
    }
    catch (error) {
        sendError(res, "Gagal generate paket EduPath AI", 500, error.message);
    }
};
export const submitPretestProfile = async (req, res) => {
    try {
        const { studentId, pretestScore, learningStyle, cognitiveLevel, recommendations } = req.body;
        const student = studentId
            ? await prisma.student.findUnique({ where: { id: studentId } })
            : req.user
                ? await prisma.student.findUnique({ where: { userId: req.user.userId } })
                : null;
        if (!student) {
            sendError(res, "Profil siswa tidak ditemukan", 404);
            return;
        }
        const score = Number(pretestScore ?? 0);
        const inferredLevel = cognitiveLevel || (score >= 80 ? "tinggi" : score >= 60 ? "sedang" : "rendah");
        const inferredStyle = learningStyle || (score >= 75 ? "visual" : score >= 50 ? "auditori" : "kinestetik");
        const learningIndex = Math.min(100, Math.max(0, score * 0.7 + (inferredLevel === "tinggi" ? 20 : inferredLevel === "sedang" ? 12 : 6)));
        const profile = await prisma.learningProfile.upsert({
            where: { studentId: student.id },
            create: {
                studentId: student.id,
                pretestScore: score,
                learningStyle: inferredStyle,
                cognitiveLevel: inferredLevel,
                learningIndex,
                recommendations: recommendations || [
                    "Mulai dari materi adaptif pertama",
                    "Kerjakan kuis per bab setelah membaca ringkasan",
                    "Gunakan AI Assistant untuk konsep yang belum jelas",
                ],
            },
            update: {
                pretestScore: score,
                learningStyle: inferredStyle,
                cognitiveLevel: inferredLevel,
                learningIndex,
                recommendations: recommendations || undefined,
            },
        });
        sendSuccess(res, profile, "Profil belajar berhasil diperbarui");
    }
    catch (error) {
        sendError(res, "Gagal memperbarui profil belajar", 500, error.message);
    }
};
export const getLearningPath = async (req, res) => {
    try {
        const { studentId } = req.query;
        const student = studentId
            ? await prisma.student.findUnique({ where: { id: String(studentId) } })
            : req.user
                ? await prisma.student.findUnique({ where: { userId: req.user.userId } })
                : null;
        if (!student) {
            sendError(res, "Profil siswa tidak ditemukan", 404);
            return;
        }
        const [profile, subjects, recentResults] = await Promise.all([
            prisma.learningProfile.findUnique({ where: { studentId: student.id } }),
            prisma.subject.findMany({
                include: {
                    chapters: {
                        orderBy: { order: "asc" },
                        include: { materials: true, quizzes: true },
                    },
                },
                take: 6,
                orderBy: { createdAt: "desc" },
            }),
            prisma.result.findMany({
                where: { studentId: student.id },
                include: { quiz: { select: { title: true, type: true } } },
                orderBy: { createdAt: "desc" },
                take: 5,
            }),
        ]);
        sendSuccess(res, {
            studentId: student.id,
            profile,
            subjects,
            recentResults,
            flow: ["Pilih Mata Pelajaran", "Pretest", "Profil Belajar", "Materi Adaptif", "Kuis Per Bab", "Kuis Akhir", "Learning Index"],
        }, "Learning path berhasil diambil");
    }
    catch (error) {
        sendError(res, "Gagal mengambil learning path", 500, error.message);
    }
};
export const askAssistant = async (req, res) => {
    try {
        const { prompt, mode } = req.body;
        if (!prompt) {
            sendError(res, "Prompt wajib diisi", 400);
            return;
        }
        const answer = `EduPath AI menjelaskan: ${prompt}. Mulai dari konsep inti, lanjutkan contoh sederhana, lalu kerjakan latihan singkat agar pemahaman terukur.`;
        sendSuccess(res, {
            mode: mode || "chat",
            answer,
            flashcards: [
                { front: "Konsep inti", back: "Ide utama yang harus dipahami sebelum latihan." },
                { front: "Latihan adaptif", back: "Soal disesuaikan dengan profil belajar siswa." },
            ],
            suggestedQuiz: buildQuestions("materi yang ditanyakan"),
        }, "AI Assistant berhasil membuat respons");
    }
    catch (error) {
        sendError(res, "Gagal memproses AI Assistant", 500, error.message);
    }
};
export default { generateLearningPackage, submitPretestProfile, getLearningPath, askAssistant };
//# sourceMappingURL=edupath.js.map