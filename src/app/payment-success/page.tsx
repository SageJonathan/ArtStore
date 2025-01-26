'use client'

import { useSearchParams} from "next/navigation";

export default function PaymentSuccess () {
  const searchParams = useSearchParams();
  const amount= searchParams.get("amount");
  
    return (
      <main className=" w-full h-full p-10 text-white text-center border  rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
          <h2 className="text-2xl">You successfully sent</h2>
  
          <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
            ${amount}
          </div>
        </div>
        <div className="bg-cover bg-center" style={{ backgroundImage: `url('/flowers.webp')`, height: "60vh" }}></div>
      </main>
    );
  }



