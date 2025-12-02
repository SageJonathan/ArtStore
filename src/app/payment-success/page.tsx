"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");

  return (
    <main className="w-full h-full text-center border bg-gradient-to-r from-rose-50 via-pink-50/80 to-rose-50">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2 pt-10 text-rose-900">
          Thank you!
        </h1>
        <h2 className="text-2xl mb-5 text-gray-800">You successfully sent</h2>
        <div className="bg-white p-2 mx-20 rounded-md text-rose-700 text-4xl font-bold">
          ${amount}
        </div>
      </div>
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: `url('/flowers.webp')`, height: "65vh" }}
      ></div>
    </main>
  );
}

function PaymentSuccessFallback() {
  return <div>Loading...</div>;
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<PaymentSuccessFallback />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
