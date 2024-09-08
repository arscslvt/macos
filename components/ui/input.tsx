import { cva, cx, VariantProps } from "class-variance-authority";
import React from "react";

const inputVariants = cva("h-6 text-[13px] px-2 outline-none shadow-sm", {
  variants: {
    variant: {
      ghost: "text:foreground",
      default:
        "border focus:ring-2 focus:border-accent focus:ring-accent/60 rounded-md transition-colors",
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <input
        className={cx(inputVariants({ variant, className }))}
        ref={ref}
        autoComplete="off"
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
