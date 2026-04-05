import { cn } from '@/lib/utils';

type LogoSize = 'sm' | 'md' | 'lg';

interface OpenLumaLogoProps {
  className?: string;
  size?: LogoSize;
  hideText?: boolean;
}

const sizeClasses: Record<LogoSize, { mark: string; open: string; luma: string; gap: string }> = {
  sm: {
    mark: 'size-7',
    open: 'text-[10px]',
    luma: 'text-sm tracking-[0.22em]',
    gap: 'gap-2',
  },
  md: {
    mark: 'size-9',
    open: 'text-[11px]',
    luma: 'text-base tracking-[0.26em]',
    gap: 'gap-2.5',
  },
  lg: {
    mark: 'size-12',
    open: 'text-[13px]',
    luma: 'text-2xl tracking-[0.32em]',
    gap: 'gap-3',
  },
};

export function OpenLumaMark({ className, size = 'md' }: { className?: string; size?: LogoSize }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn(sizeClasses[size].mark, className)}
      fill="none"
    >
      <defs>
        <radialGradient id="openluma-core" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFF2B5" />
          <stop offset="0.34" stopColor="#F4C45C" />
          <stop offset="0.74" stopColor="#34C8B9" />
          <stop offset="1" stopColor="#0E637E" />
        </radialGradient>
        <linearGradient id="openluma-orbit" x1="10" y1="12" x2="52" y2="52">
          <stop offset="0" stopColor="#F4C45C" />
          <stop offset="0.55" stopColor="#34C8B9" />
          <stop offset="1" stopColor="#0B4E68" />
        </linearGradient>
      </defs>
      <circle cx="31" cy="33" r="18" fill="url(#openluma-core)" opacity="0.18" />
      <path
        d="M14 36.5c2.8-13.5 15-23.5 29.2-23.5 4.1 0 8 .8 11.6 2.4"
        stroke="url(#openluma-orbit)"
        strokeLinecap="round"
        strokeWidth="6"
      />
      <path
        d="M20.5 19.5 34 32 20.5 44.5"
        stroke="#0B4E68"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5.5"
      />
      <circle cx="49" cy="18.5" r="4.5" fill="#F4C45C" />
    </svg>
  );
}

export function OpenLumaLogo({ className, size = 'md', hideText = false }: OpenLumaLogoProps) {
  const classes = sizeClasses[size];

  return (
    <div
      data-testid="brand-logo"
      className={cn('inline-flex items-center text-foreground select-none', classes.gap, className)}
    >
      <OpenLumaMark size={size} />
      {!hideText && (
        <span className="inline-flex items-baseline">
          <span className={cn('font-semibold lowercase text-foreground/70', classes.open)}>
            open
          </span>
          <span className={cn('font-black uppercase text-foreground', classes.luma)}>LUMA</span>
        </span>
      )}
    </div>
  );
}
