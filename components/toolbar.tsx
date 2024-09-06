"use client";

import React from "react";
import { FaApple } from "react-icons/fa";
import {
  MenuBar,
  MenuBarContent,
  MenuBarDivider,
  MenuBarItem,
  MenuBarTrigger,
} from "./ui/menu-bar";
import { IconBaseProps } from "react-icons";
import { cx } from "class-variance-authority";

interface ToolbarProps {
  children:
    | (
        | React.ReactElement<typeof ToolbarLeading>
        | React.ReactElement<typeof ToolbarTrailing>
      )[];
}

export default function Toolbar({ children }: ToolbarProps) {
  return (
    <div className="w-dvw h-6 px-2 flex items-center text-white">
      {children}
    </div>
  );
}

interface ToolbarSideProps {
  children?: React.ReactNode;
}

export const ToolbarLeading = ({ children }: ToolbarSideProps) => {
  return <div className="flex-1 flex justify-start h-full">{children}</div>;
};
export const ToolbarTrailing = ({
  children,
  showTime = true,
}: ToolbarSideProps & { showTime?: boolean }) => {
  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex justify-end h-full">
      {children}
      {showTime && (
        <ToolbarItem>
          <span className="text-[13px]">
            {date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
        </ToolbarItem>
      )}
    </div>
  );
};

interface ToolbarItemItem {
  label: string;
  shortcut?: string;
  badge?: string;

  onClick?: () => void;

  subItems?: ToolbarItemItem[];
}

interface ToolbarItemProps {
  icon?: React.ElementType<IconBaseProps>;
  children?: React.ReactNode;

  isAppName?: boolean;

  items?: (ToolbarItemItem | "separator")[];
}

export const ToolbarItem = ({
  icon,
  children,
  isAppName,
  items,
}: ToolbarItemProps) => {
  return (
    <MenuBar className="h-full">
      <MenuBarTrigger
        className={cx(
          "px-2 h-full rounded-sm transition-colors",
          items && "data-[state=open]:bg-gray-200"
        )}
      >
        <div className="flex gap-1 items-center">
          {icon && React.createElement(icon, { className: "w-4 h-4" })}
          {children && (
            <span
              className={cx(
                isAppName ? "font-medium" : "font-normal",
                "flex gap-1 text-xs items-center"
              )}
            >
              {children}
            </span>
          )}
        </div>
      </MenuBarTrigger>

      {items && (
        <MenuBarContent className="flex flex-col">
          {items.map((item, i) => {
            if (typeof item === "object" && "label" in item)
              return (
                <MenuBarItem
                  key={item.label}
                  onSelect={item.onClick}
                  className="flex gap-4 group"
                >
                  <div className="flex-1">{item.label}</div>
                  <div className="flex gap-2">
                    {item.shortcut && (
                      <span className="text-sm text-foreground-muted group-hover:text-white">
                        {item.shortcut}
                      </span>
                    )}
                    {item.badge && (
                      <span className="px-2 h-[16px] flex items-center rounded-full bg-gray-700 bg-opacity-20 text-[10px]">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </MenuBarItem>
              );

            return <MenuBarDivider key={i} />;
          })}
        </MenuBarContent>
      )}
    </MenuBar>
  );
};
