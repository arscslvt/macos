"use client";

import { AppIcon } from "@/components/ui/icon";
import { useApps } from "@/hooks/apps.hook";
import { App } from "@/types/app/app.type";
import { Reorder } from "framer-motion";
import React from "react";

export default function DesktopPage() {
  const { desktopApps, reorderDesktopApps, getAppFromPackage } = useApps();

  return (
    <Reorder.Group
      className="w-full h-full flex gap-2 p-2"
      values={desktopApps}
      onReorder={reorderDesktopApps}
      axis="x"
    >
      {desktopApps.map((packageName) => {
        const _appDetails = getAppFromPackage(packageName) as App;

        return (
          <Reorder.Item
            key={_appDetails.package}
            value={_appDetails.package}
            className="w-max"
          >
            <AppIcon {..._appDetails.details} />
          </Reorder.Item>
        );
      })}
    </Reorder.Group>
  );
}
