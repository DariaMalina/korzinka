type BrandLogoProps = {
  className?: string;
  variant?: 'dark' | 'light';
};

export function BrandLogo({
  className = '',
  variant = 'dark',
}: BrandLogoProps) {
  const source =
    variant === 'light'
      ? '/brand/korzinka-logo-light.svg'
      : '/brand/korzinka-logo.svg';

  return (
    <img
      alt=""
      aria-hidden="true"
      className={`brand-logo ${className}`}
      height="53"
      src={source}
      width="170"
    />
  );
}
