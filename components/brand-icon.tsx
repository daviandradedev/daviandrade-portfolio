type BrandIconProps = {
  size?: number;
  className?: string;
};

export function BrandIcon({ size = 16, className }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M9.7 6.55C6.1 6.55 3.5 9.85 3.5 14.3C3.5 18.75 6.1 22 9.7 22C12.1 22 14.15 20.45 15.15 17.75L14.1 17.42C13.62 18.58 13.0 19.15 12.35 19.15C11.35 19.15 10.72 17.1 10.72 14.3C10.72 11.5 11.35 9.45 12.35 9.45C13.0 9.45 13.62 10.02 14.1 11.18L15.15 10.85C14.15 8.15 12.1 6.55 9.7 6.55Z" />
      <path d="M13.33 2H20.53V22H13.33V21.35C14.75 20.25 15.75 18.7 16.18 16.85L14.46 16.35C14.48 15.65 14.48 12.95 14.46 12.25L16.18 11.75C15.75 9.9 14.75 8.35 13.33 7.25V2Z" />
    </svg>
  );
}
