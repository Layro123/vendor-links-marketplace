export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-gray-400 mb-8">Last updated: January 2025</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Digital Products</h2>
            <p>
              All products sold on AJResells are digital information products containing supplier
              and vendor contact information. By completing a purchase, you acknowledge that you are
              buying access to digital content that is delivered immediately upon successful payment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">License Grant</h2>
            <p>
              Upon purchase, you receive a personal, non-exclusive, non-transferable license to use
              the vendor information for your own legitimate business purposes. You may NOT:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Resell, redistribute, or share the vendor contact information</li>
              <li>Publish the information publicly or make it available to others</li>
              <li>Use the information for any illegal or fraudulent purposes</li>
              <li>Claim ownership of the information or create derivative products for sale</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">No Guarantees</h2>
            <p>
              While we make efforts to verify our suppliers, we make NO guarantees regarding:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Your success, profits, or business outcomes from using vendor contacts</li>
              <li>The continued availability or responsiveness of any vendor</li>
              <li>Product quality, pricing, or terms offered by third-party vendors</li>
              <li>Any specific results or earnings from your reselling activities</li>
            </ul>
            <p className="mt-2">
              Results vary significantly based on individual effort, market conditions, and many
              other factors outside our control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Disclaimer of Warranties</h2>
            <p>
              The digital products are provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot;
              without warranty of any kind, express or implied. We disclaim all warranties including
              but not limited to merchantability, fitness for a particular purpose, and
              non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, AJResells shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages, or any loss of
              profits or revenues, whether incurred directly or indirectly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Third-Party Vendors</h2>
            <p>
              We are not responsible for any third-party vendor&apos;s actions, product quality,
              shipping practices, or business conduct. Your dealings with vendors are solely between
              you and the vendor.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of our services
              after changes constitutes acceptance of the modified terms.
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
