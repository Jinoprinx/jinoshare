import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 ring-1 ring-white/5 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-10">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2),transparent_60%)] blur-2xl"></div>
          <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.2),transparent_60%)] blur-2xl"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-geist font-light tracking-tighter">Ready to create once, share everywhere?</h3>
              <p className="text-white/70 mt-2">Try JinoShare free—no credit card. Import your channels and publish today.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition">
                Get started
              </Link>
              <Link href="#features" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 hover:bg-white/10 hover:border-white/20 transition">
                Explore features
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
