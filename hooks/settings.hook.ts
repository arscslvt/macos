import { SettingsContext } from "@/contexts/settings.context";
import React from "react";

export const useSettings = () => React.useContext(SettingsContext);
