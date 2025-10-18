"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircleIcon, XCircleIcon, Loader2Icon, ArrowRightIcon } from "lucide-react";

export default function SubscriptionSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    const txRef = searchParams.get("tx_ref");
    const transactionId = searchParams.get("transaction_id");
    const statusParam = searchParams.get("status");

    if (statusParam === "cancelled") {
      setStatus("error");
      setMessage("Payment was cancelled. Please try again.");
      return;
    }

    if (!txRef && !transactionId) {
      setStatus("error");
      setMessage("Invalid payment reference. Please contact support.");
      return;
    }

    setTimeout(() => {
      setStatus("success");
      setMessage("Your subscription has been activated successfully!");
    }, 2000);
  }, [searchParams]);

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="homepage-gradient" />

      <div className="relative z-10 max-w-md w-full">
        <div className="rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm p-8 text-center">
          {status === "loading" && (
            <>
              <Loader2Icon className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-spin" />
              <h1 className="text-2xl font-bold mb-2">Processing Payment</h1>
              <p className="text-gray-400">{message}</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
              <p className="text-gray-400 mb-6">{message}</p>

              <button
                onClick={handleGoToDashboard}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6 py-3 text-sm font-medium transition-colors"
              >
                Go to Dashboard
                <ArrowRightIcon className="h-4 w-4" />
              </button>

              <p className="mt-4 text-xs text-gray-500">
                You can now access all premium features
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
              <p className="text-gray-400 mb-6">{message}</p>

              <div className="space-y-3">
                <button
                  onClick={() => router.push("/pricing")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6 py-3 text-sm font-medium transition-colors"
                >
                  Try Again
                </button>

                <button
                  onClick={handleGoToDashboard}
                  className="w-full border border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-md px-6 py-3 text-sm font-medium transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Having issues? <a href="/support" className="text-blue-500 hover:text-blue-400">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
