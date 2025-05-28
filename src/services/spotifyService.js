class SpotifyService {
  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID;
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    this.redirectUri = process.env.SPOTIFY_REDIRECT_URI;
    this.token = null;
  }

  async getAccessToken(code) {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
            "base64"
          ),
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: this.redirectUri,
      }),
    });

    const data = await response.json();
    this.token = data.access_token;
    return data;
  }

  async refreshAccessToken(refreshToken) {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
            "base64"
          ),
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    const data = await response.json();
    this.token = data.access_token;
    return data;
  }

  async fetchUserData() {
    const response = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    return await response.json();
  }
}

module.exports = SpotifyService;
