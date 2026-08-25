# 🚀 PrepMind AI

## 1. Project Overview
PrepMind AI is a full-stack, AI-powered study and exam preparation platform. It streamlines student learning by converting study topics into high-yield educational content tailored to specific academic levels and exam formats. 

By leveraging Google Gemini AI, the platform generates comprehensive, exam-oriented study notes, structured revision summaries, interactive visualizations, and downloadable PDFs, allowing users to study efficiently and prepare for exams with confidence.

## 2. Features
- 🤖 **AI-powered study note generation**
- 📚 **Exam-oriented notes**
- 🧠 **Revision summaries**
- 📊 **Interactive visualizations**
- 🔀 **Mermaid diagrams**
- 📄 **PDF export**
- 📜 **Notes history**
- 🔐 **Google authentication**
- 💳 **Credit-based generation**
- 💰 **Stripe credit purchases**

## 3. Tech Stack
| Layer | Technology |
|---|---|
| **Frontend** | React, Vite |
| **Backend** | Node.js, Express |
| **Database** | MongoDB |
| **Authentication** | Firebase + JWT cookies |
| **AI** | Google Gemini |
| **Payments** | Stripe |
| **Deployment** | Render |

## 4. Live URLs
- 🌐 **Frontend:** [https://prepmind-ai-xpzl.onrender.com](https://prepmind-ai-xpzl.onrender.com)
- ⚙️ **Backend API:** [https://prepmind-ai-yxsk.onrender.com](https://prepmind-ai-yxsk.onrender.com)
- 💳 **Stripe Webhook:** [https://prepmind-ai-yxsk.onrender.com/api/credits/webhook](https://prepmind-ai-yxsk.onrender.com/api/credits/webhook)

## 5. Frontend Routes
| Route | Description |
|---|---|
| `/` | Dashboard and Home |
| `/auth` | Authentication and Google Sign-in |
| `/notes` | AI Notes Generation Interface |
| `/history` | View Past Generated Notes |
| `/pricing` | Stripe Credit Purchase Page |
| `/payment-success` | Successful Payment Confirmation |
| `/payment-failed` | Failed Payment Status |

> The frontend is deployed as a React SPA with history fallback enabled, allowing direct browser navigation to client-side routes.

## 6. API Overview

### Authentication
- `POST /api/auth/google`
- `GET /api/auth/logout`

### User
- `GET /api/user/currentuser`

### Notes
- `POST /api/notes/generate-notes`
- `GET /api/notes/getnotes`
- `GET /api/notes/:id`

### PDF
- `POST /api/pdf/generate-pdf`

### Credits / Stripe
- `POST /api/credit/order`
- `POST /api/credits/webhook`

## 7. Environment Variables
Create a `.env` file in the `server` directory with the following variables:
```env
MONGODB_URL=your_value
JWT_SECRET=your_value
GEMINI_API_KEY=your_value
STRIPE_SECRET_KEY=your_value
STRIPE_WEBHOOK_SECRET=your_value
CLIENT_URL=https://prepmind-ai-xpzl.onrender.com
```

## 8. Local Development
1. **Clone the repository:**
   ```bash
   git clone https://github.com/priyanshuguptacoder/ExamNotesAI.git
   cd ExamNotesAI
   ```
2. **Install backend dependencies and run:**
   ```bash
   cd server
   npm install
   npm run dev
   ```
3. **Install frontend dependencies and run:**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

## 9. Stripe Test Mode
To test Stripe payments locally, use the Stripe CLI to forward webhooks to your local server:
```bash
stripe listen --forward-to localhost:8080/api/credits/webhook
```
Use the provided webhook secret from the CLI output in your `.env` file as `STRIPE_WEBHOOK_SECRET`.

## 10. Project Structure
```text
ExamNotesAI/
├── client/                 # React/Vite Frontend
├── server/                 # Node.js/Express Backend
└── render.yaml             # Render deployment config
```

## 11. Security
- **Authentication:** Managed securely via Firebase and verified on the backend.
- **Cookies:** JWTs are stored in strict `httpOnly`, `secure`, and `sameSite: 'none'` cookies to prevent XSS. No tokens are stored in `localStorage`.
- **Transactions:** Credit deductions use atomic MongoDB operations to prevent race conditions.

## 12. Contributors
- [Priyanshu Gupta](https://github.com/priyanshuguptacoder)
