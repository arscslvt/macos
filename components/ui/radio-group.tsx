import React from "react";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { cx } from "class-variance-authority";

type RadioGroupDirection = "horizontal" | "vertical";
interface RadioGroupProps extends RadixRadioGroup.RadioGroupProps {
  children: React.ReactNode;
  direction?: RadioGroupDirection;
}

export const RadioGroup = ({
  children,
  direction = "horizontal",
  className,
  ...props
}: RadioGroupProps) => {
  const _direction: {
    [key in RadioGroupDirection]: string;
  } = {
    horizontal: "flex-row gap-4",
    vertical: "flex-col gap-3",
  };

  return (
    <RadixRadioGroup.Root
      className={cx("flex", _direction[direction])}
      {...props}
    >
      {children}
    </RadixRadioGroup.Root>
  );
};

interface RadioGroupItemProps extends RadixRadioGroup.RadioGroupItemProps {
  children: React.ReactNode;
}

export const RadioGroupItem = ({ children, ...props }: RadioGroupItemProps) => {
  return (
    <RadixRadioGroup.Item className="flex group" {...props}>
      <span className="w-4 h-4 p-1 bg-background group-data-[state='checked']:bg-accent rounded-full grid overflow-clip">
        <RadixRadioGroup.Indicator className="w-full h-full bg-accent-foreground rounded-full" />
      </span>
      <label className="text-[15px] leading-none pl-2" htmlFor={props.id}>
        {children}
      </label>
    </RadixRadioGroup.Item>
  );
};
