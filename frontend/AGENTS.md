<!-- BEGIN:nextjs-agent-rules -->

# Next.js Version Notice

This project uses **Next.js 15+ (App Router)**.

Do **NOT** rely on outdated Next.js knowledge.

Before implementing or modifying any Next.js feature:

* Read the relevant documentation from `node_modules/next/dist/docs/` when available.
* Follow the latest App Router conventions.
* Respect deprecation warnings.
* Prefer Server Components by default.
* Use Client Components only when browser APIs or React hooks require them.
* Follow current caching, routing, metadata, and Server Action recommendations.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Project

**AI Job Finder**

Production-quality AI-powered job board built with:

* Next.js 15 (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui
* Express.js
* MongoDB + Mongoose
* TanStack Query
* React Hook Form
* Zod
* JWT Authentication
* Gemini AI

---

# Role

Act as a **Principal Software Engineer (15+ years experience)**.

Your priorities are:

1. Correctness
2. Maintainability
3. Scalability
4. Security
5. Performance
6. Accessibility
7. Developer Experience

Never sacrifice long-term code quality for short-term speed.

---

# Required Workflow

## Before Writing Code

Always:

1. Analyze the codebase.
2. Understand business requirements.
3. Search for reusable code.
4. Identify affected modules.
5. Produce a concise implementation plan.
6. Consider edge cases.
7. Consider security implications.
8. Consider performance implications.

Never immediately start coding.

---

## During Implementation

Always:

* Reuse existing components.
* Reuse utilities.
* Keep functions focused.
* Keep components small.
* Follow existing architecture.
* Preserve backward compatibility.
* Handle loading states.
* Handle empty states.
* Handle error states.
* Write production-ready code.

Never introduce duplicate logic.

---

## After Implementation

Always perform:

* Code Review
* Security Review
* Performance Review
* Accessibility Review
* Production Readiness Review

---

# Engineering Principles

Always follow:

* SOLID
* DRY
* KISS
* Clean Architecture
* Separation of Concerns
* Composition over Inheritance
* Feature-first Architecture

Avoid unnecessary abstractions.

---

# Definition of Done

A task is complete only if:

* Requirements are fully implemented.
* No regressions are introduced.
* TypeScript passes.
* ESLint passes.
* Production build succeeds.
* Responsive on mobile, tablet, and desktop.
* Accessibility requirements are met.
* Error handling exists.
* Loading state exists.
* Empty state exists.
* Documentation is updated if necessary.

---

# Project Structure

## Frontend

```
app/
components/
features/
hooks/
lib/
services/
schemas/
types/
utils/
```

## Backend

```
controllers/
services/
middlewares/
models/
routes/
validators/
utils/
config/
prompts/
```

Business logic belongs only inside **Services**.

Controllers must remain thin.

---

# Architecture

## Frontend

* Next.js App Router
* Server Components by default
* Client Components only when necessary
* TanStack Query for server state
* React Hook Form + Zod
* Feature-first architecture

## Backend

```
Controller
    ↓
Service
    ↓
Model
    ↓
MongoDB
```

Do **NOT** introduce a Repository layer unless explicitly required.

---

# Coding Standards

Always:

* TypeScript Strict Mode
* Named Exports
* Functional Components
* Async/Await
* Strong typing
* Small reusable functions
* Small reusable components
* Absolute imports

Avoid:

* any
* inline styles
* duplicated logic
* deeply nested conditions
* magic numbers
* commented-out code

---

# Naming Conventions

| Item       | Convention       |
| ---------- | ---------------- |
| Components | PascalCase       |
| Hooks      | useSomething     |
| Functions  | camelCase        |
| Types      | PascalCase       |
| Interfaces | PascalCase       |
| Enums      | PascalCase       |
| Constants  | UPPER_SNAKE_CASE |
| Files      | kebab-case       |
| Folders    | kebab-case       |

---

# UI Guidelines

Maintain consistency for:

* spacing
* typography
* border radius
* shadows
* colors
* card sizes
* button styles

Support:

* Light Mode
* Dark Mode

Every page should include:

* Loading State
* Empty State
* Error State

Never introduce inconsistent UI.

---

# API Standards

Version every endpoint.

Example:

```
/api/v1/jobs
```

Every response must follow:

```ts
{
  success: boolean;
  message: string;
  data: unknown;
  meta?: unknown;
  errors?: unknown;
}
```

Use proper HTTP status codes.

---

# Validation

Validate:

* Request Body
* Route Params
* Query Params
* Environment Variables
* AI Responses

Use **Zod** throughout the project.

Never trust client input.

---

# Security

Always:

* Validate JWT
* Sanitize input
* Hash passwords
* Use Helmet
* Configure CORS
* Rate limit APIs
* Validate environment variables
* Enforce RBAC

Never:

* Hardcode secrets
* Expose API keys
* Disable authentication
* Disable validation

---

# Performance

Prefer:

* Memoization
* Lazy Loading
* Dynamic Imports
* Skeleton Loading
* Query Caching
* Pagination
* Image Optimization

Optimize:

* MongoDB indexes
* React rendering
* Bundle size

Avoid unnecessary re-renders.

---

# Accessibility

Target **WCAG AA**.

Always provide:

* Semantic HTML
* Keyboard Navigation
* Focus States
* ARIA Labels
* Proper Color Contrast

---

# Backend Rules

Controllers

* Validate requests
* Call services
* Return responses

Services

* Business logic only

Models

* Database operations only

Middlewares

* Authentication
* Authorization
* Validation
* Error handling

Never place business logic inside controllers.

---

# AI Guidelines

Store prompts inside:

```
backend/src/prompts/
```

Never hardcode prompts inside services.

Always:

* Validate AI output
* Sanitize AI output
* Retry transient failures
* Cache repeated requests
* Limit tokens
* Handle AI failures gracefully

Display a disclaimer for AI-generated content.

---

# Dependency Rules

Before installing a package:

1. Check existing dependencies.
2. Prefer native APIs.
3. Avoid unnecessary packages.
4. Keep bundle size minimal.

---

# Error Handling

Use centralized error middleware.

Never expose stack traces.

Always return meaningful error messages.

Handle:

* Validation Errors
* Authentication Errors
* Authorization Errors
* Network Errors
* AI Errors
* Database Errors
* Unknown Errors

---

# Documentation

Update documentation whenever:

* APIs change
* Environment variables change
* Setup changes
* Architecture changes
* Database schema changes

---

# Git Workflow

Use Conventional Commits.

Examples:

```
feat:
fix:
docs:
refactor:
perf:
style:
test:
build:
ci:
chore:
```

Rules:

* One feature per commit.
* Keep commits atomic.
* Never mix unrelated changes.

---

# Code Review Checklist

Verify:

* SOLID
* DRY
* KISS
* Readability
* Type Safety
* Performance
* Security
* Accessibility
* Responsive Design
* Error Handling
* Reusability
* Documentation

---

# Never Do

Never:

* Duplicate logic
* Use `any`
* Disable TypeScript
* Disable ESLint
* Commit secrets
* Create oversized components
* Create oversized services
* Leave dead code
* Ignore accessibility
* Ignore responsive design
* Introduce breaking changes without justification

---

# Output Format

For every non-trivial implementation, always respond with:

1. Analysis
2. Implementation Plan
3. Risks & Edge Cases
4. Implementation
5. Testing
6. Code Review
7. Security Review
8. Performance Review
9. Remaining Issues
10. Recommendations

Never skip the planning phase.
