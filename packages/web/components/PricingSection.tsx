'use client';

import { useRouter } from 'next/navigation';
import { IPlan } from '@/lib/types';
import PricingCard from '@/components/PricingCard';

const PricingSection = () => {
  const router = useRouter();

  const plans: IPlan[] = [
    {
      _id: 'free',
      name: 'Free',
      price: 0,
      features: [
        '10 AI generations/day',
        '3 platforms',
        'Basic scheduler',
        'Community support',
      ],
    },
    {
      _id: 'pro',
      name: 'Pro',
      price: 24,
      features: [
        'Unlimited AI generations',
        '10 platforms + one-click publish',
        'Smart scheduler + best-time predictions',
        'UTM tracking & link shortener',
        'Brand voice profiles',
        '3 team seats + approvals',
        'Priority support',
      ],
    },
    {
      _id: 'business',
      name: 'Business',
      price: 59,
      features: [
        'Unlimited AI generations + assets',
        '15 platforms + per-channel customization',
        'Approvals, roles & permissions',
        'Advanced analytics & CSV export',
        '10 team seats included',
        'API access & webhooks',
      ],
    },
  ];

  const handleSubscribe = (planId: string) => {
    router.push('/pricing');
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
};

export default PricingSection;