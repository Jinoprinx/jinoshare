'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface IPlan {
  _id: string;
  name: string;
  price: number;
  features: string[];
}

export default function PricingPage() {
  const [plans, setPlans] = useState<IPlan[]>([]);
  const router = useRouter();

  useEffect(() => {
    console.log('NEXT_PUBLIC_BACKEND_URL:', process.env.NEXT_PUBLIC_BACKEND_URL);
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plans`);
        const data = await res.json();
        setPlans(data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  const handleSubscribe = async (planId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscriptions/initialize`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ planId }),
        }
      );

      const data = await res.json();

      if (data.authorization_url) {
        router.push(data.authorization_url);
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  return (
    <section id="pricing" className="relative pt-20 pb-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter font-geist mb-6">
            Choose your
            <span className="block bg-clip-text font-light text-transparent tracking-tighter font-geist bg-gradient-to-r from-blue-400 via-purple-400 to-green-400">growth plan</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-white/70 leading-relaxed">
            Start free. Upgrade when you’re ready to scale across more channels and campaigns.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl">
            {plans.map((plan) => (
              <div key={plan._id} className="relative hover:bg-white/[0.04] transition-all duration-300 group rounded-2xl p-6" style={{ width: '19rem', backgroundColor: 'hsla(240, 15%, 9%, 1)', boxShadow: '0px -16px 24px 0px rgba(255,255,255,0.10) inset', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex bg-neutral-50/10 border-white/20 border rounded-xl items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21a8 8 0 0 0-16 0"/><circle cx="8" cy="7" r="4"/></svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white tracking-tight">{plan.name}</h3>
                      <p className="text-xs text-neutral-500">Get started</p>
                    </div>
                  </div>
                  <div className="h-5 w-5 rounded-full border-2 border-white/30"></div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl text-white font-geist font-light tracking-tighter">${plan.price}</span>
                    <span className="text-sm text-neutral-400">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-neutral-300 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex justify-center items-center w-4 h-4 bg-blue-600 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="hsl(240,15%,9%)" stroke="hsl(240,15%,9%)" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan._id)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                >
                  Subscribe
                </button>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-white/50">
          All plans include secure OAuth for platform connections. Cancel anytime.
        </p>
      </div>
    </section>
  );
}