'use client';

import { IPlan } from '@/lib/types'; // Assuming you have a types file

interface PricingCardProps {
  plan: IPlan;
  handleSubscribe: (planId: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, handleSubscribe }) => {
  const getPlanStyles = (planName: string) => {
    switch (planName) {
      case 'Pro':
        return {
          cardStyle: {
            width: '19rem',
            backgroundColor: 'hsla(240, 15%, 9%, 1)',
            backgroundImage: 'radial-gradient(at 88% 40%, hsla(240, 15%, 9%, 1) 0px, transparent 85%), radial-gradient(at 49% 30%, hsla(240, 15%, 9%, 1) 0px, transparent 85%), radial-gradient(at 14% 26%, hsla(240, 15%, 9%, 1) 0px, transparent 85%), radial-gradient(at 0% 64%, hsla(263, 93%, 56%, 1) 0px, transparent 85%), radial-gradient(at 41% 94%, hsla(284, 100%, 84%, 1) 0px, transparent 85%), radial-gradient(at 100% 99%, hsla(306, 100%, 57%, 1) 0px, transparent 85%)',
            boxShadow: '0px -16px 24px 0px rgba(255,255,255,0.25) inset',
          },
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z"/></svg>,
          featureDotClass: 'bg-purple-600',
          button: (
            <button
              onClick={() => handleSubscribe(plan._id)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition-all duration-200 shadow-lg shadow-white/20"
            >
              Start 7-day trial
            </button>
          ),
        };
      case 'Business':
        return {
          cardStyle: {
            width: '19rem',
            backgroundColor: 'hsla(240, 15%, 9%, 1)',
            boxShadow: '0px -16px 24px 0px rgba(255,255,255,0.10) inset',
            border: '1px solid rgba(255,255,255,0.1)',
          },
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 21v-6a4 4 0 0 1 4-4h3"/><path d="M16 3a4 4 0 0 1 4 4v11a3 3 0 0 1-3 3H8"/></svg>,
          featureDotClass: 'bg-emerald-600',
          button: (
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleSubscribe(plan._id)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition-all duration-200 shadow-lg shadow-white/20"
              >
                Start 14-day trial
              </button>
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 hover:bg-white/10 hover:border-white/20 transition-all duration-200">
                Talk to sales
              </button>
            </div>
          ),
        };
      default: // Free plan
        return {
          cardStyle: {
            width: '19rem',
            backgroundColor: 'hsla(240, 15%, 9%, 1)',
            boxShadow: '0px -16px 24px 0px rgba(255,255,255,0.10) inset',
            border: '1px solid rgba(255,255,255,0.1)',
          },
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21a8 8 0 0 0-16 0"/><circle cx="8" cy="7" r="4"/></svg>,
          featureDotClass: 'bg-blue-600',
          button: (
            <div className="flex flex-col gap-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const glowText = document.getElementById(`glow-text-${plan._id}`);
                  if (glowText) {
                    glowText.classList.add('glow');
                    setTimeout(() => {
                      glowText.classList.remove('glow');
                    }, 700);
                  }
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                Get Started Free
              </button>
              <p id={`glow-text-${plan._id}`} className="text-center text-xs text-white/50 transition-all duration-300">
                You are already on this plan
              </p>
            </div>
          ),
        };
    }
  };

  const styles = getPlanStyles(plan.name);

  return (
    <div className="relative hover:bg-white/[0.04] transition-all duration-300 group rounded-2xl p-6" style={styles.cardStyle}>
      {plan.name === 'Pro' && (
        <div style={{ overflow: 'hidden', pointerEvents: 'none', position: 'absolute', zIndex: -10, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'calc(100% + 2px)', height: 'calc(100% + 2px)', backgroundImage: 'linear-gradient(0deg, hsl(0, 0%, 100%) -50%, hsl(0, 0%, 40%) 100%)', borderRadius: '1rem' }}>
          <div style={{ content: '', pointerEvents: 'none', position: 'fixed', zIndex: 200, top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(0deg)', transformOrigin: 'left', width: '200%', height: '10rem', backgroundImage: 'linear-gradient(0deg, hsla(0,0%,100%,0) 0%, hsl(277,95%,60%) 40%, hsl(277,95%,60%) 60%, hsla(0,0%,40%,0) 100%)', animation: 'rotate 8s linear infinite' }}></div>
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex bg-neutral-50/10 border-white/20 border rounded-xl items-center justify-center">
            {styles.icon}
          </div>
          <div>
            <h3 className="text-xl font-medium text-white tracking-tight">{plan.name}</h3>
            <p className="text-xs text-neutral-500">{plan.name === 'Pro' ? 'For serious creators' : plan.name === 'Business' ? 'Teams & brands' : 'Get started'}</p>
          </div>
        </div>
        <div className="h-5 w-5 rounded-full border-2 border-white/30"></div>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl text-white font-geist font-light tracking-tighter">${plan.price}</span>
          <span className="text-sm text-neutral-400">/month</span>
        </div>
        <p className="text-xs text-neutral-500 mt-1">
          {plan.name === 'Pro' ? '7-day free trial' : plan.name === 'Business' ? '14-day free trial' : 'No credit card required'}
        </p>
      </div>

      <ul className="space-y-3 text-sm text-neutral-300 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className={`flex justify-center items-center w-4 h-4 ${styles.featureDotClass} rounded-full`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="hsl(240,15%,9%)" stroke="hsl(240,15%,9%)" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            {feature}
          </li>
        ))}
      </ul>

      {styles.button}
    </div>
  );
};

export default PricingCard;
