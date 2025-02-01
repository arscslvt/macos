"use client";

import SetupAccessibilityScreen from "@/components/screens/setup/accessibility";
import SetupChooseRegionScreen from "@/components/screens/setup/choose-region";
import React, { useMemo } from "react";

import { motion } from "framer-motion";
import SetupWifiSelector from "@/components/screens/setup/wifi-selector";
import DataPrivacy from "@/components/screens/setup/data-privacy";
import MigrationAssistant from "@/components/screens/setup/migration-assistant";
import CloudAccount from "@/components/screens/setup/cloud-account";

import CloudAccountCreation from "@/components/screens/setup/cloud-account-creation";
import {
  ScreenNavigationHandler,
  ScreensContext,
  SetupScreen,
  SetupScreensContext,
} from "@/contexts/setup.context";
import Services from "@/components/screens/setup/services";
import Button from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function SetupPage() {
  const screens: SetupScreen[] = useMemo(
    () => [
      { key: "choose-region", element: <SetupChooseRegionScreen /> },
      { key: "accessibility", element: <SetupAccessibilityScreen /> },
      { key: "wifi-selector", element: <SetupWifiSelector /> },
      { key: "data-privacy", element: <DataPrivacy /> },
      { key: "migration-assistant", element: <MigrationAssistant /> },
      { key: "cloud-account", element: <CloudAccount /> },
      { key: "cloud-account-creation", element: <CloudAccountCreation /> },
      { key: "services", element: <Services /> },
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

      {process.env.NEXT_PUBLIC_ENV === "dev" && (
        <div className="absolute bottom-0 left-0 w-dvw pb-4 flex items-center gap-2 justify-center pointer-events-none">
          <div className="flex justify-center items-center gap-2 pointer-events-auto">
            <Button
              onClick={() => handleScreenNavigation({ action: "previous" })}
            >
              <ChevronLeftIcon className="text-background w-5 h-5" />
            </Button>
            <Button onClick={() => handleScreenNavigation({ action: "next" })}>
              <ChevronRightIcon className="text-background w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </ScreensContext.Provider>
  );
}
