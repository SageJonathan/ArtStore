"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import type { ArtPiece } from "@prisma/client";
import Return from "@/app/assets/icons/return.png";
import "./modal.css";

interface Painting extends ArtPiece {}
interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  painting: Painting;
}

Modal.setAppElement("#__next");

export default function ArtDetails({
  isOpen,
  onRequestClose,
  painting,
}: ModalProps) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState<"front" | "back">("front");
  const width = painting.isVertical ? 270 : 700;
  const height = painting.isVertical ? 270 : 700;

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
      <div className="">
        <div className="absoulte left-4 top-4 cursor-pointer">
          <Image
            src={Return}
            alt="Return arrow"
            height={15}
            width={15}
            onClick={onRequestClose}
          />
        </div>
        <div className="relative flex flex-row w-full h-full justify-center mt-5">
          <div className="absolute top-0 left-0">
            <div className="">
              <Image
                src={painting.imageUrlFront || "/errorImg.png"}
                alt="front side"
                width={45}
                height={45}
                onClick={toggleImage}
              />
            </div>
            <div className="pt-5">
              <Image
                src={painting.imageUrlBack || "/errorImg.png"}
                alt="back side"
                width={45}
                height={45}
                onClick={toggleImage}
              />
            </div>
          </div>
          <div className="">
            <Image
              src={
                activeImage === "front"
                  ? painting.imageUrlFront || "/errorImg.png"
                  : painting.imageUrlBack || "/errorImg.png"
              }
              alt="Main Img"
              width={width}
              height={height}
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between mt-2">
          <div className="mb-2">
            <p> Medium: {painting.medium}</p>
          </div>
          <div>
            <h1 className="font-bold">
              All paintings include a certificate of authenticity signed
              by the artist
            </h1>
          </div>
        </div>
        <button
          className="absolute left-5 bottom-5 border bg-white-200 text-blue-800 rounded p-2"
          onClick={() => {
            onRequestClose();
          }}
        >
          Return
        </button>
        <button
          className="absolute right-5 bottom-5 border bg-blue-200 rounded p-2"
          onClick={() => {
            const queryString = new URLSearchParams({
              title: painting.title,
              description: painting.description,
              medium: painting.medium,
              price: painting.price.toString(),
              isVertical: painting.isVertical.toString(),
              size: painting.size,
              weight: painting.weight,
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
    </Modal>
  );
}
