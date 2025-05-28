import express from "express";
import { login, callback } from "../controllers/spotifyController.js";
import SpotifyService from "../services/spotifyService.js";

const router = express.Router();
const spotifyService = new SpotifyService();

router.get("/login", (req, res) => login(req, res, spotifyService));
router.get("/callback", (req, res) => callback(req, res, spotifyService));
// If you implement refresh_token, add it here
// router.get('/refresh_token', (req, res) => refreshToken(req, res, spotifyService));

export default router;
