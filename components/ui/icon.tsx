import React from "react";
import NoAppIcon from "@assets/icons/no-app.png";
import Image from "next/image";

export default function AppIcon() {
  return (
    <div className="w-12 h-12 min-w-12 min-h-12 max-w-12 max-h-12 aspect-square">
      <Image
        src={NoAppIcon}
        alt="App Icon"
        objectFit="cover"
        width={40}
        height={40}
        className="w-full h-full"
      />
    </div>
  );
}
