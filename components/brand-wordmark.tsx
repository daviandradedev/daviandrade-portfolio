type BrandWordmarkProps = {
  className?: string;
  title?: string;
  variant?: "dandrade" | "daviandrade";
};

export function BrandWordmark({
  className,
  title = "dandrade.dev",
  variant = "dandrade",
}: BrandWordmarkProps) {
  const name = variant === "daviandrade" ? "daviandrade" : "dandrade";

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={variant === "daviandrade" ? "0 0 300 44" : "0 0 220 44"}
      role="img"
      aria-label={title}
      overflow="visible"
    >
      <text
        x="0"
        y="33"
        fontFamily="'Arial Black', 'Helvetica Neue', sans-serif"
        fontSize="32"
        fontWeight="900"
      >
        <tspan className="brand-wordmark-name">{name}</tspan>
        <tspan className="brand-wordmark-suffix">.dev</tspan>
      </text>
    </svg>
  );
}
