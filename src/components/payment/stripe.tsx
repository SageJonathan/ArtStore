/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/utils/convertToSubcurrency";

interface StripeProps {
  amount: number;
  id: number;
}

const Stripe = ({ amount, id }: StripeProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<any | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: convertToSubcurrency(amount),
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount, address, email, id]);

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !address || !email || !validateEmail(email)) {
      setErrorMessage(
        "Please provide a valid email address and shipping information."
      );
      setLoading(false);
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `https://louiseguay.ca//payment-success?amount=${amount}&id=${id}`,
        shipping: {
          name: address.name,
          address: address,
        },
        receipt_email: email,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div
            className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-rose-300 border-e-transparent"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading payment form...
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 font-playfair">
          Shipping Information
        </h3>
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <AddressElement
            options={{
              mode: "shipping",
              allowedCountries: ["ca", "us"],
              fields: {
                phone: "always",
              },
            }}
            onChange={(event) => {
              if (event.complete) {
                const addressData = event.value.address;
                console.log("Updated Address Data:", addressData);
                setAddress(addressData);
              }
            }}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Email Address
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-rose-300 focus:ring-2 focus:ring-rose-300 focus:ring-opacity-50 transition-all sm:text-sm"
          required
        />
        <p className="mt-1 text-xs text-gray-500">
          We&apos;ll send your receipt to this email
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 font-playfair">
          Payment Details
        </h3>
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          {clientSecret && <PaymentElement />}
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-red-800 font-medium">{errorMessage}</p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-gradient-to-r from-rose-300 via-pink-300/80 to-rose-300 hover:from-rose-400 hover:via-pink-400/80 hover:to-rose-400 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-100 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Processing Payment...</span>
          </>
        ) : (
          <span>Pay ${amount.toFixed(2)} CAD</span>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        <span>Secure payment powered by Stripe</span>
      </div>
    </form>
  );
};

export default Stripe;
