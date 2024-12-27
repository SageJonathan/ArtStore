"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import eye from "@/app/assets/icons/eye.png";
import * as actions from "@/actions";
interface GalleryToggleProps {
  isGrid: boolean;
}

export function GalleryToggle({ isGrid }: GalleryToggleProps) {
  const [currentMode, setCurrentMode] = useState(isGrid);

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
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleDisplayMode}
        className="flex items-center justify-center text-white px-4 py-2 rounded-lg hover:bg-slate focus:outline-none hover:text-black space-x-2"
      >
        <span className="text-center">
          Toggle {currentMode ? "Gallery" : "Grid"} Mode
        </span>
        <Image src={eye} alt="Toggle Display" width={24} height={24} />
      </button>
    </div>
  );
}
