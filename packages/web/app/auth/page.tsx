'use client';

import { signIn, useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';

export default function AuthPage() {
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status || 'loading';
  const router = useRouter();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailAuth = async () => {
    setIsSubmitting(true);
    try {
      if (mode === 'signup') {
        if (password !== confirm) {
          alert('Passwords do not match');
          return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, firstName, lastName }),
        });

        if (res.ok) {
          await signIn('credentials', {
            email,
            password,
            callbackUrl: '/dashboard',
          });
        } else {
          const data = await res.json();
          alert(data.message || 'Something went wrong');
        }
      } else {
        await signIn('credentials', {
          email,
          password,
          callbackUrl: '/dashboard',
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-sm">
        Checking session…
      </div>
    );
  }

  if (session) {
    return (
      <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl mb-6">
          <h2 className="font-display text-3xl font-bold text-center">Welcome</h2>
        </div>

        <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_1px_0_rgba(255,255,255,0.25),0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md supports-[backdrop-filter]:bg-white/5 p-6 space-y-4">
          <p className="text-white text-sm">
            Signed in as <strong>{session.user?.email || session.user?.name}</strong>
          </p>
          <p className="text-xs text-gray-400">
            User ID: {(session.user as any)?.id}
          </p>
          <div className="flex gap-2 pt-2">
            <button
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              onClick={() => router.push('/dashboard')}
            >
              Go to dashboard
            </button>
            <button
              className="rounded-md border border-white/20 bg-black/60 px-4 py-2 text-sm text-white hover:bg-white/10"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="w-full max-w-4xl mb-6 text-center space-y-2">
        <h1 className="font-display text-3xl font-bold">
          {mode === 'signin' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="text-sm text-gray-400">
          {mode === 'signin' ? 'Sign in to continue' : 'Sign up to get started'}
        </p>
      </div>

      {/* Auth card */}
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_1px_0_rgba(255,255,255,0.25),0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md supports-[backdrop-filter]:bg-white/5 p-6 space-y-6">
        {/* Toggle */}
        <div className="flex items-center justify-center gap-2 rounded-lg bg-white/5 p-1 border border-white/10">
          <button
            onClick={() => setMode('signin')}
            className={`w-1/2 rounded-md px-4 py-2 text-sm font-medium transition ${
              mode === 'signin'
                ? 'bg-white/10 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Sign in
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`w-1/2 rounded-md px-4 py-2 text-sm font-medium transition ${
              mode === 'signup'
                ? 'bg-white/10 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Sign up
          </button>
        </div>

        {/* Email form */}
        <div className="space-y-4">
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-md border border-white/20 bg-black/60 text-white p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          )}
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-md border border-white/20 bg-black/60 text-white p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-white/20 bg-black/60 text-white p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-white/20 bg-black/60 text-white p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
          {mode === 'signup' && (
            <input
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-md border border-white/20 bg-black/60 text-white p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          )}
          <button
            onClick={handleEmailAuth}
            disabled={isSubmitting}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? mode === 'signin'
                ? 'Signing in...'
                : 'Creating account...'
              : mode === 'signin'
              ? 'Sign in with Email'
              : 'Create account'}
          </button>
        </div>

        {/* Divider */}
        <div className="my-2 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-gray-300">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* OAuth buttons */}
        <div className="space-y-3">
          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-black/60 text-white px-4 py-2 text-sm hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 10.2v3.9h5.5c-.2 1.2-1.6 3.6-5.5 3.6-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.3 14.6 2.4 12 2.4 6.9 2.4 2.7 6.6 2.7 11.7S6.9 21 12 21c6 0 9.9-4.2 9.9-10.1 0-.7-.1-1.2-.2-1.7H12z"
              />
            </svg>
            Continue with Google
          </button>

          <button
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-black/60 text-white px-4 py-2 text-sm hover:bg-white/10">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#f0e2e2ff">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 
                3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
                0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61 
                -.546-1.385-1.333-1.754-1.333-1.754-1.089-.745.084-.729.084-.729 
                1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.304 
                3.495.997.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.334-5.466-5.93 
                0-1.31.47-2.38 1.236-3.22-.135-.303-.54-1.523.105-3.176 
                0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02.005 
                2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23 
                .645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 
                1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.375.81 1.096.81 2.215 
                0 1.6-.015 2.89-.015 3.285 0 .315.21.69.825.57C20.565 
                22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              />
            </svg>
            Continue with GitHub
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 pt-4">
          By continuing, you agree to our{' '}
          <a href='/terms'><span className="underline decoration-white/30 hover:decoration-white cursor-pointer">
            Terms
          </span></a>{' '}
          and{' '}
          <a href='/privacy'><span className="underline decoration-white/30 hover:decoration-white cursor-pointer">
            Privacy Policy
          </span></a>.
        </p>
      </div>
    </div>
  );
}