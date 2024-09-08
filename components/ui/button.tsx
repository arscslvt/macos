import { VariantProps, cva, cx } from "class-variance-authority";
import React from "react";

const buttonVariants = cva("text-sm select-none", {
  variants: {
    variant: {
      default:
        "rounded-md border shadow-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none",
      text: "!text-accent !bg-transparent hover:brightness-75",
    },

    tint: {
      primary:
        "bg-accent text-accent-foreground shadow-accent/30 active:bg-accent/90 border-accent/80",
      secondary:
        "bg-white text-foreground active:bg-gray-50 disabled:opacity-70 border-gray-200 active:shadow-inner active:bg-gray-50 ",
    },

    size: {
      small: "px-2 h-6",
      medium: "px-3 h-8",
      large: "px-6 h-11",
    },
  },

  defaultVariants: {
    variant: "default",
    size: "medium",
    tint: "primary",
  },
});

interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  disabled?: boolean;
}

export default function Button({
  children,
  className,
  variant,
  tint,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(buttonVariants({ variant, tint, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
