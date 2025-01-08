'use client'

import Modal from 'react-modal';
import './modal.css'; 


interface Painting {
    imageUrlFront: string
     title: string 
     size: string
    isVertical: boolean
    inStock: boolean
  }

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    painting: Painting;
  }

  Modal.setAppElement('#__next');


export default function ArtDetails({ isOpen, onRequestClose, painting }: ModalProps) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Inventory Item Delete Confirmation"
        className="modal-container"
        overlayClassName="modal-overlay"
      >
         
        <div>
          <button className="absolute left-5 bottom-1" onClick={onRequestClose}>Return</button>
          <button className="absolute right-5 bottom-1" onClick={() => {
            confirm();
            onRequestClose();
          }}>Buy Now</button>
        </div>
      </Modal>
    );
  }

  