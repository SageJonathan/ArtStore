export default function PackagingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 via-white to-rose-50/20 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-white to-rose-50/30 rounded-lg p-8 md:p-12 shadow-lg border border-rose-200/50">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-rose-900 mb-6 pb-4 border-b border-rose-200/50">
            Professional Packaging & Shipping
          </h1>

          <div className="space-y-8 font-merriweather text-gray-800">
            <section>
              <h2 className="text-2xl font-playfair font-bold text-rose-800 mb-4">
                Your Artwork Deserves the Best
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                We understand that each painting is a unique work of art that
                requires careful handling and protection. That's why we use
                professional-grade packaging materials and techniques to ensure
                your artwork arrives in perfect condition, no matter where in
                the world you are.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold text-rose-800 mb-4">
                Our Packaging Process
              </h2>
              <div className="space-y-4">
                <div className="bg-white/50 rounded-lg p-4 border border-rose-100">
                  <h3 className="font-semibold text-rose-800 mb-2 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-rose-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Step 1: Protective Wrapping
                  </h3>
                  <p className="text-gray-700">
                    Each painting is carefully wrapped in acid-free paper and
                    protective materials to prevent scratches, moisture damage,
                    and other potential hazards during transit.
                  </p>
                </div>
                <div className="bg-white/50 rounded-lg p-4 border border-rose-100">
                  <h3 className="font-semibold text-rose-800 mb-2 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-rose-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Step 2: Rigid Protection
                  </h3>
                  <p className="text-gray-700">
                    The wrapped artwork is secured between rigid cardboard or
                    foam board panels, providing structural support and
                    protection from bending or crushing during shipping.
                  </p>
                </div>
                <div className="bg-white/50 rounded-lg p-4 border border-rose-100">
                  <h3 className="font-semibold text-rose-800 mb-2 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-rose-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Step 3: Secure Boxing
                  </h3>
                  <p className="text-gray-700">
                    The protected artwork is placed in a sturdy, custom-sized
                    shipping box with additional padding to ensure it remains
                    secure and immobile during transit.
                  </p>
                </div>
                <div className="bg-white/50 rounded-lg p-4 border border-rose-100">
                  <h3 className="font-semibold text-rose-800 mb-2 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-rose-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Step 4: Final Protection
                  </h3>
                  <p className="text-gray-700">
                    The outer box is sealed with high-quality packing tape and
                    clearly labeled with "Fragile" and "Handle with Care"
                    markings to alert shipping handlers.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-rose-50/50 rounded-lg p-6 border border-rose-200">
              <h2 className="text-2xl font-playfair font-bold text-rose-800 mb-4">
                Questions About Shipping?
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                If you have any questions about our packaging process, shipping
                methods, or need assistance with your order, please contact us
                at{" "}
                <a
                  href="mailto:support@sagecodes.tech"
                  className="text-rose-700 hover:text-rose-900 underline"
                >
                  support@sagecodes.tech
                </a>
                . We're committed to ensuring your artwork arrives safely and on
                time.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
