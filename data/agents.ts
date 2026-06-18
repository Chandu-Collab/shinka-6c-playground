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
}

export const agents: Agent[] = [
  {
    id: "youtube-repurposer",
    name: "YouTube Repurposer",
    description:
      "Turn any YouTube video into LinkedIn posts, Twitter threads, and blog drafts in seconds.",
    route: "/agent/youtube-repurposer",
    icon: "▶",
    fields: [
      {
        name: "youtubeUrl",
        label: "YouTube URL",
        type: "url",
        placeholder: "https://www.youtube.com/watch?v=...",
        required: true,
      },
    ],
    outputKeys: ["linkedinPost", "twitterThread", "blogDraft"],
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
  },
];

export function getAgentById(id: string): Agent | undefined {
  return agents.find((agent) => agent.id === id);
}

export function getAllAgents(): Agent[] {
  return agents;
}
