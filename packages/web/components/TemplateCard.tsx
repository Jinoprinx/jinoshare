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
    <div className="relative hover:bg-white/[0.04] transition-all duration-300 group rounded-2xl p-6" style={{ width: '19rem', backgroundColor: 'hsla(240, 15%, 9%, 1)', boxShadow: '0px -16px 24px 0px rgba(255,255,255,0.10) inset', border: '1px solid rgba(255,255,255,0.1)' }}>
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