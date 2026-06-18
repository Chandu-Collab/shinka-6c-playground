# AI Resume-Based Job Matcher

**ID**: `resume-job-matcher`
**Description**: Paste your resume and let our AI analyze your skills to find the perfect remote jobs for you.

## Frontend UI
Users paste their Resume content and their email address. The UI features a bespoke "Analyzing Profile", "Scanning Databases", and "Matching Roles" loader sequence.

## Input Payload
The Next.js app sends a POST request to `N8N_JOB_MATCHER_WEBHOOK_URL` with:
```json
{
  "email": "jane@example.com",
  "resumeText": "Experienced Software Engineer with 5 years in React, Node.js..."
}
```

## Workflow Execution (n8n)
1. **Webhook Trigger**: Receives the payload.
2. **Data Extraction (AI)**: Extracts core skills, years of experience, and role preferences from `resumeText`.
3. **API Integration**: Hits a Job Board API (or scrapes sources) based on extracted skills.
4. **Email Node**: Sends a curated list of top matched jobs to the provided `email`.
5. **Webhook Response**: Returns a success confirmation.

## Output
```json
{
  "message": "We've matched your profile with 3 top remote roles! Check your email."
}
```
