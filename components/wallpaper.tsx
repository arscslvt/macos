"use client";

import { useSettings } from "@/contexts/useSettings";
import { IWallpaper } from "@/types/settings/wallpaper";
import Image from "next/image";
import React, { useEffect } from "react";

import DefaultSonomaWallpaper from "@/assets/images/backgrounds/macOS Sonoma.jpg";

export default function Wallpaper() {
  const { wallpaper } = useSettings();

  const [selectedWallpaper, setSelectedWallpaper] = React.useState<
    IWallpaper | undefined
  >(undefined);

  useEffect(() => {
    if (Array.isArray(wallpaper.wallpaper)) {
      setSelectedWallpaper(wallpaper.wallpaper[0]);
    } else {
      setSelectedWallpaper(wallpaper.wallpaper);
    }
  }, [wallpaper]);

  return (
    <div className="absolute top-0 left-0 w-dvw h-dvh z-0">
      <Image
        quality={100}
        src={selectedWallpaper?.path || DefaultSonomaWallpaper}
        alt="macOS Sonoma Wallpaper"
        className="w-full h-full object-cover select-none pointer-events-none"
      />
    </div>
  );
}
