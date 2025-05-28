export async function login(req, res, spotifyService) {
  const authUrl = spotifyService.getAuthUrl();
  res.redirect(authUrl);
}

export async function callback(req, res, spotifyService) {
  const { code } = req.query;
  try {
    const tokenData = await spotifyService.getToken(code);
    res.json(tokenData);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve access token" });
  }
}

export async function getUserData(req, res, spotifyService) {
  const { accessToken } = req.body;
  try {
    const userData = await spotifyService.fetchUserData(accessToken);
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
}
