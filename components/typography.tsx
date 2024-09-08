import { VariantProps, cva, cx } from "class-variance-authority";

const typographyVariant = cva("", {
  variants: {
    variant: {
      largeTitle: "text-[34px] leading-[41px]",
      title1: "text-[28px] leading-[34px]",
      title2: "text-[22px] leading-[28px]",
      title3: "text-[20px] leading-[25px]",

      headline: "text-[17px] font-semibold leading-[22px]",
      subheadline: "text-[15px] leading-[16px]",

      body: "text-[15px] leading-[22px]",
      callout: "text-[14px] leading-[21px]",
      footnote: "text-[13px] leading-[18px]",

      caption1: "text-[12px] leading-[16px]",
      caption2: "text-[11px] leading-[13px]",
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
