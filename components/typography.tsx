import { VariantProps, cva, cx } from "class-variance-authority";

const typographyVariant = cva("", {
  variants: {
    variant: {
      largeTitle: "text-[26px] leading-[32px]",
      title1: "text-[22px] leading-[26px]",
      title2: "text-[17px] leading-[22px]",
      title3: "text-[15px] leading-[20px]",

      headline: "text-[13px] font-semibold leading-[16px]",
      subheadline: "text-[11px] leading-[14px]",

      body: "text-[14px] leading-[16px]",
      callout: "text-[12px] leading-[15px]",
      footnote: "text-[10px] leading-[13px]",

      caption1: "text-[10px] leading-[13px]",
      caption2: "text-[10px] font-medium leading-[13px]",
    },

    weight: {
      emphasized: "!font-bold",
    },

    foreground: {
      default: "text-foreground",
      muted: "text-muted-foreground",
    },

    alignment: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "body",
    foreground: "default",
    alignment: "center",
  },
});

interface TypographyProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof typographyVariant> {
  children?: React.ReactNode;
}

export default function Text({
  variant,
  weight,
  foreground,
  alignment,
  children,
  className,
  ...props
}: TypographyProps) {
  return (
    <span
      className={cx(
        typographyVariant({ variant, weight, foreground, alignment }),
        "select-none pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
