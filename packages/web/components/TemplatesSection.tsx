import Image from "next/image";
const TemplatesSection = () => {
  return (
    <section id="templates" className="relative py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6 font-geist font-light tracking-tighter">
            Campaign‑ready
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent font-geist font-light tracking-tighter">Templates</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-white/70 leading-relaxed">
            Start fast with best‑practice templates for launches, promos, tutorials, carousels, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] border border-white/10 ring-1 ring-white/5">
            <Image src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop" alt="Product Launch" width={1200} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 ring-1 ring-white/10">
                <h4 className="font-semibold text-white mb-1">Product Launch</h4>
                <p className="text-xs text-white/70">Announce with multi‑post sequence</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] border border-white/10 ring-1 ring-white/5">
            <Image src="https://via.placeholder.com/1200x800.png?text=Sale" alt="Sale" width={1200} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 ring-1 ring-white/10">
                <h4 className="font-semibold text-white mb-1">Promo & Sale</h4>
                <p className="text-xs text-white/70">Discounts with urgency timers</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] border border-white/10 ring-1 ring-white/5">
            <Image src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop" alt="Tutorial" width={1200} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 ring-1 ring-white/10">
                <h4 className="font-semibold text-white mb-1">Tutorial Reel</h4>
                <p className="text-xs text-white/70">How‑to short scripts + overlays</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] border border-white/10 ring-1 ring-white/5 md:col-span-2">
            <Image src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop" alt="Event" width={1600} height={900} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-6 left-6 right-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 ring-1 ring-white/10">
                <h4 className="text-lg font-semibold text-white mb-2">Event Promo</h4>
                <p className="text-sm text-white/70 max-w-md">Drive registrations with countdown posts and reminder threads.</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] border border-white/10 ring-1 ring-white/5">
            <Image src="https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1200&auto=format&fit=crop" alt="Blog to Thread" width={1200} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 ring-1 ring-white/10">
                <h4 className="font-semibold text-white mb-1">Blog → Thread</h4>
                <p className="text-xs text-white/70">Summarize posts into threads</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="group inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-base font-medium text-white/90 hover:bg-white/10 hover:border-white/25 transition-all duration-300 backdrop-blur-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/></svg>
            Browse all templates
          </button>
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;
