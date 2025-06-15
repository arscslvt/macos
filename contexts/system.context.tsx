import NotReadyScreen from "@/components/screens/comon/not-ready";
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

type KeyValueSetttings = Omit<SystemContext, "setSettings">;

const initialSettings: Omit<SystemContext, "setSettings"> = {
  region: countries[0].code,
  language: languages[0].code,
  systemName: "System",
};

export const SystemContext = React.createContext<SystemContext>({
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
  const [isLoading, setIsLoading] = React.useState(true);
  const [settings, _setSettings] = React.useState<KeyValueSetttings>({});

  const setSettings = (settings: Partial<KeyValueSetttings>) => {
    setSettingsHandler(settings);
  };

  const setSettingsHandler = (newSettings: Partial<KeyValueSetttings>) => {
    console.log("Requested settings update.");

    const updatedSettings = { ...settings, ...newSettings };
    _setSettings(updatedSettings);

    saveSettings(updatedSettings);
  };

  const saveSettings = (settings: KeyValueSetttings) => {
    // Save locally
    localStorage.setItem("system-settings", JSON.stringify(settings));

    // TODO: Try to save to the database if the user have an account

    console.log("⚙️ System Settings changed: ", settings);
  };

  const loadSettings = React.useCallback(() => {
    const storedSettings = localStorage.getItem("system-settings");
    setSettings(storedSettings ? JSON.parse(storedSettings) : initialSettings);
  }, []);

  React.useEffect(() => {
    if (isLoading) {
      loadSettings();
      setIsLoading(false);
    }
  }, [isLoading]);

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
      {isLoading ? (
        <NotReadyScreen
          title="We're settings your preferences..."
          description="This won't take long."
        />
      ) : (
        children
      )}
    </SystemContext.Provider>
  );
}
