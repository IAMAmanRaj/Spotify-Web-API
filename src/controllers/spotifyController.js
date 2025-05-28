import {
  fetchUserData,
  getAuthUrl,
  getToken,
} from "../services/spotifyService.js";

export async function login(req, res) {
  const authUrl = getAuthUrl();
  res.redirect(authUrl);
}

export async function callback(req, res) {
  const { code } = req.query;
  try {
    const tokenData = await getToken(code);
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = tokenData;

    res.redirect(
      `http://localhost:5173/spotify-auth-success?access_token=${accessToken}&refresh_token=${refreshToken}&expires_in=${expiresIn}`
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve access token" });
  }
}

export async function getUserData(req, res, spotifyService) {
  const { accessToken } = req.body;
  try {
    const userData = await fetchUserData(accessToken);
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
}
