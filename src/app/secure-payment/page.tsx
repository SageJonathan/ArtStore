export default function SecurePaymentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 via-white to-rose-50/20 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-white to-rose-50/30 rounded-lg p-8 md:p-12 shadow-lg border border-rose-200/50">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-rose-900 mb-6 pb-4 border-b border-rose-200/50">
            Secure Payment Processing
          </h1>

          <div className="space-y-8 font-merriweather text-gray-800">
            <section>
              <h2 className="text-2xl font-playfair font-bold text-rose-800 mb-4">
                Your Security is Our Priority
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                We understand that purchasing art online requires trust and confidence. 
                That&apos;s why we&apos;ve implemented industry-leading security measures to protect 
                your personal and financial information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold text-rose-800 mb-4">
                Powered by Stripe
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                All payments are processed securely through Stripe, one of the world&apos;s 
                most trusted payment processors. Stripe is used by millions of businesses 
                worldwide and handles billions of dollars in transactions annually.
              </p>
              <div className="bg-white/50 rounded-lg p-4 border border-rose-100 mb-4">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>PCI DSS Level 1 compliant (the highest level of certification)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>256-bit SSL encryption for all data transmission</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Your card details are never stored on our servers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Fraud detection and prevention systems</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold text-rose-800 mb-4">
                Accepted Payment Methods
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                We accept all major credit and debit cards:
              </p>
              <div className="bg-white/50 rounded-lg p-4 border border-rose-100">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
                  <li>• Visa</li>
                  <li>• Mastercard</li>
                  <li>• American Express</li>
                  <li>• Discover</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold text-rose-800 mb-4">
                What You Can Expect
              </h2>
              <div className="space-y-4">
                <div className="bg-white/50 rounded-lg p-4 border border-rose-100">
                  <h3 className="font-semibold text-rose-800 mb-2">Secure Checkout Process</h3>
                  <p className="text-gray-700">
                    Our checkout process uses encrypted connections (HTTPS) to ensure your 
                    information is protected from the moment you enter it.
                  </p>
                </div>
                <div className="bg-white/50 rounded-lg p-4 border border-rose-100">
                  <h3 className="font-semibold text-rose-800 mb-2">Payment Confirmation</h3>
                  <p className="text-gray-700">
                    You&apos;ll receive an immediate email confirmation once your payment is 
                    successfully processed, providing you with peace of mind.
                  </p>
                </div>
                <div className="bg-white/50 rounded-lg p-4 border border-rose-100">
                  <h3 className="font-semibold text-rose-800 mb-2">Dispute Resolution</h3>
                  <p className="text-gray-700">
                    In the rare event of any payment issues, Stripe provides comprehensive 
                    dispute resolution and chargeback protection.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-amber-50/50 rounded-lg p-6 border border-amber-200">
              <h2 className="text-2xl font-playfair font-bold text-amber-800 mb-4">
                Questions About Payment Security?
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                If you have any concerns or questions about our payment security measures, 
                please don&apos;t hesitate to contact us at{" "}
                <a
                  href="mailto:support@sagecodes.tech"
                  className="text-amber-700 hover:text-amber-900 underline"
                >
                  support@sagecodes.tech
                </a>
                . We&apos;re here to help ensure you feel completely confident in your purchase.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

