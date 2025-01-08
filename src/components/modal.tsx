'use client'

import Modal from 'react-modal';

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

function ArtDetails({ isOpen, onRequestClose, painting }: ModalProps) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Inventory Item Delete Confirmation"
        className=""
        overlayClassName=""
      >
         
        <div className="">
          <button className="" onClick={onRequestClose}>Return</button>
          <button className="" onClick={() => {
            confirm();
            onRequestClose();
          }}>Buy Now</button>
        </div>
      </Modal>
    );
  }
  
  export default ArtDetails;
