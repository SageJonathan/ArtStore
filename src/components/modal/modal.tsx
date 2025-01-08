"use client";

import { useRouter } from "next/navigation";
import Modal from "react-modal";
import type { ArtPiece } from '@prisma/client';
import "./modal.css";


interface Painting extends ArtPiece {
}
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
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Inventory Item Delete Confirmation"
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      <div>
        <button className="absolute left-5 bottom-1" onClick={onRequestClose}>
          Return
        </button>
        <button
          className="absolute right-5 bottom-1"
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
              clientId: painting.clientId?.toString() || '', 
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
