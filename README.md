# Spotify Integration Backend

This project is a backend application built with Node.js and Express for integrating with the Spotify API. It includes OAuth login functionality and token management to allow users to authenticate and interact with their Spotify accounts.

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
│   ├── middleware
│   │   └── authMiddleware.js   # Middleware for authentication checks
│   └── config
│       └── spotifyConfig.js    # Configuration settings for Spotify API
├── package.json               # npm configuration file
└── README.md                  # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd spotify-backend
   ```

2. **Install dependencies:**
   ```
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
   ```
   npm start
   ```

## Usage

- Navigate to `http://localhost:3000/auth/login` to initiate the OAuth login process.
- After logging in, you can access protected routes to interact with the Spotify API.

## License

This project is licensed under the MIT License.