# YouTube Repurposer

**ID**: `youtube-repurposer`
**Description**: Turn any YouTube video into LinkedIn posts, Twitter threads, and blog drafts in seconds.

## Frontend UI
Users provide an email address and a YouTube URL. The UI displays an animated loader while the agent processes the video.

## Input Payload
The Next.js app sends a POST request to `N8N_YOUTUBE_WEBHOOK_URL` with:
```json
{
  "email": "jane@example.com",
  "youtube_url": "https://youtube.com/watch?v=..."
}
```

## Workflow Execution (n8n)
1. **Webhook Trigger**: Receives the payload.
2. **Video Processing**: Fetches the video transcript using YouTube's API or a transcript service.
3. **AI Language Model**: Processes the transcript and drafts a LinkedIn post, a Twitter thread, and a blog summary.
4. **Email Node**: Sends the drafted content to the user's provided `email`.
5. **Webhook Response**: Returns a success message to the frontend.

## Output
```json
{
  "message": "Content successfully generated and emailed!"
}
```
