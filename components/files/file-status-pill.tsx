import Badge from '@/components/ui/elements/badge';
import { statusConfig } from '@/constants/files';
import type { FileStatusPillProps } from '@/types';
import React from 'react';

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
