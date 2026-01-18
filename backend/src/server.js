import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"; // ✅ MUST EXIST
import authMiddleware from "./middleware/authmiddleware.js";
import profileRoutes from "./routes/profileRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ TEST ROUTE (keep this)
app.get("/", (req, res) => {
  res.send("API is running");
});

// ✅ AUTH ROUTES 
app.use("/api/auth", authRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Access granted", userId: req.userId });
});

app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/public", publicRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

