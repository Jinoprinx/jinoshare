"use client";
import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthPage() {
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status || "loading";
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (status === "loading") {
    return <div className="container-narrow py-8">Checking session…</div>;
  }

  if (session) {
    return (
      <div className="container-narrow py-8 space-y-6">
        <h1 className="text-2xl font-bold">You’re signed in</h1>
        <div className="card space-y-2">
          <div className="text-gray-700">
            Logged in as <strong>{session.user?.email || session.user?.name}</strong>
          </div>
          <div className="text-sm text-gray-500">
            User ID: {(session.user as any)?.id}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn" onClick={() => router.push("/dashboard")}>Go to dashboard</button>
          <button className="btn-outline" onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-narrow py-8 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-gray-600">Sign up or sign in to continue</p>
      </div>

      <div className="max-w-md mx-auto card space-y-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <button
          className="btn w-full justify-center"
          onClick={() => signIn("credentials", { email, password, callbackUrl: "/dashboard" })}
        >
          Sign in with Email
        </button>
        <div className="divider">or</div>
        <button
          className="btn w-full justify-center"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          Continue with Google
        </button>
        <button
          className="btn w-full justify-center"
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
        >
          Continue with GitHub
        </button>
      </div>

      <p className="text-center text-sm text-gray-500">
        By continuing, you agree to our Terms and Privacy Policy.
      </p>
    </div>
  );
}
