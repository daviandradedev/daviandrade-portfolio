import Image from "next/image";

type BrandVariant = "dandrade" | "daviandrade" | "compact";

type BrandWordmarkProps = {
  className?: string;
  title?: string;
  variant?: BrandVariant;
};

const BRAND_ASSETS: Record<
  BrandVariant,
  { light: string; dark: string; width: number; height: number }
> = {
  dandrade: {
    light: "/media/brand/dandrade-dev-light.png",
    dark: "/media/brand/dandrade-dev-dark.png",
    width: 1115,
    height: 112,
  },
  daviandrade: {
    light: "/media/brand/daviandrade-dev-light.png",
    dark: "/media/brand/daviandrade-dev-dark.png",
    width: 1371,
    height: 112,
  },
  compact: {
    light: "/media/brand/d-dev-light.png",
    dark: "/media/brand/d-dev-dark.png",
    width: 431,
    height: 112,
  },
};

export function BrandWordmark({
  className,
  title = "daviandrade.dev",
  variant = "dandrade",
}: BrandWordmarkProps) {
  const asset = BRAND_ASSETS[variant];

  return (
    <span className={className ? `brand-wordmark ${className}` : "brand-wordmark"}>
      <Image
        src={asset.light}
        alt={title}
        width={asset.width}
        height={asset.height}
        className="brand-wordmark-img brand-wordmark-light"
        priority={variant === "dandrade"}
      />
      <Image
        src={asset.dark}
        alt=""
        aria-hidden="true"
        width={asset.width}
        height={asset.height}
        className="brand-wordmark-img brand-wordmark-dark"
        priority={variant === "dandrade"}
      />
    </span>
  );
}
