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
  const [isLoadingShipping, setIsLoadingShipping] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  // Use consistent dimensions for container, images will scale to fit
  const containerWidth = isVertical ? 350 : 600;
  const containerHeight = isVertical ? 350 : 600;

  const toggleImage = (side: "front" | "back") => {
    setActiveImage(side);
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
    setIsLoadingShipping(true);
    setErrorMessage("");
    try {
      const rate = await actions.shippingRate(estimateData);
      if (rate) {
        setShippingCost(rate);
        setShowError(false);
      } else {
        setShippingCost(100);
        setErrorMessage("Unable to calculate shipping. Using default rate.");
      }
    } catch (error) {
      console.error("Error fetching shipping rate:", error);
      setShippingCost(100);
      setErrorMessage("Error calculating shipping. Using default rate.");
    } finally {
      setIsLoadingShipping(false);
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
      setShowError(false);
      setErrorMessage("");
    } else {
      setShippingCost(0);
    }
  }, [
    country,
    stateOrProvince,
    postalCode,
    shippingLength,
    shippingHeight,
    shippingWeight,
    shippingWidth,
  ]);

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
    if (!country || !stateOrProvince || !postalCode) {
      setShowError(true);
      setErrorMessage("Please complete all shipping fields to continue");
      // Scroll to form
      document.getElementById("shipping-form")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }
    if (shippingCost === 0 || shippingCost === null) {
      setShowError(true);
      setErrorMessage("Please wait for shipping calculation to complete");
      return;
    }
    const queryString = new URLSearchParams({
      amount: totalCost.toFixed(2),
      id: id || "",
    }).toString();
    router.push(`/stripe-checkout?${queryString}`);
  };

  const isFormComplete = country && stateOrProvince && postalCode;
  const canProceedToPayment =
    isFormComplete &&
    shippingCost !== null &&
    shippingCost > 0 &&
    !isLoadingShipping;

  return (
    <div className="flex flex-col p-6 md:p-10 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="md:flex md:flex-row gap-6">
        <div className="relative flex flex-row w-full md:w-3/4 justify-center items-start">
          <div className="absolute top-0 left-0 z-10 flex flex-col gap-3">
            <button
              type="button"
              className="cursor-pointer rounded-lg overflow-hidden border-2 transition-all shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              style={{
                borderColor:
                  activeImage === "front" ? "#3b82f6" : "rgba(0, 0, 0, 0.1)",
                borderWidth: activeImage === "front" ? "3px" : "2px",
                boxShadow:
                  activeImage === "front"
                    ? "0 0 0 2px rgba(59, 130, 246, 0.2), 0 4px 12px rgba(59, 130, 246, 0.3)"
                    : "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => toggleImage("front")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleImage("front");
                }
              }}
              aria-label="View front of painting"
              aria-pressed={activeImage === "front"}
            >
              <Image
                src={imageUrlFront || "/errorImg.png"}
                alt="front side"
                width={60}
                height={60}
                className="object-cover w-[60px] h-[60px] hover:opacity-90 transition-opacity pointer-events-none"
              />
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-lg overflow-hidden border-2 transition-all shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              style={{
                borderColor:
                  activeImage === "back" ? "#3b82f6" : "rgba(0, 0, 0, 0.1)",
                borderWidth: activeImage === "back" ? "3px" : "2px",
                boxShadow:
                  activeImage === "back"
                    ? "0 0 0 2px rgba(59, 130, 246, 0.2), 0 4px 12px rgba(59, 130, 246, 0.3)"
                    : "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => toggleImage("back")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleImage("back");
                }
              }}
              aria-label="View back of painting"
              aria-pressed={activeImage === "back"}
            >
              <Image
                src={imageUrlBack || "/errorImg.png"}
                alt="back side"
                width={60}
                height={60}
                className="object-cover w-[60px] h-[60px] hover:opacity-90 transition-opacity pointer-events-none"
              />
            </button>
          </div>
          <div
            className="rounded-xl p-6 shadow-lg border border-gray-300 flex items-center justify-center"
            style={{
              width: `${containerWidth}px`,
              height: `${containerHeight}px`,
              minWidth: `${containerWidth}px`,
              minHeight: `${containerHeight}px`,
              background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
              boxShadow:
                "0 10px 30px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
            }}
          >
            <Image
              src={
                activeImage === "front"
                  ? imageUrlFront || "/errorImg.png"
                  : imageUrlBack || "/errorImg.png"
              }
              alt="Main Img"
              width={containerWidth}
              height={containerHeight}
              className="object-contain rounded-lg filter drop-shadow-lg max-w-full max-h-full"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center w-full md:w-1/2 lg:w-1/4 gap-4">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-5 border border-gray-200 shadow-md">
            <h1 className="font-bold text-indigo-600 text-xl font-playfair mb-4 pb-2 border-b border-gray-300">
              Painting Details
            </h1>
            <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2 mt-3">
              <p className="text-gray-600 text-sm">Title:</p>
              <p className="font-semibold text-gray-800">{title}</p>
              <p className="text-gray-600 text-sm">Medium:</p>
              <p className="font-semibold text-gray-800">{medium}</p>
              <p className="text-gray-600 text-sm">Size:</p>
              <p className="font-semibold text-gray-800">{size}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-md">
            <div id="shipping-form">
              <TaxesForm
                onTaxChange={handleTaxChange}
                onShippingChange={handleShippingChange}
                country={country}
                stateOrProvince={stateOrProvince}
                postalCode={postalCode}
                isError={showError}
              />
            </div>
            {errorMessage && (
              <div className="mx-4 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
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
                  <p className="text-sm text-red-800 font-medium">
                    {errorMessage}
                  </p>
                </div>
              </div>
            )}
            <div className="mb-5 mt-5 leading-relaxed px-4">
              <h1 className="font-bold text-indigo-600 text-xl font-playfair pb-3 border-b border-gray-200 mb-3">
                Cost Estimate
              </h1>
              <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2">
                <p className="text-gray-600 text-sm">Base:</p>
                <p className="font-semibold text-gray-800">
                  ${price.toFixed(2)} CAD
                </p>
                <p className="text-gray-600 text-sm">Tax:</p>
                <p className="font-semibold text-gray-800">
                  ${(price * taxRate || 0).toFixed(2)} CAD
                </p>
                <p className="text-gray-600 text-sm">Shipping:</p>
                <div className="flex items-center gap-2">
                  {isLoadingShipping ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-indigo-600"
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
                      <p className="font-semibold text-gray-500 text-sm">
                        Calculating...
                      </p>
                    </>
                  ) : (
                    <p className="font-semibold text-gray-800">
                      ${(shippingCost || 0).toFixed(2)} CAD
                    </p>
                  )}
                </div>
                <div className="col-span-2 border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-gray-900">Total:</p>
                    <p className="text-xl font-bold text-indigo-600">
                      {isLoadingShipping ? (
                        <span className="text-gray-500 text-base">
                          Calculating...
                        </span>
                      ) : (
                        `${totalCost.toFixed(2)} CAD`
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 pb-4">
              <h1 className="font-bold text-indigo-600 text-xl font-playfair pb-3 border-b border-gray-200 mb-3">
                Secure Checkout
              </h1>
              <div className="block">
                <button
                  className={`border-0 rounded-lg px-6 py-4 text-white font-semibold transition-all shadow-lg w-full flex items-center justify-center gap-3 ${
                    canProceedToPayment
                      ? "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 hover:shadow-xl transform hover:scale-[1.02] active:scale-100 cursor-pointer"
                      : "bg-gray-300 cursor-not-allowed opacity-70"
                  }`}
                  id="stripe-payment"
                  type="button"
                  disabled={!canProceedToPayment}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePayment();
                  }}
                  aria-label={
                    canProceedToPayment
                      ? "Proceed to payment"
                      : "Complete shipping form to proceed"
                  }
                >
                  {canProceedToPayment ? (
                    <Image
                      src={StripeIcon}
                      alt="Stripe Icon"
                      width={120}
                      height={48}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-base">Complete Shipping Details</span>
                  )}
                </button>
                {!canProceedToPayment && (
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    {!isFormComplete
                      ? "Please fill in all shipping fields above"
                      : isLoadingShipping
                      ? "Calculating shipping costs..."
                      : "Waiting for shipping calculation"}
                  </p>
                )}
                {canProceedToPayment && (
                  <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500">
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg shadow-lg flex flex-col md:flex-row justify-between flex-wrap gap-6 font-merriweather">
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-semibold text-gray-800">
              Comes with a Certificate of Authenticity
            </p>
          </div>
          <div className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-semibold text-gray-800">
              The dimensions listed are inclusive of the frame
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
            </svg>
            <p className="font-semibold text-gray-800">
              Available for shipping within Canada and the USA
            </p>
          </div>
          <div className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
            </svg>
            <p className="font-semibold text-gray-800">
              Shipping is handled exclusively through UPS
            </p>
          </div>
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
