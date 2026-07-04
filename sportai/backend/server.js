import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
// Use the built-in fetch available in Node 18+.

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_FALLBACKS = [
  "gemini-3-flash-preview",
  "gemini-1.5-flash",
  "gemini-1.5-pro",
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const shouldRetry = (status) => status === 429 || status === 503;

const fetchGemini = async (message) => {
  let lastError = null;

  for (const model of MODEL_FALLBACKS) {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        // Create AbortController for timeout control
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `You are SportGrit AI Assistant. Help athletes with sports assessments, scoring logic, training improvement, and injury prevention. Be clear and practical. User question: ${message}`,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
              },
            }),
            signal: controller.signal,
          }
        );

        clearTimeout(timeout);

        const data = await response.json();

        if (response.ok) {
          return { data };
        }

        lastError = { status: response.status, data };
        if (!shouldRetry(response.status)) {
          return { error: lastError };
        }

        await sleep(500 * Math.pow(2, attempt));
      } catch (fetchError) {
        console.error(`Fetch attempt ${attempt + 1} failed for model ${model}:`, fetchError.message);
        
        // Handle timeout and network errors
        if (fetchError.name === 'AbortError') {
          lastError = { 
            status: 504, 
            data: { error: { message: "Connection timeout - please check your internet connection" } } 
          };
        } else if (fetchError.cause?.code === 'UND_ERR_CONNECT_TIMEOUT') {
          lastError = { 
            status: 504, 
            data: { error: { message: "Cannot connect to Gemini API - check firewall/proxy settings" } } 
          };
        } else {
          lastError = { 
            status: 503, 
            data: { error: { message: `Network error: ${fetchError.message}` } } 
          };
        }
        
        // Retry on network errors for the last attempt
        if (attempt < 2) {
          await sleep(500 * Math.pow(2, attempt));
        }
      }
    }
  }

  return { error: lastError || { status: 503, data: { error: { message: "Service unavailable" } } } };
};

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Validate Input
    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    // Check for API Key
    if (!GEMINI_API_KEY) {
      console.error("ERROR: GEMINI_API_KEY is missing in .env file");
      return res.status(500).json({ reply: "Server configuration error: Missing API Key." });
    }

    const { data, error } = await fetchGemini(message);

    // Debugging: Log the full response to the console if it fails
    if (error) {
      console.error("Gemini API Error Response:", JSON.stringify(error.data, null, 2));
      return res.status(error.status || 503).json({
        reply: error.data?.error?.message || "The AI service is currently unavailable.",
      });
    }

    // Extracting the text safely
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (reply) {
      res.json({ reply });
    } else {
      // Handle cases like Safety Filters or empty responses
      const finishReason = data?.candidates?.[0]?.finishReason;
      console.warn("No text in response. Finish Reason:", finishReason);
      
      let fallbackMessage = "I'm sorry, I couldn't generate a response. Please try rephrasing.";
      if (finishReason === "SAFETY") fallbackMessage = "I cannot provide a response due to safety filters.";
      
      res.json({ reply: fallbackMessage });
    }
  } catch (err) {
    console.error("Internal Server Error:", err);
    res.status(500).json({ reply: "Internal server error. Please try again later." });
  }
});

// Feedback / Contact Email Endpoint
app.post("/api/feedback", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "sportgritai@gmail.com",
        pass: process.env.EMAIL_PASS, // App-specific password from Google
      },
    });

    const mailOptions = {
      from: `"SportGrit Support" <${process.env.EMAIL_USER || "sportgritai@gmail.com"}>`,
      to: "sportgritai@gmail.com",
      subject: `SportGrit Feedback: ${name}`,
      text: `From: ${name} (${email})\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Feedback sent successfully" });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    res.status(500).json({ error: "Failed to send email. Ensure EMAIL_PASS is set in .env." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ SportGrit Server running on port ${PORT}`);
  console.log(`🔗 API Endpoint: http://localhost:${PORT}/api/chat`);
});