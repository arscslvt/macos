import { cx } from "class-variance-authority";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={cx(
        "h-7 text-sm border focus:ring-1 focus:border-accent focus:ring-accent transition-colors px-2 rounded-md outline-none",
        className
      )}
      {...props}
    />
  );
};
