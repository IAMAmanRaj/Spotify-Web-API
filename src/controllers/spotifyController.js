import { getToken, refreshAccessToken } from "../services/spotifyService.js";

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
      `http://localhost:5173/home?access_token=${accessToken}&refresh_token=${refreshToken}&expires_in=${expiresIn}`
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve access token" });
  }
}

export async function refreshToken(req, res) {
  const { refresh_token } = req.body;
  if (!refresh_token) {
    return res
      .status(400)
      .json({ error: "Missing refresh_token in request body" });
  }
  try {
    const tokenData = await refreshAccessToken(refresh_token);
    res.json(tokenData);
  } catch (error) {
    res.status(500).json({ error: "Failed to refresh access token" });
  }
}
