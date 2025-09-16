'use client';

import Link from 'next/link';
import { useEffect } from 'react';

const HeroSection = () => {
  useEffect(() => {
    const counters = document.querySelectorAll('.counter');
    const speed = 400; // The lower the slower

    counters.forEach(counter => {
      const updateCount = () => {
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        const count = parseFloat(counter.innerHTML.replace(/[^0-9.]/g, ''));
        const inc = target / speed;

        if (count < target) {
          const newCount = count + inc;
          const decimals = counter.getAttribute('data-decimals');
          if (decimals) {
            counter.innerHTML = newCount.toFixed(parseInt(decimals, 10)) + (counter.getAttribute('data-suffix') || '');
          } else {
            counter.innerHTML = Math.ceil(newCount).toLocaleString() + (counter.getAttribute('data-suffix') || '');
          }
          setTimeout(updateCount, 1);
        } else {
          const decimals = counter.getAttribute('data-decimals');
          if (decimals) {
            counter.innerHTML = target.toFixed(parseInt(decimals, 10)) + (counter.getAttribute('data-suffix') || '');
          } else {
            counter.innerHTML = target.toLocaleString() + (counter.getAttribute('data-suffix') || '');
          }
        }
      };

      updateCount();
    });
  }, []);

  return (
    <section className="relative lg:pt-32 lg:pb-24 pt-8 pb-32">
      <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 xl:gap-16">
          <div className="relative z-10 lg:col-span-6 xl:col-span-5">
            <div className="animate-slide-up delay-200 mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-xl" style={{ animationPlayState: 'running' }}>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-xs font-medium">AI Content + One‑Click Publish</span>
              </div>
              <div className="h-4 w-px bg-white/20"></div>
              <span className="text-xs">Now Available</span>
            </div>

            <h1 className="animate-slide-up delay-300 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] mb-6 font-geist font-light tracking-tighter" style={{ animationPlayState: 'running' }}>
              Create once.
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent font-geist font-light tracking-tighter">Share everywhere.</span>
            </h1>

            <p className="animate-slide-up delay-500 max-w-2xl text-lg sm:text-xl leading-relaxed text-white/70 mb-8" style={{ animationPlayState: 'running' }}>
              JinoShare generates on‑brand text, images, and videos, schedules them, and publishes to all your social channels in a single click—complete with smart captions, hashtags, and UTM tracking.
            </p>

            <div className="animate-slide-up delay-700 flex flex-col sm:flex-row items-start sm:items-center gap-4" style={{ animationPlayState: 'running' }}>
              <Link href="/dashboard" className="group relative inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-black hover:bg-white/90 transition-all duration-300 shadow-2xl shadow-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-[1.5]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z"/></svg>
                <span>Generate Content</span>
                <div className="absolute inset-0 rounded-2xl bg-white opacity-0 blur-xl group-hover:opacity-25 transition-opacity"></div>
              </Link>
              <button className="group inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-base font-medium text-white/90 hover:bg-white/10 hover:border-white/25 transition-all duration-300 backdrop-blur-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-[1.5]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m5 3 14 9-14 9V3z"/></svg>
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="animate-slide-up delay-900 grid grid-cols-3 gap-8 mt-12" style={{ animationPlayState: 'running' }} id="statsContainer">
              <div>
                <div className="text-2xl text-white font-geist font-light tracking-tighter">
                  <span className="counter" data-target="3500000" data-suffix="+">0</span>
                </div>
                <div className="text-sm text-white/60 mt-1">Posts Published</div>
              </div>
              <div>
                <div className="text-2xl text-white font-geist font-light tracking-tighter">
                  <span className="counter" data-target="6" data-suffix="+">0.1</span>
                </div>
                <div className="text-sm text-white/60 mt-1">Platforms</div>
              </div>
              <div>
                <div className="text-2xl text-white font-geist font-light tracking-tighter">
                  <span className="counter" data-target="22.5" data-suffix="h" data-decimals="1">0.1</span>
                </div>
                <div className="text-sm text-white/60 mt-1">Avg. Time Saved / wk</div>
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-6 xl:col-span-7">
            <div className="animate-blur-in delay-500 relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/5 shadow-2xl shadow-black/40" style={{ animationPlayState: 'running' }}>
              <div className="absolute inset-0 p-4 sm:p-6">
                <div className="rounded-xl bg-black/40 p-4 sm:p-5 backdrop-blur-xl ring-1 ring-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/70">Campaign</span>
                      <div className="px-2 py-1 rounded-lg bg-white/10 text-xs text-white/80 ring-1 ring-white/10">Spring Launch</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-white/10 text-xs text-white/80 ring-1 ring-white/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15v4a2 2 0 0 1-2 2H7l-4-4V5a2 2 0 0 1 2-2h5"/></svg>
                        Auto-caption
                      </div>
                      <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-white/10 text-xs text-white/80 ring-1 ring-white/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3v18h18"/><path d="M19 9l-5 5-4-4-3 3"/></svg>
                        Hashtags
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm font-medium">Smart Scheduler</div>
                        <div className="flex -space-x-1.5">
                          <span className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-300 ring-2 ring-black/40 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16v16H4z"/></svg>
                          </span>
                          <span className="h-6 w-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-400 ring-2 ring-black/40 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/></svg>
                          </span>
                          <span className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-400 ring-2 ring-black/40 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m22 12-4-2v4l4-2z"/><rect x="2" y="4" width="16" height="16" rx="2"/></svg>
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-[10px] text-white/60">
                        <div className="col-span-7 grid grid-cols-7 gap-1">
                          <div className="aspect-square rounded bg-white/5"></div>
                          <div className="aspect-square rounded bg-white/5"></div>
                          <div className="aspect-square rounded bg-white/5 ring-1 ring-white/20 relative">
                            <div className="absolute inset-1 rounded bg-blue-500/30 ring-1 ring-blue-300/40"></div>
                          </div>
                          <div className="aspect-square rounded bg-white/5"></div>
                          <div className="aspect-square rounded bg-white/5"></div>
                          <div className="aspect-square rounded bg-white/5 ring-1 ring-white/20 relative">
                            <div className="absolute inset-1 rounded bg-purple-500/30 ring-1 ring-purple-300/40"></div>
                          </div>
                          <div className="aspect-square rounded bg-white/5"></div>
                        </div>
                        <div className="col-span-7 grid grid-cols-7 gap-1 mt-1">
                          <div className="aspect-square rounded bg-white/5"></div>
                          <div className="aspect-square rounded bg-white/5"></div>
                          <div className="aspect-square rounded bg-white/5"></div>
                          <div className="aspect-square rounded bg-white/5 ring-1 ring-white/20 relative">
                            <div className="absolute inset-1 rounded bg-emerald-500/30 ring-1 ring-emerald-300/40"></div>
                          </div>
                          <div className="aspect-square rounded bg-white/5"></div>
                          <div className="aspect-square rounded bg-white/5"></div>
                          <div className="aspect-square rounded bg-white/5"></div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-xs text-white/70">Best time: Thu 3:30 PM</div>
                        <button className="text-xs px-2 py-1 rounded-lg bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition">Auto-schedule</button>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm font-medium mb-2">AI Composer</div>
                      <div className="rounded-lg bg-black/30 ring-1 ring-white/10 p-3 text-xs text-white/80">
                        Drafting captions for 6 platforms…
                        <div className="mt-2 h-1.5 w-full rounded bg-white/10 overflow-hidden">
                          <div className="h-full w-1/2 bg-gradient-to-r from-blue-400 to-purple-400 animate-[progress_1.5s_ease-in-out_infinite]"></div>
                        </div>
                      </div>
                      <style>
                        {`@keyframes progress { 0% { width: 10%; } 50% { width: 80%; } 100% { width: 10%; } }`}
                      </style>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-white/10 ring-1 ring-white/10 text-xs">
                          <span className="h-5 w-5 rounded bg-blue-500/30 ring-1 ring-blue-300/40 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m22 12-4-2v4l4-2z"/><rect x="2" y="4" width="16" height="16" rx="2"/></svg>
                          </span>
                          Reel 15s
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-white/10 ring-1 ring-white/10 text-xs">
                          <span className="h-5 w-5 rounded bg-purple-500/30 ring-1 ring-purple-300/40 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h6"/></svg>
                          </span>
                          Thread x5
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3v18h18"/><path d="M19 9l-5 5-4-4-3 3"/></svg>
                      UTM tracking enabled
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-black hover:bg-white/90 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m22 12-4-2v4l4-2z"/><path d="M2 12h16"/></svg>
                      Publish to 6
                    </button>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              <div className="glow-light"></div>
            </div>

            <div className="animate-slide-up delay-1100 absolute -bottom-16 right-0 w-full max-w-sm lg:absolute lg:right-0 lg:top-8 lg:-bottom-auto lg:w-80" style={{ animationPlayState: 'running' }}>
              <div className="relative ring-1 ring-white/10 bg-white/20 border-white/15 border rounded-2xl p-5 shadow-2xl backdrop-blur-3xl" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.18)', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 items-center">
                    <div className="inline-flex h-9 w-9 ring-1 ring-white/20 bg-neutral-50/20 rounded-xl items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3h18v4H3z"/><path d="M8 11h8"/><path d="M10 16h4"/><path d="M3 7v14h18V7"/></svg>
                    </div>
                    <h3 className="text-base font-display font-semibold tracking-tight">Publishing Queue</h3>
                  </div>
                  <button id="activityToggle" className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-[1.5] w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                  </button>
                </div>

                <div id="activityList" className="space-y-3 hidden">
                  <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/8 transition-all duration-200">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-white/15 bg-neutral-50/20 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-white truncate">Instagram Reel • Spring Launch</p>
                      <p className="text-xs text-white/60">Scheduled • Today 3:30 PM</p>
                    </div>
                    <div className="h-6 w-6 rounded bg-blue-500/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></div>
                    </div>
                  </div>

                  <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/8 transition-all duration-200">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-white/15 bg-neutral-50/20 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h8M8 16h6"/></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-white truncate">LinkedIn Post • Case Study</p>
                      <p className="text-xs text-white/60">Queued • 5 mins</p>
                    </div>
                    <div className="h-6 w-6 rounded bg-green-500/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 stroke-[2] text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                  </div>

                  <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/8 transition-all duration-200">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-white/15 bg-neutral-50/20 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m22 12-4-2v4l4-2z"/><rect x="2" y="4" width="16" height="16" rx="2"/></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-white truncate">YouTube Short • Teaser</p>
                      <p className="text-xs text-white/60">Failed • Retry needed</p>
                    </div>
                    <div className="h-6 w-6 rounded bg-red-500/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 stroke-[2] text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m18 6-12 12"/><path d="m6 6 12 12"/></svg>
                    </div>
                  </div>
                </div>

                <div id="activityFooter" className="mt-4 pt-4 border-t border-white/10 hidden">
                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 hover:border-white/20 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    New Campaign
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
