export type FieldType = "text" | "email" | "textarea" | "url" | "file";

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  accept?: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  route: string;
  icon: string;
  fields: FormField[];
  outputKeys?: string[];
  docPath?: string;
}

export const agents: Agent[] = [
  {
    id: "ai-research-agent",
    name: "AI Research & Insights Agent",
    description:
      "Generate comprehensive, factual, and unbiased research reports on any topic and receive them via email.",
    route: "/agent/ai-research-agent",
    icon: "🔍",
    fields: [
      {
        name: "topic",
        label: "Research Topic",
        type: "text",
        placeholder: "e.g., The Future of Quantum Computing",
        required: true,
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "your@email.com",
        required: true,
      },
    ],
    outputKeys: ["message"],
    docPath: "/docs/AI Research Insights Agent.pdf",
  },
  {
    id: "youtube-repurposer",
    name: "YouTube Repurposer",
    description:
      "Turn any YouTube video into LinkedIn posts, Twitter threads, and blog drafts in seconds.",
    route: "/agent/youtube-repurposer",
    icon: "▶",
    fields: [
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "jane@example.com",
        required: true,
      },
      {
        name: "youtube_url",
        label: "YouTube URL",
        type: "url",
        placeholder: "https://www.youtube.com/watch?v=...",
        required: true,
      },
    ],
    outputKeys: ["message"],
    docPath: "/docs/AI YouTube Content Repurposer Workflow.pdf",
  },
  {
    id: "lead-auto-reply",
    name: "Lead Auto Reply Generator",
    description:
      "Generate personalized, professional replies to inbound leads instantly.",
    route: "/agent/lead-auto-reply",
    icon: "✉",
    fields: [
      {
        name: "name",
        label: "Lead Name",
        type: "text",
        placeholder: "Jane Doe",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "jane@company.com",
        required: true,
      },
      {
        name: "message",
        label: "Their Message",
        type: "textarea",
        placeholder: "What did they ask about?",
        required: true,
        rows: 5,
      },
    ],
    outputKeys: ["reply"],
    docPath: "/docs/AI Lead Capture & Auto Response System.pdf",
  },
  {
    id: "resume-job-matcher",
    name: "AI Resume-Based Job Matcher",
    description:
      "Paste your resume and let our AI analyze your skills to find the perfect remote jobs for you.",
    route: "/agent/resume-job-matcher",
    icon: "🚀",
    fields: [
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "jane@example.com",
        required: true,
      },
      {
        name: "resumeText",
        label: "Resume Content",
        type: "textarea",
        placeholder: "Paste your full resume text here...",
        required: true,
        rows: 10,
      },
    ],
    outputKeys: ["message"],
    docPath: "/docs/AI Resume-Based Job Matching Agent Workflow.pdf",
  },
  {
    id: "multilingual-support",
    name: "Multilingual AI Support Desk",
    description:
      "Send queries in any language. Our AI detects, translates, classifies urgency, and auto-replies or escalates.",
    route: "/agent/multilingual-support",
    icon: "🌍",
    fields: [
      {
        name: "email",
        label: "Your Email",
        type: "email",
        placeholder: "customer@example.com",
        required: true,
      },
      {
        name: "subject",
        label: "Subject",
        type: "text",
        placeholder: "Issue with my recent order...",
        required: true,
      },
      {
        name: "message",
        label: "Your Query (Any Language)",
        type: "textarea",
        placeholder: "मुझे मेरा पैसा वापस चाहिए / I want a refund / నాకు నా డబ్బు తిరిగి కావాలి",
        required: true,
        rows: 6,
      },
    ],
    outputKeys: ["message"],
    docPath: "/docs/Multilingual AI Customer Support Bot Workflow.pdf",
  },
  {
    id: "business-insights",
    name: "AI Business Insights & Alert System",
    description:
      "Automated growth analyst. Generates daily reports, detects revenue drops, and alerts you to pipeline issues.",
    route: "/agent/business-insights",
    icon: "📊",
    fields: [],
    outputKeys: [],
    docPath: "/docs/AI Business Insights & Alert Agent.pdf",
  },
  {
    id: "instagram-dm-lead",
    name: "AI Instagram DM → Lead Capture",
    description:
      "Automated lead qualification from Instagram DMs. Analyzes intent, scores leads (Hot/Warm/Cold), and syncs to Google Sheets.",
    route: "/agent/instagram-dm-lead",
    icon: "📸",
    fields: [
      {
        name: "username",
        label: "Instagram Username",
        type: "text",
        placeholder: "johndoe",
        required: true,
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "john@example.com",
        required: true,
      },
      {
        name: "message",
        label: "Direct Message",
        type: "textarea",
        placeholder: "Hey, what are your prices?",
        required: true,
        rows: 4,
      },
    ],
    outputKeys: ["intent", "lead_score", "summary"],
    docPath: "/docs/AI Instagram DM Lead Capture Guide.pdf",
  },
  {
    id: "order-priority",
    name: "AI Order Priority & Notification System",
    description:
      "Automated order prioritization engine. Classifies incoming orders as High, Medium, or Low priority based on value and delivery type.",
    route: "/agent/order-priority",
    icon: "📦",
    fields: [
      { name: "order_id", label: "Order ID", type: "text", placeholder: "ORD-12345", required: true },
      { name: "customer_name", label: "Customer Name", type: "text", placeholder: "Alice Smith", required: true },
      { name: "email", label: "Customer Email", type: "email", placeholder: "alice@example.com", required: true },
      { name: "order_value", label: "Order Value ($)", type: "text", placeholder: "150", required: true },
      { name: "delivery_type", label: "Delivery Type", type: "text", placeholder: "standard", required: true },
    ],
    outputKeys: ["priority", "reason"],
    docPath: "/docs/AI Order Priority & Notification System.pdf",
  },
  {
    id: "meeting-notes-generator",
    name: "AI Meeting Notes → Action Items Generator",
    description:
      "Analyze meeting transcripts and automatically extract meeting summaries, key decisions, and action items, then email the results.",
    route: "/agent/meeting-notes-generator",
    icon: "📝",
    fields: [
      {
        name: "meetingTitle",
        label: "Meeting Title",
        type: "text",
        placeholder: "Weekly Sync",
        required: true,
      },
      {
        name: "meetingDate",
        label: "Meeting Date",
        type: "text",
        placeholder: "June 25, 2026",
        required: true,
      },
      {
        name: "participants",
        label: "Participants",
        type: "text",
        placeholder: "John, Jane, Doe",
        required: true,
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "jane@example.com",
        required: true,
      },
      {
        name: "transcript",
        label: "Transcript",
        type: "textarea",
        placeholder: "Paste the full meeting transcript here...",
        required: true,
        rows: 6,
      },
    ],
    outputKeys: ["message"],
    docPath: "/docs/AI Meeting Notes & Action Items Generator.pdf",
  },
  {
    id: "cold-email-personalizer",
    name: "AI Cold Email Personalization Engine",
    description:
      "Automated research and personalization engine. Analyzes a lead's website and generates a highly personalized, human-sounding cold email.",
    route: "/agent/cold-email-personalizer",
    icon: "✉️",
    fields: [
      {
        name: "name",
        label: "Lead Name",
        type: "text",
        placeholder: "John Doe",
        required: true,
      },
      {
        name: "email",
        label: "Lead Email Address",
        type: "email",
        placeholder: "john@example.com",
        required: true,
      },
      {
        name: "company",
        label: "Company",
        type: "text",
        placeholder: "Acme Corp",
        required: true,
      },
      {
        name: "website",
        label: "Website URL",
        type: "url",
        placeholder: "https://acme.com",
        required: true,
      },
    ],
    outputKeys: ["message"],
    docPath: "/docs/AI Cold Email Personalization Engine User Manual.pdf",
  },
  {
    id: "website-chat",
    name: "AI Website Chatbot with Memory",
    description:
      "A conversational AI assistant that remembers your conversation history and provides accurate support.",
    route: "/agent/website-chat",
    icon: "💬",
    fields: [],
    outputKeys: [],
    docPath: "/docs/AI_Website_Chatbot_with_Memory_Documentation.pdf",
  },
  {
    id: "freelancer-invoice",
    name: "Freelancer Invoice & Billing Automation",
    description:
      "Automatically generate professional invoices, track them in Google Sheets, save PDFs to Drive, and email them to clients.",
    route: "/agent/freelancer-invoice",
    icon: "🧾",
    fields: [],
    outputKeys: ["message"],
    docPath: "/docs/Freelancer_Invoice_Billing_Automation_Documentation (2).pdf",
  },
  {
    id: "ai-bug-reporter",
    name: "AI Bug Report Auto Ticket System",
    description:
      "Analyze bug reports and automatically generate structured engineering tickets with AI-driven severity, category, and root cause analysis.",
    route: "/agent/ai-bug-reporter",
    icon: "🐛",
    fields: [
      { name: "reporter_name", label: "Your Name", type: "text", placeholder: "John Doe", required: true },
      { name: "reporter_email", label: "Your Email", type: "email", placeholder: "john@example.com", required: true },
      { name: "application", label: "Application", type: "text", placeholder: "e.g. User Dashboard", required: true },
      { name: "environment", label: "Environment", type: "text", placeholder: "e.g. Production, Staging", required: true },
      { name: "browser", label: "Browser", type: "text", placeholder: "e.g. Chrome 114", required: true },
      { name: "device", label: "Device", type: "text", placeholder: "e.g. MacBook Pro", required: true },
      { name: "page_url", label: "Page URL", type: "url", placeholder: "https://example.com/page", required: true },
      { name: "bug_title", label: "Bug Title", type: "text", placeholder: "Brief summary of the issue", required: true },
      { name: "bug_description", label: "Bug Description", type: "textarea", placeholder: "Detailed description of what went wrong...", required: true, rows: 4 },
      { name: "steps_to_reproduce", label: "Steps to Reproduce", type: "textarea", placeholder: "1. Go to...\n2. Click on...", required: true, rows: 4 },
      { name: "expected_result", label: "Expected Result", type: "textarea", placeholder: "What should have happened?", required: true, rows: 3 },
      { name: "actual_result", label: "Actual Result", type: "textarea", placeholder: "What actually happened?", required: true, rows: 3 },
      { name: "attachment", label: "Attachment (Base64)", type: "text", placeholder: "Base64 encoded string or URL", required: false }
    ],
    outputKeys: ["message"],
    docPath: "/docs/AI_Bug_Report_Auto_Ticket_System_Documentation_v1.0.pdf",
  },
  {
    id: "competitor-intelligence-monitor",
    name: "AI Competitor Intelligence Monitor",
    description:
      "Automated competitor monitoring. Scrapes competitor websites, detects changes in products/pricing, and alerts you via email.",
    route: "/agent/competitor-intelligence-monitor",
    icon: "🕵️",
    fields: [],
    outputKeys: ["message"],
    docPath: "/docs/AI_Competitor_Intelligence_Agent_Blueprint.pdf",
  },
];

export function getAgentById(id: string): Agent | undefined {
  return agents.find((agent) => agent.id === id);
}

export function getAllAgents(): Agent[] {
  return agents;
}
