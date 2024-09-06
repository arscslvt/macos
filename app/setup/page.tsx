"use client";

import SetupAccessibilityScreen from "@/components/screens/setup/accessibility";
import SetupChooseRegionScreen from "@/components/screens/setup/choose-region";
import React, { useMemo } from "react";

import { motion } from "framer-motion";
import SetupWifiSelector from "@/components/screens/setup/wifi-selector";
import DataPrivacy from "@/components/screens/setup/data-privacy";
import MigrationAssistant from "@/components/screens/setup/migration-assistant";
import CloudAccount from "@/components/screens/setup/cloud-account";

import {
  Screen,
  ScreenNavigationHandler,
  ScreensContext,
  SetupScreensContext,
} from "@/hooks/useSetupScreens";

export default function SetupPage() {
  const screens: Screen[] = useMemo(
    () => [
      { key: "choose-region", element: <SetupChooseRegionScreen /> },
      { key: "accessibility", element: <SetupAccessibilityScreen /> },
      { key: "wifi-selector", element: <SetupWifiSelector /> },
      { key: "data-privacy", element: <DataPrivacy /> },
      { key: "migration-assistant", element: <MigrationAssistant /> },
      { key: "cloud-account", element: <CloudAccount /> },
    ],
    []
  );

  const [currentScreen, setCurrentScreen] =
    React.useState<SetupScreensContext["currentScreen"]>(0);

  const handleScreenNavigation = ({ action, id }: ScreenNavigationHandler) => {
    if (action === "next") {
      if (currentScreen < screens.length - 1) {
        setCurrentScreen(currentScreen + 1);
      }
      return;
    }

    if (action === "previous") {
      if (currentScreen > 0) {
        setCurrentScreen(currentScreen - 1);
      }
      return;
    }

    if (action === "page") {
      const index = screens.findIndex((screen) => screen.key === id);
      if (index !== -1) {
        setCurrentScreen(index);
      }
    }
  };

  return (
    <ScreensContext.Provider
      value={{ screens, currentScreen, handleScreenNavigation }}
    >
      <motion.div className="h-full flex justify-center items-center px-10">
        {React.cloneElement(screens[currentScreen].element, {
          key: screens[currentScreen].key,
        })}
      </motion.div>
    </ScreensContext.Provider>
  );
}
