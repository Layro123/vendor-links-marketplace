export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: January 2025</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Information We Collect</h2>
            <p>
              We collect information you provide directly when making a purchase, including your
              email address and payment information. Payment details are processed securely through
              Stripe and we never have access to your full credit card information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">How We Use Your Information</h2>
            <p>
              Your information is used solely to process your purchase and deliver your digital
              products. We do not sell, rent, or share your personal information with third parties
              for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Payment Processing</h2>
            <p>
              All payments are processed securely through Stripe, a PCI-compliant payment processor.
              We do not store credit card numbers, CVV codes, or other sensitive payment data on our
              servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Data Retention</h2>
            <p>
              We retain your purchase information for accounting and legal purposes. You may request
              deletion of your personal data by contacting us, subject to any legal obligations we
              may have to retain certain information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Cookies</h2>
            <p>
              We may use essential cookies to maintain site functionality. We do not use tracking
              cookies or share data with advertising networks.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this
              page with an updated revision date.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <a href="/" className="text-[#26FF00] hover:underline">
            &larr; Back to Store
          </a>
        </div>
      </div>
    </div>
  );
}
