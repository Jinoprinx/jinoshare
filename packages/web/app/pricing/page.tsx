'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { IPlan } from '@/lib/types';
import PricingCard from '@/components/PricingCard';

export default function PricingPage() {
  const [plans, setPlans] = useState<IPlan[]>([]);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
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
    if (status === 'unauthenticated') {
      router.push('/auth');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscriptions/initialize`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`,
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
              <PricingCard key={plan._id} plan={plan} handleSubscribe={handleSubscribe} />
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