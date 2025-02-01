"use client";

import { IWallpaper } from "@/types/settings/wallpaper";
import Image from "next/image";
import React, { useEffect } from "react";

import DefaultWallpaper from "@/assets/images/backgrounds/amber-orbits.jpg";
import { useSettings } from "@/hooks/settings.hook";

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
    <div className="fixed top-0 left-0 w-dvw h-dvh z-0">
      <Image
        quality={100}
        src={selectedWallpaper?.path || DefaultWallpaper}
        alt="Sierra Wallpaper"
        className="w-full h-full object-cover select-none pointer-events-none"
      />
    </div>
  );
}
