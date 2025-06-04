# Spotify OAuth Backend

A minimal Node.js and Express backend that securely handles Spotify OAuth token exchanges and refreshes.
This service provides two endpoints for login and token refresh, enabling frontend applications to authenticate users and obtain access tokens for the Spotify Web API and Web Playback SDK—while keeping your Spotify client secret safe on the server.

## Project Structure

```
spotify-backend
├── src
│   ├── app.js                # Entry point of the application
│   ├── routes
│   │   └── auth.js           # Authentication routes for OAuth login and token management
│   ├── controllers
│   │   └── spotifyController.js # Handles requests related to Spotify API interactions
│   ├── services
│   │   └── spotifyService.js  # Manages Spotify API requests and token management
├── package.json               # npm configuration file
└── README.md                  # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd spotify-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Spotify API credentials:**
   - Create a `.env` file in the root directory and add your Spotify API credentials:
     ```
     SPOTIFY_CLIENT_ID=<your-client-id>
     SPOTIFY_CLIENT_SECRET=<your-client-secret>
     SPOTIFY_REDIRECT_URI=<your-redirect-uri>
     ```

4. **Run the application:**
   ```bash
   npm start
   ```

## Usage

### OAuth Authentication Flow

This backend implements the secure [Spotify Authorization Code Flow](https://developer.spotify.com/documentation/web-api/tutorials/code-flow) for OAuth. Your client secret remains confidential and is never exposed to the frontend.

#### 1. Backend Handles the Callback

After the user logs in and authorizes your app on Spotify, Spotify redirects the user’s browser to your backend’s callback route, for example:

```
GET /auth/callback?code=AUTHORIZATION_CODE
```

#### 2. Backend Exchanges Code for Tokens (Server-to-Server)

Your backend exchanges this code for access and refresh tokens by making a server-to-server `POST` request:

```js
const response = await fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
  },
  body: new URLSearchParams({
    grant_type: "authorization_code",
    code: codeFromQuery,
    redirect_uri: backendCallbackUrl,
  }),
});
const tokenData = await response.json();
```

- The `POST` body must include:
  - `grant_type=authorization_code`
  - `code=AUTHORIZATION_CODE` (from query param)
  - `redirect_uri=YOUR_BACKEND_CALLBACK` (must match exactly what you registered with Spotify)
- The `POST` headers must include:
  - `Authorization: Basic BASE64(CLIENT_ID:CLIENT_SECRET)`
  - `Content-Type: application/x-www-form-urlencoded`

On success, Spotify responds with:
- `access_token`
- `refresh_token`
- `expires_in`

#### 3. Backend Redirects User to Frontend With Tokens

After obtaining tokens, your backend redirects the browser to your frontend:

```
/home?access_token=...&refresh_token=...
```

The frontend extracts and securely stores these tokens for use with the Spotify API.

### Security Considerations

- Your **Spotify client secret is never exposed to the frontend or any user.**
- The **token exchange**—which requires your confidential credentials—**occurs exclusively on the backend** (server-to-server) over HTTPS.
- The frontend only receives temporary codes and tokens, never confidential credentials.
- This is the recommended and most secure approach for OAuth integrations with Spotify or any major provider.

## License

This project is licensed under the MIT License.
