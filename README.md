# ⚡ SportGrit
### AI-Powered Sports Talent Assessment Platform

<img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80&fit=crop" alt="SportGrit Banner" width="100%" style="border-radius:12px;" />

<br/><br/>

[![ReactJS](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini%202.5%20Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-orange?style=flat-square)
![Hackathon](https://img.shields.io/badge/Built%20For-Hackathon-purple?style=flat-square)

</div>

---

## 📌 Project Overview

**SportGrit** is an intelligent, full-stack sports analytics platform designed to identify, evaluate, and nurture athletic talent through the power of artificial intelligence. By combining video analysis, pose estimation, profile-based assessments, and Gemini AI-driven insights, SportGrit delivers a holistic performance evaluation experience for athletes, coaches, and sports scouts.

<div align="center">
<img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80&fit=crop" alt="Athlete Performance" width="80%" style="border-radius:10px;" />
<br/><sub><i>Data-driven performance evaluation for every athlete</i></sub>
</div>

---

## 🚨 Problem Statement

Talent identification in sports remains heavily subjective. Traditional evaluation systems rely on manual observation, lack standardized benchmarks, offer no continuous tracking, and provide no personalized feedback — leaving talented athletes unnoticed and coaches working without data.

---

## 💡 Solution Overview

SportGrit delivers an end-to-end AI-powered talent assessment pipeline:

- **Video-Based Analysis** — MoveNet/MediaPipe extracts joint angles and movement patterns from uploaded videos
- **Profile-Based Assessment** — Structured forms capture physical attributes and sport-specific metrics
- **AI Performance Engine** — Gemini 2.5 Flash synthesizes all data into performance scores and recommendations
- **Benchmark Comparison** — Athletes are compared against age-matched and elite-level standards
- **Progress Tracking & Leaderboards** — Continuous rankings motivate athletes and help coaches track development

---

## ✨ Key Features

<div align="center">
<img src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=900&q=80&fit=crop" alt="Sports Analytics" width="80%" style="border-radius:10px;" />
</div>

<br/>

| Feature | Description |
|---|---|
| 🎥 **Video Assessment** | Upload sport videos for automated biomechanical pose analysis |
| 📋 **Profile Assessment** | Structured intake forms for physical and sport-specific metrics |
| 🤖 **AI Performance Analysis** | Gemini 2.5 Flash generates comprehensive multi-dimensional reports |
| 📊 **Benchmark Comparison** | Compare scores against age group and elite-level standards |
| 💬 **AI Recommendations** | Personalized drills, training plans, and recovery strategies |
| 📈 **Dashboard Analytics** | Radar charts, trend graphs, and assessment history in one view |
| 🔄 **Progress Tracking** | Longitudinal monitoring to spot growth and flag regressions |
| 🏆 **Leaderboard** | Dynamic sport-specific rankings for competitive visibility |
| 🧠 **Gemini AI Assistant** | Conversational AI for coaching advice and result interpretation |

---

## 🛠️ Technology Stack

<div align="center">

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | ReactJS | Component-based UI and routing |
| **Backend** | Node.js + Express.js | REST API and server-side logic |
| **Auth** | Firebase Authentication | Secure sign-up, login, session management |
| **Database** | Firebase Firestore | Real-time NoSQL athlete data storage |
| **Storage** | Firebase Storage | Video and media file uploads |
| **Pose Estimation** | MoveNet / MediaPipe | Real-time joint detection and analysis |
| **AI Engine** | Gemini 2.5 Flash | Scoring, recommendations, and AI chat |
| **Data Viz** | Chart.js / Recharts | Charts, radar graphs, and trends |

</div>

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (ReactJS)                         │
│   Auth Pages │ Assessment Forms │ Dashboard & Charts │ AI Chat  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ REST API
┌──────────────────────────▼──────────────────────────────────────┐
│               BACKEND (Node.js + Express.js)                    │
│       /api/auth  │  /api/assess  │  /api/ai (Gemini)            │
└────────┬─────────────────┬───────────────────┬──────────────────┘
         ▼                 ▼                   ▼
   Firebase Auth     MoveNet / MediaPipe   Gemini 2.5 Flash
   Firestore DB      Pose Estimation       AI Performance Engine
   Storage           Video Analysis        Recommendations
```

---

## 🔄 Project Workflow

```
Athlete Onboarding → Profile Setup
         │
    ┌────┴────┐
    ▼         ▼
Video      Profile
Upload     Form
    │         │
Pose Est.  Metrics
    └────┬────┘
         ▼
   Gemini AI Engine
         │
  ┌──────┼──────┐
  ▼      ▼      ▼
Score  Benchmark  Recommendations
Report Comparison
         │
Dashboard → Progress → Leaderboard → AI Assistant
```

---

## 🚀 Installation Guide

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ and npm v9+
- [Firebase](https://firebase.google.com/) project (Auth, Firestore, Storage enabled)
- [Google AI Studio](https://aistudio.google.com/) API key for Gemini 2.5 Flash

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/sportgrit.git
cd sportgrit

# 2. Install backend dependencies
cd server && npm install

# 3. Install frontend dependencies
cd ../client && npm install

# 4. Start the backend
cd ../server && npm run dev

# 5. Start the frontend (new terminal)
cd ../client && npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

**`/server/.env`**
```env
PORT=5000
NODE_ENV=development
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="your_private_key"
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

**`/client/.env`**
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

> ⚠️ Never commit `.env` files to version control. Add them to `.gitignore`.

---

## 📁 Folder Structure

```
sportgrit/
├── client/                  # React Frontend
│   └── src/
│       ├── components/      # Navbar, Dashboard, Charts, Leaderboard, AIAssistant
│       ├── pages/           # Home, Login, VideoAssessment, Results, Progress
│       ├── services/        # authService, assessmentService, aiService
│       ├── firebase/        # firebaseConfig.js
│       └── context/         # Auth & Theme context
│
├── server/                  # Node.js + Express Backend
│   ├── controllers/         # auth, assessment, video, ai
│   ├── routes/              # authRoutes, assessmentRoutes, aiRoutes
│   ├── services/            # poseEstimation, gemini, scoring
│   └── server.js
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🔮 Future Enhancements

<div align="center">
<img src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=900&q=80&fit=crop" alt="Future of Sports Tech" width="80%" style="border-radius:10px;" />
</div>

<br/>

- **Live Webcam Assessment** — Real-time pose analysis during live drills
- **Multi-Sport Expansion** — Cricket, basketball, tennis, and swimming
- **Coach & Scout Portal** — Manage and compare multiple athlete profiles
- **Wearable Integration** — Smartwatch and IoT sensor data support
- **React Native App** — On-field video capture and instant analysis
- **Talent Marketplace** — Connect athletes with coaches, academies, and scouts

---

## 👥 Contributors

<table>
  <tr>
    <td align="center">
      <b>Your Name</b><br/>
      <sub>Full Stack Developer & AI Integration</sub><br/>
      <a href="https://github.com/your-username">@your-username</a>
    </td>
  </tr>
</table>

> Want to contribute? Open an issue or submit a pull request!

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 📬 Contact

| | |
|---|---|
| 📧 Email | devaprasathdevaprasath57@gmail.com |
| 🐙 GitHub | [github.com/devaprasathj](https://github.com/devaprasathj) |
| 💼 LinkedIn | [linkedin.com/in/devaprasath-j-1a1482297](https://linkedin.com/in/devaprasath-j-1a1482297) |
| 🌐 Portfolio | [your-portfolio.com](https://your-portfolio.com) |

---

<div align="center">

Made with ❤️ and built for athletes everywhere.

**SportGrit** — *Where Data Meets Determination.*

⭐ Star this repo if you find it useful!

</div>
>>>>>>> 75f6ed38b8f4577a4e9fd586cdf4b1ad91929453
