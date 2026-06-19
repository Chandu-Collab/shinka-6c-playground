export default function ContactPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute right-0 top-1/4 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-accent opacity-10 blur-[100px]"></div>
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Text Info */}
          <div className="animate-fade-in space-y-10 lg:pr-8">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-8">Contact Us</h1>
              <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4 text-foreground">
                <span className="text-3xl">🤝</span> Let’s Build Something Useful
              </h2>
              <p className="text-lg text-muted">
                Have a question, idea, or need a custom AI solution? We’d love to hear from you.
              </p>
            </div>

            <hr className="border-white/10" />

            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-6 text-foreground">
                <span>💡</span> What You Can Reach Us For
              </h3>
              <ul className="space-y-4 text-muted">
                <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-accent"></div> Request a custom AI agent</li>
                <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-accent"></div> Suggest new features</li>
                <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-accent"></div> Report issues or bugs</li>
                <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-accent"></div> Business or collaboration inquiries</li>
              </ul>
            </div>

            <hr className="border-white/10" />

            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-foreground">
                  <span>⚡</span> Response Time
                </h3>
                <p className="text-muted">We usually respond within <strong className="text-foreground">24–48 hours</strong>.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-foreground">
                  <span>📧</span> Direct Contact
                </h3>
                <p className="text-muted">
                  Prefer email?<br/>
                  <a href="mailto:chandouqiande@gmail.com" className="text-accent hover:underline font-medium mt-1 inline-block">chandouqiande@gmail.com</a>
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-accent/20 bg-accent/5">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-foreground">
                <span>🚀</span> Want Something Custom?
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                If you’re looking for a tailored automation or AI solution for your business:
                <br/><span className="mt-3 block font-medium text-foreground">👉 Mention your use case in the message — we’ll help you build it.</span>
              </p>
            </div>

            <p className="text-sm text-muted italic">
              We’re actively building and improving Shinka-6c. Your feedback helps shape what we create next.
            </p>
          </div>

          {/* Right Column: Contact Form */}
          <div className="p-8 md:p-10 rounded-3xl border border-white/5 bg-surface-elevated/50 backdrop-blur-md animate-slide-up shadow-2xl shadow-black/40 relative">
             <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50 rounded-3xl pointer-events-none"></div>
            <div className="mb-8 relative">
              <h3 className="text-2xl font-bold flex items-center gap-2 mb-2">
                <span>📩</span> Get in Touch
              </h3>
              <p className="text-muted">Fill out the form below and we’ll get back to you as soon as possible.</p>
            </div>

            <form className="space-y-6 relative">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" placeholder="Your name" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" placeholder="you@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Type of Request</label>
                <div className="relative">
                  <select defaultValue="" className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-muted appearance-none cursor-pointer">
                    <option value="" disabled hidden>Select a request type...</option>
                    <option value="general" className="bg-surface-elevated text-foreground">General Inquiry</option>
                    <option value="new_agent" className="bg-surface-elevated text-foreground">Request a New Agent</option>
                    <option value="custom" className="bg-surface-elevated text-foreground">Custom Automation</option>
                    <option value="bug" className="bg-surface-elevated text-foreground">Bug / Issue</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none" placeholder="Tell us more about what you need..."></textarea>
              </div>

              <button type="button" className="w-full py-4 mt-2 rounded-xl bg-accent text-white font-semibold hover:bg-accent-hover transition-all hover:-translate-y-0.5 shadow-lg shadow-accent/25">
                Submit Request
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}
