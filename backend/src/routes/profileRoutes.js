import express from "express";
import { createProfile, getMyProfile } from "../controllers/profileController.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProfile);
router.get("/me", authMiddleware, getMyProfile);

export default router;
