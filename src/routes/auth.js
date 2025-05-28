const express = require("express");
const router = express.Router();
const SpotifyController = require("../controllers/spotifyController");
const SpotifyService = require("../services/spotifyService");

const spotifyService = new SpotifyService();
const spotifyController = new SpotifyController(spotifyService);

router.get("/login", spotifyController.login.bind(spotifyController));
router.get("/callback", spotifyController.callback.bind(spotifyController));
// Remove or comment out refresh_token route if not implemented
// router.get('/refresh_token', spotifyController.refreshToken.bind(spotifyController));

module.exports = router;
