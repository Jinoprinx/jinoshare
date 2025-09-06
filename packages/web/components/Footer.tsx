import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link href="#" className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2v6m0 8v6M2 12h6m8 0h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <span className="text-lg font-display font-semibold tracking-tight">JinoShare</span>
            </Link>
            <p className="text-white/60 text-sm mt-4">Create once, share everywhere. AI‑powered content, scheduling, and analytics.</p>
          </div>
          <div>
            <div className="text-sm font-semibold mb-3">Product</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link className="hover:text-white" href="#features">Features</Link></li>
              <li><Link className="hover:text-white" href="#templates">Templates</Link></li>
              <li><Link className="hover:text-white" href="#integrations">Integrations</Link></li>
              <li><Link className="hover:text-white" href="#analytics">Analytics</Link></li>
              <li><Link className="hover:text-white" href="#pricing">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold mb-3">Company</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link className="hover:text-white" href="#">About</Link></li>
              <li><Link className="hover:text-white" href="#">Blog</Link></li>
              <li><Link className="hover:text-white" href="#">Careers</Link></li>
              <li><Link className="hover:text-white" href="#">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold mb-3">Legal</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link className="hover:text-white" href="#">Privacy</Link></li>
              <li><Link className="hover:text-white" href="#">Terms</Link></li>
              <li><Link className="hover:text-white" href="#">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} JinoShare, Inc. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link href="#" className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M8 19c11 0 17-9 17-17 0-.3 0-.5 0-.8A12.2 12.2 0 0 0 27 0a12 12 0 0 1-3.5 1 6 6 0 0 0-10.2 5.5A17 17 0 0 1 2 1s-6 13 7 19a13.8 13.8 0 0 1-8 2c13 7 29-4 27-17a10 10 0 0 0 2-2"/></svg>
            </Link>
            <Link href="#" className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/></svg>
            </Link>
            <Link href="#" className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="4" y="2" width="16" height="20" rx="2"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
