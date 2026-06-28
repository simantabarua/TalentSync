# Architecture Decision Records (ADR)

## ADR 1: Frontend Framework - Next.js App Router
**Status**: Accepted  
**Context**: We need a modern, SEO-friendly React framework for building the client-facing application.  
**Decision**: Use Next.js 16 with the App Router.  
**Rationale**: 
- Provides out-of-the-box routing, layouts, and server-side rendering (SSR) / static site generation (SSG) capabilities which are excellent for job discovery SEO.
- App Router offers improved data fetching models and streaming compared to the older Pages router.

## ADR 2: Backend Framework - Express.js REST API
**Status**: Accepted  
**Context**: We need to decide where core business logic (user management, job creation, application processing, AI generation) lives.  
**Decision**: Build a standalone Express.js REST API instead of using Next.js Server Actions.  
**Rationale**: 
- Separation of concerns: The frontend strictly handles UI/UX, while the backend API handles logic and database interactions.
- Avoids the "Express + Server Actions" anti-pattern: If an Express server already exists to serve the API, using Next.js Server Actions for data mutation creates a fragmented architecture and split business logic.
- A REST API is more easily consumable by potential future clients (e.g., mobile apps).

## ADR 3: Database & ORM - MongoDB with Mongoose
**Status**: Accepted  
**Context**: We need a flexible database for storing job listings, user profiles, and applications.  
**Decision**: Use MongoDB with Mongoose ODM, and avoid a separate custom "Repository Pattern" layer.  
**Rationale**: 
- MongoDB is highly flexible for document-based data like resumes, JSON-based skills, and varying job requirements.
- Mongoose provides strong schema validation, hooks, and typed querying capabilities out of the box. 
- A custom Repository layer over Mongoose often results in unnecessary boilerplate for an application of this scale. Direct Mongoose queries within the Controller or Service layer are sufficient and cleaner.

## ADR 4: Authentication - Clerk
**Status**: Accepted  
**Context**: Building secure authentication flows (login, registration, password resets) from scratch is error-prone and time-consuming.  
**Decision**: Use Clerk as the centralized identity provider for both Next.js and the Express backend.  
**Rationale**: 
- Clerk provides drop-in UI components (`<SignInButton>`, `<UserButton>`) for Next.js.
- Clerk handles session management securely and integrates easily with Express using `@clerk/express` for JWT validation on API routes.
- It is production-ready, highly secure, and scales effortlessly.

## ADR 5: AI Integration - Google Gemini
**Status**: Accepted  
**Context**: We need AI capabilities to generate cover letters and match candidates to job requirements.  
**Decision**: Use Google Gemini API.  
**Rationale**: 
- Cost-effective and extremely fast processing (specifically Gemini Flash).
- Generous free tier and robust SDK (`@google/generative-ai`) available in Node.js.

## ADR 6: Data Fetching - TanStack React Query
**Status**: Accepted  
**Context**: The frontend needs a way to query the Express REST API, cache responses, and handle loading/error states.  
**Decision**: Use TanStack React Query alongside Axios.  
**Rationale**: 
- Excellent caching, background refetching, and stale-while-revalidate capabilities.
- Greatly simplifies React component state by removing the need for manual `useEffect` API calls and state management.
