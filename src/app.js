import "dotenv/config";
import express from "express";
import session from "express-session";
import passport from "passport";
import authRoutes from "./routes/auth.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://staging-irys.skdiv.com"],
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

export default app;
