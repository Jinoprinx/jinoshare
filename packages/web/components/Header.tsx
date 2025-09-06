import Link from 'next/link';
import { SparklesIcon } from "lucide-react"

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 animate-fade-in delay-0 backdrop-blur-xl bg-black/20 border-b border-white/10" style={{ animationPlayState: 'running' }}>
      <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto px-4">
        <div className="flex lg:py-6 py-4 items-center justify-between">
          <Link href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <SparklesIcon className="h-7 w-7 text-blue-500" />
            </div>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent font-geist font-light tracking-tighter text-xl font-bold">JinoShare</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link className="px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200" href="#features">Features</Link>
            <Link className="px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200" href="#templates">Templates</Link>
            <Link className="px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200" href="#integrations">Integrations</Link>
            <Link className="px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200" href="#analytics">Analytics</Link>
            <Link className="px-4 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200" href="#pricing">Pricing</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/auth" className="hidden sm:inline-flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-white/90 hover:bg-white/10 hover:border-white/20 transition-all duration-200 backdrop-blur-xl">
              Sign In
            </Link>
            <Link href="/dashboard" className="group relative inline-flex h-10 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-black hover:bg-white/90 transition-all duration-200 shadow-lg shadow-white/20">
              <span className="relative z-10">Try for Free</span>
              <div className="absolute inset-0 rounded-xl bg-white opacity-0 blur-lg group-hover:opacity-20 transition-opacity"></div>
            </Link>
            <button className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-[1.5]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
