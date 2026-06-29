# TalentSync (AI Job Finder)

TalentSync is a modern, production-grade, AI-powered job matching and application platform. Built with a modular architecture, it automates the candidate experience by leveraging Google's Gemini API to dynamically generate tailored cover letters and calculate qualification match scores comparing applicant profiles to job requirements.

---

## 🗺️ System Architecture

The application is structured as a decoupled monorepo containing a Next.js frontend and an Express REST API backend. Both services are deployed as separate projects on Vercel.

```mermaid
graph TD
    %% Entities
    Client[Browser / Client App]
    NextJS[Next.js Frontend\nReact + Tailwind]
    Express[Express REST API\nBackend]
    DB[(MongoDB\nDatabase)]
    Clerk[Clerk Auth\nIdentity Provider]
    Cloudinary[Cloudinary\nAsset Storage]
    Gemini[Gemini API\nAI Service]

    %% Connections
    Client <-->|HTTP/HTTPS| NextJS
    NextJS <-->|Axios / React Query| Express
    Client <-->|Auth Tokens| Clerk
    Express <-->|Verify Token| Clerk
    Express <-->|Mongoose / Queries| DB
    Express <-->|Resume Uploads| Cloudinary
    Express <-->|Cover Letter Gen & Match Score| Gemini
```

### Core Architecture Components
1. **Frontend (Next.js 16)**: Handles the UI/UX, routing, client-side caching via TanStack React Query, and communicates with the backend REST API via Axios.
2. **Backend (Express 5)**: Serves as the central API gateway, implementing business logic, middleware validation, database transactions, and third-party integrations (Gemini, Cloudinary, Clerk).
3. **Identity Provider (Clerk)**: Secures all routes via JWT authorization and propagates user syncs using Svix webhooks.
4. **Database (MongoDB)**: Scalable document store modeled using Mongoose ODM, utilizing compound constraints and text indexes.
5. **AI Service (Google Gemini API)**: Evaluates application compatibility, constructs resumes parsing data, and writes customized cover letters.
6. **Storage (Cloudinary)**: Manages secure uploads and serving of candidate resume documents.

---

## ✨ Features

### 💻 Frontend (Next.js)
*   **Vibrant, Responsive Landing Page**: Sleek interface optimized with hover transitions and modern typography.
*   **Interactive Job Discovery**: Public browsing, filtering, and text-based search for job listings.
*   **Clerk Identity Integration**: High-fidelity authentication flow (sign-in, sign-up, user profiles).
*   **Unified Candidate Dashboard**: Track live applications with progress indicators (`Pending`, `Reviewed`, `Accepted`, `Rejected`).
*   **Rich Profile Customization**: Direct updates of user details, skills, biography, and professional resume upload.
*   **Optimized Data Fetching**: Local caching, background synchronization, and loading skeletons driven by TanStack React Query.

### ⚙️ Backend (Express)
*   **Clerk JWT Authentication**: Middleware verification of identity tokens for mutating actions.
*   **Secure API Design**: Configured with `helmet` for HTTP headers, `cors` for domain-level origin enforcement, and `express-rate-limit` for DDoS protection.
*   **Dynamic Gemini Prompting**: Orchestrates contextual prompting to extract skill alignments, rate candidates from 0-100, and generate cover letters.
*   **Clerk Sync via Webhooks**: Standardized Svix webhook handler syncing user registrations, updates, and deletions in real-time.
*   **Robust File Upload Pipeline**: Integrated with Multer and Cloudinary Storage for immediate, direct resume uploads.
*   **Global Error Handling**: Centralized error middleware normalizing API error responses.

---

## 👥 User Roles & Access Control (RBAC)

The application supports Role-Based Access Control (RBAC) with three primary roles defined in the schema: `USER` (Candidate), `MANAGER` (Employer), and `ADMIN` (Super Administrator).

### 1. Candidate (`USER`)
*   **Browse Jobs**: View all active job listings without authenticating.
*   **Profile Setup**: Edit personal details, biography, technical skills, and experience summary.
*   **Resume Upload**: Upload and store resumes securely on Cloudinary.
*   **Apply for Jobs**: Initiate applications for any active listing, generating a personalized AI cover letter and match score.
*   **Dashboard**: Track submission statuses (`Pending`, `Reviewed`, `Accepted`, `Rejected`) in real-time.
*   *Restrictions*: Cannot post new jobs, edit other candidate profiles, or update application statuses.

### 2. Employer (`MANAGER`)
*   **Create Listings**: Post new job listings with descriptions, requirements, salary brackets, and required skills.
*   **Manage Applications**: View all candidate applications submitted for their posted jobs.
*   **AI Match Scoring**: Review the AI-generated compatibility scores (0-100) assessing candidates against requirements.
*   **Status Management**: Update candidate application statuses (e.g., mark as `Reviewed`, `Accepted`, or `Rejected`).
*   *Restrictions*: Cannot modify site-wide admin settings.

### 3. Super Administrator (`ADMIN`)
*   **Global Overview**: View and manage all users, job listings, and application records across the platform.
*   **System Moderation**: Delete inappropriate listings or applications.
*   **Role Management**: Modify user roles (promote a user to `MANAGER` or `ADMIN`).

---

## 🗄️ Database Schemas & Models

