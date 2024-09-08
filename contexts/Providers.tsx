"use client";

import React from "react";
import SystemProvider from "./system.context";
import SettingsProvider from "./settings.context";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SystemProvider>
        <SettingsProvider>{children}</SettingsProvider>
      </SystemProvider>
    </>
  );
}
