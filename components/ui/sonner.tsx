"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import Text from "../typography";
import React, { useMemo } from "react";
import * as datefns from "date-fns";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      expand
      toastOptions={{
        classNames: {
          icon: "w-12 h-12",
          toast:
            "group toast p-3 !rounded-xl group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          title: "group-[.toast]:text-foreground leading-tight",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

interface ToastTitleProps {
  children?: React.ReactNode;
}

const ToastTitle = ({ children }: ToastTitleProps) => {
  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between gap-4 flex-1">
      <Text
        variant="headline"
        alignment={"left"}
        className="font-semibold flex-1"
      >
        {children}
      </Text>
      <Text variant={"subheadline"} alignment={"right"} foreground={"muted"}>
        {date.valueOf() - new Date().valueOf() <= 60000
          ? "now"
          : datefns.formatDistanceToNow(date)}
      </Text>
    </div>
  );
};

export { Toaster, ToastTitle };
