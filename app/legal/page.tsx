import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal — Privacy Policy & Terms | JinoShare",
  description: "Read JinoShare's Privacy Policy and Terms of Service."
};

export default function LegalPage() {
  const effectiveDate = "August 12, 2025";

  return (
    <div className="container-narrow space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Legal</h1>
        <p className="text-gray-600">Privacy Policy and Terms of Service for Our Application.</p>
      </header>

      {/* Table of contents */}
      <nav className="card">
        <h2 className="font-semibold mb-2">Contents</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li><a className="text-brand-600 hover:underline" href="#privacy-policy">Privacy Policy</a></li>
          <li><a className="text-brand-600 hover:underline" href="#terms-of-service">Terms of Service</a></li>
        </ul>
      </nav>

      {/* Privacy Policy */}
      <section id="privacy-policy" className="card space-y-4 scroll-mt-24">
        <h2 className="text-2xl font-bold">Privacy Policy</h2>
        <p className="text-sm text-gray-500">Effective Date: {effectiveDate}</p>

        <p>
          We are committed to protecting your privacy. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information when you use our website
          or services.
        </p>

        <h3 className="font-semibold">Information We Collect</h3>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>Information you provide (e.g., name, email) when you sign in or contact support.</li>
          <li>Social account details you connect for posting and scheduling.</li>
          <li>Content you create, edit, or schedule.</li>
          <li>Usage and device data (for performance and analytics).</li>
        </ul>

        <h3 className="font-semibold">How We Use Information</h3>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>To provide, maintain, and improve the service.</li>
          <li>To authenticate and link your social accounts.</li>
          <li>To facilitate content generation, scheduling, and posting.</li>
          <li>To communicate with you and offer support.</li>
          <li>To analyze usage and improve performance.</li>
        </ul>

        <h3 className="font-semibold">Sharing Your Information</h3>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>With platform APIs (e.g., X, LinkedIn, Instagram) solely to perform requested actions (like posting).</li>
          <li>With analytics providers (aggregated or anonymized where possible).</li>
          <li>When required by law, legal process, or to protect rights and safety.</li>
        </ul>

        <h3 className="font-semibold">Data Storage and Security</h3>
        <p>
          We use industry-standard security to protect your information. No method is 100% secure, but we
          work to safeguard personal data against unauthorized access, use, or disclosure.
        </p>

        <h3 className="font-semibold">Third‑Party Services</h3>
        <p>
          Authentication and posting features rely on third‑party platforms (e.g., X, Google, GitHub),
          which have their own policies and terms.
        </p>

        <h3 className="font-semibold">Your Choices</h3>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>Disconnect linked accounts at any time.</li>
          <li>Request deletion of your account or data.</li>
          <li>Contact us with any privacy questions or requests.</li>
        </ul>

        <h3 className="font-semibold">Updates</h3>
        <p>
          We may update this policy. We’ll notify you in‑app or via email when material changes occur.
        </p>

        <h3 className="font-semibold">Contact</h3>
        <p>
          Email: <a className="text-brand-600 hover:underline" href="mailto:hello@jinoshare.com">hello@jinoshare.com</a>
        </p>
      </section>

      {/* Terms of Service */}
      <section id="terms-of-service" className="card space-y-4 scroll-mt-24">
        <h2 className="text-2xl font-bold">Terms of Service</h2>
        <p className="text-sm text-gray-500">Effective Date: {effectiveDate}</p>

        <p>
          Welcome to our application. By accessing or using our platform, you agree to these Terms of Service
          (“Terms”).
        </p>

        <h3 className="font-semibold">1. Use of Our Services</h3>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>Create, generate, and schedule social content.</li>
          <li>Link social accounts and manage drafts and posts.</li>
          <li>Use the platform lawfully and maintain account security.</li>
        </ul>

        <h3 className="font-semibold">2. Account & Authentication</h3>
        <p>
          You may log in using supported providers (e.g., Google, GitHub, Facebook, X). You are responsible for managing
          your linked accounts and any content posted.
        </p>

        <h3 className="font-semibold">3. Intellectual Property</h3>
        <p>
          You retain rights to content you create or schedule. Our platform code, design, and brand are the
          property of JinoShare and may not be misused or copied.
        </p>

        <h3 className="font-semibold">4. Posting & Integrations</h3>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>Posts are sent via platform APIs according to your instructions.</li>
          <li>Delivery and engagement are not guaranteed.</li>
          <li>You are responsible for any automated or scheduled content.</li>
        </ul>

        <h3 className="font-semibold">5. Termination</h3>
        <p>
          You may stop using the service at any time. We may suspend or terminate access for violations of
          these Terms or misuse.
        </p>

        <h3 className="font-semibold">6. Disclaimer</h3>
        <p>
          We, is provided “as is.” We make no guarantees about uptime, performance, or outcomes and
          are not liable for errors in generated content, missed schedules, failed posts, or platform
          outages/changes.
        </p>

        <h3 className="font-semibold">7. Changes</h3>
        <p>
          We may update these Terms. Continued use after changes constitutes acceptance.
        </p>

        <h3 className="font-semibold">Contact</h3>
        <p>
          Email: <a className="text-brand-600 hover:underline" href="mailto:hello@jinoshare.com">hello@jinoshare.com</a>
        </p>
      </section>
    </div>
  );
}