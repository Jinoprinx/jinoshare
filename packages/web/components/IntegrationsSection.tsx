import { FaInstagram, FaYoutube, FaTwitter , FaLinkedin, FaFacebookF, FaTiktok } from 'react-icons/fa';

const IntegrationsSection = () => {
  return (
    <section id="integrations" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-geist font-light tracking-tight">
            Works with your favorite platforms
          </h2>
          <p className="text-white/70 mt-3">
            Publish to all major social platforms—and tailor per channel in one flow.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 p-6 bg-gradient-to-b from-white/5 to-transparent ring-1 ring-white/5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Instagram */}
            <div className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3">
              <span className="h-6 w-6 rounded bg-pink-500/30 ring-1 ring-pink-300/40 flex items-center justify-center text-pink-300">
                <FaInstagram className="h-4 w-4" />
              </span>
              <span className="text-sm">Instagram</span>
            </div>

            {/* YouTube */}
            <div className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3">
              <span className="h-6 w-6 rounded bg-red-500/30 ring-1 ring-red-300/40 flex items-center justify-center text-red-300">
                <FaYoutube className="h-4 w-4" />
              </span>
              <span className="text-sm">YouTube</span>
            </div>

            {/* Twitter */}
            <div className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3">
              <span className="h-6 w-6 rounded bg-purple-500/30 ring-1 ring-purple-300/40 flex items-center justify-center text-purple-300">
                <FaTwitter className="h-4 w-4" />
              </span>
              <span className="text-sm">Twitter</span>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3">
              <span className="h-6 w-6 rounded bg-blue-500/30 ring-1 ring-blue-300/40 flex items-center justify-center text-blue-300">
                <FaLinkedin className="h-4 w-4" />
              </span>
              <span className="text-sm">LinkedIn</span>
            </div>

            {/* Facebook */}
            <div className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3">
              <span className="h-6 w-6 rounded bg-blue-700/30 ring-1 ring-blue-500/40 flex items-center justify-center text-blue-400">
                <FaFacebookF className="h-4 w-4" />
              </span>
              <span className="text-sm">Facebook</span>
            </div>

            {/* TikTok */}
            <div className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3">
              <span className="h-6 w-6 rounded bg-emerald-500/30 ring-1 ring-emerald-300/40 flex items-center justify-center text-emerald-300">
                <FaTiktok className="h-4 w-4" />
              </span>
              <span className="text-sm">TikTok</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;