import { App } from "@/types/app/app.type";
import { exampleApps, exampleAppsPackages } from "@placeholders/apps";
import React from "react";

interface AppsContext {
  installedApps: App[];
  openedApps: App["package"][];
  pinnedApps: App["package"][];
  desktopApps: App["package"][];

  reorderDesktopApps: (apps: App["package"][]) => void;
  getAppFromPackage: (packageId: App["package"]) => App | undefined;
}

export const AppsContext = React.createContext<AppsContext>({} as AppsContext);

export default function AppsProvider({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const [installedApps, setInstalledApps] = React.useState<App[]>(exampleApps);
  const [openedApps, setOpenedApps] = React.useState<App["package"][]>([]);
  const [pinnedApps, setPinnedApps] = React.useState<App["package"][]>([]);

  const [desktopApps, setDesktopApps] =
    React.useState<App["package"][]>(exampleAppsPackages);

  const reorderDesktopApps = (apps: App["package"][]) => {
    setDesktopApps(apps);
  };

  const getAppFromPackage = (packageId: App["package"]) => {
    return installedApps.find((app) => app.package === packageId);
  };

  return (
    <AppsContext.Provider
      value={{
        installedApps,
        openedApps,
        pinnedApps,
        desktopApps,
        reorderDesktopApps,
        getAppFromPackage,
      }}
    >
      {children}
    </AppsContext.Provider>
  );
}
