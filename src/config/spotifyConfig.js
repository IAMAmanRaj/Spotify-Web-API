export default {
  clientId: process.env.SPOTIFY_CLIENT_ID || "your_client_id",
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "your_client_secret",
  redirectUri:
    process.env.SPOTIFY_REDIRECT_URI || "http://localhost:3000/auth/callback",
  scopes: [
    "user-read-private",
    "user-read-email",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-library-read",
    "user-library-modify",
    "user-top-read",
    "user-read-playback-state",
    "user-modify-playback-state",
  ],
};
