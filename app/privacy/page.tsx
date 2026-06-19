export default function PrivacyPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden py-20">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-8 tracking-tight">Privacy Policy</h1>
        <div className="prose prose-invert prose-sm sm:prose-base text-muted max-w-none">
          <p className="text-sm opacity-80 mb-8"><strong>Effective Date:</strong> June 19, 2026</p>
          <p className="mb-8">Welcome to <strong>Shinka-6c Playground</strong> ("we", "our", or "us"). This Privacy Policy explains how we collect, use, and protect your information when you use our platform.</p>
          
          <hr className="border-white/10 my-8" />
          
          <h2 className="text-foreground mt-12 mb-4 text-2xl font-semibold">1. Information We Collect</h2>
          <p className="mb-4">We may collect the following types of information:</p>
          
          <h3 className="text-foreground mt-6 mb-2 text-xl font-medium">a. Information You Provide</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Name</li>
            <li>Email address</li>
            <li>Input data submitted to AI agents (e.g., text, URLs, messages)</li>
          </ul>

          <h3 className="text-foreground mt-6 mb-2 text-xl font-medium">b. Automatically Collected Information</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>IP address</li>
            <li>Browser type and device information</li>
            <li>Usage data (pages visited, actions taken)</li>
          </ul>

          <hr className="border-white/10 my-8" />

          <h2 className="text-foreground mt-12 mb-4 text-2xl font-semibold">2. How We Use Your Information</h2>
          <p className="mb-4">We use your information to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Provide and operate our AI agents</li>
            <li>Improve platform performance and user experience</li>
            <li>Respond to inquiries and support requests</li>
            <li>Monitor usage and prevent misuse</li>
          </ul>

          <hr className="border-white/10 my-8" />

          <h2 className="text-foreground mt-12 mb-4 text-2xl font-semibold">3. AI Processing</h2>
          <p className="mb-4">Inputs you provide may be processed by AI systems to generate outputs. We do not guarantee complete accuracy of AI-generated responses.</p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-foreground mt-12 mb-4 text-2xl font-semibold">4. Data Sharing</h2>
          <p className="mb-4">We do NOT sell your personal data.</p>
          <p className="mb-4">We may share data with:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Third-party service providers (e.g., hosting, analytics)</li>
            <li>AI processing services (only to deliver functionality)</li>
          </ul>

          <hr className="border-white/10 my-8" />

          <h2 className="text-foreground mt-12 mb-4 text-2xl font-semibold">5. Data Retention</h2>
          <p className="mb-4">We retain data only as long as necessary to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Provide services</li>
            <li>Improve performance</li>
            <li>Comply with legal obligations</li>
          </ul>

          <hr className="border-white/10 my-8" />

          <h2 className="text-foreground mt-12 mb-4 text-2xl font-semibold">6. Security</h2>
          <p className="mb-4">We implement reasonable security measures to protect your data. However, no system is 100% secure.</p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-foreground mt-12 mb-4 text-2xl font-semibold">7. Your Rights</h2>
          <p className="mb-4">You may:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Request access to your data</li>
            <li>Request deletion of your data</li>
          </ul>
          <p className="mb-6">Contact us at: <strong>chandouqiande@gmail.com</strong></p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-foreground mt-12 mb-4 text-2xl font-semibold">8. Third-Party Links</h2>
          <p className="mb-4">Our platform may contain links to external sites. We are not responsible for their privacy practices.</p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-foreground mt-12 mb-4 text-2xl font-semibold">9. Updates to This Policy</h2>
          <p className="mb-4">We may update this Privacy Policy from time to time. Changes will be posted on this page.</p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-foreground mt-12 mb-4 text-2xl font-semibold">10. Contact Us</h2>
          <p className="mb-4">If you have any questions, contact us at:</p>
          <p className="mb-8">📧 <strong>chandouqiande@gmail.com</strong></p>

          <hr className="border-white/10 my-8" />

          <p className="mb-8 font-medium">By using our platform, you agree to this Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
}
