"use client";

import { IBluetooth } from "@/types/settings/bluetooth";
import { IDesktopWallpaper } from "@/types/settings/wallpaper";
import { IWifi } from "@/types/settings/wifi";
import React from "react";

import DefaultWallpaper from "@/assets/images/backgrounds/amber-orbits.jpg";

interface SettingsItems {
  wifi?: IWifi;
  bluetooth?: IBluetooth;

  appearance: "light" | "dark" | "auto";

  wallpaper: IDesktopWallpaper;
}

interface SettingsContext extends SettingsItems {
  setSettings: (settings: Partial<SettingsItems>) => void;
}

const initialSettings: SettingsItems = {
  appearance: "auto",
  wallpaper: {
    wallpaper: {
      name: "Sierra Sonoma",
      path: DefaultWallpaper,
      theme: "light",
    },
    isDynamic: false,
  },
};

const initialSettingsContext: SettingsContext = {
  ...initialSettings,
  setSettings: () => {},
};

export const SettingsContext = React.createContext<SettingsContext>(
  initialSettingsContext
);

interface SettingsProviderProps {
  children: React.ReactNode;
}

export default function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, _setSettings] = React.useState<SettingsContext>(
    initialSettingsContext
  );

  const setSettings = (settings: Partial<SettingsContext>) => {
    _setSettings((prev) => ({ ...prev, ...settings }));
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        setSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
