/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/utils/convertToSubcurrency";

interface StripeProps {
  amount: number;
  id: number; 
}

const Stripe = ({ amount,id }: StripeProps) => {
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
  }, [amount,address,email, id]);


  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !address || !email || !validateEmail(email)) {
      setErrorMessage("Please provide a valid email address and shipping information.");
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
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
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

      <div className="mt-4 mb-4 ">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex ">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 pl-4 block w-full h-10 rounded-md border-black-900 shadow-md sm:text-sm text-black focus:border-blue-300 focus:ring-blue-200 focus:ring-opacity-50 focus:ring-2 focus:outline-none focus:shadow-[0px_0px_12px_2px_rgba(59,130,246,0.6)]"
          required
        />
      </div>

      {clientSecret && <PaymentElement />}

      {errorMessage && <div className="mt-2 text-red-600">{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default Stripe;


