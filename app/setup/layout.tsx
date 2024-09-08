import React from "react";
import { Metadata } from "next";

import Toolbar, {
  ToolbarItem,
  ToolbarLeading,
  ToolbarTrailing,
} from "@/components/toolbar";
import Wallpaper from "@/components/wallpaper";

import { FaApple } from "react-icons/fa";
import { IoBatteryHalfOutline } from "react-icons/io5";
import { MdOutlineWifi } from "react-icons/md";

export const metadata: Metadata = {
  title: "Setup",
  description: "Setup your macOS web environment.",
};

export default function SetupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative h-dvh flex flex-col">
      <Wallpaper />

      <div className="relative z-10 flex-1">
        <Toolbar>
          <ToolbarLeading>
            <ToolbarItem
              items={[
                {
                  label: "About This Mac",
                },
                "separator",
                {
                  label: "System Settings...",
                  badge: "1 update",
                },
                {
                  label: "App Store",
                },
                "separator",
                {
                  label: "Recent Items",

                  subItems: [
                    {
                      label: "Google Chrome",
                    },
                  ],
                },
                "separator",
                {
                  label: "Force Quit...",
                },
                "separator",
                {
                  label: "Sleep",
                },
                {
                  label: "Restart...",
                },
                {
                  label: "Shut Down...",
                },
                "separator",
                {
                  label: "Lock Screen",
                  shortcut: "⌃⌘Q",
                },
                {
                  label: "Log Out...",
                  shortcut: "⇧⌘Q",
                },
              ]}
            >
              <FaApple className="w-[18px] h-[18px]" />
            </ToolbarItem>
          </ToolbarLeading>

          <ToolbarTrailing>
            <ToolbarItem>
              ∞
              <IoBatteryHalfOutline className="w-[20px] h-[20px]" />
            </ToolbarItem>
            <ToolbarItem>
              <MdOutlineWifi className="w-[18px] h-[18px]" />
            </ToolbarItem>
          </ToolbarTrailing>
        </Toolbar>
        {children}
      </div>
    </div>
  );
}
