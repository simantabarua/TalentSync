# Database Schema Documentation

This document outlines the MongoDB collections and Mongoose schemas used in the AI Job Finder application.

## 1. User Collection
The `User` collection stores all identity, profile, and candidate data. Authentication logic is handled by Clerk, so this collection primarily stores application-specific data.

**Collection Name:** `users`

| Field | Type | Required | Unique | Description |
|---|---|---|---|---|
| `_id` | ObjectId | Yes | Yes | MongoDB primary key. |
| `clerkId` | String | Yes | Yes | The external user ID provided by Clerk Auth. |
| `name` | String | Yes | No | Full name of the user. |
| `email` | String | Yes | Yes | Primary email address. |
| `role` | Enum | No | No | User role. Values: `USER`, `ADMIN`, `MANAGER`. Default: `USER`. |
| `image` | String | No | No | URL to user's profile image. |
| `skills` | String[] | No | No | Array of technical/professional skills. |
| `experience` | String | No | No | Professional experience summary. |
| `bio` | String | No | No | Short biography or personal statement. |
| `resumeUrl` | String | No | No | Cloudinary URL to the user's uploaded resume document. |
| `savedJobs` | ObjectId[] | No | No | References to `Job` documents the user has saved. |
| `createdAt` | Date | Auto | No | Timestamp of creation. |
| `updatedAt` | Date | Auto | No | Timestamp of last update. |

---

## 2. Job Collection
The `Job` collection stores all job listings posted by administrators or managers.

**Collection Name:** `jobs`

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `_id` | ObjectId | Yes | - | MongoDB primary key. |
| `title` | String | Yes | - | Job title. |
| `company` | String | Yes | - | Name of the hiring company. |
| `location` | String | Yes | - | Job location (e.g., "Remote", "New York, NY"). |
| `salary.min` | Number | Yes | - | Minimum salary. |
| `salary.max` | Number | Yes | - | Maximum salary. |
| `salary.currency` | String | No | `USD` | Salary currency code. |
| `jobType` | String | Yes | - | Type of employment (e.g., "Full-time", "Contract"). |
| `category` | String | Yes | - | Job category (e.g., "Engineering", "Design"). |
| `skills` | String[] | No | `[]` | Required or desired skills for the role. |
| `description` | String | Yes | - | Full job description. |
| `requirements` | String[] | No | `[]` | Specific requirements or qualifications. |
| `benefits` | String[] | No | `[]` | Perks and benefits offered. |
| `postedBy` | ObjectId | Yes | - | Reference to the `User` (Admin/Manager) who posted the job. |
| `status` | Enum | No | `Active` | Status of the listing. Values: `Active`, `Closed`, `Draft`. |
| `createdAt` | Date | Auto | - | Timestamp of creation. |
| `updatedAt` | Date | Auto | - | Timestamp of last update. |

**Indexes:**
- `{ category: 1 }`
- `{ status: 1, createdAt: -1 }`
- `{ 'salary.min': 1 }`
- `{ location: 1 }`
- Text Index on: `title`, `description`, `skills` (for full-text search).

---

## 3. Application Collection
The `Application` collection joins a `User` with a `Job` and tracks the lifecycle of their submission.

**Collection Name:** `applications`

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `_id` | ObjectId | Yes | - | MongoDB primary key. |
| `jobId` | ObjectId | Yes | - | Reference to the `Job` applied for. |
| `userId` | ObjectId | Yes | - | Reference to the `User` applying. |
| `resume.url` | String | Yes | - | Cloudinary URL of the submitted resume. |
| `resume.filename` | String | Yes | - | Original filename of the resume. |
| `resume.mimeType` | String | Yes | - | MIME type of the resume. |
| `resume.size` | Number | Yes | - | File size in bytes. |
| `coverLetter` | String | No | - | Text of the cover letter (often AI-generated via Gemini). |
| `status` | Enum | No | `Pending` | Application status. Values: `Pending`, `Reviewed`, `Accepted`, `Rejected`. |
| `matchScore` | Number | No | - | AI-calculated score (0-100) indicating how well the candidate matches the job. |
| `createdAt` | Date | Auto | - | Timestamp of creation. |
| `updatedAt` | Date | Auto | - | Timestamp of last update. |

**Indexes:**
- Unique Compound Index: `{ jobId: 1, userId: 1 }` to prevent duplicate applications.
