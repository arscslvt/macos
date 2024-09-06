import { IUser } from "@/types/account/user";
import countries from "@/utils/countries";
import languages from "@/utils/languages";
import React from "react";

interface SystemContext {
  region: string;
  language: string;
  systemName: string;
  user?: IUser;
  [key: string]: any;

  setSettings: (settings: Partial<Omit<SystemContext, "setSettings">>) => void;
}

const initialSettings: Omit<SystemContext, "setSettings"> = {
  region: countries[0].code,
  language: languages[0].code,
  systemName: "System",
};

const SystemContext = React.createContext<SystemContext>({
  setSettings: () => {},
  region: initialSettings.region,
  language: initialSettings.language,
  systemName: initialSettings.systemName,
  userName: initialSettings.userName,
});

interface SystemProviderProps {
  children: React.ReactNode;
}

export default function SystemProvider({ children }: SystemProviderProps) {
  const [settings, _setSettings] =
    React.useState<Omit<SystemContext, "setSettings">>(initialSettings);

  const setSettings = (
    settings: Partial<Omit<SystemContext, "setSettings">>
  ) => {
    _setSettings((prev) => ({ ...prev, ...settings }));
  };

  return (
    <SystemContext.Provider
      value={{
        ...settings,
        setSettings,

        region: settings.region,
        language: settings.language,
        systemName: settings.systemName,
        userName: settings.userName,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}

export const useSystem = () => React.useContext(SystemContext);
