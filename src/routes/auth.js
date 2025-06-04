import express from "express";
import { callback, refreshToken } from "../controllers/spotifyController.js";

const router = express.Router();

router.get("/callback", (req, res) => callback(req, res));

// POST /auth/refresh_token for refreshing Spotify access token
router.post("/refresh_token", (req, res) => refreshToken(req, res));

export default router;
