"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
  const path = usePathname();
  const { data: session } = useSession();

  const nav = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/logs", label: "Logs" }
  ];

  return (
    <header className="border-b border-gray-200">
      <div className="container-narrow flex items-center justify-between py-4">
        <Link href="/" className="font-bold text-brand-600">JinoShare</Link>
        <nav className="flex items-center gap-4">
          {nav.map(n => (
            <Link key={n.href}
              className={`text-sm ${path === n.href ? "text-brand-600 font-semibold" : "text-gray-600 hover:text-gray-900"}`}
              href={n.href}>{n.label}</Link>
          ))}
          {session ? (
            <>
              <span className="text-sm text-gray-600">Hi, {session.user?.name || session.user?.email}</span>
              <button className="btn-outline" onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
            </>
          ) : (
            <Link href="/auth" className="btn-outline">Sign in</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