```mermaid
erDiagram
    USER {
        ObjectId _id
        String clerkId
        String name
        String email
        String role
        String[] skills
        String resumeUrl
    }
    JOB {
        ObjectId _id
        String title
        String company
        String location
        String status
        ObjectId postedBy
    }
    APPLICATION {
        ObjectId _id
        ObjectId jobId
        ObjectId userId
        String coverLetter
        String status
        Number matchScore
    }

    USER ||--o{ JOB : "posts (as Admin/Manager)"
    USER ||--o{ APPLICATION : "submits"
    JOB ||--o{ APPLICATION : "receives"
```

### 1. User (`users`)
Stores profile state, capabilities, and references to uploaded assets.
*   *Key Constraints*: Unique index on `clerkId` and `email`.

### 2. Job (`jobs`)
Houses job listing details and salary brackets.
*   *Key Indexes*: Text index on `title`, `description`, and `skills` for fast search; standard indexes on `category`, `status`, and `location`.

### 3. Application (`applications`)
Represents the candidate's request to match for a specific job, housing the cover letter and the AI match score.
*   *Key Constraints*: Unique compound index on `{ jobId: 1, userId: 1 }` to prevent duplicate submissions.

---

## 🛠️ Project Structure

```bash
├── backend
│   ├── vercel.json        # Vercel deployment config for serverless functions
│   ├── src
│   │   ├── config         # Database & SDK configurations
│   │   ├── controllers    # API Route controllers (User, Job, App, AI)
│   │   ├── middleware     # Clerk Auth, Multer, Rate Limiting, Errors
│   │   ├── models         # Mongoose Schemas (User, Job, Application)
│   │   ├── prompts        # Prompt engineering context files
│   │   ├── routes         # Express routing endpoints
│   │   └── index.ts       # Backend entrypoint (configured for Vercel/Express)
├── frontend
│   ├── src
│   │   ├── app            # Next.js app directory pages and routing
│   │   ├── components     # Reusable UI components (Navbar, Providers)
│   │   └── middleware.ts  # Next.js page authentication middleware
├── docs                   # System architectural and design reviews
└── package.json           # Root metadata & dev dependencies
```

---

## 🚀 Setup & Installation

### Prerequisites
*   Node.js (v18+)
*   MongoDB Atlas cluster (or local MongoDB)
*   Clerk Account (for Auth)
*   Cloudinary Account (for Resumes)
*   Google Gemini API Key

### 1. Clone the repository
```bash
git clone https://github.com/simantabarua/TalentSync.git
cd ai-job-finder
```

### 2. Install dependencies
Install dependencies separately for both directories:
```bash
# Install root/global tools
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 3. Configure Environment Variables

Create the respective configuration files in each directory:

#### Backend (`backend/.env`):
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
MONGO_URI=your_mongodb_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_URL=cloudinary://your_api_key:your_api_secret@your_cloud_name
```

#### Frontend (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

---

## 💻 Running Locally

### Start Backend:
```bash
cd backend
npm run dev
```
The server will boot on [http://localhost:5000](http://localhost:5000).

### Start Frontend:
```bash
cd frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment (Vercel)

Both applications are configured to deploy natively to Vercel as two isolated projects pointing to the same repository.

### Backend Deployment
Configured through [backend/vercel.json](file:///home/xsystem/Desktop/Project/ai-job-finder/backend/vercel.json) to bundle Express routes into a single serverless function endpoint:
*   Project: `ai-job-finder-backend`
*   Command: `vercel deploy --cwd backend --prod --yes`
*   Live URL: `https://ai-job-finder-backend.vercel.app`

### Frontend Deployment
Directly deployed using the native Next.js build preset:
*   Project: `ai-job-finder-frontend`
*   Command: `vercel deploy --cwd frontend --prod --yes`
*   Live URL: `https://ai-job-finder-frontend.vercel.app`

---

## 📈 Strategic Roadmap & Enhancements
1.  **BullMQ Background Job Processing**: Migrate Gemini API cover letter and match score calculations into a background queue worker to eliminate synchronous HTTP response latency.
2.  **Resume Parsing Engine**: Use Gemini to automatically parse uploaded PDF resumes to populate candidate skill profiles.
3.  **Infinite Pagination**: Implement database cursors on `/api/v1/jobs` and integrate TanStack's `useInfiniteQuery` for job feeds.
4.  **Admin/Employer Dashboard UI**: Build a dashboard interface for hiring managers to write listings, inspect candidates, and review AI scoring insights.

---

## 🔒 Security Guidelines (For Developers & AI Agents)

To maintain strict security standards and prevent credentials exposure:
*   **NEVER COMMIT ENVIRONMENT FILES**: Do not stage, commit, or push `.env`, `.env.local`, `.env.production`, or any file containing active API keys, Mongo URIs, or secrets.
*   **GITIGNORE FORCE**: All environment files (`.env*`) must be listed in both local and global `.gitignore` patterns.
*   **VERIFY BEFORE COMMIT**: Always inspect the changes using `git status` and `git diff --cached` before executing a commit to ensure no secrets are accidentally staged.
*   **API KEY ROTATION**: If credentials are ever leaked to GitHub history, immediately change them on the respective provider dashboard (e.g. MongoDB Atlas, Clerk, Cloudinary).
