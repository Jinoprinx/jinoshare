import Link from "next/link";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Create & Share viral posts fast. No fluff.
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Batch-generate social content, remix styles, schedule across channels,
          and ship more in less time.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/dashboard" className="btn">Try it free</Link>
          <a href="#features" className="btn-outline">See features</a>
        </div>
      </section>

      <section id="features" className="grid md:grid-cols-3 gap-6">
        {[
          { t: "Batch generator", d: "Start with a seed idea; get 10+ clean variations instantly." },
          { t: "Channel presets", d: "Auto-fit to X, TikTok, IG Reels, LinkedIn, or YT Shorts." },
          { t: "Scheduling", d: "Pick times, view a calendar, and export your plan." }
        ].map((f) => (
          <div key={f.t} className="card">
            <h3 className="font-semibold">{f.t}</h3>
            <p className="text-gray-600">{f.d}</p>
          </div>
        ))}
      </section>

      <section className="card">
        <h2 className="text-2xl font-bold mb-3">Connect your social accounts</h2>
        <p className="text-gray-600 mb-3">Connect once, then post directly from your dashboard.</p>
        <div className="flex flex-wrap gap-2">
          <a className="btn-outline" href={`${BACKEND}/auth/x/login`}>Connect X</a>
          <a className="btn-outline" href={`${BACKEND}/auth/linkedin/login`}>Connect LinkedIn</a>
          <a className="btn-outline" href={`${BACKEND}/auth/facebook/login`}>Connect Facebook</a>
          <a className="btn-outline" href={`${BACKEND}/auth/instagram/login`}>Connect Instagram</a>
        </div>
      </section>

      <section id="pricing" className="card">
        <h2 className="text-2xl font-bold">Pricing</h2>
        <p className="text-gray-600">Local demo is free. Plug in your own AI/API later.</p>
        <div className="mt-4">
          <span className="text-3xl font-bold">$0</span> <span>/ forever</span>
        </div>
      </section>

      <section id="faq" className="space-y-4">
        <h2 className="text-2xl font-bold">FAQs</h2>
        <details className="card">
          <summary className="font-semibold cursor-pointer">Is this production-ready?</summary>
          <p className="text-gray-600 mt-2">It’s a starter. Swap the JSON store for a real DB.</p>
        </details>
        <details className="card">
          <summary className="font-semibold cursor-pointer">Can I add AI?</summary>
          <p className="text-gray-600 mt-2">Yes—wire your favorite API into lib/generator.ts.</p>
        </details>
      </section>
    </div>
  );
}
