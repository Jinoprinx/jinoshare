'use client';

import Link from 'next/link';

export default function VerifiedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_1px_0_rgba(255,255,255,0.25),0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md supports-[backdrop-filter]:bg-white/5 p-6 space-y-4 text-center">
        <h2 className="font-display text-2xl font-bold">Email Verified!</h2>
        <p className="text-gray-300">
          Your email has been successfully verified. You can now sign in to your account.
        </p>
        <Link href="/auth">
          <span className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Go to Sign In
          </span>
        </Link>
      </div>
    </div>
  );
}
