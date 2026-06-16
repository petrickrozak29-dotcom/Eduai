import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "edupath-ai-secret-key-2026";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
export function generateToken(payload) {
    const options = { expiresIn: JWT_EXPIRES_IN };
    return jwt.sign(payload, JWT_SECRET, options);
}
export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}
export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ success: false, message: "Token tidak ditemukan" });
        return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ success: false, message: "Token tidak valid" });
        return;
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }
    catch {
        res.status(401).json({ success: false, message: "Token tidak valid atau kadaluarsa" });
    }
}
export function authorize(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }
        if (!roles.includes(req.user.role)) {
            res.status(403).json({ success: false, message: "Forbidden: Tidak memiliki akses" });
            return;
        }
        next();
    };
}
//# sourceMappingURL=auth.js.map