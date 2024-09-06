"use client";

import React from "react";
import SystemProvider from "./useSystem";
import SettingsProvider from "./useSettings";

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
