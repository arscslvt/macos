"use client";

import React from "react";
import SystemProvider from "./system.context";
import SettingsProvider from "./settings.context";
import AccountProvider from "./account.context";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AccountProvider>
        <SystemProvider>
          <SettingsProvider>{children}</SettingsProvider>
        </SystemProvider>
      </AccountProvider>
    </>
  );
}
