"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import type { ArtPiece } from "@prisma/client";
import Return from "@/app/assets/icons/return.png";
import "./modal.css";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  painting: ArtPiece;
}

Modal.setAppElement("#__next");

export default function ArtDetails({
  isOpen,
  onRequestClose,
  painting,
}: ModalProps) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState<"front" | "back">("front");

  const toggleImage = () => {
    setActiveImage(activeImage === "front" ? "back" : "front");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Inventory Item Delete Confirmation"
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      <div className="w-full h-full flex flex-col">
        <div className="relative w-full mb-2">
          <button
            className="absolute left-0 top-0 cursor-pointer p-2 z-10 hover:opacity-80 transition-all hover:scale-110 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <Image
              src={Return}
              alt="Return arrow"
              height={24}
              width={24}
              onClick={onRequestClose}
            />
          </button>
          <h2 className="text-xl md:text-2xl font-bold text-center font-playfair text-gray-900 mt-1">
            {painting.title}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row w-full justify-center items-center mt-4 md:mt-6 relative flex-1 min-h-0">
          <div className="flex flex-row md:flex-col gap-2 md:absolute md:left-2 md:top-0 mb-2 md:mb-0">
            <div
              className="cursor-pointer rounded-lg overflow-hidden border-3 transition-all w-[60px] h-[60px] flex-shrink-0 shadow-md hover:shadow-lg hover:scale-105"
              style={{
                borderColor:
                  activeImage === "front" ? "#3b82f6" : "rgba(0, 0, 0, 0.1)",
                borderWidth: activeImage === "front" ? "3px" : "2px",
                boxShadow:
                  activeImage === "front"
                    ? "0 0 0 2px rgba(59, 130, 246, 0.2), 0 4px 12px rgba(59, 130, 246, 0.3)"
                    : "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Image
                src={painting.imageUrlFront || "/errorImg.png"}
                alt="front side"
                width={60}
                height={60}
                onClick={() => setActiveImage("front")}
                className="object-cover w-full h-full hover:opacity-90 transition-opacity"
              />
            </div>
            <div
              className="cursor-pointer rounded-lg overflow-hidden border-3 transition-all w-[60px] h-[60px] flex-shrink-0 shadow-md hover:shadow-lg hover:scale-105"
              style={{
                borderColor:
                  activeImage === "back" ? "#3b82f6" : "rgba(0, 0, 0, 0.1)",
                borderWidth: activeImage === "back" ? "3px" : "2px",
                boxShadow:
                  activeImage === "back"
                    ? "0 0 0 2px rgba(59, 130, 246, 0.2), 0 4px 12px rgba(59, 130, 246, 0.3)"
                    : "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Image
                src={painting.imageUrlBack || "/errorImg.png"}
                alt="back side"
                width={60}
                height={60}
                onClick={() => setActiveImage("back")}
                className="object-cover w-full h-full hover:opacity-90 transition-opacity"
              />
            </div>
          </div>

          <div className="fixed-image-container mx-auto">
            <img
              src={
                activeImage === "front"
                  ? painting.imageUrlFront || "/errorImg.png"
                  : painting.imageUrlBack || "/errorImg.png"
              }
              alt="Main Img"
            />
          </div>
        </div>

        <div className="mt-2 md:mt-3 px-2 md:px-4 flex-shrink-0">
          <div className="mb-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 border border-gray-200">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-indigo-600 font-semibold text-xs uppercase tracking-wide">
                  Medium:
                </span>
                <p className="text-gray-800 text-xs font-medium">
                  {painting.medium}
                </p>
              </div>
              {painting.size && (
                <div className="flex items-center gap-2">
                  <span className="text-indigo-600 font-semibold text-xs uppercase tracking-wide">
                    Size:
                  </span>
                  <p className="text-gray-800 text-xs font-medium">
                    {painting.size}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="mb-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
            <div className="flex items-start gap-2">
              <svg
                className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="font-semibold text-xs text-gray-800 leading-tight">
                All paintings include a certificate of authenticity signed by
                the artist
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-2 flex flex-col sm:flex-row justify-between gap-2 px-2 md:px-4 border-t border-gray-200 flex-shrink-0">
          <button
            className="w-full sm:w-auto border-2 border-gray-300 bg-white text-gray-700 rounded-lg py-3 px-6 text-sm font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm hover:shadow-md"
            onClick={() => {
              onRequestClose();
            }}
          >
            Return
          </button>
          <button
            className="w-full sm:w-auto border-0 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg py-3 px-8 text-sm font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-100"
            onClick={() => {
              const queryString = new URLSearchParams({
                id: painting.id.toString(),
                title: painting.title,
                medium: painting.medium,
                price: painting.price.toString(),
                isVertical: painting.isVertical.toString(),
                size: painting.size,
                shippingWeight: painting.shippingWeight,
                shippingLength: painting.shippingLength,
                shippingHeight: painting.shippingHeight,
                shippingWidth: painting.shippingWidth,
                inStock: painting.inStock.toString(),
                imageUrlFront: painting.imageUrlFront,
                imageUrlBack: painting.imageUrlBack,
                clientId: painting.clientId?.toString() || "",
              }).toString();
              router.push(`/cart?${queryString}`);
              onRequestClose();
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </Modal>
  );
}
