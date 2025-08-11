import "./../styles/globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Jino Share",
  description: "A simple content engine JinoShare built with Next.js"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="container-narrow py-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}

