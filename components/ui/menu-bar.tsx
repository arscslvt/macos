"use client";

import * as Menubar from "@radix-ui/react-menubar";
import { cx } from "class-variance-authority";
import React from "react";

interface MenuBarProps extends Menubar.MenubarMenuProps {
  children: React.ReactNode;
  className: string;
}

export const MenuBar = ({ children, className, ...props }: MenuBarProps) => {
  return (
    <Menubar.Root className={className}>
      <Menubar.Menu {...props}>{children}</Menubar.Menu>
    </Menubar.Root>
  );
};

export const MenuBarTrigger = ({
  children,
  ...props
}: { children: React.ReactNode } & Menubar.MenubarTriggerProps) => {
  return (
    <Menubar.Trigger
      {...props}
      className={cx(
        "flex items-center px-2.5 outline-none cursor-default data-[state=open]:bg-opacity-20 rounded-[4px]",
        props.className
      )}
    >
      {children}
    </Menubar.Trigger>
  );
};

export const MenuBarContent = ({
  children,
  ...props
}: { children: React.ReactNode } & Menubar.MenubarContentProps) => {
  return (
    <Menubar.Content
      {...props}
      className="z-[99] mt-1 bg-gray-100 p-1 bg-opacity-80 backdrop-blur-xl rounded ring-[0.5px] ring-gray-300 shadow-xl text-foreground select-none"
    >
      {children}
    </Menubar.Content>
  );
};

export const MenuBarLabel = ({
  children,
  ...props
}: { children: React.ReactNode } & Menubar.MenubarLabelProps) => {
  return (
    <Menubar.Label {...props} className="">
      {children}
    </Menubar.Label>
  );
};

export const MenuBarItem = ({
  children,
  ...props
}: { children: React.ReactNode } & Menubar.MenubarItemProps) => {
  return (
    <Menubar.Item
      {...props}
      className={cx(
        "px-3 rounded-[3px] text-[13px] h-5 hover:bg-accent hover:text-white outline-none ring-0 flex items-center",
        props.className
      )}
    >
      {children}
    </Menubar.Item>
  );
};

export const MenuBarGroup = ({
  children,
  ...props
}: { children: React.ReactNode } & Menubar.MenubarGroupProps) => {
  return (
    <Menubar.Group {...props} className="">
      {children}
    </Menubar.Group>
  );
};

export const MenuBarSub = ({
  children,
  ...props
}: { children: React.ReactNode } & Menubar.MenubarSubProps) => {
  return <Menubar.Sub {...props}>{children}</Menubar.Sub>;
};

export const MenuBarSubTrigger = ({
  children,
  ...props
}: { children: React.ReactNode } & Menubar.MenubarSubTriggerProps) => {
  return <Menubar.SubTrigger {...props}>{children}</Menubar.SubTrigger>;
};

export const MenuBarSubContent = ({
  children,
  ...props
}: { children: React.ReactNode } & Menubar.MenubarSubContentProps) => {
  return (
    <Menubar.Portal>
      <Menubar.SubContent {...props}>{children}</Menubar.SubContent>
    </Menubar.Portal>
  );
};

export const MenuBarDivider = ({ ...props }: Menubar.MenuSeparatorProps) => {
  return (
    <Menubar.Separator
      {...props}
      className="bg-gray-400 mx-1 opacity-30 h-[1px] flex my-1"
    />
  );
};
