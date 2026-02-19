'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

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

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-[#26FF00] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-xl text-gray-300 mb-8">
          Your vendor contacts have been sent to your email.
        </p>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8 mb-8">
          <div className="text-5xl mb-4">📧</div>
          <h2 className="text-xl font-semibold mb-2">Check Your Inbox</h2>
          <p className="text-gray-400">
            We&apos;ve sent your vendor contact details to the email you used at checkout.
            It may take a few minutes to arrive. If you don&apos;t see it in your inbox,
            please check your spam or junk folder and mark it as &quot;Not Spam&quot; so you
            don&apos;t miss future emails from us.
          </p>
        </div>

        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-8">
          <p className="text-yellow-200 text-sm">
            <strong>Important:</strong> Per our terms of service,
            please do not share or redistribute the vendor information.
          </p>
        </div>

        <a
          href="/"
          className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
        >
          &larr; Back to Store
        </a>
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
