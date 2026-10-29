import type { ReactNode, SVGProps } from 'react';

export type IconName =
  | 'plus'
  | 'folderOpen'
  | 'panels'
  | 'grid'
  | 'trash'
  | 'info'
  | 'github'
  | 'bell'
  | 'settings'
  | 'home'
  | 'audio'
  | 'network'
  | 'notebook'
  | 'fileText'
  | 'contact'
  | 'chevronLeft'
  | 'chevronRight'
  | 'close'
  | 'list'
  | 'image'
  | 'calendar'
  | 'swords'
  | 'globe'
  | 'arrowUpRight'
  | 'more'
  | 'check'
  | 'clock'
  | 'search'
  | 'externalLink';

const paths: Record<IconName, ReactNode> = {
  plus: (
    <>
      <path d="M12 5v14M5 12h14" />
    </>
  ),
  folderOpen: (
    <>
      <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H10l2 2h7.5A1.5 1.5 0 0 1 21 9.5v1" />
      <path d="m3 12 1.2-2h15.6l1.2 2-2.4 7H5.4L3 12Z" />
    </>
  ),
  panels: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 4v16M12 9h6m-6 4h6" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16m-10 4v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5m0-8h.01" />
    </>
  ),
  github: (
    <>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19 4.2 4.8 4.8 0 0 0 18.9 1S17.7.7 15 2.5a13.6 13.6 0 0 0-7 0C5.3.7 4.1 1 4.1 1A4.8 4.8 0 0 0 4 4.2a5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V21" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.8 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.8-1l-1.7.7-1.4-2.4L5.1 15a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.8-1L8.9 7.4h2.8L12 9.2a8 8 0 0 1 1.8 1l1.7-.7 1.4 2.4-1.4 1.1a8 8 0 0 1-.1 2Z" />
    </>
  ),
  home: (
    <>
      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V10Z" />
    </>
  ),
  audio: (
    <>
      <path d="M3 10v4m4-8v12m4-15v18m4-14v10m4-8v6m3-4v2" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="m11 7-5 9m7-9 5 9M7 18h10" />
    </>
  ),
  notebook: (
    <>
      <path d="M5 4h14v17H5zM8 4v17M3 8h4m-4 5h4m-4 5h4m4-10h5m-5 4h6" />
    </>
  ),
  fileText: (
    <>
      <path d="M6 3h8l5 5v13H6zM14 3v5h5M9 13h7m-7 4h7" />
    </>
  ),
  contact: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="9" r="2.5" />
      <path d="M8 17c.7-2 2-3 4-3s3.3 1 4 3" />
    </>
  ),
  chevronLeft: <path d="m15 18-6-6 6-6" />,
  chevronRight: <path d="m9 18 6-6-6-6" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  list: (
    <>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <path d="M4 6h.01M4 12h.01M4 18h.01" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9" r="1.5" />
      <path d="m21 15-5-5L5 20" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18m-13 4h2m3 0h2m-7 3h2" />
    </>
  ),
  swords: (
    <>
      <path d="m4 4 7 7m-4-7-3 3m16 13-7-7m4 7 3-3M14 5l5-2-2 5-8 8-3-3 8-8Z" />
      <path d="m5 19 5-5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18m0-18a14 14 0 0 0 0 18" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7 17 17 7M7 7h10v10" />
    </>
  ),
  more: (
    <>
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  externalLink: (
    <>
      <path d="M13 5h6v6m0-6-9 9" />
      <path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </>
  ),
};

export function Icon({
  name,
  size = 18,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
