"use client";
import { useEffect, useState } from "react";

export function ConnectedModal({ provider }: { provider: string }) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm text-center">
        <h2 className="text-xl font-bold mb-2">Connected!</h2>
        <p className="text-gray-700 mb-4">
          Your {provider} account is now linked. You can post directly from your dashboard.
        </p>
        <button className="btn" onClick={() => setVisible(false)}>Got it</button>
      </div>
    </div>
  );
}
