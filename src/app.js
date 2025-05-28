const express = require("express");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.VERCEL) {
    // Trust proxy for secure cookies and redirects on Vercel
    app.set('trust proxy', 1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.VERCEL ? true : false,
        sameSite: process.env.VERCEL ? 'none' : 'lax',
    },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Spotify Integration API");
});

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;
