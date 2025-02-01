import React from "react";
import Image from "next/image";
import Text from "../typography";
import { cva, cx, VariantProps } from "class-variance-authority";

import FallbackIcon from "@assets/icons/No_App.png";
import { AppDetails } from "@/types/app/app.type";

const iconVariants = cva("", {
  variants: {
    size: {
      sm: "w-14 h-14 min-w-14 min-h-14 max-w-14 max-h-14",
      md: "w-16 h-16 min-w-16 min-h-16 max-w-16 max-h-16",
      lg: "w-20 h-20 min-w-20 min-h-20 max-w-20 max-h-20",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface AppIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconVariants>,
    AppDetails {}

export const AppIcon = React.forwardRef<HTMLDivElement, AppIconProps>(
  ({ size = "sm", ...props }, ref) => {
    const [source, setSource] = React.useState(FallbackIcon);

    React.useLayoutEffect(() => {
      try {
        const icon = require(`@assets/icons/${props.name}.png`);
        setSource(icon);
      } catch (e) {
        console.error(`Icon ${props.name} not found. Using Fallback Icon.`);
      }
    }, [props.name]);

    return (
      <div
        className="w-max max-w-max min-w-14 flex flex-col items-center gap-[2px] group/app-icon"
        ref={ref}
        data-appname={props.name}
        data-appicon={props.icon}
      >
        <button
          className={cx(
            "min-w-max max-w-full min-h-14 grid place-content-center",
            "rounded-sm border-2 border-transparent group-focus-within/app-icon:bg-black/20 group-focus-within/app-icon:border-muted/80"
          )}
        >
          <div className={cx("aspect-square", iconVariants({ size }))}>
            <Image
              src={source}
              placeholder="empty"
              onError={() => setSource(FallbackIcon)}
              alt="App Icon"
              width={80}
              height={80}
              className="w-full h-full object-contain select-none pointer-events-none"
            />
          </div>
        </button>
        {props.name && (
          <Text
            role="button"
            variant={"subheadline"}
            alignment={"center"}
            className={cx(
              "max-h-8 w-max py-0.5 px-1",
              "mix-blend-difference rounded-sm text-white group-focus-within/app-icon:bg-accent group-focus-within/app-icon:accent-foreground"
            )}
          >
            {props.name}
          </Text>
        )}
      </div>
    );
  }
);

AppIcon.displayName = "AppIcon";
