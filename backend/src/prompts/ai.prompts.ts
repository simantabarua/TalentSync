export const coverLetterPrompt = (
  jobTitle: string,
  company: string,
  jobDescription: string,
  resumeText: string,
  tone: "professional" | "friendly" | "confident" = "professional"
) => `
You are an expert career coach, professional recruiter, and hiring manager.

Your task is to write a highly personalized cover letter based on the candidate's resume and the provided job description.

## Job Information

Job Title:
${jobTitle}

Company:
${company}

Job Description:
${jobDescription || "Not provided"}

## Candidate Resume

${resumeText}

## Instructions

- Write in a ${tone} tone.
- Length: 250–350 words.
- Address the hiring manager professionally (avoid using a name unless provided).
- Tailor the letter specifically to the job description.
- Highlight the candidate's most relevant skills and accomplishments.
- Emphasize measurable achievements whenever available.
- Explain why the candidate is a strong fit for this position.
- Show enthusiasm for joining ${company}.
- Do NOT invent experience, projects, certifications, or achievements.
- Use ATS-friendly language and naturally include important keywords from the job description.
- Keep the writing concise, engaging, and professional.
- End with a confident call to action.

Include these placeholders at the end:

[Your Name]
[Email]
[Phone Number]
[LinkedIn]
[Portfolio]

Return only the cover letter without markdown or additional commentary.
`;


export const resumeMatchPrompt = (
  jobDescription: string,
  resumeText: string
) => `
You are an expert ATS (Applicant Tracking System), senior technical recruiter, and resume reviewer.

Analyze how well the resume matches the job description.

## Job Description

${jobDescription}

## Resume

${resumeText}

## Evaluation Criteria

- Technical Skills
- Soft Skills
- Experience
- Responsibilities
- Education
- Industry Keywords
- ATS Optimization
- Overall Fit

Return ONLY valid JSON.

{
  "matchScore": 0,
  "atsScore": 0,
  "summary": "",
  "strengths": [],
  "missingSkills": [],
  "missingKeywords": [],
  "recommendations": [],
  "importantResumeChanges": [],
  "keywordSuggestions": [],
  "experienceGaps": [],
  "sectionScores": {
    "skills": 0,
    "experience": 0,
    "education": 0,
    "keywords": 0,
    "ats": 0
  },
  "overallVerdict": ""
}

Rules:

- Return ONLY valid JSON.
- Do not include markdown.
- Do not wrap the JSON in code fences.
- All scores must be integers between 0 and 100.
- Arrays must contain concise, actionable items.
- "overallVerdict" must be one of:
  - "Excellent Match"
  - "Strong Match"
  - "Moderate Match"
  - "Weak Match"
  - "Poor Match"
- Do not invent qualifications or experience.
- Base every recommendation only on the provided resume and job description.
`;