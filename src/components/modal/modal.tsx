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

  // Side imgs for back url
  const smallWidth = painting.isVertical ? 45 : 35;
  const smallHeight = painting.isVertical ? 45 : 35;
  // Main img
  const mainWidth = painting.isVertical ? 270 : 350;
  const mainHeight = painting.isVertical ? 270 : 350;

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
        <div className="relative w-full">
          <button
            className="absolute left-0 top-0 cursor-pointer p-2 z-10 hover:opacity-80 transition-opacity"
            aria-label="Close modal"
          >
            <Image
              src={Return}
              alt="Return arrow"
              height={20}
              width={20}
              onClick={onRequestClose}
            />
          </button>
        </div>

        <div className="flex flex-col md:flex-row w-full justify-center items-center mt-8 md:mt-10 relative flex-1">
          <div className="flex flex-row md:flex-col gap-2 md:absolute md:left-2 md:top-0 mb-3 md:mb-0">
            <div
              className="cursor-pointer rounded overflow-hidden border-2 transition-all w-[50px] h-[50px] flex-shrink-0"
              style={{
                borderColor:
                  activeImage === "front" ? "#3b82f6" : "transparent",
              }}
            >
              <Image
                src={painting.imageUrlFront || "/errorImg.png"}
                alt="front side"
                width={50}
                height={50}
                onClick={() => setActiveImage("front")}
                className="object-cover w-full h-full hover:opacity-90 transition-opacity"
              />
            </div>
            <div
              className="cursor-pointer rounded overflow-hidden border-2 transition-all w-[50px] h-[50px] flex-shrink-0"
              style={{
                borderColor: activeImage === "back" ? "#3b82f6" : "transparent",
              }}
            >
              <Image
                src={painting.imageUrlBack || "/errorImg.png"}
                alt="back side"
                width={50}
                height={50}
                onClick={() => setActiveImage("back")}
                className="object-cover w-full h-full hover:opacity-90 transition-opacity"
              />
            </div>
          </div>

          <div
            className={`fixed-image-container ${
              painting.isVertical ? "vertical" : ""
            } mx-auto`}
          >
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

        <div className="mt-3 md:mt-4 px-2 md:px-4">
          <div className="mb-2">
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Medium:</span> {painting.medium}
            </p>
            {painting.size && (
              <p className="text-gray-700 text-sm mt-1">
                <span className="font-medium">Size:</span> {painting.size}
              </p>
            )}
          </div>
          <div className="mb-3">
            <p className="font-bold text-xs md:text-sm text-gray-800">
              All paintings include a certificate of authenticity signed by the
              artist
            </p>
          </div>
        </div>

        <div className="mt-auto pt-2 flex flex-col sm:flex-row justify-between gap-2 px-2 md:px-4">
          <button
            className="w-full sm:w-auto border border-gray-300 bg-white text-blue-800 rounded py-1 px-3 text-sm hover:bg-gray-50 transition-colors"
            onClick={() => {
              onRequestClose();
            }}
          >
            Return
          </button>
          <button
            className="w-full sm:w-auto border-0 bg-blue-500 text-white rounded py-1 px-3 text-sm hover:bg-blue-600 transition-colors"
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
