'use client'
import { useSearchParams} from "next/navigation";

export default function PaymentSuccess () {
  const searchParams = useSearchParams();
  const amount= searchParams.get("amount");
  
    return (
      <main className=" w-full h-full text-white text-center border bg-gradient-to-tr from-blue-500 to-purple-500">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2 pt-10">Thank you!</h1>
          <h2 className="text-2xl mb-5">You successfully sent</h2>
          <div className="bg-white p-2 mx-20 rounded-md text-purple-500 text-4xl font-bold">
            ${amount}
          </div>
        </div>
        <div className="bg-cover bg-center" style={{ backgroundImage: `url('/flowers.webp')`, height: "65vh" }}></div>
      </main>
    );
  }



