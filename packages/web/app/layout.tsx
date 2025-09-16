import './../styles/globals.css';
import AuthProvider from "@components/AuthProvider";

export const metadata = {
  title: 'JinoShare — Create Once, Share Everywhere',
  description:
    'JinoShare generates on‑brand text, images, and videos, schedules them, and publishes to all your social channels in a single click—complete with smart captions, hashtags, and UTM tracking.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-full bg-[#000000] text-white antialiased font-text overflow-x-hidden">
        <AuthProvider>
        {/* Gradient Background */}
        <div className="homepage-gradient">
          <div className="gradient-circle circle-blue"></div>
          <div className="gradient-circle circle-purple"></div>
          <div className="gradient-circle circle-green"></div>
          <div className="overlay-gradients"></div>
        </div>

        {/* Existing Glow Light */}
        <div className="glow-light"></div>

        {children}
        </AuthProvider>
      </body>
    </html>
  );
}