const TestimonialsSection = () => {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6 font-geist font-light tracking-tighter">
            Loved by modern
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent font-geist font-light tracking-tighter">marketing teams</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-white/70 leading-relaxed">
            From solo creators to global brands, JinoShare streamlines content ops and boosts engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/8 to-white/4 p-8 backdrop-blur-xl hover:from-white/12 hover:to-white/6 transition-all duration-500">
            <div className="mb-6">
              <div className="text-white/90 leading-relaxed mb-6">
                “We cut weekly social production time from 10 hours to under 3. The AI captions are scarily on‑brand.”
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=320&auto=format&fit=crop" alt="Ava" className="h-12 w-12 rounded-full ring-2 ring-white/20 object-cover"/>
              <div>
                <div className="font-semibold text-white">Ava Patel</div>
                <div className="text-sm text-white/60">Head of Growth, SaaS</div>
              </div>
            </div>
          </div>

          <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/8 to-white/4 p-8 backdrop-blur-xl hover:from-white/12 hover:to-white/6 transition-all duration-500">
            <div className="mb-6">
              <div className="text-white/90 leading-relaxed mb-6">
                “One‑click publishing is the real deal. Threads, carousels, shorts—tailored for each channel automatically.”
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=320&auto=format&fit=crop" alt="Diego" className="h-12 w-12 rounded-full ring-2 ring-white/20 object-cover"/>
              <div>
                <div className="font-semibold text-white">Diego Santos</div>
                <div className="text-sm text-white/60">Content Lead, Ecommerce</div>
              </div>
            </div>
          </div>

          <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/8 to-white/4 p-8 backdrop-blur-xl hover:from-white/12 hover:to-white/6 transition-all duration-500">
            <div className="mb-6">
              <div className="text-white/90 leading-relaxed mb-6">
                “Analytics made it obvious—short video + weekend slots. Our engagement jumped 2.4x in a month.”
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=320&auto=format&fit=crop" alt="Maya" className="h-12 w-12 rounded-full ring-2 ring-white/20 object-cover"/>
              <div>
                <div className="font-semibold text-white">Maya Kramer</div>
                <div className="text-sm text-white/60">Founder, DTC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
