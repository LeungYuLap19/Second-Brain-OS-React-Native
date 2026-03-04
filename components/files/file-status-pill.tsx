import Badge from '@/components/ui/elements/badge';
import type { BadgeVariant, FileStatus, FileStatusPillProps } from '@/types';
import React from 'react';

const statusConfig: Record<FileStatus, { label: string; variant: BadgeVariant; border: string }> = {
  uploading:  { label: 'Uploading',  variant: 'sky',     border: 'border border-sky-500/30' },
  processing: { label: 'Processing', variant: 'amber',   border: 'border border-amber-500/30' },
  ready:      { label: 'Ready',      variant: 'emerald', border: 'border border-emerald-500/30' },
};

export default function FileStatusPill({ status }: FileStatusPillProps) {
  const config = statusConfig[status];

  return (
    <Badge
      label={config.label}
      variant={config.variant}
      size="sm"
      borderClassName={config.border}
      className="px-2.5"
    />
  );
}
