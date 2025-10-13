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
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plans`);
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscriptions/initialize`,
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
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mb-6 text-center space-y-2">
        <h1 className="font-display text-3xl font-bold">Pricing</h1>
        <p className="text-sm text-gray-400">Choose the plan that&apos;s right for you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan._id} className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_1px_0_rgba(255,255,255,0.25),0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md supports-[backdrop-filter]:bg-white/5 p-6 space-y-6">
            <h2 className="font-display text-2xl font-bold text-center">{plan.name}</h2>
            <p className="text-4xl font-bold text-center">${plan.price}<span className="text-sm font-normal">/mo</span></p>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan._id)}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
