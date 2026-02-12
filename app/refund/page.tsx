export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: January 2025</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Digital Product Policy</h2>
            <p>
              Due to the nature of digital products, <strong className="text-white">all sales are
              final</strong>. Once the vendor contact information has been delivered and accessed,
              the purchase cannot be refunded as the digital content has been consumed and cannot be
              &quot;returned.&quot;
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Why No Refunds?</h2>
            <p>
              Our products are digital information that is delivered instantly upon purchase. Unlike
              physical goods, digital products cannot be returned once accessed. The information
              provided retains its full value even after viewing, which is why we cannot offer
              refunds after delivery.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Technical Delivery Issues</h2>
            <p>
              If you experience technical issues that prevent you from accessing your purchased
              content, please contact us immediately. We will work to resolve any delivery problems
              and ensure you receive your digital product. Technical issues that are our fault will
              be addressed promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Exceptions</h2>
            <p>Refunds may be considered on a case-by-case basis ONLY if:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                The digital content was not delivered due to a technical error on our part
              </li>
              <li>You were charged multiple times for the same product in error</li>
              <li>
                You contact us within 24 hours of purchase AND have not accessed the content
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Chargebacks</h2>
            <p>
              Filing a chargeback or payment dispute after receiving and accessing digital content
              constitutes fraud. We maintain records of all deliveries and will contest fraudulent
              chargebacks.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Contact Us</h2>
            <p>
              If you have questions about your purchase or experience issues accessing your content,
              please reach out to us with your order details. We aim to respond within 24-48 hours.
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
