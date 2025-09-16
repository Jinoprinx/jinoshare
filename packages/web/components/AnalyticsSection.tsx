'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const AnalyticsSection = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let chart: Chart | undefined;
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const gradientBlue = ctx.createLinearGradient(0, 0, 0, 240);
        gradientBlue.addColorStop(0, 'rgba(96,165,250,0.35)');
        gradientBlue.addColorStop(1, 'rgba(96,165,250,0.02)');

        const gradientPurple = ctx.createLinearGradient(0, 0, 0, 240);
        gradientPurple.addColorStop(0, 'rgba(192,132,252,0.35)');
        gradientPurple.addColorStop(1, 'rgba(192,132,252,0.02)');

        const gradientGreen = ctx.createLinearGradient(0, 0, 0, 240);
        gradientGreen.addColorStop(0, 'rgba(74,222,128,0.35)');
        gradientGreen.addColorStop(1, 'rgba(74,222,128,0.02)');

        chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
            datasets: [
              {
                label: 'Video',
                data: [32, 41, 39, 55, 62, 58, 70],
                borderColor: 'rgb(96,165,250)',
                backgroundColor: gradientBlue,
                fill: true,
                tension: 0.35,
                pointRadius: 0,
              },
              {
                label: 'Image',
                data: [20, 24, 28, 31, 36, 34, 40],
                borderColor: 'rgb(192,132,252)',
                backgroundColor: gradientPurple,
                fill: true,
                tension: 0.35,
                pointRadius: 0,
              },
              {
                label: 'Text',
                data: [14, 16, 15, 18, 20, 22, 24],
                borderColor: 'rgb(74,222,128)',
                backgroundColor: gradientGreen,
                fill: true,
                tension: 0.35,
                pointRadius: 0,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: { color: 'rgba(255,255,255,0.8)', boxWidth: 12, boxHeight: 12 },
              },
              tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: 'rgba(255,255,255,0.15)',
                borderWidth: 1,
                padding: 12,
              },
            },
            scales: {
              x: {
                ticks: { color: 'rgba(255,255,255,0.6)' },
                grid: { color: 'rgba(255,255,255,0.08)' },
              },
              y: {
                ticks: { color: 'rgba(255,255,255,0.6)' },
                beginAtZero: true,
                grid: { color: 'rgba(255,255,255,0.08)' },
              },
            },
          },
        });
      }
    }
    return () => {
        chart?.destroy();
    }
  }, []);

  return (
    <section id="analytics" className="relative py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6 font-geist font-light tracking-tighter">
              Track what
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent font-geist font-light tracking-tighter">actually performs</span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              See engagement by platform, content type, and campaign. Attribute clicks with UTM parameters automatically applied per post.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-white/70">
              <div className="h-2 w-2 rounded-full bg-blue-400"></div> Video
              <div className="h-2 w-2 rounded-full bg-purple-400 ml-4"></div> Image
              <div className="h-2 w-2 rounded-full bg-emerald-400 ml-4"></div> Text
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent ring-1 ring-white/5 p-6">
              <h3 className="text-base font-display font-semibold tracking-tight mb-2">Engagement by Platform</h3>
              <p className="text-sm text-white/60 mb-4">Last 30 days</p>
              <div>
                <div className="relative w-full h-64">
                  <div className="w-full h-full">
                    <canvas ref={chartRef} id="engagementChart"></canvas>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-sm text-white/70">
                <span>CTR up 18% vs previous period</span>
                <button className="px-3 py-1.5 rounded-lg bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition">Download CSV</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;
