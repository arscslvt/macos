import { VariantProps, cva, cx } from "class-variance-authority";

const typographyVariant = cva("", {
  variants: {
    variant: {
      largeTitle: "text-[34px] font-bold leading-[41px]",
      title1: "text-[28px] font-[600] leading-[34px]",
      title2: "text-[22px] font-[600] leading-[28px]",
      title3: "text-[20px] font-[600] leading-[25px]",

      headline: "text-[17px] font-[500] leading-[22px]",
      subheadline: "text-[15px] font-[500] leading-[20px]",

      body: "text-[15px] font-[400] leading-[22px]",
      callout: "text-[14px] font-[400] leading-[21px]",
      footnote: "text-[13px] font-[400] leading-[18px]",

      caption1: "text-[12px] font-[400] leading-[16px]",
      caption2: "text-[11px] font-[400] leading-[13px]",
    },

    foreground: {
      default: "text-foreground",
      muted: "text-foreground-muted",
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
  children: React.ReactNode;
}

export default function Text({
  variant,
  foreground,
  alignment,
  children,
  className,
  ...props
}: TypographyProps) {
  return (
    <span
      className={cx(
        typographyVariant({ variant, foreground, alignment }),
        "select-none pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
