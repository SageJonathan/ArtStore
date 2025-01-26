"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import eyeBlack from "@/app/assets/icons/eyeBlack.png";
import eyeWhite from "@/app/assets/icons/eyeWhite.png";
import * as actions from "@/actions";
interface GalleryToggleProps {
  isGrid: boolean;
}

export function GalleryToggle({ isGrid }: GalleryToggleProps) {
  const [currentMode, setCurrentMode] = useState(isGrid);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const saveDisplayMode = async () => {
      await actions.displayHomeWithCookies(currentMode);
    };

    saveDisplayMode();
  }, [currentMode]);

  const toggleDisplayMode = async () => {
    const newMode = !currentMode;
    setCurrentMode(newMode); 
  };
  return (
    <div className="fixed bottom-6 right-6 z-50 shadow-md hover:shadow-lg transition-shadow duration-300"
    onMouseEnter={() => setIsHovered(true)} 
    onMouseLeave={() => setIsHovered(false)} 
    >
      <button
        onClick={toggleDisplayMode}
        className="flex items-center justify-center text-white px-4 py-2 rounded-lg bg-purple-200 hover:bg-blue-200 focus:outline-none hover:text-black space-x-2"
      >
        <span className="text-center">
          Toggle {currentMode ? "Gallery" : "Grid"} Mode
        </span>
        <Image src={isHovered ? eyeBlack : eyeWhite}  alt="Toggle Display" width={24} height={24} />
      </button>
    </div>
  );
}
