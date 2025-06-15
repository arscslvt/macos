import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/contexts/Providers";
import { Toaster } from "@/components/ui/sonner";

export const viewport: Viewport = {
  userScalable: false,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    absolute: "Sierra",
    default: "Sierra",
    template: "%s | Sierra",
  },
  description:
    "Sierra OS is a remarklable experience of an OS on the web. Honoring one of the best OS in the world, Apple macOS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-dvw h-dvh min-w-dvw min-h-dvh fixed top-0 left-0 select-none`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
