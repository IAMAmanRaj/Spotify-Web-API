import express from "express";
import { login, callback } from "../controllers/spotifyController.js";

const router = express.Router();

router.get("/login", (req, res) => login(req, res));
router.get("/callback", (req, res) => callback(req, res));
// If you implement refresh_token, add it here
// router.get('/refresh_token', (req, res) => refreshToken(req, res, spotifyService));

export default router;
