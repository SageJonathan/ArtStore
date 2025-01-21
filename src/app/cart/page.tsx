// // This is checkout
// //  Do we make a cart? Do we need one?

// // Get shipping through API && Display

//payment button can only be clciked once drop down is completed***

"use client";

import { useSearchParams,useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import TaxesForm from "@/components/cart/taxesForm";
import StripeIcon from "@/app/assets/icons/stripe.png";

export default function CartPage() {
  const [activeImage, setActiveImage] = useState<"front" | "back">("front");
  const [taxRate, setTaxRate] = useState<number>(0); 
  const [totalCost, setTotalCost] = useState<number>(0); 
  
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const title = searchParams.get("title");
  const size = searchParams.get("size");
  const medium = searchParams.get("medium");
  const price = parseFloat(searchParams.get("price") || "0");
  const isVertical = searchParams.get("isVertical") === "true";
  // const weight = searchParams.get("weight");
  // const inStock = searchParams.get("inStock") === "true";
  const imageUrlFront = searchParams.get("imageUrlFront");
  const imageUrlBack = searchParams.get("imageUrlBack");
  // const clientId = searchParams.get("clientId");
  const width = isVertical ? 350 : 800;
  const height = isVertical ? 350 : 800;

  const toggleImage = () => {
    setActiveImage(activeImage === "front" ? "back" : "front");
  };

  useEffect(() => {
    const shippingCost = 50; 
    const validPrice = price || 0; 
    const validTaxRate = taxRate || 0; 
    const calculatedTax = validPrice * validTaxRate;
    const newTotalCost = validPrice + calculatedTax + shippingCost;
    setTotalCost(newTotalCost > 0 ? newTotalCost : 0); 
  }, [price, taxRate]);
  

  const handleTaxChange = (tax: number) => {
    setTaxRate(tax);
  };

  const router = useRouter();


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
              <p>Price: {price.toFixed(2)} CAD</p>
            </div>
            <TaxesForm onTaxChange={handleTaxChange} />
            <div className="mb-5 mt-5 leading-relaxed">
              <h1 className="font-bold">Estimated Cost:</h1>
              <p>Tax: {((price * taxRate) || 0).toFixed(2)}</p>
              <p>Shipping Cost: 50.00</p>
              <p>Total Cost: {totalCost.toFixed(2)} CAD</p>
            </div>
          </div>
          <div className="mb-1">
            <h1 className="font-bold mb-1">Payment</h1>

            <div className="block">
                <button
                  //  disabled={Add logic } 
                className="bg-purple-200 border rounded-md px-2 text-lg"
                id="paypal-payment"
                type="button"
                onClick={() => {
                  const queryString = new URLSearchParams({
                    amount: totalCost.toFixed(2),
                    id: id || '',
                  }).toString();
                  router.push(`/stripe-checkout?${queryString}`);
                }}
              >
                <Image
                  src={StripeIcon}
                  alt="Stripe Icon"
                  width={80}
                  height={80}
                  className="pl-2"
                />
              </button>
              </div>
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
