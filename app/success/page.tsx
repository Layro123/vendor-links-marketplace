'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { getProductById, Product } from '@/lib/products';

function SuccessContent() {
  const searchParams = useSearchParams();
  const productsParam = searchParams.get('products');
  const sessionId = searchParams.get('session_id');
  const [purchasedProducts, setPurchasedProducts] = useState<Product[]>([]);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (productsParam && sessionId) {
      const productIds = productsParam.split(',');
      const foundProducts: Product[] = [];
      for (const id of productIds) {
        const p = getProductById(id);
        if (p) foundProducts.push(p);
      }
      if (foundProducts.length > 0) {
        setPurchasedProducts(foundProducts);
        setVerified(true);
      }
    }
  }, [productsParam, sessionId]);

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Access</h1>
          <p className="text-gray-400 mb-6">This page can only be accessed after a successful purchase.</p>
          <a href="/" className="text-[#26FF00] hover:underline">
            &larr; Back to Store
          </a>
        </div>
      </div>
    );
  }

  if (!verified || purchasedProducts.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Verifying your purchase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-[#26FF00] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-400">Thank you for your purchase. Your vendor contacts are below.</p>
        </div>

        <div className="space-y-8">
          {purchasedProducts.map((product) => (
            <div key={product.id} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">{product.digitalContent.title}</h2>

              <div className="space-y-4">
                {product.digitalContent.contacts.map((contact, index) => (
                  <div
                    key={index}
                    className="bg-black/50 p-4 rounded-lg border border-white/5 hover:border-[#26FF00]/30 transition-colors"
                  >
                    <div className="font-semibold text-[#26FF00] text-sm uppercase tracking-wider mb-1">
                      {contact.platform}
                    </div>
                    <div className="text-xl font-mono text-white">{contact.contact}</div>
                    {contact.notes && (
                      <div className="text-gray-400 text-sm mt-2">{contact.notes}</div>
                    )}
                  </div>
                ))}
              </div>

              {product.digitalContent.additionalInfo && (
                <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-gray-300 text-sm">{product.digitalContent.additionalInfo}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-yellow-200 text-sm">
            <strong>Important:</strong> Save this information now. For security reasons, this page
            should be bookmarked or the contacts saved elsewhere. Per our terms of service,
            please do not share or redistribute this vendor information.
          </p>
        </div>

        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            &larr; Back to Store
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full"></div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
