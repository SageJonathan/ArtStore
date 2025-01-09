// This is checkout
//  Do we make a cart? Do we need one?

// Get Tax through API && Display
// Get shipping through API && Display
"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import TaxesForm from "@/components/checkout/taxesForm"
import PaypalIcon from "@/app/assets/icons/paypal.png";
import StripeIcon from "@/app/assets/icons/stripe.png";

export default function CartPage() {
  const [activeImage, setActiveImage] = useState<"front" | "back">("front");

  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const size = searchParams.get("size");
  //Remove description
  const description = searchParams.get("description");
  const medium = searchParams.get("medium");
  const price = searchParams.get("price");
  const isVertical = searchParams.get("isVertical") === "true";
  const weight = searchParams.get("weight");
  const inStock = searchParams.get("inStock") === "true";
  const imageUrlFront = searchParams.get("imageUrlFront");
  const imageUrlBack = searchParams.get("imageUrlBack");
  const clientId = searchParams.get("clientId");

  const width = isVertical ? 350 : 800;
  const height = isVertical ? 350 : 800;

  const toggleImage = () => {
    setActiveImage(activeImage === "front" ? "back" : "front");
  };

  return (
    <div className="flex flex-col m-10">
      <div className="md:flex md:flex-row">
        <div className="relative flex flex-row w-full md:w-1/2 lg:w-3/4 justify-center">
          <div className="absolute top-0 left-0">
            <div className="">
              <Image
                src={imageUrlFront || "/errorImg.png"}
                alt="front side"
                width={45}
                height={45}
                onClick={toggleImage}
              />
            </div>
            <div className="pt-5">
              <Image
                src={imageUrlBack || "/errorImg.png"}
                alt="back side"
                width={45}
                height={45}
                onClick={toggleImage}
              />
            </div>
          </div>
          <div className="ml-12 lg:ml-0 ">
            <Image
              src={
                activeImage === "front"
                  ? imageUrlFront || "/errorImg.png"
                  : imageUrlBack || "/errorImg.png"
              }
              alt="Main Img"
              width={width}
              height={height}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center border pl-2 w-full md:w-1/2 lg:w-1/4">
          <div className="">
            <div className="leading-relaxed">
              <h1 className="font-bold">Art Piece:</h1>
              <p>Title: {title}</p>
              <p>Medium: {medium}</p>
              <p>Size: {size}</p>
              <p>Price: {price}.00 CAD</p>
            </div>
                <TaxesForm />
            <div className="mb-5 mt-5 leading-relaxed">
              <h1 className="font-bold">Estimated Cost:</h1>
              <p>Tax: {}10.00 CAD</p>
              <p>Shipping Cost:{} 20.00 CAD</p>
              <p>Total Cost: {}430. 00CAD</p>
            </div>
          </div>
          {/* We need to get some info from payment processing to get cleint info */}
          <div className=" mb-1">
            <h1 className="font-bold mb-1">Payment</h1>
            <form action="submit" className="flex flex-row gap-4">
              <button
                className="flex flex-row items-center justify-center bg-blue-200 border rounded-md px-2 text-lg"
                id="stripe-payment"
              >
                <Image
                  src={PaypalIcon}
                  alt="PaypalIcon"
                  width={80}
                  height={80}
                  className="pl-2"
                />
              </button>
              <button
                className="flex flex-row items-center justify-center bg-purple-200 border rounded-md px-2 text-lg"
                id="paypal-payment"
              >
                <Image
                  src={StripeIcon}
                  alt="Stripe Icon"
                  width={80}
                  height={80}
                  className="pl-2"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-10 p-4 bg-gray-100 border shadow-md flex flex-col md:flex-row justify-between flex-wrap gap-4">
  <div className="flex flex-col gap-2">
    <p>
      <strong>Comes with a Certificate of Authenticity</strong>
    </p>
    <p>
      <strong>The dimensions listed are inclusive of the frame</strong>
    </p>
  </div>
  <div className="mt-5 md:mt-0 flex flex-col gap-2">
    <p>
      <strong>Available for shipping within Canada and the USA</strong>
    </p>
    <p>
      <strong>Shipping is handled exclusively through FedEx</strong>
    </p>
  </div>
</div>

    </div>
  );
}
