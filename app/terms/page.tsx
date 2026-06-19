export default function TermsPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden py-20">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-8 tracking-tight">Terms of Service</h1>
        <div className="prose prose-invert prose-sm sm:prose-base text-muted max-w-none">
          <p className="text-sm opacity-80 mb-8"><strong>Effective Date:</strong> June 19, 2026</p>
          <p className="mb-8">Welcome to <strong>Shinka-6c Playground</strong>. By accessing or using our platform, you agree to the following Terms of Service.</p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-foreground mt-12 mb-4 text-2xl font-semibold">1. Use of Service</h2>
          <p className="mb-4">You agree to use the platform only for lawful purposes.</p>
          <p className="mb-4">You must NOT:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Use the service for illegal or harmful activities</li>
            <li>Attempt to reverse engineer or exploit the system</li>
            <li>Abuse or overload the platform</li>
          </ul>

          <hr className="border-white/10 my-8" />

          <h2 className="text-foreground mt-12 mb-4 text-2xl font-semibold">2. AI-Generated Content</h2>
          <p className="mb-4">Our platform uses AI to generate outputs.</p>
          <p className="mb-4">We do NOT guarantee:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Accuracy</li>
            <li>Completeness</li>
            <li>Reliability</li>
          </ul>
          <p className="mb-6">You are responsible for how you use the generated content.</p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-foreground mt-12 mb-4 text-2xl font-semibold">3. Intellectual Property</h2>
          <p className="mb-4">All platform content, including:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>UI design</li>
            <li>Branding</li>
            <li>AI workflows</li>
          </ul>
          <p className="mb-4">are owned by <strong>Shinka-6c</strong>.</p>
          <p className="mb-4">You may NOT:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Copy, resell, or redistribute our agents for commercial use without permission</li>
          </ul>

          <hr className="border-white/10 my-8" />

          <h2 className="text-foreground mt-12 mb-4 text-2xl font-semibold">4. User Inputs</h2>
          <p className="mb-4">You retain ownership of the data you submit.</p>
          <p className="mb-4">However, you grant us permission to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Process your data to provide results</li>
            <li>Improve our services</li>
          </ul>

          <hr className="border-white/10 my-8" />

          <h2 className="text-foreground mt-12 mb-4 text-2xl font-semibold">5. Service Availability</h2>
          <p className="mb-4">We may:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Modify or discontinue services</li>
            <li>Add or remove features</li>
          </ul>
          <p className="mb-6">without prior notice.</p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-foreground mt-12 mb-4 text-2xl font-semibold">6. Limitation of Liability</h2>
          <p className="mb-4">We are not liable for:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Any damages resulting from use of the platform</li>
            <li>Errors in AI-generated outputs</li>
            <li>Service interruptions</li>
          </ul>

          <hr className="border-white/10 my-8" />

          <h2 className="text-foreground mt-12 mb-4 text-2xl font-semibold">7. Termination</h2>
          <p className="mb-4">We reserve the right to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Suspend or terminate access</li>
            <li>Restrict usage</li>
          </ul>
          <p className="mb-6">if terms are violated.</p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-foreground mt-12 mb-4 text-2xl font-semibold">8. Third-Party Services</h2>
          <p className="mb-4">Our platform may rely on third-party services. We are not responsible for their behavior or policies.</p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-foreground mt-12 mb-4 text-2xl font-semibold">9. Changes to Terms</h2>
          <p className="mb-4">We may update these Terms at any time. Continued use of the platform means you accept the changes.</p>

          <hr className="border-white/10 my-8" />

          <h2 className="text-foreground mt-12 mb-4 text-2xl font-semibold">10. Contact</h2>
          <p className="mb-4">For questions, contact:</p>
          <p className="mb-8">📧 <strong>chandouqiande@gmail.com</strong></p>

          <hr className="border-white/10 my-8" />

          <p className="mb-8 font-medium">By using this platform, you agree to these Terms of Service.</p>
        </div>
      </div>
    </div>
  );
}
