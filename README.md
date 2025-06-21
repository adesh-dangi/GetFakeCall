# 📱 GetFakeCall – AI-Powered Fake Emergency Call Generator

GetFakeCall is a low-code, AI-powered app that lets users trigger **realistic fake audio or video calls** on demand — perfect for escaping awkward or uncomfortable situations. Whether it's an angry partner, an urgent parent, or a fake sales call, GetFakeCall gives you a smart excuse to leave the moment, instantly.

---

## 🚀 Features

- 🎭 Choose from predefined fake call scenarios (e.g., “Angry Girlfriend”, “Emergency Mom”, “Boss Needs You”)
- 🎙️ Generate ultra-realistic **AI audio calls** using **ElevenLabs**
- 🎥 Create talking-head **AI video calls** using **Tavus**
- 🤖 Dynamic script generation powered by **ChatGPT**
- 📦 User authentication and scenario storage via **Supabase**
- 🧩 Built entirely with low-code tools: **Bolt**, **Supabase**, **ChatGPT**, and AI APIs

---

## 💡 Use Cases

- Escape awkward dates or social events
- Get out of meetings or long conversations
- Simulate emergency calls for safety exits
- Prank friends (ethically) or stage funny calls
- Test realistic AI voice and video technology

---

## 🛠️ Tech Stack

| Tool         | Purpose                                  |
|--------------|-------------------------------------------|
| [Bolt AI](https://boltai.app/) | Frontend UI and logic (no-code)   |
| [Supabase](https://supabase.io) | Auth & Database                  |
| [OpenAI / ChatGPT](https://platform.openai.com/) | AI script generation          |
| [ElevenLabs](https://www.elevenlabs.io/) | Voice synthesis               |
| [Tavus](https://www.tavus.io/) | AI video avatar generation       |
| GitHub       | Source control                            |

---

## 🔐 Authentication

User accounts are handled via **Supabase Auth** using email/password.

---

## 🧪 How It Works

1. **User logs in or signs up**
2. **Selects a scenario** and chooses between an audio or video call
3. **ChatGPT** generates a custom fake conversation script
4. The script is passed to:
   - **ElevenLabs** → to generate a voice clip
   - **Tavus** → to generate a video avatar speaking the script
5. The final media is returned and **played inside the app**
6. Scenario metadata and results are saved in **Supabase**

---

## ⚙️ Setup Instructions

> This project uses a no-code frontend built in Bolt. API keys must be manually inserted into your Bolt flows.

### 🧾 Prerequisites

- Bolt account (https://boltai.app)
- Supabase project + API keys
- ElevenLabs API key
- Tavus API access (early access may be required)
- OpenAI API key (for GPT-4)

### 🧩 Basic Flow

1. Clone or fork this repository
2. Import the Bolt flow (if exported)
3. Set environment variables in Bolt:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `ELEVENLABS_API_KEY`
   - `OPENAI_API_KEY`
   - `TAVUS_API_KEY`
4. Create Supabase tables:
   - `users` (Auth)
   - `call_requests` with fields:
     ```sql
     id UUID, user_id UUID, scenario TEXT, type TEXT, result_url TEXT, created_at TIMESTAMP
     ```
5. Test the full flow:
   - Login → Select scenario → Generate → Playback

---

## 🤝 Contributing

Contributions, feedback, and feature suggestions are welcome!

1. Fork the repo
2. Create a new branch: `feature/your-feature`
3. Commit your changes
4. Push and open a pull request

---

## ⚠️ Disclaimer

This project is intended for entertainment, social safety, and responsible use only. Misuse for impersonation or deception is strictly discouraged. An ethical notice or watermark is included in generated calls.

---

## 📬 Contact & Credits

Made with ❤️ during [Your Hackathon Name]  
Built by: [Your Name or Team Name]  
Email: [you@example.com]

---

## 📌 License

MIT License. See `LICENSE` file for details.

