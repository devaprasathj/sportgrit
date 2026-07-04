import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

import assessmentRoutes from "./routes/assessmentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import { generateChatResponse } from "./services/aiService.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SportGrit Backend Running");
});

app.use("/api", assessmentRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", leaderboardRoutes);

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required." });
    }

    const reply = await generateChatResponse(message);
    res.json({ reply });
  } catch (error) {
    console.error("Chat error:", error.message);
    res.status(500).json({ reply: "Internal server error." });
  }
});

app.post("/api/feedback", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `SportGrit Feedback from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    res.json({ message: "Feedback sent successfully." });
  } catch (error) {
    console.error("Feedback error:", error.message);
    res.status(500).json({ error: "Failed to send feedback." });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SportGrit Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
