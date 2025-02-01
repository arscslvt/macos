import { DefaultDesktopToolbar } from "@/components/defaults/desktop.defaults";
import Wallpaper from "@/components/wallpaper";
import React from "react";

export default function DesktopLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <>
      <Wallpaper />
      <div className="relative z-0">
        <DefaultDesktopToolbar />
        {children}
      </div>
    </>
  );
}
