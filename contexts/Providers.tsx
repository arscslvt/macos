"use client";

import React from "react";

import { Toaster } from "@/components/ui/sonner";

import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

import SystemProvider from "./system.context";
import SettingsProvider from "./settings.context";
import AccountProvider from "./account.context";
import AppsProvider from "./apps.context";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ""}
      >
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <AccountProvider>
            <SystemProvider>
              <SettingsProvider>
                <AppsProvider>
                  {" "}
                  <Toaster />
                  {children}
                </AppsProvider>
              </SettingsProvider>
            </SystemProvider>
          </AccountProvider>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </>
  );
}
