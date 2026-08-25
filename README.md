# 🚀 PrepMind AI

PrepMind AI is a full-stack, AI-powered study and exam preparation platform. It generates comprehensive, exam-oriented study notes, structured revision summaries, interactive Mermaid.js diagrams, Recharts visual analytics, and downloadable PDFs using Google Gemini AI.

---

## 🔗 Live URLs

- 🌐 **Frontend Application:** [https://prepmind-ai-xpzl.onrender.com](https://prepmind-ai-xpzl.onrender.com)
- ⚙️ **Backend API:** [https://prepmind-ai-yxsk.onrender.com](https://prepmind-ai-yxsk.onrender.com)
- 💳 **Stripe Webhook Endpoint:** [https://prepmind-ai-yxsk.onrender.com/api/credits/webhook](https://prepmind-ai-yxsk.onrender.com/api/credits/webhook)

---

## 📌 Project Overview

PrepMind AI streamlines student learning by converting study topics into high-yield educational content tailored to specific academic levels and exam formats. Users can:
- Generate structured notes with key definitions, explanations, formulas, and revision bullet points.
- Include auto-rendered diagrams (flowcharts, mindmaps, sequence diagrams) and data charts.
- Export clean, formatted, printable PDFs directly to their device.
- Review past notes and generation history at any time.
- Manage study credits with secure Stripe checkout integration.

---

## ✨ Features

- **Google Authentication:** Fast, passwordless sign-in with Firebase Google Auth popup and secure JWT cookie sessions.
- **AI Notes Generation:** Deeply customized prompts powered by Google Gemini AI with options for:
  - Topic / Subject
  - Academic Class Level
  - Exam Type (CBSE, JEE, NEET, University, General)
  - Revision Mode (High-yield quick review)
  - Interactive Mermaid Diagrams
  - Dynamic Recharts Visualizations
- **Interactive Visualizations:**
  - Dynamic Mermaid.js flowcharts, mindmaps, and concept graphs.
  - Interactive Recharts bar, line, and pie charts.
- **Server-Side PDF Export:** Instant generation and download of printable study documents using PDFKit.
- **Notes History:** Persistent archive of all previously generated notes with re-render and re-download capabilities.
- **Atomic Credit System:**
  - 100 free credits granted automatically on signup.
  - 10 credits consumed per successful generation.
  - Atomic database deductions preventing race-condition double spending.
  - Automatic credit refund if AI generation fails.
- **Stripe Payment Integration (Test/Sandbox Mode):** Secure credit top-ups with INR pricing plans (50, 120, 300 credits) and signature-verified webhook processing.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **Routing:** React Router DOM (v7)
- **State Management:** Redux Toolkit & React-Redux
- **Styling:** Tailwind CSS (v4), Motion (Framer Motion v12)
- **Icons:** React Icons
- **Markdown & Math:** React Markdown, KaTeX
- **Data & Diagrams:** Mermaid.js, Recharts
- **HTTP Client:** Axios (with credentials)
- **Authentication:** Firebase Auth SDK (v12)

### Backend
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js (v5)
- **Database:** MongoDB Atlas via Mongoose (v9)
- **Authentication & Security:** JSON Web Token (JWT), Cookie-Parser, CORS
- **AI Service:** Google Gemini REST API (v1beta)
- **Document Generation:** PDFKit
- **Payments:** Stripe Node SDK (v20)

### Deployment & Infrastructure
- **Hosting:** Render
  - Backend: Render Web Service (Node.js)
  - Frontend: Render Static Site (SPA with rewrite fallback)

---

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────────┐
│               Frontend (React 19 / Vite)               │
│          https://prepmind-ai-xpzl.onrender.com         │
└───────┬───────────────────────────────┬────────────────┘
        │                               │
  Firebase Auth                   Axios (withCredentials)
  (Google Popup)                  HTTP-only JWT Cookies
        │                               │
        ▼                               ▼
┌───────────────────┐   ┌────────────────────────────────┐
│  Firebase Auth    │   │      Backend (Express.js)      │
│  (Cortex AI Proj) │   │ https://prepmind-ai-yxsk.onrender.com │
└───────────────────┘   └───┬────────────┬────────────┬──┘
                            │            │            │
                 Mongoose / │     REST / │     SDK /  │ Webhooks
                   Database │     Gemini │    Stripe  │
                            ▼            ▼            ▼
                     ┌──────────┐ ┌──────────┐ ┌──────────────┐
                     │ MongoDB  │ │  Google  │ │ Stripe Test  │
                     │  Atlas   │ │  Gemini  │ │   Checkout   │
                     └──────────┘ └──────────┘ └──────────────┘
```

---

## 📂 Project Structure

```
ExamNotes AI/
├── render.yaml                   # Render Blueprint deployment specification
├── README.md                     # Project documentation
├── client/                       # Frontend React application
│   ├── index.html                # HTML entry point with metadata
│   ├── package.json              # Frontend dependencies and scripts
│   ├── vite.config.js            # Vite configuration
│   ├── public/
│   │   ├── _redirects            # SPA 200 history fallback for static hosts
│   │   └── logo.png              # Public brand asset
│   └── src/
│       ├── main.jsx              # React DOM root and Redux provider
│       ├── App.jsx               # App routes and session initialization
│       ├── index.css             # Tailwind CSS entry
│       ├── assets/               # Brand logos and illustration assets
│       ├── components/
│       │   ├── Navbar.jsx        # Navigation header and credit badge
│       │   ├── Footer.jsx        # Site footer with navigation and credits
│       │   ├── Sidebar.jsx       # Notes layout sidebar
│       │   ├── TopicForm.jsx     # AI input parameters and generation form
│       │   ├── FinalResult.jsx   # Markdown viewer and PDF download trigger
│       │   ├── MermaidSetup.jsx  # Mermaid diagram renderer
│       │   └── RechartSetUp.jsx  # Recharts chart renderer
│       ├── pages/
│       │   ├── Home.jsx          # Protected dashboard landing page
│       │   ├── Auth.jsx          # Public login page with Google Auth
│       │   ├── Notes.jsx         # Note generator and display page
│       │   ├── History.jsx       # User notes archive and viewer
│       │   ├── Pricing.jsx       # Credit top-up plans
│       │   ├── PaymentSuccess.jsx# Post-checkout success confirmation
│       │   └── PaymentFailed.jsx # Post-checkout failure confirmation
│       ├── redux/
│       │   ├── store.js          # Redux Toolkit centralized store
│       │   └── userSlice.js      # User state and credit balance slice
│       ├── services/
│       │   └── api.js            # Centralized API service functions
│       └── utils/
│           └── firebase.js       # Firebase client initialization
└── server/                       # Backend Express API
    ├── index.js                  # Express app, middleware, routes, and port
    ├── package.json              # Backend dependencies and scripts
    ├── controllers/
    │   ├── auth.controller.js    # Google sign-in and logout handlers
    │   ├── user.controller.js    # Current user session retrieval
    │   ├── generate.controller.js# AI generation and atomic credit deduction
    │   ├── notes.controller.js   # User notes retrieval by ID or list
    │   ├── pdf.controller.js     # Server-side PDF generation via PDFKit
    │   └── credits.controller.js # Stripe checkout session and webhook handler
    ├── middleware/
    │   └── isAuth.js             # JWT authentication middleware
    ├── models/
    │   ├── user.model.js         # User Mongoose schema
    │   └── notes.model.js        # Note Mongoose schema
    ├── routes/
    │   ├── auth.route.js         # /api/auth routes
    │   ├── user.route.js         # /api/user routes
    │   ├── genrate.route.js      # /api/notes routes
    │   ├── pdf.route.js          # /api/pdf routes
    │   └── credits.route.js      # /api/credit routes
    ├── services/
    │   └── gemini.services.js    # Google Gemini REST API client
    └── utils/
        ├── connectDb.js          # MongoDB Mongoose connection handler
        ├── promptBuilder.js      # Structured system prompt generator
        └── token.js              # JWT generation helper
```

---

## 🎨 Frontend

The frontend is a single-page application (SPA) built with React 19 and Vite.

- **State Management:** Uses Redux Toolkit (`userSlice`) to store authenticated user profile data, notes array, and remaining credits.
- **Routing:** Built with React Router (`BrowserRouter`). Protected routes automatically redirect unauthenticated users to `/auth`.
- **API Communication:** Uses Axios configured with `{ withCredentials: true }` to automatically send and receive HTTP-only authentication cookies across requests.
- **Rendering:** Uses `react-markdown` with `remark-math` and `katex` for LaTeX equations, `mermaid` for rendered diagrams, and `recharts` for responsive charts.

---

## 🧭 Frontend Routes

| Path | Component | Access | Description |
| :--- | :--- | :--- | :--- |
| `/` | `Home` | Protected | Dashboard homepage redirecting to generator or features |
| `/auth` | `Auth` | Public | Google sign-in page with feature breakdown |
| `/notes` | `Notes` | Protected | AI study note generation interface and live preview |
| `/history` | `History` | Protected | Archive of all previously generated notes |
| `/pricing` | `Pricing` | Protected | Credit top-up selection and checkout trigger |
| `/payment-success` | `PaymentSuccess` | Public | Stripe success redirect showing updated balance |
| `/payment-failed` | `PaymentFailed` | Public | Stripe cancellation / failure redirect |

> **SPA History Fallback:** Because the frontend is deployed as a static site, direct navigation to deep links (such as `/pricing` or `/payment-success`) requires a rewrite rule (`/* -> /index.html 200`) configured in `render.yaml` and `client/public/_redirects`.

---

## ⚙️ Backend / API

The backend is an Express.js API listening on the port designated by `process.env.PORT` (default: `8080`).

### Root Endpoint
- **`GET /`**
  - Description: Health check endpoint.
  - Authentication: Not Required

### Authentication Endpoints (`/api/auth`)
- **`POST /api/auth/google`**
  - Description: Verifies user details received from Firebase, finds or creates the user in MongoDB, and issues a secure `token` cookie.
  - Authentication: Not Required
- **`GET /api/auth/logout`**
  - Description: Clears the `token` authentication cookie with matching security parameters.
  - Authentication: Not Required

### User Endpoints (`/api/user`)
- **`GET /api/user/currentuser`**
  - Description: Retrieves the profile and credit balance of the currently authenticated user.
  - Authentication: Required (`isAuth`)

### Notes Endpoints (`/api/notes`)
- **`POST /api/notes/generate-notes`**
  - Description: Atomically deducts 10 credits, builds structured prompt, calls Gemini API, saves note document to MongoDB, and returns generated content. Automatically refunds credits if Gemini fails.
  - Authentication: Required (`isAuth`)
- **`GET /api/notes/getnotes`**
  - Description: Fetches all notes associated with the authenticated user.
  - Authentication: Required (`isAuth`)
- **`GET /api/notes/:id`**
  - Description: Fetches a single note by its MongoDB ObjectId.
  - Authentication: Required (`isAuth`)

### PDF Endpoints (`/api/pdf`)
- **`POST /api/pdf/generate-pdf`**
  - Description: Generates a formatted binary PDF stream containing notes and markdown content using PDFKit.
  - Authentication: Required (`isAuth`)

### Payment & Credit Endpoints (`/api/credit` and `/api/credits`)
- **`POST /api/credit/order`**
  - Description: Creates a Stripe Checkout Session for selected credit tier (₹100 for 50 credits, ₹200 for 120 credits, ₹500 for 300 credits).
  - Authentication: Required (`isAuth`)
- **`POST /api/credits/webhook`**
  - Description: Receives Stripe raw webhook events, cryptographically verifies signature with `STRIPE_WEBHOOK_SECRET`, enforces idempotency on `event.id`, validates user existence, and increments credits.
  - Authentication: Stripe Webhook Signature (`stripe-signature` header)

---

## 🔐 Authentication

1. **Client-Side:** The user clicks "Continue with Google" on the `/auth` page. Firebase Auth SDK opens a popup (`signInWithPopup`) and authenticates the user with Google.
2. **Session Exchange:** The frontend sends `name` and `email` to `POST /api/auth/google`.
3. **User Record:** The backend finds the user by email or creates a new record with 100 default credits.
4. **Cookie Issuance:** The backend signs a JWT containing `{ userId }` with `JWT_SECRET` (7-day expiry) and attaches it as an `httpOnly` cookie named `token`:
   - `httpOnly: true` (Inaccessible to client JavaScript, preventing XSS theft)
   - `secure: true` (Required in production over HTTPS)
   - `sameSite: "none"` (Allows cross-site cookie transmission between Render subdomains)
5. **Authorization:** Subsequent requests include the cookie automatically. The `isAuth.js` middleware parses `req.cookies.token`, verifies the JWT, and attaches `req.userId`.
6. **No Token in LocalStorage:** Authentication relies entirely on the secure cookie, preventing token leakage.

---

## 🤖 Gemini AI

- **API Method:** Direct HTTP POST requests to Google Generative Language API (`v1beta`).
- **Default Model:** `gemini-3-flash-preview` (configurable via `process.env.GEMINI_MODEL`).
- **Prompt Engineering (`server/utils/promptBuilder.js`):** System prompts enforce structured output:
  - Markdown note content with headings, bullet points, key takeaways, and formulas.
  - Mermaid diagram syntax (flowcharts/mindmaps) when requested.
  - Recharts JSON configuration for graphical representation when requested.
- **Resilience:** If Gemini fails or times out, the backend catches the error, refunds the deducted 10 credits to the user's account, and returns an HTTP 500 error message.

---

## 💳 Credit System

| Action | Credits | Notes |
| :--- | :--- | :--- |
| **New User Registration** | `+100` | Default initial balance |
| **Generate Notes** | `-10` | Atomically checked and deducted |
| **Failed Generation** | `+10` | Automatically refunded |
| **Tier 1 Top-Up (₹100)** | `+50` | Stripe Checkout |
| **Tier 2 Top-Up (₹200)** | `+120` | Stripe Checkout |
| **Tier 3 Top-Up (₹500)** | `+300` | Stripe Checkout |

### Concurrency Protection
Credit deduction uses an atomic MongoDB operation:
```javascript
const user = await UserModel.findOneAndUpdate(
  { _id: req.userId, credits: { $gte: 10 } },
  { $inc: { credits: -10 } },
  { new: true }
);
```
The `$gte: 10` filter ensures that two concurrent requests cannot double-spend the same balance.

---

## 💰 Stripe Payments

> **Note:** The Stripe integration is currently running in **Test / Sandbox Mode**.

### Payment Flow
1. User chooses a credit package on `/pricing`.
2. Frontend calls `POST /api/credit/order` with the selected amount.
3. Backend creates a Stripe Checkout session with `userId` and `credits` in `metadata`.
4. User is redirected to Stripe's hosted checkout page.
5. Upon completion or cancellation, Stripe redirects the user to `/payment-success` or `/payment-failed`.
6. Stripe sends an asynchronous `checkout.session.completed` event to `POST /api/credits/webhook`.

### Webhook Handling (`POST /api/credits/webhook`)
- **Raw Body Required:** The webhook route uses `express.raw({ type: "application/json" })` to preserve the exact payload bytes for cryptographic verification.
- **Signature Verification:** Validates `stripe-signature` header using `STRIPE_WEBHOOK_SECRET`.
- **Idempotency:** Tracks processed Stripe `event.id` values to prevent duplicate credit allocation on re-deliveries.
- **User Validation:** Checks that the user exists before applying credits, returning HTTP 404 if the user cannot be found.

> **Important:** Opening `https://prepmind-ai-yxsk.onrender.com/api/credits/webhook` directly in a web browser sends a `GET` request and will return `Cannot GET /api/credits/webhook`. Stripe webhooks only accept `POST` requests.

---

## 🔥 Firebase

The client uses Firebase Authentication. These public client variables are configured in `client/.env`:

```env
VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 🔑 Environment Variables

### Backend (`server/.env`)

```env
# MongoDB connection string
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/

# JWT Secret for signing session cookies
JWT_SECRET=your_jwt_secret_key_here

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Override default Gemini model (default: gemini-3-flash-preview)
GEMINI_MODEL=gemini-3-flash-preview

# Stripe Secret Key (Test Mode)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Stripe Webhook Signing Secret
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_signing_secret

# Frontend Client URL (for CORS and redirects)
CLIENT_URL=https://prepmind-ai-xpzl.onrender.com

# Server Port (auto-assigned on Render)
PORT=8080

# Environment mode (production / development)
NODE_ENV=production
```

### Frontend (`client/.env`)

```env
# Backend API base URL
VITE_SERVER_URL=https://prepmind-ai-yxsk.onrender.com

# Firebase Client Configuration
VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 💻 Local Development

### Prerequisites
- Node.js 18+ installed
- MongoDB instance (local or Atlas)
- Google Gemini API key
- Firebase project with Google Authentication enabled
- Stripe test account

### 1. Clone Repository
```bash
git clone git@github.com:priyanshuguptacoder/ExamNotesAI.git
cd "ExamNotes AI"
```

### 2. Backend Setup
```bash
cd server
npm install
# Create .env file with your local variables
npm run dev
# Backend starts on http://localhost:8080
```

### 3. Frontend Setup
```bash
cd ../client
npm install
# Create .env file with VITE_SERVER_URL=http://localhost:8080 and Firebase keys
npm run dev
# Frontend starts on http://localhost:5173
```

### 4. Local Stripe Webhook Testing (Optional)
```bash
stripe listen --forward-to localhost:8080/api/credits/webhook
```

---

## 🌐 Production Deployment

The project is configured for deployment on [Render](https://render.com) using the root `render.yaml` specification.

### 1. Backend Web Service (`prepmind-api`)
- **Environment:** Node
- **Root Directory:** `server`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment Variables:** `MONGODB_URL`, `JWT_SECRET`, `GEMINI_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `CLIENT_URL`, `NODE_ENV=production`.

### 2. Frontend Static Site (`prepmind-client`)
- **Environment:** Static Site
- **Root Directory:** `client`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`
- **Redirects / Rewrites:**
  - `Source: /*`
  - `Destination: /index.html`
  - `Action: Rewrite`
- **Environment Variables:** `VITE_SERVER_URL`, `VITE_FIREBASE_*`

---

## 🛡️ Security

- **HTTP-Only Cookies:** Tokens are stored exclusively in HTTP-only cookies, preventing script access and XSS vulnerability exploits.
- **CORS Whitelist:** Strict CORS validation in `server/index.js` rejects unknown origins while accepting the designated production client URL and local development hosts.
- **Reverse Proxy Trust:** `app.set("trust proxy", 1)` ensures secure cookie flags work across Render's SSL-terminating reverse proxies.
- **Webhook Cryptographic Verification:** All incoming Stripe events are validated with HMAC signatures using `stripe.webhooks.constructEvent`.
- **Webhook Idempotency:** Event IDs are recorded to prevent duplicate credit processing.
- **Atomic Operations:** Concurrency-safe MongoDB operations prevent balance exploitation during parallel requests.
- **Secret Isolation:** All credentials, keys, and connection strings are managed through environment variables and excluded from version control via `.gitignore`.

---

## 🧪 Testing

```bash
# Build frontend production bundle
cd client
npm run build

# Run frontend linting
npm run lint

# Run backend syntax validation
node --check server/index.js
```

---

## 👨‍💻 Contributors

### Priyanshu Gupta
- **GitHub:** [https://github.com/priyanshuguptacoder](https://github.com/priyanshuguptacoder)

---

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC) as specified in `server/package.json`.
