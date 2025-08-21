"use client";

type ProviderId = "x" | "linkedin" | "facebook" | "instagram";

export function ConnectedModal({ provider, onClose }: { provider: ProviderId; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm text-center">
        <h2 className="text-xl font-bold mb-2">Connected!</h2>
        <p className="text-gray-700 mb-4">
          Your {provider} account is now linked. You can post directly from your dashboard.
        </p>
        <button className="btn" onClick={onClose}>Got it</button>
      </div>
    </div>
  );
}
