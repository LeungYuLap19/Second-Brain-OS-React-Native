import type {
    BadgeVariant,
    FormFieldContainerProps,
    HeaderViewProps,
    IconCircleShape,
    IconCircleSize,
    ThemedTextProps,
} from '@/types';

// ── Badge ──────────────────────────────────────────────────────────

export const badgeVariantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  sky:     { bg: 'bg-sky-500/15',     text: 'text-sky-200' },
  emerald: { bg: 'bg-emerald-500/15', text: 'text-emerald-200' },
  amber:   { bg: 'bg-amber-500/15',   text: 'text-amber-200' },
  rose:    { bg: 'bg-rose-500/15',    text: 'text-rose-200' },
  fuchsia: { bg: 'bg-fuchsia-500/15', text: 'text-fuchsia-200' },
  indigo:  { bg: 'bg-indigo-500/15',  text: 'text-indigo-200' },
  neutral: { bg: 'bg-zinc-800/70',    text: 'text-zinc-300' },
};

// ── IconCircle ─────────────────────────────────────────────────────

export const iconCircleSizeMap: Record<IconCircleSize, string> = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-11 h-11',
  xl: 'w-12 h-12',
};

export const iconCircleShapeMap: Record<IconCircleShape, string> = {
  circle: 'rounded-full',
  rounded: 'rounded-2xl',
};

// ── ThemedText ─────────────────────────────────────────────────────

export const toneClassMap: Record<NonNullable<ThemedTextProps['tone']>, string> = {
  primary: 'text-zinc-100',
  secondary: 'text-zinc-300',
  muted: 'text-zinc-400',
  subtle: 'text-zinc-500',
  inverse: 'text-zinc-900',
};

// ── FormFieldContainer ─────────────────────────────────────────────

export const padMap: Record<NonNullable<FormFieldContainerProps['padding']>, string> = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
};

// ── Header ─────────────────────────────────────────────────────────

export const headerVariantClassMap: Record<NonNullable<HeaderViewProps['variant']>, string> = {
  page: 'pt-2 pb-4',
  modal: 'pt-12 pb-4',
};
