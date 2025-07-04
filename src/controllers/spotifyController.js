import { getToken, refreshAccessToken } from "../services/spotifyService.js";

export async function callback(req, res) {
  const { code, state } = req.query; // state will be the original route, e.g. "/home" or "/newSession"
  try {
    const tokenData = await getToken(code);
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = tokenData;

    // Default to /home if state is not present or invalid
    const redirectPath = state && (state === "/home" || state === "/newSession") ? state : "/home";

    res.redirect(
      `https://staging-irys.skdiv.com${redirectPath}?access_token=${accessToken}&refresh_token=${refreshToken}&expires_in=${expiresIn}`
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
