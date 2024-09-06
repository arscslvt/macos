import { VariantProps, cva, cx } from "class-variance-authority";
import React from "react";

const buttonVariants = cva("text-sm select-none", {
  variants: {
    variant: {
      default:
        "bg-white text-foreground rounded-md border border-gray-200 shadow-sm active:shadow-inner active:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none",
      text: "text-accent hover:brightness-75",
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
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
