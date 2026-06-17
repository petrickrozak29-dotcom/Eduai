import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/students.js";
import teacherRoutes from "./routes/teachers.js";
import subjectRoutes from "./routes/subjects.js";
import materialRoutes from "./routes/materials.js";
import quizRoutes from "./routes/quizzes.js";
import resultRoutes from "./routes/results.js";
import edupathRoutes from "./routes/edupath.js";
import forumRoutes from "./routes/forums.js";
import eventRoutes from "./routes/events.js";
import analyticsRoutes from "./routes/analytics.js";
import developerRoutes from "./routes/developer.js";
import systemRoutes from "./routes/system.js";
import classRoutes from "./routes/classes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/edupath", edupathRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/developer", developerRoutes);
app.use("/api/system", systemRoutes);
app.use("/api/classes", classRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "EduPath-AI API is running", timestamp: new Date().toISOString() });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal server error", error: err.message });
});

app.listen(PORT, () => {
  console.log(`EduPath-AI Backend running on port ${PORT}`);
});

export default app;
