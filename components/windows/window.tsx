"use client";

import React from "react";
import { cva, cx, type VariantProps } from "class-variance-authority";

import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

const windowVariants = cva(
  "rounded-[8px] min-w-[40px] min-h-[30px] overflow-auto shadow-xl",
  {
    variants: {
      style: {
        default: "bg-background",
        empty: "bg-gray-100",
      },

      resizable: {
        default: "resize",
        x: "resize-x",
        y: "resize-y",
        locked: "resize-none",
      },

      size: {
        auto: "w-max h-max",
        small: "w-3/5 h-1/2",
        medium: "w-4/5 h-[80%] max-w-[900px] max-h-[600px]",
        large: "w-5/6 h-5/6",
      },
    },
    defaultVariants: {
      style: "default",
      size: "auto",
      resizable: "default",
    },
  }
);

export interface WindowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "style">,
    VariantProps<typeof windowVariants> {
  children?: React.ReactNode;
}

export default function Window({
  style,
  size,
  resizable,
  children,
  ...props
}: WindowProps) {
  return (
    <div
      className={cx(
        windowVariants({ style, size, resizable }),
        "relative",
        props.className
      )}
    >
      {children}
    </div>
  );
}

type WindowControls = "close" | "minimize" | "maximize";
interface WindowControlsProps {
  controls?: WindowControls[];
}

const controlVariants = cva(
  "w-3.5 h-3.5 ring-[1px] rounded-full bg-gray-200 ring-gray-300 cursor-default",
  {
    variants: {
      control: {
        close:
          "group-hover:bg-red-400 group-hover:ring-red-500 active:!bg-red-500 text-red-800",
        minimize:
          "group-hover:bg-yellow-400 group-hover:ring-yellow-500 active:!bg-yellow-500 text-yellow-800",
        maximize:
          "group-hover:bg-green-400 group-hover:ring-green-500 active:!bg-green-500 text-green-800",
      },
    },
    defaultVariants: {
      control: "close",
    },
  }
);

export const WindowControls = ({
  controls = ["close", "minimize", "maximize"],
}: WindowControlsProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const icons: Record<
    WindowControls,
    React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  > = {
    close: XMarkIcon,
    minimize: MinusIcon,
    maximize: PlusIcon,
  };

  return (
    <div className="flex gap-[10px] items-center group">
      {controls.map((control) => {
        return (
          <div
            role="button"
            key={control}
            className={cx(
              controlVariants({ control }),
              "flex items-center justify-center"
            )}
          >
            {React.createElement(icons[control], {
              className: cx(
                "opacity-0 group-hover:opacity-100 min-w-[10px] min-h-[10px]"
              ),
              style: {
                strokeWidth: 2.2,
              },
            })}
          </div>
        );
      })}
    </div>
  );
};
