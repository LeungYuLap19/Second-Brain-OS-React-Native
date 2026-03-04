import type { IconCircleProps, IconCircleShape, IconCircleSize } from '@/types';
import React from 'react';
import { View } from 'react-native';

const sizeMap: Record<IconCircleSize, string> = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-11 h-11',
  xl: 'w-12 h-12',
};

const shapeMap: Record<IconCircleShape, string> = {
  circle: 'rounded-full',
  rounded: 'rounded-2xl',
};

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
      className={`${sizeMap[size]} ${shapeMap[shape]} ${bgClassName} ${borderClassName ?? ''} items-center justify-center ${className ?? ''}`}
    >
      {children}
    </View>
  );
}
