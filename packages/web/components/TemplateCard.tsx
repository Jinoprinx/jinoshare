import React from 'react';
import Link from 'next/link';

interface TemplateCardProps {
  title: string;
  category: string;
  content: string;
  templateName: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ title, category, content, templateName }) => {
  return (

    <div className="relative hover:bg-white/[0.04] transition-all duration-300 group rounded-2xl p-6" style={{ width: '19rem', backgroundColor: 'hsla(240, 15%, 9%, 1)', backgroundImage: 'radial-gradient(at 88% 40%, hsla(240, 15%, 9%, 1) 0px, transparent 85%), radial-gradient(at 49% 30%, hsla(240, 15%, 9%, 1) 0px, transparent 85%), radial-gradient(at 14% 26%, hsla(240, 15%, 9%, 1) 0px, transparent 85%), radial-gradient(at 0% 64%, hsla(263, 93%, 56%, 1) 0px, transparent 85%), radial-gradient(at 41% 94%, hsla(284, 100%, 84%, 1) 0px, transparent 85%), radial-gradient(at 100% 99%, hsla(306, 100%, 57%, 1) 0px, transparent 85%)', boxShadow: '0px -16px 24px 0px rgba(255,255,255,0.25) inset' }}>
      <div style={{ overflow: 'hidden', pointerEvents: 'none', position: 'absolute', zIndex: -10, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'calc(100% + 2px)', height: 'calc(100% + 2px)', backgroundImage: 'linear-gradient(0deg, hsl(0, 0%, 100%) -50%, hsl(0, 0%, 40%) 100%)', borderRadius: '1rem' }}>
        <div style={{ content: '', pointerEvents: 'none', position: 'fixed', zIndex: 200, top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(0deg)', transformOrigin: 'left', width: '200%', height: '10rem', backgroundImage: 'linear-gradient(0deg, hsla(0,0%,100%,0) 0%, hsl(277,95%,60%) 40%, hsl(277,95%,60%) 60%, hsla(0,0%,40%,0) 100%)', animation: 'rotate 8s linear infinite' }}></div>
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-xl font-medium text-white tracking-tight">{title}</h3>
            <p className="text-xs text-neutral-500">{category}</p>
          </div>
        </div>
      </div>
      <p className="text-sm text-neutral-300 mb-8">{content}</p>
      <Link href={`/dashboard/ai/planner?template=${templateName}`}>
        <a className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 hover:border-white/20 transition-all duration-200">
          Use Template
        </a>
      </Link>
    </div>
  );
};

export default TemplateCard;