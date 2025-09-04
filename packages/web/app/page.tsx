import Link from "next/link";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Create & Share viral posts fast. No fluff.
        </h1>
        <p className="text-lg text-dark-text max-w-3xl mx-auto">
          Batch-generate social content, remix styles, schedule across channels,
          and ship more in less time.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard" className="bg-dark-accent text-white px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors">Try it free</Link>
          <a href="#features" className="border border-dark-accent text-dark-accent px-6 py-3 rounded-md font-semibold hover:bg-dark-accent hover:text-white transition-colors">See features</a>
        </div>
      </section>

      <section id="features" className="grid md:grid-cols-3 gap-8">
        {[
          { t: "Batch generator", d: "Start with a seed idea; get 10+ clean variations instantly." },
          { t: "Channel presets", d: "Auto-fit to X, TikTok, IG Reels, LinkedIn, or YT Shorts." },
          { t: "Scheduling", d: "Pick times, view a calendar, and export your plan." }
        ].map((f) => (
          <div key={f.t} className="bg-dark-card p-6 rounded-lg">
            <h3 className="font-semibold text-xl mb-2">{f.t}</h3>
            <p className="text-dark-text">{f.d}</p>
          </div>
        ))}
      </section>

      <section className="bg-dark-card p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Connect your social accounts</h2>
        <p className="text-dark-text mb-6">Connect once, then post directly from your dashboard.</p>
        <div className="flex flex-wrap gap-4">
          <a className="border border-dark-accent text-dark-accent px-6 py-3 rounded-md font-semibold hover:bg-dark-accent hover:text-white transition-colors" href={`${BACKEND}/auth/x/login`}>Connect X</a>
          <a className="border border-dark-accent text-dark-accent px-6 py-3 rounded-md font-semibold hover:bg-dark-accent hover:text-white transition-colors" href={`${BACKEND}/auth/linkedin/login`}>Connect LinkedIn</a>
          <a className="border border-dark-accent text-dark-accent px-6 py-3 rounded-md font-semibold hover:bg-dark-accent hover:text-white transition-colors" href={`${BACKEND}/auth/facebook/login`}>Connect Facebook</a>
          <a className="border border-dark-accent text-dark-accent px-6 py-3 rounded-md font-semibold hover:bg-dark-accent hover:text-white transition-colors" href={`${BACKEND}/auth/instagram/login`}>Connect Instagram</a>
        </div>
      </section>

      <section id="pricing" className="bg-dark-card p-6 rounded-lg">
        <h2 className="text-3xl font-bold">Pricing</h2>
        <p className="text-dark-text">Local demo is free. Plug in your own AI/API later.</p>
        <div className="mt-6">
          <span className="text-4xl font-bold">$0</span> <span className="text-dark-text">/ forever</span>
        </div>
      </section>

      <section id="faq" className="space-y-6">
        <h2 className="text-3xl font-bold">FAQs</h2>
        <details className="bg-dark-card p-6 rounded-lg">
          <summary className="font-semibold cursor-pointer text-xl">Is this production-ready?</summary>
          <p className="text-dark-text mt-4">It’s a starter. Swap the JSON store for a real DB.</p>
        </details>
        <details className="bg-dark-card p-6 rounded-lg">
          <summary className="font-semibold cursor-pointer text-xl">Can I add AI?</summary>
          <p className="text-dark-text mt-4">Yes—wire your favorite API into lib/generator.ts.</p>
        </details>
      </section>
    </div>
  );
}