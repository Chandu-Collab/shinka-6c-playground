export default function FeaturesPage() {
  const features = [
    {
      icon: "⚡",
      title: "Experience AI Instantly",
      description: "No setup. No integrations. No complexity. Shinka-6c lets you try powerful AI agents instantly — just provide input and get results.",
      bullets: []
    },
    {
      icon: "🤖",
      title: "Real-World AI Agents",
      description: "Each agent is built to solve practical problems, not just demos. Focused tools that deliver real value.",
      bullets: [
        "Content repurposing",
        "Lead response automation",
        "Resume-based job matching",
        "Customer support automation"
      ]
    },
    {
      icon: "🧩",
      title: "Modular Agent System",
      description: "Our platform is designed to grow. You always get access to the latest tools.",
      bullets: [
        "New agents added regularly",
        "Each agent solves a specific task",
        "Easily expandable system"
      ]
    },
    {
      icon: "⚙️",
      title: "Powered by Automation",
      description: "Behind every agent is a powerful automation workflow. You don’t see the complexity — only the results.",
      bullets: [
        "AI + workflows combined",
        "Smart processing pipelines",
        "Real-time output generation"
      ]
    },
    {
      icon: "🚀",
      title: "Built for Speed",
      description: "Get results in seconds. No waiting. No friction.",
      bullets: [
        "Fast processing",
        "Minimal input required",
        "Instant outputs"
      ]
    },
    {
      icon: "🎯",
      title: "Designed for Simplicity",
      description: "We focus on usability first. Anyone can use it — no technical knowledge required.",
      bullets: [
        "Clean UI",
        "Guided inputs",
        "Clear outputs"
      ]
    },
    {
      icon: "🔄",
      title: "Continuous Updates",
      description: "We are constantly improving. The platform evolves with your needs.",
      bullets: [
        "New agents every few days",
        "Feature enhancements",
        "Performance upgrades"
      ]
    },
    {
      icon: "🤝",
      title: "Built for Real Use Cases",
      description: "This is not a demo platform. Users actively use Shinka-6c for:",
      bullets: [
        "Business automation",
        "Content creation",
        "Productivity workflows"
      ]
    },
    {
      icon: "🔓",
      title: "Try Before You Commit",
      description: "No signup required (for most agents).",
      bullets: [
        "Test freely",
        "Explore capabilities",
        "Decide based on real experience"
      ]
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-accent opacity-20 blur-[100px]"></div>
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-in max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm font-medium mb-8 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            Platform Features
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6">
            Make AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">Accessible</span>
          </h1>
          <p className="text-lg text-muted">
            Shinka-6c is built to make AI useful, accessible, and practical — not complicated.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="flex flex-col p-8 rounded-3xl border border-white/5 bg-surface/50 backdrop-blur-sm hover:border-accent/30 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5 group">
              <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 text-2xl group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted mb-6">{feature.description}</p>
              
              {feature.bullets.length > 0 && (
                <ul className="space-y-3 mt-auto border-t border-white/5 pt-6">
                  {feature.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-muted">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
                      <span className="font-medium text-foreground/80">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
