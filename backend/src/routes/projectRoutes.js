import express from "express";
import {
  addProject,
  getMyProjects,
  deleteProject,
} from "../controllers/projectController.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addProject);
router.get("/me", authMiddleware, getMyProjects);
router.delete("/:id", authMiddleware, deleteProject);

export default router;
