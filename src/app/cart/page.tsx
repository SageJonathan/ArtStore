"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import { CartRate } from "@/actions/shippo";
import * as actions from "@/actions";
import Image from "next/image";
import TaxesForm from "@/components/cart/taxesForm";
import StripeIcon from "@/app/assets/icons/stripe.png";

function CartPageContent() {
  const [activeImage, setActiveImage] = useState<"front" | "back">("front");
  const [taxRate, setTaxRate] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState<number | null>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [country, setCountry] = useState<string>("");
  const [stateOrProvince, setStateOrProvince] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [showError, setShowError] = useState(false);

  // Get Data From Modal
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const title = searchParams.get("title");
  const size = searchParams.get("size");
  const medium = searchParams.get("medium");
  const price = parseFloat(searchParams.get("price") || "0");
  const isVertical = searchParams.get("isVertical") === "true";
  const shippingWeight = searchParams.get("shippingWeight");
  const shippingWidth = searchParams.get("shippingWidth");
  const shippingLength = searchParams.get("shippingLength");
  const shippingHeight = searchParams.get("shippingHeight");
  const imageUrlFront = searchParams.get("imageUrlFront");
  const imageUrlBack = searchParams.get("imageUrlBack");

  const smallWidth = isVertical ? 45 : 35;
  const smallHeight = isVertical ? 45 : 35;

  const imgWidth = isVertical ? 350 : activeImage === "front" ? 800 : 500;
  const imgHeight = isVertical ? 350 : activeImage === "front" ? 800 : 500;

  const toggleImage = () => {
    setActiveImage(activeImage === "front" ? "back" : "front");
  };

  const handleTaxChange = (tax: number) => {
    setTaxRate(tax);
  };

  const handleShippingChange = (
    newCountry: string,
    newStateOrProvince: string,
    newPostalCode: string
  ) => {
    setCountry(newCountry);
    setStateOrProvince(newStateOrProvince);
    setPostalCode(newPostalCode);
  };

  async function getShippingRate(estimateData: CartRate) {
    try {
      const rate = await actions.shippingRate(estimateData);
      if (rate) {
        setShippingCost(rate);
      } else {
        setShippingCost(100);
      }
    } catch (error) {
      console.error("Error fetching shipping rate:", error);
      setShippingCost(100);
    }
  }

  useEffect(() => {
    if (
      country &&
      stateOrProvince &&
      postalCode &&
      shippingLength &&
      shippingHeight &&
      shippingWeight &&
      shippingWidth
    ) {
      const estimateData = {
        country,
        stateOrProvince,
        postalCode,
        shippingLength,
        shippingHeight,
        shippingWeight,
        shippingWidth,
      };
      getShippingRate(estimateData);
    }
  });

  useEffect(() => {
    const shippingRate = shippingCost || 0;
    const validPrice = price || 0;
    const validTaxRate = taxRate || 0;
    const calculatedTax = validPrice * validTaxRate;
    const newTotalCost = validPrice + calculatedTax + shippingRate;
    setTotalCost(newTotalCost > 0 ? newTotalCost : 0);
  }, [shippingCost, price, taxRate]);

  const router = useRouter();

  const handlePayment = () => {
    if (shippingCost === 0) {
      setShowError(true);
      alert("Please fill in shipping details to continue");
    } else {
      const queryString = new URLSearchParams({
        amount: totalCost.toFixed(2),
        id: id || "",
      }).toString();
      router.push(`/stripe-checkout?${queryString}`);
    }
  };

  return (
    <div className="flex flex-col p-10">
      <div className="md:flex md:flex-row">
        <div className="relative flex flex-row w-full md:w-3/4 justify-center">
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
            <div className={`pt-5 ${isVertical ? "pl-0" : "pl-1"}`}>
              <Image
                src={imageUrlBack || "/errorImg.png"}
                alt="back side"
                width={smallWidth}
                height={smallHeight}
                onClick={toggleImage}
              />
            </div>
          </div>
          <div className="">
            <Image
              src={
                activeImage === "front"
                  ? imageUrlFront || "/errorImg.png"
                  : imageUrlBack || "/errorImg.png"
              }
              alt="Main Img"
              width={imgWidth}
              height={imgHeight}
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center pl-2 w-full md:w-1/2 lg:w-1/4">
          <div className="leading-relaxed border mb-5 p-4">
            <h1 className="font-bold text-blue-600 text-xl font-playfair mb-4">
              Painting Details
            </h1>
            <div className="grid grid-cols-[auto,1fr] gap-x-5">
              <p>Title:</p> <p className="font-semibold">{title}</p>
              <p>Medium:</p> <p className="font-semibold">{medium}</p>
              <p>Size:</p> <p className="font-semibold">{size}</p>
            </div>
          </div>
          <div className="border">
            <div>
              <TaxesForm
                onTaxChange={handleTaxChange}
                onShippingChange={handleShippingChange}
                country={country}
                stateOrProvince={stateOrProvince}
                postalCode={postalCode}
                isError={showError}
              />
            </div>
            <div className="mb-5 mt-5 leading-relaxed pl-4">
              <h1 className="font-bold text-blue-600 text-xl font-playfair pb-2 ">
                Cost Estimate
              </h1>
              <div className="grid grid-cols-[auto,1fr] gap-x-5">
                <p>Base:</p> <p className="font-semibold">{price.toFixed(2)}</p>
                <p>Tax:</p>{" "}
                <p className="font-semibold">
                  {(price * taxRate || 0).toFixed(2)}
                </p>
                <p>Shipping Cost:</p>{" "}
                <p className="font-semibold">
                  {(shippingCost || 0).toFixed(2)}
                </p>
                <p>Total Cost:</p>{" "}
                <p className="font-semibold">{totalCost.toFixed(2)} CAD</p>
              </div>
            </div>

            <div className="pl-4">
              <h1 className="font-bold text-blue-600 text-xl font-playfair pb-2">
                Payment
              </h1>
              <div className="block">
                <button
                  className="bg-purple-200 border rounded-md px-2 text-lg"
                  id="stripe-payment"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePayment();
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
      </div>

      <div className="mt-10 p-4 bg-gray-100 border shadow-md flex flex-col md:flex-row justify-between flex-wrap gap-4 font-merriweather">
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
            <strong>Shipping is handled exclusively through UPS</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

function CartSuccessFallback() {
  return <div>Loading...</div>;
}

export default function CartPageSuccess() {
  return (
    <Suspense fallback={<CartSuccessFallback />}>
      <CartPageContent />
    </Suspense>
  );
}
