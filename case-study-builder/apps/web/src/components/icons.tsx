import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 18, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconPerson = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="8" r="3.4" />
    <path d="M5.5 19.5c.9-3.2 3.4-5 6.5-5s5.6 1.8 6.5 5" />
  </Base>
);

export const IconTeam = (p: IconProps) => (
  <Base {...p}>
    <circle cx="9" cy="8.5" r="3" />
    <circle cx="17" cy="9.5" r="2.4" />
    <path d="M3.5 19c.8-2.7 2.9-4.2 5.5-4.2 1.3 0 2.4.3 3.3 1" />
    <path d="M13.5 19.5c.6-2.2 2.2-3.5 4.4-3.5 1.4 0 2.5.5 3.1 1.4" />
  </Base>
);

export const IconSparkle = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
    <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
  </Base>
);

export const IconTerminal = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
    <path d="M7 9.5l3 2.5-3 2.5" />
    <path d="M12.5 14.5H17" />
  </Base>
);

export const IconShield = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3l7 2.8v5.4c0 4.4-2.9 8-7 9.8-4.1-1.8-7-5.4-7-9.8V5.8L12 3z" />
    <path d="M9 11.8l2.1 2.1L15.2 9.6" />
  </Base>
);

export const IconMegaphone = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 10.5v3a1 1 0 001 1h2l8 4.5V5L7 9.5H5a1 1 0 00-1 1z" />
    <path d="M18.5 9a4.5 4.5 0 010 6" />
  </Base>
);

export const IconClipboard = (p: IconProps) => (
  <Base {...p}>
    <rect x="5" y="4.5" width="14" height="16" rx="2" />
    <path d="M9 4.5V3h6v1.5" />
    <path d="M9 10h6M9 13.5h6M9 17h3.5" />
  </Base>
);

export const IconAlert = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4L2.8 19.5h18.4L12 4z" />
    <path d="M12 10v4.2" />
    <circle cx="12" cy="16.8" r="0.6" fill="currentColor" />
  </Base>
);

export const IconTranslate = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 5h8M8 3v2c0 3.5-1.5 6-4 7.5" />
    <path d="M6.5 9c.8 2 2.3 3.6 4.5 4.8" />
    <path d="M13 20l4-9 4 9M14.2 17h5.6" />
  </Base>
);

export const IconBook = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 5.5A2.5 2.5 0 016.5 3H20v15.5H6.5A2.5 2.5 0 004 21V5.5z" />
    <path d="M4 18.5A2.5 2.5 0 016.5 16H20" />
  </Base>
);

export const IconArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Base>
);

export const IconLock = (p: IconProps) => (
  <Base {...p}>
    <rect x="5" y="10.5" width="14" height="10" rx="2" />
    <path d="M8 10.5V8a4 4 0 018 0v2.5" />
    <circle cx="12" cy="15.5" r="1.2" />
  </Base>
);

export const IconCheck = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 12.5l5 5 10-11" />
  </Base>
);

export const IconImage = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="5" width="17" height="14" rx="2" />
    <circle cx="9" cy="10" r="1.6" />
    <path d="M4 17.5l5-5 4 4 3-3 4 4" />
  </Base>
);

export const IconQuote = (p: IconProps) => (
  <Base {...p}>
    <path d="M9.5 7C7 8.2 5.5 10.2 5.5 13v4h5v-5H7.8c.2-1.8 1.2-3 3-3.7L9.5 7z" />
    <path d="M18.5 7c-2.5 1.2-4 3.2-4 6v4h5v-5h-2.7c.2-1.8 1.2-3 3-3.7L18.5 7z" />
  </Base>
);

export const IconCode = (p: IconProps) => (
  <Base {...p}>
    <path d="M8.5 8L4.5 12l4 4" />
    <path d="M15.5 8l4 4-4 4" />
    <path d="M13.5 5.5l-3 13" />
  </Base>
);

export const IconRocket = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 15c-1.5-1-2.5-3-2.5-5.5C9.5 6 11 3.5 12 2.5c1 1 2.5 3.5 2.5 7 0 2.5-1 4.5-2.5 5.5z" />
    <path d="M12 15v4M9.5 17.5c-1.5.5-2.5 1.5-3 3.5 2-.5 3-1.5 3.5-3" />
    <circle cx="12" cy="8.5" r="1.4" />
  </Base>
);

export const IconTag = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 12.5V4.5h8l9 9-8 8-9-9z" />
    <circle cx="8" cy="8" r="1.2" />
  </Base>
);