import type { BadgeProps, BadgeVariant } from '@/types';
import React from 'react';
import { Text, View } from 'react-native';

const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  sky:     { bg: 'bg-sky-500/15',     text: 'text-sky-200' },
  emerald: { bg: 'bg-emerald-500/15', text: 'text-emerald-200' },
  amber:   { bg: 'bg-amber-500/15',   text: 'text-amber-200' },
  rose:    { bg: 'bg-rose-500/15',    text: 'text-rose-200' },
  fuchsia: { bg: 'bg-fuchsia-500/15', text: 'text-fuchsia-200' },
  indigo:  { bg: 'bg-indigo-500/15',  text: 'text-indigo-200' },
  neutral: { bg: 'bg-zinc-800/70',    text: 'text-zinc-300' },
};

export default function Badge({ label, variant = 'neutral', size = 'sm', borderClassName, className }: BadgeProps) {
  const style = variantStyles[variant];
  const sizeClass = size === 'xs' ? 'px-2 py-0.5' : 'px-3 py-1';
  const textSize = size === 'xs' ? 'text-[10px]' : 'text-xs';

  return (
    <View className={`${sizeClass} rounded-full ${style.bg} ${borderClassName ?? ''} ${className ?? ''}`}>
      <Text className={`${textSize} font-semibold ${style.text}`}>{label}</Text>
    </View>
  );
}
