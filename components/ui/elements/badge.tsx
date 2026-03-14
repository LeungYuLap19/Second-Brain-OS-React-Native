import { badgeVariantStyles } from '@/constants/ui';
import type { BadgeProps } from '@/types';
import React from 'react';
import { Text, View } from 'react-native';

export default function Badge({ label, variant = 'neutral', size = 'sm', borderClassName, className }: BadgeProps) {
  const style = badgeVariantStyles[variant];
  const sizeClass = size === 'xs' ? 'px-2 py-0.5' : 'px-3 py-1';
  const textSize = size === 'xs' ? 'text-[10px]' : 'text-xs';

  return (
    <View className={`${sizeClass} rounded-full ${style.bg} ${borderClassName ?? ''} ${className ?? ''}`}>
      <Text className={`${textSize} font-semibold ${style.text}`}>{label}</Text>
    </View>
  );
}
