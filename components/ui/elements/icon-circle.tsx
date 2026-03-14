import { iconCircleShapeMap, iconCircleSizeMap } from '@/constants/ui';
import type { IconCircleProps } from '@/types';
import React from 'react';
import { View } from 'react-native';

export default function IconCircle({
  size = 'md',
  shape = 'circle',
  bgClassName = 'bg-zinc-800',
  borderClassName,
  children,
  className,
}: IconCircleProps) {
  return (
    <View
      className={`${iconCircleSizeMap[size]} ${iconCircleShapeMap[shape]} ${bgClassName} ${borderClassName ?? ''} items-center justify-center ${className ?? ''}`}
    >
      {children}
    </View>
  );
}
