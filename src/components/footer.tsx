import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-rose-50/50 to-rose-100/30 border-t border-rose-200/50 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact & About */}
          <div>
            <h3 className="text-rose-900 font-playfair font-bold text-xl mb-4">
              Contact
            </h3>
            <p className="text-gray-700 font-merriweather text-sm mb-2">
              Questions about a piece?
            </p>
            <p className="text-gray-700 font-merriweather text-sm">
              Email:{" "}
              <a
                href="mailto:info@louiseguay.com"
                className="text-rose-700 hover:text-rose-900 underline"
              >
                support@sagecodes.tech
              </a>
            </p>
          </div>

          {/* Policies & Info */}
          <div>
            <h3 className="text-rose-900 font-playfair font-bold text-xl mb-4">
              Information
            </h3>
            <ul className="space-y-2 font-merriweather text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-rose-700 transition-colors"
                >
                  About the Artist
                </Link>
              </li>
              <li>
                <Link
                  href="/secure-payment"
                  className="text-gray-700 hover:text-rose-700 transition-colors"
                >
                  Secure Payment Processing
                </Link>
              </li>
              <li>
                <Link
                  href="/authenticity-certificate"
                  className="text-gray-700 hover:text-rose-700 transition-colors"
                >
                  Authenticity Certificate Included
                </Link>
              </li>
              <li>
                <Link
                  href="/packaging"
                  className="text-gray-700 hover:text-rose-700 transition-colors"
                >
                  Professional Packaging
                </Link>
              </li>
            </ul>
          </div>

          {/* Shipping */}
          <div>
            <h3 className="text-rose-900 font-playfair font-bold text-xl mb-4">
              Shipping
            </h3>
            <ul className="space-y-2 font-merriweather text-sm text-gray-700">
              <li>Carefully packaged for safe delivery</li>
              <li>Tracking provided for all orders</li>
            </ul>
          </div>
        </div>

        {/* Security Badges */}
        <div className="border-t border-rose-200/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-6 justify-center">
              <div className="flex items-center gap-2 text-gray-700">
                <svg
                  className="w-5 h-5 text-rose-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-merriweather">SSL Secured</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <svg
                  className="w-5 h-5 text-rose-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-merriweather">
                  Verified Secure
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <svg
                  className="w-5 h-5 text-rose-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
                <span className="text-sm font-merriweather">Fast Shipping</span>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-600 text-xs font-merriweather">
                © {new Date().getFullYear()} Louise Guay. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
