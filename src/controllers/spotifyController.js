class SpotifyController {
    constructor(spotifyService) {
        this.spotifyService = spotifyService;
    }

    async login(req, res) {
        const authUrl = this.spotifyService.getAuthUrl();
        res.redirect(authUrl);
    }

    async callback(req, res) {
        const { code } = req.query;
        try {
            const tokenData = await this.spotifyService.getToken(code);
            res.json(tokenData);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve access token' });
        }
    }

    async getUserData(req, res) {
        const { accessToken } = req.body;
        try {
            const userData = await this.spotifyService.fetchUserData(accessToken);
            res.json(userData);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user data' });
        }
    }
}

module.exports = SpotifyController;