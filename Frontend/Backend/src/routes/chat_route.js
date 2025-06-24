import { protectRoute } from "../middleware/auth.midddleware.js";
import express from "express";
import { getStreamToken } from "../controllers/chat_controller.js";

const router = express.Router();

router.get("/token", protectRoute, getStreamToken);

export default router;
