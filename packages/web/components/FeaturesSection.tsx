import Image from "next/image";
const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6 font-geist font-light tracking-tighter">
            The all‑in‑one
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent font-geist font-light tracking-tighter">AI social studio</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-white/70 leading-relaxed">
            Generate content, schedule across platforms, and measure results—all from a single, streamlined workspace.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 lg:p-8 ring-1 ring-white/5 shadow-2xl shadow-black/40">
          <div className="grid grid-cols-1 gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
            <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/8 to-white/4 p-6 backdrop-blur-xl hover:from-white/12 hover:to-white/6 transition-all duration-500">
              <div className="relative h-48 lg:h-52 overflow-hidden rounded-xl ring-1 ring-white/10 mb-6">
                <Image src="https://images.unsplash.com/photo-s9CC2SKySJM?q=80&w=1200&auto=format&fit=crop" alt="AI Copywriting" width={1200} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-3 right-3">
                  <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/20 backdrop-blur-xl hover:bg-white/25 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h6"/></svg>
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold tracking-tight mb-3">AI Copywriter</h3>
                <p className="text-white/70 leading-relaxed mb-6">Auto-generate on-brand captions, threads, and CTAs with tone control and language support.</p>
                <button className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 hover:bg-white/10 hover:border-white/20 transition-all duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  Try copy
                </button>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/8 to-white/4 p-6 backdrop-blur-xl hover:from-white/12 hover:to-white/6 transition-all duration-500">
              <div className="relative h-48 lg:h-52 overflow-hidden rounded-xl ring-1 ring-white/10 mb-6">
                <Image src="https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?q=80&w=1200&auto=format&fit=crop" alt="Asset Generation" width={1200} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-3 right-3">
                  <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/20 backdrop-blur-xl hover:bg-white/25 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m21 15-5-5L5 21"/><path d="M5 12V3h16v16H12"/></svg>
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold tracking-tight mb-3">Images & Video</h3>
                <p className="text-white/70 leading-relaxed mb-6">Generate images, carousels, and short-form videos tailored to each platform’s spec.</p>
                <button className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 hover:bg-white/10 hover:border-white/20 transition-all duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m22 12-4-2v4l4-2z"/><rect x="2" y="4" width="16" height="16" rx="2"/></svg>
                  Create assets
                </button>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/8 to-white/4 p-6 backdrop-blur-xl hover:from-white/12 hover:to-white/6 transition-all duration-500">
              <div className="relative h-48 lg:h-52 overflow-hidden rounded-xl ring-1 ring-white/10 mb-6">
                <Image src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop" alt="Scheduler" width={1200} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-3 right-3">
                  <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/20 backdrop-blur-xl hover:bg-white/25 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold tracking-tight mb-3">Smart Scheduling</h3>
                <p className="text-white/70 leading-relaxed mb-6">Auto-schedule to hit peak engagement windows by platform and audience.</p>
                <button className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 hover:bg-white/10 hover:border-white/20 transition-all duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m7 10 5 5 5-5"/></svg>
                  See calendar
                </button>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/8 to-white/4 p-6 backdrop-blur-xl hover:from-white/12 hover:to-white/6 transition-all duration-500">
              <div className="relative h-48 lg:h-52 overflow-hidden rounded-xl ring-1 ring-white/10 mb-6">
                <Image src="https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1200&auto=format&fit=crop" alt="Multi-platform" width={1200} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold tracking-tight mb-3">One‑Click Publishing</h3>
                <p className="text-white/70 leading-relaxed mb-6">Publish to multiple platforms at once with per-channel customization.</p>
                <div className="flex items-center gap-2">
                  <span className="h-7 w-7 rounded bg-blue-500/30 ring-1 ring-blue-300/40 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="16" rx="2"/></svg>
                  </span>
                  <span className="h-7 w-7 rounded bg-purple-500/30 ring-1 ring-purple-300/40 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="4" y="2" width="16" height="20" rx="2"/></svg>
                  </span>
                  <span className="h-7 w-7 rounded bg-rose-500/30 ring-1 ring-rose-300/40 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16v16H4z"/></svg>
                  </span>
                  <span className="text-xs text-white/70">+ more</span>
                </div>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/8 to-white/4 p-6 backdrop-blur-xl hover:from-white/12 hover:to-white/6 transition-all duration-500">
              <div className="relative h-48 lg:h-52 overflow-hidden rounded-xl ring-1 ring-white/10 mb-6">
                <Image src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop" alt="Collaboration" width={1200} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold tracking-tight mb-3">Team Collaboration</h3>
                <p className="text-white/70 leading-relaxed mb-6">Roles, approvals, and shared libraries keep your workflow organized.</p>
                <button className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 hover:bg-white/10 hover:border-white/20 transition-all duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21a8 8 0 0 0-16 0"/><circle cx="8" cy="7" r="4"/></svg>
                  Invite team
                </button>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/8 to-white/4 p-6 backdrop-blur-xl hover:from-white/12 hover:to-white/6 transition-all duration-500">
              <div className="relative h-48 lg:h-52 overflow-hidden rounded-xl ring-1 ring-white/10 mb-6">
                <Image src="https://images.unsplash.com/photo-VxLhYXuLQN8?q=80&w=1200&auto=format&fit=crop" alt="Analytics" width={1200} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold tracking-tight mb-3">Analytics & UTM</h3>
                <p className="text-white/70 leading-relaxed mb-6">Engagement breakdowns, link tracking, and content insights made simple.</p>
                <button className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 hover:bg-white/10 hover:border-white/20 transition-all duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3v18h18"/><path d="M7 12l3 3 7-7"/></svg>
                  View reports
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
