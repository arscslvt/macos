import React from "react";

export interface SetupScreen {
  key: string;
  element: React.ReactElement;
  props?: Record<string, any>;
}

export interface ScreenNavigationHandler {
  action: "previous" | "next" | "page";
  id?: string;
}

export interface SetupScreensContext {
  screens: SetupScreen[];
  currentScreen: number;

  handleScreenNavigation: (handler: ScreenNavigationHandler) => void;
}

export const ScreensContext = React.createContext<SetupScreensContext>({
  screens: [],
  currentScreen: 0,

  handleScreenNavigation: () => {},
});
