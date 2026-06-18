import bcrypt from "bcrypt";
import prisma from "../config/database.js";
import { generateToken } from "../middleware/auth.js";
import { sendError, sendSuccess } from "../utils/response.js";
const safeUserSelect = {
    id: true,
    email: true,
    name: true,
    role: true,
    nip: true,
    nis: true,
    kelas: true,
    avatar: true,
    createdAt: true,
    teacher: true,
    student: {
        include: {
            learningProfile: true,
        },
    },
    developer: true,
};
function parseRole(role) {
    const validRoles = ["SISWA", "GURU", "DEVELOPER"];
    if (role && validRoles.includes(role))
        return role;
    return "SISWA";
}
export const register = async (req, res) => {
    try {
        const { email, password, name, role, nip, nis, kelas, avatar, mataPelajaran, tempatLahir, tanggalLahir, jenisKelamin, agama, alamat, noHP, pendidikanTerakhir, perguruanTinggi, programStudi, tahunLulus, nuptk, statusKepegawaian, instansi, } = req.body;
        if (!email || !password || !name) {
            sendError(res, "Email, password, dan nama wajib diisi", 400);
            return;
        }
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            sendError(res, "Email sudah terdaftar", 409);
            return;
        }
        const parsedRole = parseRole(role);
        const hashedPassword = await bcrypt.hash(password, 10);
        const generatedIdentity = `${parsedRole}-${Date.now()}`;
        const teacherNip = nip || generatedIdentity;
        const studentNis = nis || generatedIdentity;
        const userData = {
            email,
            password: hashedPassword,
            name,
            role: parsedRole,
            avatar: avatar || null,
            nip: parsedRole === "GURU" ? teacherNip : null,
            nis: parsedRole === "SISWA" ? studentNis : null,
            kelas: parsedRole === "SISWA" ? kelas || null : null,
            tempatLahir: tempatLahir || null,
            tanggalLahir: tanggalLahir ? new Date(tanggalLahir) : null,
            jenisKelamin: jenisKelamin || null,
            agama: agama || null,
            alamat: alamat || null,
            noHP: noHP || null,
            pendidikanTerakhir: pendidikanTerakhir || null,
            perguruanTinggi: perguruanTinggi || null,
            programStudi: programStudi || null,
            tahunLulus: tahunLulus ? Number(tahunLulus) : null,
            nuptk: nuptk || null,
            statusKepegawaian: statusKepegawaian || null,
            instansi: instansi || null,
        };
        // Add teacher/student/developer relations
        if (parsedRole === "GURU") {
            userData.teacher = {
                create: {
                    nip: teacherNip,
                    mataPelajaran: mataPelajaran || null,
                },
            };
        }
        else if (parsedRole === "SISWA") {
            userData.student = {
                create: {
                    nis: studentNis,
                    kelas: kelas || null,
                    learningProfile: {
                        create: {
                            learningStyle: null,
                            cognitiveLevel: null,
                            pretestScore: null,
                            learningIndex: 0,
                            recommendations: [],
                        },
                    },
                },
            };
        }
        else if (parsedRole === "DEVELOPER") {
            userData.developer = {
                create: {},
            };
        }
        const user = await prisma.user.create({
            data: userData,
            select: safeUserSelect,
        });
        const token = generateToken({ userId: user.id, email: user.email, role: user.role });
        sendSuccess(res, { user, token }, "Registrasi berhasil", 201);
    }
    catch (error) {
        sendError(res, "Gagal melakukan registrasi", 500, error.message);
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            sendError(res, "Email dan password wajib diisi", 400);
            return;
        }
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                teacher: true,
                student: { include: { learningProfile: true } },
                developer: true,
            },
        });
        if (!user) {
            sendError(res, "Email atau password salah", 401);
            return;
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            sendError(res, "Email atau password salah", 401);
            return;
        }
        const { password: _password, ...safeUser } = user;
        const token = generateToken({ userId: user.id, email: user.email, role: user.role });
        sendSuccess(res, { user: safeUser, token }, "Login berhasil");
    }
    catch (error) {
        console.error("LOGIN ERROR:", error);
        sendError(res, "Gagal melakukan login", 500, error instanceof Error ? error.message : String(error));
    }
};
export const me = async (req, res) => {
    try {
        if (!req.user) {
            sendError(res, "Unauthorized", 401);
            return;
        }
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: safeUserSelect,
        });
        if (!user) {
            sendError(res, "User tidak ditemukan", 404);
            return;
        }
        sendSuccess(res, user, "Profil berhasil diambil");
    }
    catch (error) {
        sendError(res, "Gagal mengambil profil", 500, error.message);
    }
};
export default { register, login, me };
//# sourceMappingURL=auth.js.map