import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-500 opacity-20 blur-[100px]"></div>
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8">
            Pricing
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6">
            Simple, Flexible, and <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Fair</span>
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Start for free. Upgrade when you need more.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left mb-20">
          
          {/* Free Plan */}
          <div className="p-8 rounded-3xl border border-white/5 bg-surface/50 backdrop-blur-sm hover:border-white/10 transition-colors">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">🟢 Free Plan</h3>
            <p className="text-sm text-muted mb-6 h-10">Perfect for exploring and testing AI agents.</p>
            <div className="text-4xl font-bold mb-6">Free</div>
            <ul className="space-y-4 mb-8 text-muted text-sm">
              <li className="flex items-start gap-3"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div> Access to all basic agents</li>
              <li className="flex items-start gap-3"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div> Limited usage per day</li>
              <li className="flex items-start gap-3"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div> No signup required (for most tools)</li>
              <li className="flex items-start gap-3"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div> Community support</li>
            </ul>
            <Link href="/" className="block text-center w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors font-medium">Get Started</Link>
          </div>

          {/* Pro Plan */}
          <div className="p-8 rounded-3xl border border-emerald-500/40 bg-surface/80 backdrop-blur-sm relative hover:shadow-2xl hover:shadow-emerald-500/10 transition-all">
            <div className="absolute top-0 right-8 -translate-y-1/2 px-4 py-1 rounded-full bg-emerald-500 text-xs font-bold text-white uppercase tracking-wider">Coming Soon</div>
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">🟡 Pro Plan</h3>
            <p className="text-sm text-muted mb-6 h-10">For users who want more power and higher limits.</p>
            <div className="text-3xl font-bold mb-6 flex items-center h-[40px]">Coming Soon</div>
            <ul className="space-y-4 mb-8 text-muted text-sm">
              <li className="flex items-start gap-3"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div> Increased usage limits</li>
              <li className="flex items-start gap-3"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div> Priority processing</li>
              <li className="flex items-start gap-3"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div> Access to advanced agents</li>
              <li className="flex items-start gap-3"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div> Early access to new features</li>
            </ul>
            <button disabled className="w-full py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 cursor-not-allowed font-medium text-emerald-100/50">Coming Soon</button>
          </div>

          {/* Custom Solutions */}
          <div className="p-8 rounded-3xl border border-white/5 bg-surface/50 backdrop-blur-sm hover:border-white/10 transition-colors">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">🔵 Custom</h3>
            <p className="text-sm text-muted mb-6 h-10">Need something tailored for your business?</p>
            <div className="text-3xl font-bold mb-6 flex items-center h-[40px]">Let's Talk</div>
            <ul className="space-y-4 mb-8 text-muted text-sm">
              <li className="flex items-start gap-3"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div> Custom AI agents</li>
              <li className="flex items-start gap-3"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div> Workflow automation</li>
              <li className="flex items-start gap-3"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div> Integration support</li>
            </ul>
            <Link href="/contact" className="block text-center w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors font-medium">Contact Us</Link>
          </div>

        </div>

        {/* Additional Info Grid */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-2xl bg-surface-elevated/50 border border-white/5 backdrop-blur-sm">
            <h4 className="text-lg font-bold mb-3 flex items-center gap-2"><span>⚡</span> Why Start Free?</h4>
            <p className="text-sm text-muted mb-3 leading-relaxed">We believe you should experience value first.</p>
            <p className="text-sm text-muted leading-relaxed">Try our agents. See the results. Upgrade only if it helps you.</p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-elevated/50 border border-white/5 backdrop-blur-sm">
            <h4 className="text-lg font-bold mb-3 flex items-center gap-2"><span>🚀</span> Usage Limits</h4>
            <p className="text-sm text-muted mb-3 leading-relaxed">To ensure fair usage, free access includes limited requests per day.</p>
            <p className="text-sm text-muted leading-relaxed">For higher usage, Pro plans will be available soon.</p>
          </div>

          <div className="p-6 rounded-2xl bg-surface-elevated/50 border border-white/5 backdrop-blur-sm">
            <h4 className="text-lg font-bold mb-3 flex items-center gap-2"><span>🤝</span> Need More?</h4>
            <p className="text-sm text-muted mb-4 leading-relaxed">If you have a specific requirement or high usage need we can help you scale.</p>
            <Link href="/contact" className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors border-b border-emerald-400/30 hover:border-emerald-300 pb-0.5">
              👉 Reach out via Contact
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
